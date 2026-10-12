# Photo Map

Cada diseño tiene sus propios espacios de foto, con proporción fija. La
tabla de cada uno (espacio, proporción, dónde aparece, recorte sugerido) está
en su guía: `docs/templates/01-olivo.md` … `07-nube.md`. La fuente de
verdad en el código es `photoSlots` en `templates/<diseño>/meta.ts`; el
componente `templates/shared/Frame.tsx` aplica esa proporción, así que **lo
que dice la guía es exactamente lo que se ve, en teléfono y en escritorio**.

Resumen de cantidades: Olivo 7 · Tierra 8 · Gala 6 · Aurora 7 · Aguamarina 6 ·
Arrullo 6 · Nube 6 · Riviera 6.

## Dónde van los archivos
- Invitación de cliente: `public/images/` (nombres que indique
  `config/invitation.ts`; `npm run nueva` propone `portada.jpg`,
  `galeria-1.jpg`…).
- Demos del catálogo: `public/plantillas/<diseño>/fotos/`, una sesión
  coherente por diseño: seis con fotos de stock de Pexels y **Olivo con
  fotos aportadas por el dueño del proyecto, de derechos PENDIENTES DE
  AUTORIZACIÓN** (auditoría abajo).
  `npm run placeholders` (imágenes abstractas para un diseño nuevo) nunca
  toca una carpeta `fotos/`. `npm run check` da error si una invitación de
  cliente sigue usando una foto de `/plantillas/`.

## Reglas
- Respetar la orientación de cada espacio (las fotos se recortan con
  `object-fit: cover`). `npm run check` avisa si una foto horizontal va en
  un marco vertical o al revés, y si mide menos de 1000 px.
- Ajustar `position` (p. ej. `"50% 30%"`) a donde están los rostros,
  revisando primero en teléfono.
- El encuadre de las fotos de las ocho demos está revisado (320–1920
  px). Con las fotos de cada cliente hay que revisarlo otra vez a 320 y
  390 px. Las
  proporciones y la orientación de cada espacio están en la guía de cada
  diseño (`docs/templates/`).
- Arcos, óvalos, círculos y marcos tallados (Riviera, Arrullo, Aurora, Nube, Aguamarina) recortan esquinas: sujeto al centro.
- Gala muestra todas las fotos en blanco y negro.
- Optimizar con `npm run optimize-images` (endereza por EXIF, lado largo
  máx. 2400 px). Guardar los originales aparte (`/img`, en `.gitignore`).
- Al reemplazar una foto ya publicada, usar un nombre nuevo (caché).
- `alt` descriptivo con los nombres reales.
- Nunca usar fotos de un cliente como demo de otro.

## Auditoría de fotos y derechos (2026-10-11)

### Qué cubre la licencia y qué no
- **Licencia de Pexels** (https://www.pexels.com/license/, consultada el
  2026-10-11): las fotos se pueden usar gratis, también con fines
  comerciales, y modificar; la atribución es opcional. Prohíbe: mostrar a
  personas identificables "en mala luz" u ofensivamente, vender copias sin
  modificar, **dar a entender que las personas o marcas de la foto
  respaldan el producto**, redistribuirlas en otras plataformas de stock y
  usarlas como marca.
- **Términos de servicio de Pexels** (https://www.pexels.com/terms-of-service/,
  actualizados el 15-11-2024): Pexels **no garantiza** que se hayan obtenido
  autorizaciones de las personas (*model releases*), de propiedades ni de
  marcas, y deja en quien usa la foto la decisión de si necesita permisos
  adicionales, en especial con personas reconocibles y en usos comerciales.
- Por eso **licencia ≠ derechos resueltos**: la licencia autoriza a usar la
  fotografía como obra del fotógrafo, pero no sustituye el consentimiento
  de las personas que aparecen (derecho a la propia imagen, privacidad,
  publicidad), que Pexels no certifica. Esto no es una opinión jurídica:
  antes de publicitar el servicio conviene confirmarlo con un profesional.
- **Medidas tomadas:** nombres ficticios en las demos de Pexels; aviso
  visible en cada demo y en el pie del catálogo ("datos y fotos de
  ejemplo; las personas o personajes que aparecen no son clientes ni
  respaldan ni recomiendan este servicio"; no afirma ninguna licencia); ninguna foto se usa en un contexto ofensivo
  ni como testimonio; no se usan como logotipo ni en material impreso.
- **Recomendación** (antes de una campaña comercial con estas demos): para
  quinceaños y bebés, reemplazar por sesiones propias con autorización
  firmada de los padres o tutores (p. ej. de los fotógrafos con los que se
  trabaje). Mientras tanto se conservan con el riesgo documentado.

### Fotos retiradas
- **Olivo, sesión de Pexels (solo el 2026-10-11):** la sesión de Igor La
  Prado en un olivar ("Elena y Tomás") se quitó por pedido del dueño del
  proyecto, que pidió volver a Don Ramón y Doña Florinda (ver abajo). No
  fue por un problema de licencia. Queda en el historial Git del
  repositorio (commit `f3569cf`) y desde el 2026-10-12 la usa **Riviera**
  (ver su tabla abajo).
- **Aguamarina, entonces Camelia (hasta 2026-10-10):** sesión de quinceañera en fucsia
  (pexels.com/photo/32274275 y siguientes): se cambió por la dirección
  fotográfica del rediseño (salón de fiesta, vestido aguamarina), no por un
  problema de licencia.

### Olivo — Don Ramón y Doña Florinda (DERECHOS PENDIENTES DE AUTORIZACIÓN)
- **Procedencia:** carpeta del Escritorio "fotos plantilla olivo",
  aportada por el dueño del proyecto. **Autor, fuente y licencia: sin
  verificar.** Las copias web se generaron sin modificar los originales
  (PNG → JPG de calidad 82, sin agrandar; la panorámica, recortada a
  16:9).
- **Personas y personajes identificables:** sí. Reproducen de forma
  reconocible a los personajes Don Ramón y Doña Florinda de la serie de
  televisión *El Chavo del 8*: hay derechos de los personajes (de sus
  titulares) y de imagen de los actores, que **deben considerarse
  pendientes de autorización**. **No hay autorización comercial
  verificada**; no afirmarlo en ningún lado.
- **Riesgo:** **alto** si el catálogo se usa como publicidad. Medidas: el
  aviso de demostración dice que las personas o personajes no son
  clientes ni respaldan el servicio; ningún texto, metadato ni imagen para
  compartir sugiere respaldo; no se usan en material impreso ni como
  logotipo; `npm run nueva` nunca las copia a una invitación.
- **Se conservan por decisión del dueño del proyecto (2026-10-11).** No
  se eliminan sin su pedido. Antes de una campaña comercial: obtener
  autorización por escrito o reemplazarlas.

| Archivo | Espacio | Escena | Original (Escritorio) |
|---|---|---|---|
| `abrazo.jpg` | `portada` 2:3 | Abrazados en el patio | `ramon y florinda abrazandose 2;3.png` |
| `propuesta.jpg` | `historia` 3:2 | Él, de rodillas, le propone matrimonio | `ramon proponiendo matrimonio 3;2.png` |
| `rosa.jpg` | `retrato` 4:5 | Él le lanza una rosa | `don ramon tira la rosa 4;5 .png` |
| `anillo-vertical.jpg` | `galeria1` 2:3 | Ella enseña el anillo | `enseñando el anillo 2;3.png` |
| `patio.jpg` | `galeria2` 4:5 | Él le ofrece una rosa en el patio | `Romance cómica en el patio 4;5.png` |
| `sentados.jpg` | `galeria3` 3:2 | Sentados en el patio, felices | `pareja feliz 3;2 .png` |
| `anillo-horizontal.jpg` | `galeria4` 16:9 | Ella enseña el anillo y él celebra | `enseñando el anilo 3;2.png` |

### Tierra — Camila y Diego (pareja adulta en el campo)
- **Autor:** Alexander Mass / Reborn Filmes (@rebornfilmes) · **Plataforma:** Pexels · **Licencia:** Licencia de Pexels ("Free"), comprobada foto por foto en su página el 2026-10-11.
- **Personas identificables:** sí, dos adultos.
- **Riesgo de que parezcan clientes o recomienden el servicio:** bajo-medio; nombres ficticios y aviso.

| Archivo | Espacio | Escena | Original |
|---|---|---|---|
| `abrazo-flores.jpg` | `portada` 4:5 | Abrazo entre flores secas | https://www.pexels.com/photo/32195272/ |
| `beso.jpg` | `historia` 3:4 | Beso entre la hierba | https://www.pexels.com/photo/32195266/ |
| `abrazo-atardecer.jpg` | `retrato` 3:4 | Abrazo al atardecer | https://www.pexels.com/photo/32195300/ |
| `caminata.jpg` | `galeria1` 4:5 | Caminan colina arriba | https://www.pexels.com/photo/32195267/ |
| `detalle-vestido.jpg` | `galeria2` 1:1 | Detalle del vestido | https://www.pexels.com/photo/32195287/ |
| `lago.jpg` | `galeria3` 1:1 | Él la levanta junto al lago | https://www.pexels.com/photo/32195270/ |
| `horizonte.jpg` | `galeria4` 16:9 | Siluetas al atardecer | https://www.pexels.com/photo/32195290/ |
| `baile-atardecer.jpg` | `cierre` 3:2 | Manos al atardecer | https://www.pexels.com/photo/32195293/ |
### Gala — Isabella y Sebastián (boda en un salón clásico)
- **Autor:** Li Chunyu (@li-chunyu-2156528508) · **Plataforma:** Pexels · **Licencia:** Licencia de Pexels ("Free"), comprobada foto por foto en su página el 2026-10-11.
- **Personas identificables:** sí, dos adultos (se muestran en blanco y negro).
- **Riesgo de que parezcan clientes o recomienden el servicio:** bajo-medio; nombres ficticios y aviso. La cámara de 39944198 no muestra la marca de forma legible.

| Archivo | Espacio | Escena | Original |
|---|---|---|---|
| `retrato-ramo.jpg` | `portada` 3:4 | Retrato con el ramo | https://www.pexels.com/photo/39944197/ |
| `abrazo-petalos.jpg` | `historia` 16:9 | Abrazo entre pétalos | https://www.pexels.com/photo/39944195/ |
| `abrazo-risas.jpg` | `galeria1` 3:4 | Abrazo riendo | https://www.pexels.com/photo/39944194/ |
| `mirada-salon.jpg` | `galeria2` 3:4 | Ella mira atrás | https://www.pexels.com/photo/39944196/ |
| `baile-escalera.jpg` | `galeria3` 3:4 | Baile junto a la escalera | https://www.pexels.com/photo/39944190/ |
| `sofa-camara.jpg` | `galeria4` 3:4 | En el sofá con una cámara | https://www.pexels.com/photo/39944198/ |
### Aurora — Valentina (quinceañera, vestido lila)
- **Autor:** eduardo199o9 (@eduardo199o9-178988127) · **Plataforma:** Pexels · **Licencia:** Licencia de Pexels ("Free"), comprobada foto por foto en su página el 2026-10-11.
- **Personas identificables:** sí; **probablemente una menor de edad** (quinceañera) y dos adultos.
- **Riesgo de que parezcan clientes o recomienden el servicio:** **medio**: menor identificable y Pexels no garantiza autorizaciones. Se conserva con nombre ficticio y aviso; ver la recomendación de arriba.

| Archivo | Espacio | Escena | Original |
|---|---|---|---|
| `jardin-palmeras.jpg` | `portada` 3:4 | Entre palmeras | https://www.pexels.com/photo/31482011/ |
| `retrato-vestido.jpg` | `historia` 4:5 | Recostada sobre el vestido | https://www.pexels.com/photo/31482016/ |
| `casa-jardin.jpg` | `galeria1` 4:5 | En el jardín de la casa | https://www.pexels.com/photo/31482012/ |
| `retrato-tiara.jpg` | `galeria2` 4:3 | Retrato con tiara | https://www.pexels.com/photo/31482010/ |
| `sobre-el-vestido.jpg` | `galeria3` 4:3 | Sonríe sobre el vestido | https://www.pexels.com/photo/31482017/ |
| `salon.jpg` | `galeria4` 4:3 | En el salón | https://www.pexels.com/photo/31482023/ |
| `con-sus-padres.jpg` | `cierre` 3:2 | Con dos adultos en el jardín | https://www.pexels.com/photo/31482022/ |
### Aguamarina (antes Camelia) — Renata (quinceañera, vestido aguamarina y blanco, salón de fiesta)
- **Autor:** Juliano Astc (@juliano-astc-1623739) · **Plataforma:** Pexels · **Licencia:** Licencia de Pexels ("Free"), comprobada foto por foto en su página el 2026-10-11.
- **Personas identificables:** sí; **probablemente una menor de edad** (quinceañera).
- **Riesgo de que parezcan clientes o recomienden el servicio:** **medio**: igual que Aurora. Se conserva con nombre ficticio y aviso.

| Archivo | Espacio | Escena | Original |
|---|---|---|---|
| `vestido-aguamarina.jpg` | `portada` 4:5 | Vestido aguamarina en el salón | https://www.pexels.com/photo/16999946/ |
| `vestido-blanco.jpg` | `historia` 4:5 | Vestido blanco, sentada | https://www.pexels.com/photo/16999916/ |
| `salon-de-fiesta.jpg` | `galeria1` 3:4 | Bajo las lámparas | https://www.pexels.com/photo/16999945/ |
| `retrato.jpg` | `galeria2` 1:1 | Retrato con tiara | https://www.pexels.com/photo/16999947/ |
| `mirada.jpg` | `galeria3` 1:1 | Mira hacia atrás | https://www.pexels.com/photo/16999915/ |
| `hacia-el-salon.jpg` | `galeria4` 3:4 | En la pista | https://www.pexels.com/photo/16999948/ |
### Arrullo — Natalia y Joaquín (baby shower)
Hasta el 2026-10-11 estuvieron en `public/plantillas/riviera/fotos/`
(cuando Riviera era el baby shower); el 2026-10-12 pasaron sin cambios a
`public/plantillas/arrullo/fotos/`, junto con la demo.
- **Autor:** Larissa Teixeira Fotografia (@larissa-teixeira-fotografia-2148191276) · **Plataforma:** Pexels · **Licencia:** Licencia de Pexels ("Free"), comprobada foto por foto en su página el 2026-10-11.
- **Personas identificables:** sí en 2 fotos (una pareja adulta; ella embarazada). Las otras 4 son decoración.
- **Riesgo de que parezcan clientes o recomienden el servicio:** bajo-medio; nombres ficticios y aviso. Se descartaron las fotos de la sesión con el letrero "Girl or Boy?".

| Archivo | Espacio | Escena | Original |
|---|---|---|---|
| `futuros-padres.jpg` | `portada` 3:4 | La pareja con la torta | https://www.pexels.com/photo/29964272/ |
| `beso-en-la-frente.jpg` | `historia` 4:5 | Él le da un beso | https://www.pexels.com/photo/29964268/ |
| `mesa-dulce.jpg` | `galeria1` 4:5 | Mesa de dulces | https://www.pexels.com/photo/29964260/ |
| `ositos.jpg` | `galeria2` 1:1 | Ositos de azúcar | https://www.pexels.com/photo/29964258/ |
| `oso-de-peluche.jpg` | `galeria3` 1:1 | Oso de peluche | https://www.pexels.com/photo/29964271/ |
| `mesa-de-postres.jpg` | `galeria4` 3:2 | Mesa de postres | https://www.pexels.com/photo/29964257/ |
### Riviera — Elena y Tomás (pareja adulta en un olivar; renovación de votos)
- **Autor:** Igor La Prado (@igor-la-prado-125324398) · **Plataforma:** Pexels · **Licencia:** Licencia de Pexels ("Free"), comprobada foto por foto en su página el 2026-10-11.
- **Origen en este repositorio:** es la sesión que usó Olivo el 2026-10-11
  (commit `f3569cf`) y que se quitó de Olivo por pedido del dueño, no por
  la licencia. El 2026-10-12 se reutilizó para Riviera (aniversarios) en
  vez de buscar fotos nuevas: copias web de ese commit recortadas a las
  proporciones de Riviera (JPG 82). `vestido-al-viento.jpg` no se usa.
- **Personas identificables:** sí, dos adultos con el rostro visible.
- **Riesgo de que parezcan clientes o recomienden el servicio:** bajo-medio; nombres ficticios y aviso de demostración.

| Archivo | Espacio | Escena | Original |
|---|---|---|---|
| `en-el-pasto.jpg` | `portada` 3:4 | Recostados en el pasto | https://www.pexels.com/photo/39117640/ |
| `abrazo-olivar.jpg` | `historia` 4:5 | Abrazo entre olivos | https://www.pexels.com/photo/39117643/ |
| `caminata-olivar.jpg` | `galeria1` 4:5 | Caminan por el olivar (B/N) | https://www.pexels.com/photo/39117644/ |
| `retrato-novia.jpg` | `galeria2` 1:1 | Retrato de ella (B/N) | https://www.pexels.com/photo/39117648/ |
| `manos.jpg` | `galeria3` 1:1 | Manos con los anillos (B/N) | https://www.pexels.com/photo/39117639/ |
| `en-brazos.jpg` | `galeria4` 3:2 | Él la lleva en brazos | https://www.pexels.com/photo/39117646/ |
### Nube — Emma (primer cumpleaños)
- **Autor:** Hasan Albari (@hasanalbari) · **Plataforma:** Pexels · **Licencia:** Licencia de Pexels ("Free"), comprobada foto por foto en su página el 2026-10-11.
- **Personas identificables:** sí; **una bebé** (Pexels la describe como niña; la demo pasó de "Mateo" a **Emma** por coherencia).
- **Riesgo de que parezcan clientes o recomienden el servicio:** **medio**: menor identificable; se conserva con nombre ficticio y aviso. Se evitaron las fotos con la silueta de Mickey (marca registrada).

| Archivo | Espacio | Escena | Original |
|---|---|---|---|
| `globos.jpg` | `portada` 1:1 | En su cajón con globos | https://www.pexels.com/photo/1131497/ |
| `globos-amarillos.jpg` | `historia` 4:5 | Con globos amarillos | https://www.pexels.com/photo/1131489/ |
| `letras-one.jpg` | `galeria1` 4:5 | Con las letras ONE | https://www.pexels.com/photo/1131495/ |
| `en-su-cajon.jpg` | `galeria2` 1:1 | En el parque | https://www.pexels.com/photo/1131492/ |
| `en-el-pasto.jpg` | `galeria3` 1:1 | Sonríe en el pasto | https://www.pexels.com/photo/1131500/ |
| `puente-rojo.jpg` | `galeria4` 4:5 | Con las letras en el puente | https://www.pexels.com/photo/1131490/ |
