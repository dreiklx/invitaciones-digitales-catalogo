"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { ResolvedRsvp } from "@/lib/invitation/resolve";
import { buildDeclineUrl, buildRsvpMessage, buildRsvpUrl, contactUrl, type AttendanceType } from "@/lib/invitation/whatsapp";
import { CheckIcon, WhatsAppIcon } from "./icons";

// Formulario de confirmación por WhatsApp, guiado por pasos. La lógica es
// común; el aspecto lo pone cada diseño con `styles` (clases de Tailwind).
// Reglas de usabilidad (personas mayores): opciones con borde visible,
// "Toca una opción en cada paso", y bajo el botón el aviso de que falta
// presionar Enviar en WhatsApp.
// En las demos del catálogo no abre WhatsApp: muestra el mensaje que llegaría.

export type RsvpStyles = {
  intro: string;
  deadline: string;
  progressDot: string;
  progressDotActive: string;
  progressLabel: string;
  legend: string;
  required: string;
  option: string;
  optionSelected: string;
  optionCheck: string;
  label: string;
  input: string;
  inputError: string;
  error: string;
  help: string;
  stepButton: string;
  counter: string;
  submit: string;
  submitNote: string;
  divider: string;
  declineLink: string;
  declineSubmit: string;
  contact: string;
  panel: string;
};

type Errors = {
  referrer?: string;
  attendanceType?: string;
  guestNames?: string;
  invalidNameIndices?: number[];
};

export default function RsvpForm({ rsvp, isDemo, styles: s }: { rsvp: ResolvedRsvp; isDemo: boolean; styles: RsvpStyles }) {
  const MIN = rsvp.minGroupSize;
  const MAX = rsvp.maxGroupSize;
  const askReferrer = rsvp.referrerOptions.length > 0;
  const offset = askReferrer ? 1 : 0;

  const [referrer, setReferrer] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<AttendanceType | null>(null);
  const [groupSize, setGroupSize] = useState(MIN);
  const [names, setNames] = useState<string[]>([""]);
  const [errors, setErrors] = useState<Errors>({});
  const [declineOpen, setDeclineOpen] = useState(false);
  const [declineError, setDeclineError] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  useEffect(() => {
    if (!rsvp.deadlineEndISO) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depende del reloj del visitante (solo se conoce al montar).
    setDeadlinePassed(Date.now() > Date.parse(rsvp.deadlineEndISO));
  }, [rsvp.deadlineEndISO]);

  const open = (url: string, message: string) => {
    if (isDemo) {
      setPreview(message);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const totalSteps = offset + (attendance === "grupo" ? 3 : 2);
  const currentStep = askReferrer && !referrer ? 1 : !attendance ? offset + 1 : totalSteps;

  const selectAttendance = (value: AttendanceType) => {
    setAttendance(value);
    setErrors({});
    setGroupSize(MIN);
    setNames(value === "individual" ? [""] : Array.from({ length: MIN }, () => ""));
  };

  const adjustGroup = (delta: number) => {
    const next = Math.min(MAX, Math.max(MIN, groupSize + delta));
    setGroupSize(next);
    setNames((prev) => {
      const list = prev.slice(0, next);
      while (list.length < next) list.push("");
      return list;
    });
  };

  const changeName = (index: number, value: string) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
    setErrors((prev) => {
      if (!value.trim() || !prev.invalidNameIndices?.includes(index)) return prev;
      const remaining = prev.invalidNameIndices.filter((i) => i !== index);
      return { ...prev, invalidNameIndices: remaining, guestNames: remaining.length ? prev.guestNames : undefined };
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Se leen del formulario (no solo del estado): el autocompletado del
    // navegador a veces no sincroniza el estado de React.
    const data = new FormData(event.currentTarget);
    const count = attendance === "grupo" ? groupSize : 1;
    const trimmed = Array.from({ length: count }, (_, i) => String(data.get(`guestName-${i}`) ?? "").trim());

    const next: Errors = {};
    if (askReferrer && !referrer) next.referrer = "Selecciona de parte de quién recibiste la invitación.";
    if (!attendance) next.attendanceType = "Indica si confirmarás individualmente o en grupo.";
    if (attendance) {
      const invalid = trimmed.map((n, i) => (n ? -1 : i)).filter((i) => i >= 0);
      if (invalid.length) {
        next.invalidNameIndices = invalid;
        next.guestNames = attendance === "individual" ? "Escribe tu nombre y apellido." : "Escribe el nombre y apellido de cada invitado.";
      }
    }
    setErrors(next);
    if (Object.keys(next).length || !attendance) return;

    const details = { guestNames: trimmed, referrer: askReferrer ? referrer : null, attendanceType: attendance };
    open(buildRsvpUrl(rsvp.context, details), buildRsvpMessage(rsvp.context, details));
  };

  const decline = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get("declineName") ?? "").trim();
    setDeclineError(!name);
    if (!name) return;
    const url = buildDeclineUrl(rsvp.context, name);
    open(url, decodeURIComponent(url.split("?text=")[1]));
  };

  const option = (label: string, selected: boolean, onSelect: () => void) => (
    <button
      key={label}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`relative min-h-14 px-3 py-4 pr-7 pl-7 text-base font-semibold transition min-[360px]:text-lg ${selected ? s.optionSelected : s.option}`}
    >
      {label}
      {selected && (
        <span className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full ${s.optionCheck}`}>
          <CheckIcon size={12} />
        </span>
      )}
    </button>
  );

  const contactLine = (
    <p className={`mt-8 text-center text-sm ${s.contact}`}>
      ¿Tienes alguna duda? Escríbenos al WhatsApp{" "}
      <a href={contactUrl(rsvp.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="inline-block whitespace-nowrap px-1 py-3 font-semibold underline underline-offset-4">
        {rsvp.phoneDisplay}
      </a>
    </p>
  );

  if (deadlinePassed) {
    return (
      <div className={`mx-auto max-w-md p-6 text-center ${s.panel}`}>
        <p className="text-base leading-relaxed">
          El plazo para confirmar terminó el {rsvp.deadlineLabel}. Si necesitas avisarnos algo, escríbenos por WhatsApp.
        </p>
        {contactLine}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className={`text-center text-sm leading-relaxed sm:text-base ${s.intro}`}>Toca una opción en cada paso para confirmar tu asistencia.</p>
      {rsvp.deadlineText && <p className={`mt-2 text-center text-sm font-semibold sm:text-base ${s.deadline}`}>{rsvp.deadlineText}</p>}

      <div className="mt-6" aria-hidden="true">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i < currentStep ? `w-7 ${s.progressDotActive}` : `w-1.5 ${s.progressDot}`}`} />
          ))}
        </div>
        <p className={`mt-2 text-center text-xs uppercase tracking-[0.2em] ${s.progressLabel}`}>
          Paso {currentStep} de {totalSteps}
        </p>
      </div>

      <form onSubmit={submit} noValidate className="mt-8 text-left">
        {askReferrer && (
          <fieldset className="m-0 border-0 p-0">
            <legend className={`mb-3 block text-base font-semibold ${s.legend}`}>
              1. ¿De parte de quién recibiste la invitación?&nbsp;<span className={s.required}>*</span>
            </legend>
            <div role="radiogroup" aria-label="¿De parte de quién recibiste la invitación?" className="grid grid-cols-2 gap-3">
              {rsvp.referrerOptions.map((name) =>
                option(name, referrer === name, () => {
                  setReferrer(name);
                  setErrors((prev) => ({ ...prev, referrer: undefined }));
                })
              )}
            </div>
            {errors.referrer && <p className={`mt-2 text-sm font-semibold ${s.error}`}>{errors.referrer}</p>}
          </fieldset>
        )}

        {(!askReferrer || referrer) && (
          <fieldset className={`m-0 border-0 p-0 ${askReferrer ? "mt-8" : ""}`}>
            <legend className={`mb-3 block text-base font-semibold ${s.legend}`}>
              {offset + 1}. ¿Cómo deseas confirmar?&nbsp;<span className={s.required}>*</span>
            </legend>
            <div role="radiogroup" aria-label="¿Individual o en grupo?" className="grid grid-cols-2 gap-3">
              {option("Individual", attendance === "individual", () => selectAttendance("individual"))}
              {option("Grupo", attendance === "grupo", () => selectAttendance("grupo"))}
            </div>
            {errors.attendanceType && <p className={`mt-2 text-sm font-semibold ${s.error}`}>{errors.attendanceType}</p>}
          </fieldset>
        )}

        {attendance === "grupo" && (
          <div className="mt-8">
            <p className={`text-base font-semibold ${s.legend}`}>
              {offset + 2}. ¿Cuántas personas van a asistir?&nbsp;<span className={s.required}>*</span>
            </p>
            <div className="mt-3 flex items-center justify-center gap-5">
              <button type="button" onClick={() => adjustGroup(-1)} disabled={groupSize <= MIN} aria-label="Restar una persona" className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-3xl transition disabled:opacity-30 ${s.stepButton}`}>
                −
              </button>
              <span className={`w-16 text-center text-4xl ${s.counter}`} aria-live="polite" aria-label={`${groupSize} personas`}>
                {groupSize}
              </span>
              <button type="button" onClick={() => adjustGroup(1)} disabled={groupSize >= MAX} aria-label="Sumar una persona" className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-3xl transition disabled:opacity-30 ${s.stepButton}`}>
                +
              </button>
            </div>
            <p className={`mt-3 text-center text-sm ${s.help}`}>
              Este número incluye a quien confirma. Mínimo {MIN}, máximo {MAX} personas.
            </p>
          </div>
        )}

        {attendance && (
          <div className="mt-8">
            <p className={`text-base font-semibold ${s.legend}`}>
              {attendance === "grupo" ? `${offset + 3}. Nombres de los invitados` : `${offset + 2}. Nombre y apellido`}&nbsp;<span className={s.required}>*</span>
            </p>
            <div className="mt-3 space-y-4">
              {names.map((name, i) => (
                <div key={i}>
                  {attendance === "grupo" && (
                    <label htmlFor={`guestName-${i}`} className={`mb-1 block text-sm font-semibold ${s.label}`}>
                      {i === 0 ? "Nombre de quien confirma" : `Invitado ${i + 1}`}
                    </label>
                  )}
                  <input
                    id={`guestName-${i}`}
                    name={`guestName-${i}`}
                    type="text"
                    autoComplete={i === 0 ? "name" : "off"}
                    value={name}
                    onChange={(e) => changeName(i, e.target.value)}
                    placeholder="Ejemplo: Ana Rodríguez"
                    aria-label={attendance === "individual" ? "Nombre y apellido" : undefined}
                    aria-required="true"
                    aria-invalid={Boolean(errors.invalidNameIndices?.includes(i))}
                    className={`w-full px-4 py-4 text-base focus:outline-none ${s.input} ${errors.invalidNameIndices?.includes(i) ? s.inputError : ""}`}
                  />
                </div>
              ))}
            </div>
            {errors.guestNames && <p className={`mt-2 text-sm font-semibold ${s.error}`}>{errors.guestNames}</p>}

            <p className={`mt-6 text-sm ${s.help}`}>
              <span className={s.required}>*</span> Todos los campos son obligatorios.
            </p>

            {/* El texto puede ir en dos líneas equilibradas: en los diseños
                con mayúsculas espaciadas (Tierra, Gala, Borgoña) no cabe en
                una a 320-360 px, y achicarlo lo haría difícil de leer. */}
            <button type="submit" className={`mt-6 flex min-h-16 w-full items-center justify-center gap-2.5 px-4 py-4 text-[17px] transition active:scale-[0.99] min-[360px]:gap-3 min-[360px]:px-5 min-[360px]:text-xl ${s.submit}`}>
              <WhatsAppIcon className="shrink-0" />
              <span className="text-balance text-center leading-tight">Confirmar por WhatsApp</span>
            </button>
            {/* WhatsApp abre el mensaje escrito pero no lo envía solo. */}
            <p className={`mt-3 text-center text-sm leading-relaxed ${s.submitNote}`}>
              Se abrirá WhatsApp con tu mensaje ya escrito.
              <br />
              Solo falta presionar <strong className="font-bold">Enviar</strong>.
            </p>
          </div>
        )}
      </form>

      {preview && (
        <div className={`mt-8 p-5 text-left ${s.panel}`} role="status">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">Demostración</p>
          <p className="mt-2 text-sm">En la invitación real se abre WhatsApp con este mensaje:</p>
          <p className="mt-3 whitespace-pre-line text-sm italic leading-relaxed">{preview}</p>
        </div>
      )}

      {rsvp.allowDecline && (
        <div className={`mx-auto mt-10 max-w-md border-t pt-8 text-center ${s.divider}`}>
          {!declineOpen ? (
            <button type="button" onClick={() => setDeclineOpen(true)} className={`min-h-12 px-4 text-base font-semibold underline underline-offset-4 transition ${s.declineLink}`}>
              ¿No podrás asistir? Avísanos aquí
            </button>
          ) : (
            <form onSubmit={decline} noValidate className="text-left">
              <label htmlFor="declineName" className={`block text-base font-semibold ${s.legend}`}>
                Lamentamos que no puedas acompañarnos. ¿Cuál es tu nombre?
              </label>
              <input
                id="declineName"
                name="declineName"
                type="text"
                autoComplete="name"
                placeholder="Ejemplo: Ana Rodríguez"
                aria-invalid={declineError}
                onChange={() => declineError && setDeclineError(false)}
                className={`mt-3 w-full px-4 py-4 text-base focus:outline-none ${s.input} ${declineError ? s.inputError : ""}`}
              />
              {declineError && <p className={`mt-2 text-sm font-semibold ${s.error}`}>Escribe tu nombre y apellido.</p>}
              <button type="submit" className={`mt-4 flex min-h-12 w-full items-center justify-center px-6 py-3 text-base font-semibold transition ${s.declineSubmit}`}>
                Avisar por WhatsApp
              </button>
            </form>
          )}
        </div>
      )}

      {contactLine}
    </div>
  );
}
