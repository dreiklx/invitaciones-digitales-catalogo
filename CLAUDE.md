# Antes de tocar código

Lee primero, en este orden:

1. `PROJECT-CONTEXT.md` — qué es el proyecto (catálogo de 7 diseños de
   invitación: bodas, quinceaños y cumpleaños), estado, arquitectura y decisiones, plantilla vs.
   personalizada, reglas que no se deben revertir, limitaciones, riesgos
   y pendientes.
2. `project-log.md` — historial de sesiones (la más reciente primero).
3. Si el trabajo es sobre un diseño ("vamos a usar la plantilla 3"):
   `docs/templates/<número>-<diseño>.md` (01-olivo, 02-tierra, 03-gala,
   04-riviera, 05-borgona, 06-aurora, 07-nube).
4. `photo-map.md` si hay fotos de por medio; `README.md` para el flujo de
   crear una invitación.

# Reglas de trabajo

- Los datos de una invitación van solo en `config/invitation.ts` (`null` =
  catálogo). Nada de datos de clientes en `templates/`, `app/`, `lib/` o
  `components/`.
- Colores: solo con los tokens de la paleta (`bg-paper`, `text-ink`,
  `bg-primary`…; ver `app/globals.css`). Nunca un color fijo en un
  componente de diseño.
- Fechas y textos derivados: desde `lib/invitation/resolve.ts`, nunca
  formateados en un componente.
- Cada diseño tiene su carpeta en `templates/` y en `app/plantillas/`; no
  convertir eso en una ruta dinámica ni importar todos los diseños en una
  página (rompe la carga de tipografías por página; ver PROJECT-CONTEXT).
- Fotos: proporción fija por espacio en `meta.ts` y siempre con
  `templates/shared/Frame.tsx`.
- No cambiar la arquitectura sin justificarlo y documentarlo.
- Sin secretos, sin `.env`, sin datos reales de clientes en el repo o la
  documentación. No recuperar nada de la boda original ni de su historial Git.
- Precios y acuerdos comerciales: **PENDIENTE DE DEFINICIÓN CON FOTOLAB**.
  No fijarlos ni documentarlos como decisión.
- No sobreingenierizar: no es un SaaS ni un CMS.
- Cambios visuales: revisar escritorio, 390 px y 320 px, y las reglas de
  usabilidad para personas mayores.
- Tras cambios relevantes: `npm run check`, `npm run typecheck`,
  `npm run lint`, `npm run build`; revisión visual cuando aplique.
- No hacer commits, push ni despliegues salvo que se pida.

# Documentación viva

- Antes de trabajar: leer lo relevante y entender el estado actual.
- Al cerrar una sesión con cambios importantes (arquitectura, config,
  flujo, comportamiento, decisiones, limitaciones): actualizar
  `PROJECT-CONTEXT.md`, la guía del diseño afectado en `docs/templates/`,
  `README.md`/`photo-map.md` si cambió el flujo o las fotos, y agregar una
  entrada breve en `project-log.md`.
- La documentación describe el estado REAL: corregir o quitar lo
  desactualizado. No registrar cambios triviales ni crear `.md` nuevos que
  dupliquen información.

@AGENTS.md
