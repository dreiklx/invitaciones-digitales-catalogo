# Antes de tocar código

Lee primero, en este orden:

1. `PROJECT-CONTEXT.md` — qué es el proyecto (catálogo de 8 diseños de
   invitación en cuatro categorías: Bodas, Quinceaños, Bebés y Aniversarios), estado, arquitectura y decisiones, plantilla vs.
   personalizada, reglas que no se deben revertir, limitaciones, riesgos
   y pendientes.
2. `project-log.md` — historial de sesiones (la más reciente primero).
3. Si el trabajo es sobre un diseño ("vamos a usar la plantilla 3"):
   `docs/templates/<número>-<diseño>.md` (01-olivo, 02-tierra, 03-gala,
   04-aurora, 05-aguamarina, 06-arrullo, 07-nube, 08-riviera).
4. `photo-map.md` si hay fotos de por medio (incluye la auditoría de
   licencias y derechos de imagen de las demos); `README.md` para el flujo de
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
- Navegación: las secciones de la barra salen de
  `lib/invitation/sections.ts` (no se escriben a mano por invitación) y
  usan los mismos `id` en los ocho diseños (`historia`, `fecha`,
  `lugares`, `programa`, `detalles`, `galeria`, `regalos`, `confirmar`).
  El selector "Otros diseños" es solo de las demos (`inv.isDemo`); nunca
  en una invitación de cliente. Ver PROJECT-CONTEXT, "Navegación".
- No cambiar la arquitectura sin justificarlo y documentarlo.
- Sin secretos, sin `.env`, sin datos reales de clientes en el repo o la
  documentación. No recuperar nada de la boda original ni de su historial Git.
- Precios y acuerdos comerciales: **PENDIENTE DE DEFINICIÓN CON FOTOLAB**.
  No fijarlos ni documentarlos como decisión.
- No sobreingenierizar: no es un SaaS ni un CMS.
- Cambios visuales: revisar escritorio, 390 px y 320 px (también 320×568:
  la portada no se desplaza), y las reglas de usabilidad para personas
  mayores. Las instrucciones dicen el gesto, no la dirección del
  contenido ("Desliza hacia arriba" en el teléfono; ver PROJECT-CONTEXT).
- Cada diseño conserva su paleta y su reproductor propios (una prueba lo
  exige): para otro evento con la misma composición, crear un diseño
  nuevo en vez de recolorear uno existente.
- Tras cambios relevantes: `npm run check`, `npm run typecheck`,
  `npm run lint`, `npm test`, `npm run build` y `npm run test:e2e` (o todo
  junto: `npm run verify`); revisión visual cuando aplique. Si una prueba
  falla, corregir la causa; no bajar la cobertura.
- Cerrar cada tarea con commit y push normal a `origin/main` (salvo que
  el dueño diga lo contrario o haya un riesgo o bloqueo real). Nunca
  despliegues manuales con Vercel CLI para saltar el bloqueo de la
  integración. Antes de cada commit, `git config user.email` debe ser la
  dirección noreply de `dreiklx` (identidad local del repo; si no, Vercel
  bloquea el despliegue). Detalle: "Flujo de trabajo de cada tarea" en
  AGENTS.md.

# Flujo de cada tarea (regla permanente)

- Al empezar: leer el contexto y comprobar el estado real del repo; el
  código y los `.md` mandan sobre el historial de chat.
- Durante: trabajar de principio a fin sin pedir aprobación en cada paso;
  preguntar solo ante bloqueos reales (autenticación, autorización o una
  decisión que no se pueda deducir).
- Al terminar, en la misma tarea: probar → actualizar los `.md` → revisar
  diff y seguridad → commit descriptivo → push a `origin/main` → comprobar
  que el repo quede limpio. No afirmar pruebas ni despliegues no
  comprobados.

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
