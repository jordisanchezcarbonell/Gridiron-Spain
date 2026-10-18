---
id: barrido-webs-clubes
type: data-sweep
date: 2026-10-18
scope: las 31 webs de club de src/data/teams
---

# Barrido de las webs de los clubes

Las fichas se construyeron sin abrir las webs con un navegador. Siete usan Clupik, una SPA
que a las herramientas de descarga solo les devuelve "Loading...". Se revisaron las 31.

## Resultado

**13 de 31 aportaron material que no teniamos.** El resto no tiene pagina de historia, la
tiene vacia de fechas o esta caida.

### Clupik (7 revisadas, 5 con material)

| Club | Hallazgo |
|---|---|
| badalona-dracs | Cronica 1987-1996. Campo y resultado del primer partido, Ramon Ventura, el Trofeo Maresme |
| camioneros-de-coslada | La exhibicion del Bernabeu de 1958 y el marcador de 1988 en disputa |
| sevilla-linces | Confirma la fundacion del 14-09-1992 y siete titulos regionales |
| sueca-ricers | Confirma 2007, aniade el registro de 2008 y el origen en la playa de Cullera |
| osos-rivas | Confirma Madrid Bears en la primavera de 1989 y el origen en el equipo Larios |
| murcia-cobras | Sin pagina de historia |
| valencia-firebats | Su "Historia" son objetivos y valores, sin fechas |

### Resto (24 revisadas, 8 con material)

| Club | Hallazgo |
|---|---|
| barcelona-bufals | **El primer partido entre dos equipos espanioles fue a finales de mayo de 1988**, Dracs contra Bufals. El del 19 de marzo fue contra un club italiano |
| gijon-mariners | Fundadores Toni Berges y Daniel Castanion, primer encuentro el 12-04-2001, primera victoria 47-37 a Trasgos de Ribadesella, **constitucion notarial el 02-03-2004** con Berges presidente, Castanion secretario y Ivan Chao tesorero, y entrada en la LNFA en 2007 tras ganar un torneo en Oporto |
| alcorcon-smilodons | **Campo resuelto**: Ciudad Deportiva Santo Domingo, campo F5, avenida Esteban Marquez. Y tres Ligas Madrilenias consecutivas |
| lhospitalet-pioners | Palmares completo: terceros en la Lliga Catalana y en la Supercopa de 1988, campeones de la XI LNFA (2004-05) y de la XVIII LNFA Elite (2011-12), entre otros |
| valencia-giants | Confirma la fundacion en 2003. El palmares esta en otra pagina, sin revisar |
| guadalajara-stings | Campo: Anexos del Pedro Escartin. **Dice competir en la "Conferencia Aragonesa", y nuestra ficha y la FEFA dicen Norte** |
| mallorca-voltors | Entrena en Son Moix y Germans Escalas. Sin historia ni fundacion |
| alicante-thunder | **No publica anio de fundacion en ninguna pagina.** Valida lo que ya decia la ficha |

### Sin material o inaccesibles

- **santurtzi-coyotes**: web caida
- **las-rozas-black-demons**: en mantenimiento
- **madrid-bravos**: pantalla con el logo, el club se disolvio
- **castell-platja-daro-ducs**: ultimas noticias de 2020-21, sin fechas claras. **El estado
  "unknown" de la ficha se mantiene**
- barcelona-pagesos, barcelona-uroloki, madrid-capitals, mairena-blue-devils,
  pinto-goldbats, tres-cantos-jabatos, granada-lions, argentona-bocs, boadilla-vikings,
  jerez-jaguars, valladolid-penguins, alcobendas-cavaliers: sin seccion de historia con
  fechas o pendientes de revisar a fondo

## Correcciones aplicadas

1. **gijon-mariners**: la ficha decia que la inscripcion formal fue en octubre de 2002
   segun Wikipedia. El club documenta la constitucion notarial el 2 de marzo de 2004 con
   nombres y cargos. Se publica la del club y se menciona la discrepancia.
2. **alcorcon-smilodons**: el campo estaba sin resolver entre tres candidatos. El club dice
   Ciudad Deportiva Santo Domingo, campo F5.
3. **barcelona-bufals** y el reportaje del origen: aniadido el partido de mayo de 1988.

## Los dos pendientes, resueltos el 18-10-2026

**guadalajara-stings: nuestra ficha era la correcta.** La FEFA publica "LNFA 2 -
CONFERENCIA NORTE" y la clasificacion lo confirma: Valladolid Penguins, Coyotes Santurtzi,
Cantabria Bisons, Berserkers Torrelavega, Villamayor Mercenarios y Stings sextos con 0-5.
Es la web del club la que se desvia al decir "Conferencia Aragonesa". Tambien discrepa en
el campo: la FEFA y nuestra ficha dicen CD Jeronimo de la Morena y el club dice Anexos del
Pedro Escartin. No se cambia nada: la ficha ya tenia el campo correcto, las dos redes
sociales y el historial completo.

**valencia-giants: la discrepancia es real y queda confirmada.** Su pagina de historia
enumera exactamente cuatro subcampeonatos, 2009, 2010, 2012 y 2024, y no menciona 2008 en
ningun momento. La FEFA le atribuye cinco. Se aniaden ademas los anios exactos a la ficha y
cuatro hitos que no teniamos: primer titulo en 2009 (LVFA Senior), doblete en 2019, ascenso
a la maxima categoria en 2012, paso atras en 2018-19 y vuelta a la competicion nacional en
2021. El club llama a esos subcampeonatos "Serie B", no "LNFA 2".

## Lo que esto dice del archivo

De las dos discrepancias que quedaban abiertas, **en una el archivo tenia razon y en la
otra la tenia a medias y ya lo decia**. Despues de revisar 31 webs de club, el numero de
errores propios encontrados en los datos de equipo es bajo. Lo que ha aparecido no son
tanto errores como huecos, y la mayoria estaban declarados.
- La leccion de fondo: **dos veces hoy el dato que faltaba estaba dentro de una fuente que
  el archivo ya citaba** (el articulo de Cuadernos de Futbol y la historia de los Bufals).
  No basta con tener la fuente dada de alta: hay que haberla leido entera.
