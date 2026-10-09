<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Flujo de trabajo de cada tarea (regla permanente del dueño)

Aplica a cualquier agente (Claude Code, Codex…). CLAUDE.md lo resume.

## Al comenzar
- Leer los archivos de contexto relevantes (CLAUDE.md lista el orden).
- Comprobar el estado real del repositorio (`git status`, `git log`).
- Entender qué se modificó antes. El código y la documentación actuales
  son más fiables que el historial de chat o un resumen de sesión.

## Durante
- Trabajar de principio a fin (Auto Mode cuando esté disponible) y
  resolver las decisiones técnicas razonables sin pedir aprobación en cada
  paso.
- Pedir intervención solo ante un bloqueo real: autenticación,
  autorización o una decisión que no pueda deducirse con seguridad
  (p. ej., precios: PENDIENTE DE DEFINICIÓN CON FOTOLAB).
- Mantener la documentación al día cuando cambien decisiones,
  comportamiento, arquitectura, instrucciones o limitaciones.

## Al terminar (en la MISMA tarea, sin que se pida aparte)
1. Implementar, probar y corregir lo encontrado.
2. Actualizar los `.md` pertinentes: evaluar como mínimo
   `PROJECT-CONTEXT.md`, `README.md`, `project-log.md`, las guías de
   `docs/templates/` afectadas, `photo-map.md` si hubo fotos, y
   CLAUDE.md/AGENTS.md si cambian las reglas de trabajo. Registrar estado
   real, decisiones, pruebas hechas y limitaciones; nada de cambios
   triviales. No inventar pruebas ni dar por verificado lo que no se
   comprobó.
3. Revisar el diff y la seguridad: sin secretos, `.env*`, `.vercel/`,
   datos privados de la boda original ni archivos temporales.
4. Commit con mensaje descriptivo y **push normal a `origin/main`**
   (nunca `--force`, nunca reescribir historial). Sin commits vacíos ni
   pushes innecesarios.
5. Comprobar el estado final (`git status` limpio y sincronizado).

Excepciones: el dueño pide expresamente no hacer commit/push, hay un
riesgo de seguridad o un bloqueo real (se informa).

## Vercel
- El push a `main` dispara un despliegue automático, que hoy queda
  **bloqueado** por permisos de la cuenta que firma los commits (ver
  PROJECT-CONTEXT, "Git, GitHub y despliegue"). No afirmar que un
  despliegue funcionó sin comprobarlo; si queda bloqueado, informarlo.
- No eludir el bloqueo (nada de `vercel deploy` manual ni cambiar el autor
  de los commits por cuenta propia) y no modificar la configuración de
  Vercel salvo que sea estrictamente necesario y esté autorizado.
