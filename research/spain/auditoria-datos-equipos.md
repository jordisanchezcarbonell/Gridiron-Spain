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
| Sin `socialLinks` | 5 | madrid-bravos, barcelona-dragons, barcelona-dragons-elf, madrid-panteras, barcelona-boxers. Tres son clubes historicos y no tendran. **madrid-bravos es una franquicia ELF en activo: ese si deberia tener** |
| Coordenadas solo de ciudad | 18 | Documentado en cada ficha |

## Estado

- `verificationStatus`: 40 partial, 6 verified
- `status`: 40 active, 4 historical, 1 inactive, 1 unknown

## Falso positivo que conviene no volver a perseguir

`sueca-ricers` tiene `foundedYear: 2007` y su primer parrafo cita 1987. **Es correcto a
proposito**: 2007 es la fundacion del club y 1987 el origen en la playa de Cullera que lo
precede. Cualquier comprobacion automatica que compare el anio de fundacion con el primer
anio del texto lo marcara, y no es un error.

## Lo siguiente

1. madrid-bravos sin redes, siendo una franquicia ELF en activo. Revisar.
2. Los 27 escudos dependen del permiso que ya se ha pedido por correo.
3. Las coordenadas de ciudad solo mejoran preguntando a cada club por su campo exacto.
