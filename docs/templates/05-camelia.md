# Plantilla 05 · Camelia (quince años)

**Id en el config:** `template: "camelia"` · **Demo:** `/plantillas/camelia` ·
**Código:** `templates/camelia/` · **Datos de ejemplo:** `templates/camelia/demo.ts`

## Concepto
Quince años de gala, editorial y monumental (2026-10-10; ocupa el lugar
del antiguo diseño de boda Borgoña, del que hereda los bloques de color a
sangre y la ficha de información). Bloques vino frambuesa, el nombre de la
quinceañera gigante en cursiva, un **medallón con los XV** (doble anillo
rosa), destellos rosa muy discretos, la información en formato de ficha y
el **programa de la noche**. Juvenil y festivo sin ser infantil; distinto
de Aurora (lila, espejo ovalado y caligrafía) y de Gala.

## Paleta predeterminada (`templates/camelia/meta.ts`)
| Token | Valor | Uso en este diseño |
|---|---|---|
| `background` | `#fbf5f2` | Marfil: fondo de la página |
| `surface` | `#f4e3e3` | Rosa muy claro: cuenta regresiva, aviso, sobre mí, regalos |
| `text` | `#2b1219` | Texto |
| `textMuted` | `#74515a` | Texto secundario y rótulos |
| `primary` | `#741a39` | Vino frambuesa: portada, programa, pie, botones |
| `onPrimary` | `#fbf1f1` | Texto sobre el vino |
| `secondary` | `#f2c4cf` | Rosa empolvado: el nombre sobre vino, medallón, destellos, botón de la barra |
| `accent` | `#b0284f` | Frambuesa: antetítulos, campos obligatorios |
| `onAccent` | `#fff7f8` | Texto sobre la frambuesa |
| `line` | `#ead1d6` | Bordes |

## Tipografías
Instrument Serif (nombre, titulares y cifras, en cursiva) + Hanken Grotesk (texto).

## Estructura (orden)
Portada "Abrir invitación" (vino, medallón XV y el nombre gigante) →
**portada**: retrato a la derecha con el medallón sobre el borde y el
nombre monumental → frase de apertura → **cuenta regresiva gigante** →
ficha (fecha y calendario, misa, fiesta, vestimenta) → **programa de la
noche** (`schedule`, sobre vino, horas en cursiva) → aviso → confirmación
→ "Sobre mí" (foto en arco) → familia (padres, padrinos, corte de honor, en
tres columnas) → galería → regalos → pie vino con el nombre y "Mis XV".

## Fotos (5) — proporción fija, igual en teléfono y escritorio
| Espacio | Proporción | Dónde | `position` sugerida |
|---|---|---|---|
| `portada` | 4:5 vertical | Portada, a la derecha del nombre | `50% 30%` |
| `historia` | 1:1 cuadrada | "Sobre mí", recortada en arco | `50% 35%` |
| `galeria1` | 3:4 vertical | Galería, izquierda | `50% 30%` |
| `galeria2` | 3:4 vertical | Galería, derecha (desplazada) | `50% 30%` |
| `galeria3` | 21:9 panorámica | Galería, cierre a todo el ancho | `50% 40%` |

Pedir al cliente: 3 verticales, 1 cuadrada (o vertical con el rostro al
centro) y 1 horizontal amplia (con amigas, el salón o el baile).

**Demo — Renata** (`public/plantillas/camelia/fotos/`, una sola sesión de
stock de Pexels; fuentes en `photo-map.md`): portada = retrato con tiara y
vestido fucsia; sobre mí = en el jardín; galería = el vestido completo,
frente a la pared de globos "Mis XV" y riendo con sus amigas (panorámica).

## Rasgos propios
- El nombre usa todo el ancho: tamaño solo en `vw`; si pasa de 8 letras
  baja un escalón (`longName`), así no ensancha la página ni con la letra
  del sistema agrandada.
- Medallón con la edad en romanos (`toRoman(honoree.age)`).
- Programa en filas: hora en cursiva rosa | momento y descripción.
- La familia admite tres grupos (padres, padrinos, corte de honor).
- **Reproductor `broche`:** medallón vino con anillo rosa y un destello que
  titila al sonar; en escritorio, "Música" en cursiva, título y estado.

## En el teléfono
- Portada en una pantalla: el ancho del retrato sale del alto de la
  pantalla y el nombre monta sobre el borde inferior de la foto; "Desliza
  hacia abajo" visible.
- La ficha pasa a una columna (rótulo arriba, datos abajo).

## Música y cita
- **Demo:** Clair de lune (Debussy · Laurens Goedhart, dominio público;
  la misma pista que Gala).
- Frase de apertura propia de la quinceañera (no un versículo).

## Uso
`npm run nueva -- camelia` → editar `config/invitation.ts` (nombre en
"REEMPLAZAR", edad, programa, corte de honor) → fotos → `npm run check`.
