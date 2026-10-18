---
id: auditoria-datos-equipos
type: data-audit
date: 2026-10-18
scope: los 46 equipos de src/data/teams
---

# Auditoria de los datos de equipos

Comprobaciones automaticas sobre los 46 equipos. **Dos de las cifras del primer intento
eran falsas** por regex demasiado estrictas; estas son del parser fiable.

## Lo que esta bien

- **Referencias cruzadas intactas.** Los 10 `teamId` de la temporada LNFA 2026-27 y todos
  los del resto de `src/data` apuntan a equipos que existen. Cero referencias rotas.
- **Los 46 tienen `lastVerifiedAt`.** Diecinueve usan una constante compartida del fichero,
  que es por lo que un primer conteo los dio como vacios.
- **Los 46 tienen historia** desde hoy.
- **Un solo equipo sin `researchNotes`**: barbera-rookies.

## Huecos reales, por si se pueden cerrar

| Hueco | Equipos | Comentario |
|---|---|---|
| Sin `foundedYear` | 4 | cenes-de-la-vega-valkirias, villamayor-mercenarios, torrelavega-berserkers, alicante-thunder. Son los cuatro que la ficha declara en voz alta. alcobendas-cavaliers se cierra hoy con 1972 citando al club |
| Sin `logo` | 27 | No se arregla sin permiso. Es justo lo que pide el outreach |
| Sin `website` | 15 | Refleja la realidad: la FEFA no lista web para muchos |
| Sin `socialLinks` | 5 | madrid-bravos, barcelona-dragons, barcelona-dragons-elf, madrid-panteras, barcelona-boxers. Todos inactivos o historicos. Ver abajo el caso de madrid-bravos |
| Coordenadas solo de ciudad | 18 | Documentado en cada ficha |

## Estado

- `verificationStatus`: 40 partial, 6 verified
- `status`: 40 active, 4 historical, 1 inactive, 1 unknown

## Falso positivo que conviene no volver a perseguir

`sueca-ricers` tiene `foundedYear: 2007` y su primer parrafo cita 1987. **Es correcto a
proposito**: 2007 es la fundacion del club y 1987 el origen en la playa de Cullera que lo
precede. Cualquier comprobacion automatica que compare el anio de fundacion con el primer
anio del texto lo marcara, y no es un error.

## madrid-bravos: buscado y no verificable

En la primera version de esta auditoria lo describi como "una franquicia ELF en activo que
deberia tener redes". **Era falso**: tiene `status: "inactive"` y `foldedYear: 2026`, y
anuncio el 10 de marzo de 2026 que no competiria.

Aun asi se intento verificar sus cuentas, el 18-10-2026, sin exito:

- **madridbravos.com responde, pero es solo una pantalla con el logo.** El club se
  disolvio y la web quedo de placeholder, sin navegacion ni enlaces a redes
- **Hay dos cuentas de X compitiendo**, @MadridBravos y @MadridBravosELF, y ninguna fuente
  autoritativa dice cual es la oficial
- Existe un Instagram @madrid.bravos con unos 31.000 seguidores, pero tampoco hay forma de
  confirmarlo desde el club ni desde la liga
- Wikipedia confirma los datos del club (fundacion el 26-09-2023, disolucion el 10-03-2026,
  Vallehermoso, dos temporadas con eliminacion en comodines, todo coincidente con nuestra
  ficha) pero no publica los handles

**Decision: no se anaden.** Un club disuelto con dos cuentas candidatas y ninguna fuente que
las resuelva es exactamente el caso en el que la ficha debe seguir diciendo que no estan
verificadas. Queda escrito para que nadie repita la busqueda.

## Lo siguiente

1. Los 27 escudos dependen del permiso que ya se ha pedido por correo.
2. Las coordenadas de ciudad solo mejoran preguntando a cada club por su campo exacto.
3. Los cuatro equipos sin anio de fundacion no se cierran investigando, se cierran
   preguntando: estan entre los 22 a los que se escribio el 17-10-2026.
