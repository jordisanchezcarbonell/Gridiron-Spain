---
id: royal-oaks-knights-entrevista
type: interview-prep
club: Royal Oaks Knights / Alcobendas Cavaliers
prepared: 2026-10-15
status: pendiente de realizar
---

# Guion de entrevista — Royal Oaks Knights

## Por qué esta entrevista importa

No es una ficha más. Es el club que puede fechar el origen del fútbol americano en España,
y ahora mismo **su versión contradice lo que nosotros publicamos**. Resolver eso vale más
que el artículo.

Además, es el club que nos ha dado el único clic de búsqueda orgánica del proyecto
(`/en/stories/royal-oaks-knights`, 12 impresiones, 1 clic) y ya estamos en conversación
directa con ellos, así que no hace falta romper el hielo.

## A quién preguntar

| Persona | Cargo | Estado |
|---|---|---|
| Marco Chamón | Head coach en 2016 | Confirmar si sigue y con qué cargo |
| Diego Fernández del Rivero | Head coach del U15 de flag, Indianápolis 2026 | Confirmado |
| **Presidente / junta directiva** | **Desconocido** | **Primera pregunta: quién es y cómo se escribe su nombre** |

Contacto público: `info@royaloaksknights.com`

---

## Bloque 1 — El origen (prioridad máxima)

Esto es lo único que no puede quedarse sin preguntar.

1. Vuestra web dice que el 15 de octubre de 1960 Knights ganó 20-6 a Zaragoza Zebras y lo
   presentáis como el primer partido de fútbol americano de España. Nosotros publicamos
   que el primero fue el 19 de marzo de 1988, Badalona Drags contra Palermo Cardinals,
   según la Federació Catalana. **¿Cómo encajan las dos cosas?**
2. ¿Entendéis ese partido de 1960 como "en España" o como "entre institutos estadounidenses
   que estaban en España"? ¿Dónde está la frontera para vosotros?
3. ¿Qué documentación conserváis de aquello — actas, fotos, prensa de base, anuarios del
   Madrid High School? ¿Podríamos citarla y reproducir algo?
4. ¿Sabéis si los Zaragoza Zebras, Sevilla HS Toros o Rota HS Admirals dejaron archivo?

> Si confirman la distinción, hay que cualificar la frase en cuatro archivos de `src/data`
> y citar ambas fuentes. Ese es el entregable real de esta entrevista.

## Bloque 2 — Los nombres de la prehistoria

5. Joe Blackstead, el profesor que introdujo el flag en 1956. ¿Sabéis algo más de él?
   ¿Vive, hay familia localizable, se le ha reconocido alguna vez?
6. Jim Leary (dirección deportiva) y Don Mitchell (entrenador), 1959. ¿De dónde salen esos
   nombres — archivo propio, memoria oral, documentación del MHS?
7. Los equipos internos del instituto: Mustangs, Dragons, Sabres, Bloodhounds. ¿Queda algo
   de ellos?
8. 1972, la división del distrito escolar en THS Knights y Royal Oaks Knights. ¿Por qué
   Royal Oaks se quedó con el nombre? ¿Qué fue del otro equipo?
9. El barrio de Royal Oaks es hoy el Encinar de los Reyes. ¿Cuándo dejó el club de ser
   "del instituto" para ser un club español abierto?

## Bloque 3 — La refundación de 2014

10. Entre los campeonatos del 77 y la restauración de 2014 hay casi cuarenta años.
    ¿Qué pasó? ¿El club se disolvió o siguió en algún formato?
11. ¿Quién impulsó volver en 2014 y con qué idea?
12. Hoy os definís como entidad de fomento del acceso a la educación superior y atención a
    personas en exclusión. ¿Cómo se traduce eso en el día a día de un equipo?

## Bloque 4 — 2026, el año de los cinco títulos

13. LNFA 2, Junior, Cadete, regional de Madrid y el Flag Sub-15. ¿Qué hicisteis distinto?
14. El ascenso: 7-0 en liga regular y 35-0 a Alcorcón Smilodons en la final, con Pablo
    Vázquez MVP. ¿Cómo se llega a una final así?
15. Es el segundo ascenso tras el de 2022, que acabó en descenso en 2022-23. ¿Qué cambia
    ahora para que la Serie A salga distinta?
16. Indianápolis, NFL FLAG Championships, julio de 2026. ¿Qué os llevasteis de allí?
17. La relación entre Royal Oaks Knights (cantera) y Alcobendas Cavaliers (senior): ¿cómo
    lo explicáis a alguien de fuera?

---

## Datos a confirmar de paso

Pendientes que arrastramos en la investigación y que se resuelven en diez segundos de
conversación:

- [ ] Nombre y cargo del presidente / junta directiva, bien escrito
- [ ] Resultado exacto de la final de LNFA Junior 2026
- [ ] Resultado exacto de la final de LNFA Cadete 2026
- [ ] Resultado en Indianápolis
- [ ] Redes sociales oficiales (nuestra ficha las tiene como UNKNOWN)
- [ ] Si Marco Chamón sigue en el club y con qué cargo
- [ ] La cita de Diego Fernández del Rivero aparece en dos versiones distintas según el
      medio (Infobae y Diario de Alcobendas). Pedirle la buena.
- [ ] Permiso para escudo y fotos

## Qué les podemos ofrecer

No vamos a pedir sin dar. Lo que tenemos:

- Su ficha, abierta a correcciones, citándoles como fuente
- Si nos ayudan a fechar el origen, lo corregimos en el archivo **citándoles**, que es
  exactamente la clase de cosa por la que un club quiere aparecer
- Un enlace desde su web nos ayudaría a que Google rastree la ficha (ver
  `docs/outreach/estado.local.md`)

## Después de la entrevista

1. Volcar lo confirmado a `research/spain/royal-oaks-knights.md` con nivel de confianza
2. Dar de alta las fuentes nuevas en `src/data/sources/`
3. Si se resuelve el origen: cualificar la frase del primer partido en
   `badalona-dracs.ts`, `historia-espana.ts`, `catalonia.ts` y `timeline/index.ts`
4. `npm run content:check` antes de publicar nada
