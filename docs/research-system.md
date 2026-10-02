# Gridiron Spain Research System

Sistema de investigación editorial especializado en fútbol americano para Claude Code.

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SKILLS / COMANDOS                            │
├─────────────────┬─────────────────┬─────────────────┬───────────────┤
│ /football       │ /football-spain │ /football-daily │ /sports-editor│
│ research        │                 │                 │               │
└────────┬────────┴────────┬────────┴────────┬────────┴───────┬───────┘
         │                 │                 │                │
         ▼                 ▼                 ▼                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      RESEARCH LAYER                                  │
│  - Web search (WebSearch tool)                                       │
│  - Page fetch (WebFetch tool)                                        │
│  - Source verification                                               │
│  - Confidence scoring                                                │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                      │
│  research/                                                           │
│    daily/          → Briefings diarios                               │
│    games/          → Research por partido                            │
│    teams/          → Perfiles de equipo                              │
│    players/        → Perfiles de jugador                             │
│    stories/        → Historias detectadas                            │
│                                                                      │
│  src/data/         → Datos verificados para producción               │
│    teams/                                                            │
│    articles/                                                         │
│    sources/                                                          │
└─────────────────────────────────────────────────────────────────────┘
```

## Skills

### /football-research

Investigación general de fútbol americano (NCAA, NFL, Europa).

```
/football-research team "Navy"
/football-research game "Navy vs Air Force"
/football-research player "Blake Horvath"
/football-research conference "AAC"
/football-research ranking
/football-research recruiting "Navy"
/football-research transfer-portal
```

### /football-spain

Investigación especializada en fútbol americano español.

```
/football-spain teams                    → Lista todos los equipos conocidos
/football-spain team "Badalona Dracs"    → Perfil completo de equipo
/football-spain competition "LNFA"       → Estado de competición
/football-spain results                  → Últimos resultados
/football-spain calendar                 → Próximos partidos
/football-spain discover                 → Detectar equipos nuevos
```

### /football-daily

Briefing editorial diario.

```
/football-daily                          → Briefing completo
/football-daily ncaa                     → Solo NCAA
/football-daily spain                    → Solo España
/football-daily stories                  → Solo historias detectadas
```

### /sports-editor

Generación de contenido sobre datos ya investigados.

```
/sports-editor article "research/games/navy-vs-air-force.md"
/sports-editor tiktok "research/games/navy-vs-air-force.md"
/sports-editor preview "research/games/navy-vs-air-force.md"
/sports-editor recap "research/games/navy-vs-air-force.md"
/sports-editor thread "research/games/navy-vs-air-force.md"
```

## Sistema de Fiabilidad

Cada dato incluye nivel de confianza:

| Status | Descripción | Uso editorial |
|--------|-------------|---------------|
| `CONFIRMED` | Verificado por fuente oficial o múltiples fuentes fiables | Publicar directamente |
| `REPORTED` | Reportado por medio fiable, no confirmado oficialmente | Atribuir a la fuente |
| `RUMOR` | Rumor identificado como tal | Solo mencionar como rumor |
| `UNKNOWN` | Sin información suficiente | No publicar |

## Estructura de Datos de Research

### Team Research (`research/teams/{id}.md`)

```yaml
---
id: navy-midshipmen
name: Navy Midshipmen
conference: AAC
last_researched: 2026-10-02
confidence: CONFIRMED
---

# Navy Midshipmen

## Quick Facts
- Record: 4-0 (2-0 AAC)
- Ranking: #24 AP, #22 CFP
- Head Coach: Brian Newberry
- Stadium: Navy-Marine Corps Memorial Stadium
- Capacity: 34,000

## Sources
- [Navy Athletics](https://navysports.com) - Official
- [ESPN](https://espn.com/...) - Stats
```

### Game Research (`research/games/{game-id}.md`)

```yaml
---
id: navy-vs-air-force-2026
teams: [navy, air-force]
date: 2026-10-05
competition: NCAA
last_researched: 2026-10-02
---

# Navy vs Air Force

## MATCH
- Teams: Navy Midshipmen vs Air Force Falcons
- Date: October 5, 2026, 3:00 PM ET
- Venue: Navy-Marine Corps Memorial Stadium, Annapolis, MD
- TV: CBS
- Confidence: CONFIRMED

## CONTEXT
...

## KEY PLAYERS
...

## STORYLINES
...

## SOURCES
- [Source 1](url) - What was verified
- [Source 2](url) - What was verified
```

### Daily Briefing (`research/daily/{date}.md`)

```yaml
---
date: 2026-10-02
generated_at: 2026-10-02T08:00:00Z
---

# Daily Briefing - October 2, 2026

## TOP STORIES
1. Story headline (CONFIRMED)
   - Why it matters: ...
   - Source: ...

## NCAA
### Results
...

### Rankings Movement
...

## SPAIN
### LNFA
...

## GAMES TO WATCH
...

## CONTENT OPPORTUNITIES
...
```

## Jerarquía de Fuentes

### NCAA - Tier 1 (Fuentes Primarias)
1. Webs oficiales de universidades (navysports.com, texassports.com)
2. Webs oficiales de conferencias (theaac.com, big12sports.com)
3. NCAA.com

### NCAA - Tier 2 (Medios Establecidos)
4. ESPN
5. AP
6. CBS Sports
7. The Athletic

### NCAA - Tier 3 (Medios Especializados)
8. 247Sports
9. On3
10. Rivals

### NCAA - Tier 4 (Contexto)
- Reddit (solo para detectar temas, nunca como fuente de hechos)
- Twitter/X (solo cuentas verificadas oficiales)

### España - Tier 1
1. FEFA (fefa.es)
2. Federaciones autonómicas (FCFA, FMFA, etc.)
3. Webs oficiales de clubes

### España - Tier 2
4. Prensa local (Crónica Norte, Sport, Mundo Deportivo)
5. Prensa deportiva nacional

## Reglas Editoriales

### NUNCA
- Inventar estadísticas, fechas, resultados o declaraciones
- Convertir un rumor en hecho
- Usar Reddit/Twitter como fuente primaria de hechos
- Publicar lesiones no confirmadas públicamente
- Asumir información sin verificar

### SIEMPRE
- Citar la fuente de cada dato importante
- Marcar el nivel de confianza
- Guardar las URLs utilizadas
- Distinguir entre hecho y opinión
- Verificar contra fuente primaria cuando sea posible

## Integración con Producción

El flujo de research a producción:

```
1. /football-research genera → research/games/navy-vs-air-force.md
2. Editor revisa y aprueba los datos
3. /sports-editor genera contenido sobre datos aprobados
4. Datos verificados se promueven a src/data/ si son permanentes
5. npm run content:check valida integridad
```

## Detección de Historias

El sistema busca activamente:

- Equipos sorpresa (récord inesperado)
- Jugadores emergentes (estadísticas destacadas)
- Upsets (favorito derrotado)
- Rivalidades históricas
- Récords batidos
- Cambios de entrenador
- Movimientos de ranking significativos
- Equipos españoles en competición europea
- Jugadores españoles con conexión NCAA
- Cambios tácticos notables
- Estadísticas anómalas

Cada historia detectada incluye:

```
STORY: [Título]
WHY THIS MATTERS: [Explicación]
EDITORIAL PRIORITY: [1-5]
SUGGESTED ANGLES: [Ideas de contenido]
```
