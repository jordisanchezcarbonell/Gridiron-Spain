# football-daily

Briefing editorial diario de fútbol americano para Gridiron Spain.

## Uso

```
/football-daily                 → Briefing completo
/football-daily ncaa            → Solo NCAA
/football-daily spain           → Solo España
/football-daily stories         → Historias detectadas
/football-daily content         → Oportunidades de contenido
```

## Instrucciones

Generas un briefing editorial diario con las noticias, resultados y oportunidades de contenido más relevantes para Gridiron Spain.

### Horario óptimo

El briefing es más útil ejecutado:
- **Por la mañana (España)**: Para recoger resultados de la noche anterior (NCAA/NFL)
- **Entre semana**: Enfocado en noticias, recruiting, análisis
- **Fin de semana**: Enfocado en previews y gameday

### Estructura del briefing

```markdown
---
date: 2026-10-02
generated_at: 2026-10-02T08:00:00Z
type: daily-briefing
---

# Daily Briefing — October 2, 2026

## 🔥 TOP STORIES

### 1. [Headline] (CONFIRMED)
**Why it matters:** [Explicación de relevancia editorial]
**Source:** [URL]
**Content potential:** TikTok, artículo, thread

### 2. [Headline] (REPORTED)
...

---

## 🏈 NCAA

### Last Night's Results
| Game | Score | Highlight |
|------|-------|-----------|
| #5 Texas vs Oklahoma | 35-28 | Red River Rivalry upset |

### Rankings Movement
- **Up:** Team (+3 to #12)
- **Down:** Team (-5 to #20)
- **In:** Team (new at #25)
- **Out:** Team (was #24)

### Recruiting & Transfer Portal
- [Name] (4⭐ WR) commits to [Team] (CONFIRMED)
- [Name] enters portal from [Team] (REPORTED)

### Injuries/News
- [Player], [Team]: [Status] (CONFIRMED via official)

---

## 🇪🇸 SPAIN

### LNFA Results
| Game | Score | Notes |
|------|-------|-------|
| Dracs vs Firebats | 28-14 | Dracs clinch playoff |

### Upcoming This Week
- Sat 15:00: Badalona Dracs vs L'Hospitalet Pioners
- Sun 12:00: Barcelona Búfals vs Terrassa Reds

### News
- [Headline] (Source)

---

## 👀 GAMES TO WATCH

### Saturday
1. **#3 Ohio State vs #7 Penn State** (12:00 ET, FOX)
   - Why: Big Ten title implications
   - Storylines: [list]
   - Priority: 5/5

2. **Navy vs Air Force** (3:00 PM ET, CBS)
   - Why: Commander-in-Chief's Trophy
   - Storylines: Triple option showdown
   - Priority: 4/5 (Road to Annapolis relevance)

### Spain
1. **Badalona Dracs vs L'Hospitalet Pioners**
   - Why: Catalan derby, playoff implications
   - Priority: 4/5

---

## ⭐ PLAYERS TO WATCH

1. **Blake Horvath** (Navy, QB)
   - Last week: 280 total yards, 3 TD
   - Why: Heisman dark horse, unique skill set
   - Source: [URL]

2. **[Player]** ([Team], [Position])
   ...

---

## 💡 CONTENT OPPORTUNITIES

### Breaking/Urgent
- [Idea for immediate content]

### Today
- [Idea that should go out today]

### This Week
- [Ideas for planned content]

### TikTok/Reels Ideas
1. **Hook:** "[Engaging question]"
   **Format:** Quick cuts, stats overlay
   **Duration:** 45-60s

2. **Hook:** "[Another idea]"
   ...

### Article Ideas
1. **Title:** "[Headline]"
   **Angle:** [Brief description]
   **Research needed:** [Yes/No, what]

### Thread Ideas
1. **Topic:** [Subject]
   **Tweets:** 5-8
   **Hook:** [Opening]

---

## 🌲 EVERGREEN IDEAS

Ideas que se pueden desarrollar sin urgencia:

1. **Historia de [Team/Player]**
   - Research needed
   - Potential formats: article, video

2. **Explainer: [Concept]**
   - Audience: casual fans
   - Format: carousel, article

---

## 📊 DETECTED STORIES

Historias detectadas automáticamente por patrones:

### Surprise Team
**[Team Name]** — Started 5-0, was picked to finish last in conference
- Why it matters: Underdog narrative
- Priority: 4/5
- Suggested angles: Coach profile, key players, schedule analysis

### Statistical Anomaly
**[Player]** leads nation in [stat] despite [context]
- Why it matters: Unique story
- Priority: 3/5

---

## SOURCES USED

1. [Source 1](URL) - What was checked
2. [Source 2](URL) - What was checked
...
```

### Proceso de investigación

1. **NCAA - Resultados de anoche**
   - Buscar scores de partidos jugados ayer
   - Identificar upsets (ranked teams losing)
   - Movimientos de ranking significativos

2. **NCAA - Noticias**
   - Buscar noticias de las últimas 24h
   - Recruiting commits
   - Transfer portal entries
   - Injury updates (solo confirmadas)
   - Coaching changes

3. **España**
   - Verificar FEFA para resultados
   - Próximos partidos de la semana
   - Noticias de equipos

4. **Detección de historias**
   - Equipos con récord sorpresa
   - Jugadores con estadísticas destacadas
   - Rivalidades próximas
   - Records en juego
   - Conexiones España-NCAA

5. **Oportunidades de contenido**
   - ¿Qué es noticia HOY?
   - ¿Qué se puede planificar esta semana?
   - ¿Qué ideas evergreen tenemos?

### Criterios de prioridad editorial (1-5)

- **5**: Breaking news, partido del año, contenido obligatorio
- **4**: Historia importante, partido destacado, contenido recomendado
- **3**: Interesante para audiencia core
- **2**: Nicho pero valioso
- **1**: Archivo/evergreen, sin urgencia

### Búsquedas recomendadas

```
college football scores [date]
college football news today
AP Top 25 college football
site:espn.com college football
site:fefa.es resultados LNFA
"LNFA" resultados [date]
college football recruiting commits today
transfer portal college football [date]
```

### Guardar output

El briefing se guarda en:
```
research/daily/YYYY-MM-DD.md
```

### Conexiones Road to Annapolis

Dar prioridad especial a:
- Noticias de **Navy Football**
- Partidos de Navy
- **Army-Navy** game buildup (en temporada)
- AAC conference news
- Annapolis/USNA news

### NO incluir

- Rumores no verificados como hechos
- Lesiones no confirmadas oficialmente
- Opiniones personales como noticias
- Contenido de días anteriores como nuevo
- Estadísticas inventadas
