# FEFA palmarés: Copa de España, LNFA 2, LNFA Femenina, Spanish Flag Bowl

Accessed 2026-10-04. Data: `palmares-fefa-2026-10-04.json`.
Primary sources: `fefa-palmares` (https://www.fefa.es/palmares-futbol-americano/) and `fefa-palmares-flag` (https://www.fefa.es/palmares/). Corroborated with fefa.es/lnfa-2-historial/ and Wikipedia es (Copa de España, LNFA 2).

| Competition | Entries | Range | Gaps |
|---|---|---|---|
| Copa de España | 29 | 1995-2025 | 2014, 2015 (Wikipedia: one edition "convocatoria desierta", not held) |
| LNFA 2 | 19 | 2004-2026 | 2011, 2018, 2019, 2020 (also absent on Wikipedia; not filled) |
| LNFA Femenina | 16 | 2011-2026 | none |
| Spanish Flag Bowl Open | 19 | 2001-2026 (editions I-XIX) | none (year gaps are years without an edition) |
| Spanish Flag Bowl Femenina | 14 | 2012-2026 (editions I-XIV) | none |

Every champion/runner-up row comes from FEFA. No rows were filled from other sources.

## Issues in the sources
- **Copa 1995 is listed twice on FEFA.** The second edition (Panteras 24-17 Pioners) was played in Granada in November 1996, according to Wikipedia es, which cites ABC of 24-11-1996. The JSON stores it as 1996 with `yearAsListedBySource: 1995`.
- **Year labels for the Copa.** FEFA uses the calendar year of the final. Wikipedia es uses the year the season ends, which is one year later (FEFA 2025 = Wikipedia "XXX (2026)"). Once you allow for that offset, both sources name the same champion and runner-up every year.
- **Copa 2016:** Badalona Dracs is the champion, but no runner-up or score is listed. Wikipedia also shows no opponent.
- **LNFA 2 2005:** FEFA writes "Barcelona Uroloki (3)", but only two Uroloki titles are listed. The third title is not identified.

## Conflicts with our team honours (src/data/teams)
1. **las-rozas-black-demons**: we have an LNFA 2 honour for **2007**. FEFA gives 2007 to **Reus Imperials** and lists Black Demons as champions in 2006, **2012** and 2017. The fix is to replace 2007 with 2012, both in `honours` and in the history text in madrid.ts ("2006, 2007 y 2017").
2. **reus-imperials**: the LNFA 2 honours are missing **2007**. We list 2008, 2009, 2010 and 2015, but FEFA credits five titles (2007-2010 and 2015), and our summary already says "five-time".
3. **madrid-panteras**: the Copa honours are dated 1996, 1997 and 1998. That follows the Wikipedia labels, but every other club's Copa honours follow FEFA's labels. Under FEFA's convention the years would be 1995, 1996 (FEFA prints "1995") and 1997. The honours are marked `partial`.

## Honours we could add (missing, not contradicted)
- gijon-mariners: Spanish Flag Bowl Open 2011. If "Gijón Mariners Girls" is confirmed as the same club, also Flag Bowl Femenina 2013 and 2014.
- valencia-firebats: Spanish Flag Bowl Femenina 2019, 2022 and 2024.
- Runner-up finishes, which are mostly not recorded.

## Champions with no team profile (teamId null)
IES Pere Vives, Astur Milicia, Gijón Foxes 82, San Juan Dolphins, Ibi Butterflies. Zaragoza Lions (runner-up in LNFA 2 2004) is also null on purpose, because Zaragoza Hurricanes is a separate successor club.
