---
id: censo-espanoles-fuera-2026-11
type: research-players
last_researched: 2026-11-16
status: borrador de investigación, pendiente de revisión del editor. No es dato de producción.
---

# Censo: jugadores españoles fuera de España, temporada 2026

Pieza ancla propuesta: el censo de los españoles que juegan fuera de España, para que la compartan los propios jugadores y sus clubes. Amplía y actualiza `research/players/spanish-players-2026-10-02.md`.

## Resumen para el editor

- **NCAA: 4 CONFIRMED.**
  - Jorge Díaz Nicolás (K, Marshall, FBS, de Madrid): récord de Marshall con 5 field goals en un partido.
  - Nico Cavanillas Alti (K, Coastal Carolina, FBS, de Madrid).
  - Alejandro De La Poza Cohrs (K, Tarleton State, FCS, de Palma).
  - Vito Moriana-Sigel (OL, Western Carolina, FCS, de Estepona).
- **NFL, CFL y UFL: ningún español.**
  - Diego Paz sigue sin contrato con los Patriots (comprobado el 16-11).
  - JJ Arcega-Whiteside está en la lista de retirados de la CFL desde 2024 (REPORTED).
- **NFL Academy:** Tom Gabarró (de Barcelona) es el único español en la plantilla de 2026-27. No se sabe a qué universidad fue Adrián Bermúdez (UNKNOWN).
- **Europa: 26 jugadores (23 CONFIRMED y 3 REPORTED).** Son los 8 que ya teníamos y 18 nombres nuevos. Destacan:
  - Pablo de Diego (Berlin Thunder): líder de placajes de la AFLE, con 81.
  - Diego Paz (Rhein Fire): líder de sacks tras la jornada 12, con 7,5, y premio al jugador defensivo revelación.
  - Alejandro Fernández, David Culebras y Pablo Araya: campeones de la Gold Bowl con los Vienna Vikings.
- **Correcciones a `src/data/players/europe.ts`:**
  - Aaron David pasó a los Alpine Rams en la semana 10.
  - Berlin Thunder dio de baja a Carlos España en la semana 7.
  - Nacho Diz aparece como inactivo en Firenze.
- **Pendiente antes de publicar:**
  - Segunda fuente para la nacionalidad de Seelig y de Kabankaya.
  - Aclarar el nombre de pila de Obolela.
  - Confirmar que el «Mikel Gomez» de Berlin es Mikel Gómez Barroso.
  - Revisar la universidad junior (JUCO, no se pudo consultar).
  - Revisar las ligas de Austria, Italia, Francia, los países nórdicos y Reino Unido, donde la búsqueda fue superficial.
  - Los 269 equipos universitarios sin plantilla en ESPN, sobre todo de D3 y NAIA.

Comprobaciones hechas por el editor jefe el 16-11-2026:
- Herdzone confirma el récord de 5 field goals de Díaz Nicolás.
- La lista de líderes de la AFLE tras la jornada 12 confirma a Paz con 7,5 sacks y a De Diego con 81 placajes.

---

# Census of Spaniards in North American football, 2026 season

Research date: 2026-11-16. Built for Primer Down. Every row comes from a page that was actually loaded on that date, unless the row says otherwise.

**Method.**
- **ESPN roster scan.** I scanned every roster in ESPN's public API for birthplace = Spain, then for a list of Spanish city names.
  - College football: 763 teams. 494 of them have roster data, about 42,000 players. 269 are empty, mostly D3 and NAIA.
  - NFL: 32 teams, 2,554 players.
  - UFL and CFL: ESPN has no roster data for either.
- **Official confirmation.** I confirmed each hit on the official school roster (Sidearm sites).
- **Web and press searches.** I ran searches in English and Spanish, and checked the official NFL, NFL Academy, CFL and Patriots pages.

---

## NCAA / college football (2026 season)

| Name | Position | Team/School | Level | Spain link (as the source states it) | 2026 status | Confidence | Source URL(s) |
|---|---|---|---|---|---|---|---|
| Jorge Díaz Nicolás | K | Marshall Thundering Herd (#41) | FBS (Sun Belt) | Hometown "Madrid, Spain" (roster). ESPN birthplace "Madrid, Spain". Transferred from Virginia (2025-26 roster). | Active. R-Fr. Named a Lou Groza "Star of the Week" (3 Nov 2026) after a school-record 5 FGs vs Old Dominion. 14/18 FG per the school (as of 3 Nov). | CONFIRMED | https://herdzone.com/sports/football/roster · https://herdzone.com/news/2026/11/3/football-marshall-kicker-jorge-diaz-nicolas-named-to-lou-groza-award-stars-of-the-week · ESPN API roster, team 276 |
| Nico Cavanillas Alti | K | Coastal Carolina Chanticleers (#30) | FBS (Sun Belt) | Hometown "Madrid, Spain". Last school "Redmond" (a high school, per the site's own field). Previous schools: SC State (2025), Keiser (NAIA, 2024). | On the official 2026 roster as a Sr. Per Ourlads he kicked in all 10 games through 14 Nov: FG 10/13, XP 30/30. Ourlads is a secondary source. | CONFIRMED (roster) / REPORTED (stats) | https://goccusports.com/sports/football/roster · https://goccusports.com/sports/football/roster/nico-cavanillas-alti/22391 · https://www.ourlads.com/ncaa-football-depth-charts/player-game-stats/nico-cavanillas-alti/2026/183391 |
| Alejandro De La Poza (Cohrs) | K | Tarleton State Texans (#81) | FCS (UAC) | Hometown "Palma, Spain" (roster). ESPN birthplace "Palma De Mallorca, Spain". Came to Kansas as an exchange student, per the KSN headline. Path: Sunrise Christian Academy, then Hutchinson CC (JUCO). | Active. So. UAC Special Teams Player of the Week (14 Sep 2026) for the game-winning FG at McNeese. | CONFIRMED | https://tarletonsports.com/sports/football/roster · https://tarletonsports.com/news/2026/9/14/football-hines-earns-back-to-back-uac-offensive-player-of-the-week-honors-de-la-poza-named-special-teams-pow.aspx |
| Vito Moriana-Sigel | OL | Western Carolina Catamounts (#79) | FCS (SoCon) | Hometown "Estepona, Spain" (roster and ESPN). Path: Kiski School, Trinity Valley CC, Mississippi Valley State. | Active. 5th year. Named in WCU's 2026 OL preview: 20 GP, 16 GS at MVSU and WCU. | CONFIRMED | https://catamountsports.com/sports/football/roster · https://catamountsports.com/news/2026/8/18/catamount-football-26-position-preview-offensive-line.aspx |

No Spaniard was found in D2, D3, NAIA or JUCO for 2026. The coverage gaps are listed below.

## NFL (active roster, practice squad, IPP)

| Name | Position | Team | Level | Spain link | 2026 status | Confidence | Source URL(s) |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | No Spaniard on any of the 32 rosters in ESPN's data. | CONFIRMED (absence, ESPN data) | ESPN API, NFL rosters |
| Diego Paz González | DE | Free agent (Rhein Fire, AFLE) | Tryout only | "Spanish-born" (Yahoo) and "native Spaniard" (football-austria) | Worked out with the Patriots on 12 Oct 2026. No contract was reported. He is not on patriots.com's roster or practice squad (checked 16 Nov), and no team's roster in ESPN's data lists him. | CONFIRMED (no contract as of 16 Nov) | https://www.patriots.com/team/players-roster/ · https://sports.yahoo.com/articles/patriots-reportedly-worked-standout-international-213154982.html · https://football-austria.com/von-rhein-fire-zu-den-patriots-diego-paz-gonzalez-absolviert-nfl-probetraining/ |

**IPP.** The IPP Class of 2026 has 13 athletes. None is from Spain and Diego Paz is not in it ( https://www.nfl.com/news/nfl-announces-international-player-pathway-program-class-of-2026 ). I found no announcement of an IPP 2027 class.

football-austria says Paz "took part in" the IPP, according to the AFLE. That probably means a regional IPP combine, not the official class, but this is UNKNOWN.

## CFL

| Name | Position | Team | Spain link | 2026 status | Confidence | Source URL(s) |
|---|---|---|---|---|---|---|
| JJ Arcega-Whiteside | WR | (Toronto Argonauts, 2024) | Born in Utebo, Zaragoza (Wikipedia) | Signed with Toronto on 8 Jan 2024. Placed on the reserve/retired list on 24 Apr 2024. Not on Wikipedia's 2026 Argonauts roster. **Not active in 2026.** | REPORTED (Wikipedia; argonauts.ca/cfl.ca load their rosters with JS and could not be read) | https://en.wikipedia.org/wiki/J._J._Arcega-Whiteside · https://en.wikipedia.org/wiki/2026_Toronto_Argonauts_season |

The **2026 CFL Global Draft** had 18 picks and none was Spanish ( https://en.wikipedia.org/wiki/2026_CFL_global_draft ).

## UFL

No Spaniard found. ESPN has no UFL roster data, and the searches found nothing. UNKNOWN beyond that; the official ufl.com rosters were not checked.

## NFL Academy (Loughborough) and prep schools

| Name | Position | Program | Spain link | Status | Confidence | Source URL(s) |
|---|---|---|---|---|---|---|
| Tom Gabarró | DB/WR | NFL Academy, 2026-27 roster | Barcelona. Former clubs: Pagesos and Badalona Dracs. Infobae calls him "the only Spaniard" | Second year at the Academy. 19 years old. No college offer or commitment named (Infobae, 26 Oct 2026). | CONFIRMED | https://www.africannewspage.net/2026/08/the-national-football-league-nfl-united-kingdom-uk-based-academy-program-announces-games-and-roster-for-2026-27-season/ (full reprint of the release: "Spain (1): Tom Gabarro (DB/WR)") · https://www.nflacademy.com/the-nfls-uk-based-academy-program-announces-games-and-roster-for-2026-27-season/ (19 Aug 2026; 70 players, 21 countries) · https://www.infobae.com/america/agencias/2026/10/26/tom-gabarro-la-nfl-es-un-objetivo-pero-tengo-muy-claro-que-hay-unos-pasos-que-toman-su-tiempo/ |
| Adrián Bermúdez | WR | NFL Academy, 2025-26 | Madrid. Former club: Black Demons | **Not on the 2026-27 roster.** Not among the 12 graduates who signed with US colleges (8 Dec 2025 release). No college found in ESPN's data or in searches. **Destination UNKNOWN.** | UNKNOWN (destination) | https://www.nflacademy.com/players/adrian-bermudez/ · https://www.nflacademy.com/12-nfl-academy-graduates-sign-with-u-s-colleges-for-2026/ |

**IMG Academy and other prep schools.** No Spaniard found. I did not read a full IMG roster.

**2027 commitments by Spaniards.** None found.

---

## Checked, nothing found
- **NFL:** all 32 rosters in ESPN's data, by birthplace and by name (Paz, Arcega). Patriots roster and practice squad on patriots.com.
- **IPP:** Class of 2026 (nfl.com). No 2027 class announced.
- **CFL:** 2026 Global Draft. 2026 Argonauts season page.
- **College, ESPN data:** 494 teams with roster data (FBS, FCS, most D2, part of D3/NAIA), by birthplace "Spain" and by Spanish city names.
- **NFL Academy:** 2026-27 roster has 1 Spaniard (Gabarró). The college signings release of Dec 2025 includes no Spaniard.
- **Searches:** Spanish press (fútbol americano + universidad/NCAA/JUCO/beca), americanfootballinternational, 247/On3 for 2027 recruits, IMG Academy.
- **Previously reported, now out of scope for 2026:**
  - **Carlos Martín Nieto** (QB, WNE, D3). ESPN still lists him as "Freshman, Valencia, Spain", which is stale data. He is **not** on the official 2026 roster ( https://wnegoldenbears.com/sports/football/roster ).
  - **Pablo Araya** (DB, Barcelona). ESPN still lists him at Colorado Mesa, which is stale. He played there in 2022-23 (cmumavericks.com bio) and is not on CMU's 2024, 2025 or 2026 rosters. He is now a pro in Europe (Madrid Bravos/AFLE), so out of scope.
  - **Adrià Botella** (Sioux Falls, past): not checked again; out of scope.
  - **Fernando Carmona Jr.**: excluded, no Spain link.

## Leads not verified
- **Coverage gaps.**
  - 269 ESPN college teams have no roster data, mostly D3 and NAIA (examples from that list: Keiser, Bates, Linfield, Wartburg).
  - None of the NJCAA/JUCO teams could be checked. njcaa.org blocked automated access.
  - ufl.com, cfl.ca and argonauts.ca rosters render with JS and were not read.
- **Infobae (26 Oct 2026)** says "a couple of Spanish kickers already play in college", without names. This is consistent with Díaz Nicolás, Cavanillas and De La Poza; there may be others.
- **Marc Gonzalez:** Spanish exchange student, kicker at Lawton High School (Oklahoma). Per KSWO, 2 Nov 2026, he arrived from Spain "last month". His city in Spain is not given. This is a US high school, not a prep academy. https://www.kswo.com/2026/11/02/lawton-high-kicker-trades-ftbol-football/
- **Javier Alba Méndez:** Spanish exchange student, kicker at Madison HS (Kansas). Seen only in a search snippet (Emporia Gazette, probably the 2025 season); the page returned a 429 error.
- **Alejandro De La Poza's** detailed backstory (KSN article) was seen only in a search snippet; the page returned a 403 error.


---

# Census: Spanish players in European leagues outside Spain, 2026 season

Research date: 2026-11-16. Research only; nothing here has been promoted to `src/data/`.

Status labels: **CONFIRMED** = official league or club source loaded. **REPORTED** = one source or a data feed, with nothing to back it up. **UNKNOWN** = not verified.
"AFLE DB" = the player JSON embedded in https://aflepro.com/players and https://aflepro.com/teams/{slug}, fetched 2026-11-16. Its fields include `nationality_primary`, `player_status`, `cap_category` and `is_captain`. It shows the current state of the rosters, not each player's whole season.
"Sportschau roster" = EFA match roster pages at sportschau.de (`/live-und-ergebnisse/football/efa/ma.../spiel-kader`). They show a nationality flag (data from hs-data).

## League context (2026)

- The ELF did not play in 2026. In January a group of franchises broke away and formed two leagues. The **AFLE** had 8 franchises, and the Vienna Vikings won the Gold Bowl. The **EFA** had 6 teams, and Nordic Storm won the final. The Madrid Bravos ceased operations. Source: AP via La Nación, 3 Nov 2026: https://www.lanacion.com.ar/usa/as-the-nfl-returns-to-spain-split-in-european-football-leaves-madrids-team-on-the-sideline-nid03112026/ (**CONFIRMED**)
- **No Spanish franchise played in the AFLE or the EFA in 2026.** The AFLE teams were Vienna Vikings, Rhein Fire, Panthers Wrocław, Berlin Thunder, Paris Lights, Firenze Red Lions, Alpine Rams and London Warriors. The EFA teams were Frankfurt Galaxy, Munich Ravens, Nordic Storm, Raiders Tirol, Paris Musketeers and Prague Lions (Sportschau EFA fixture list). I found no 2026 source on the **Barcelona Dragons**. The AP article does not mention them. Their status is **UNKNOWN**: they did not compete in either league, but I found no withdrawal announcement.
- **AFLE "Spanish Solidarity Rule"** (13 Mar 2026), for the 2026 season only. Spain counts as homegrown territory for every franchise. Each team could sign up to 3 extra Spanish players, and only players from the Bravos' active 2026 roster were eligible. https://aflepro.com/news/afle-declares-spain-a-homegrown-territory-for-all-the-league-europe-franchises
- AFLE Gold Bowl (6 Sep 2026, Duisburg): Vienna Vikings 68, Panthers Wrocław 5. https://aflepro.com/news/vienna-vikings-dominate-panthers-wroclaw-to-win-first-afle-gold-bowl
- GFL Bowl 2026: Dresden Monarchs 27, Potsdam Royals 19 (report dated 4 Oct 2026). https://www.sachsen-fernsehen.de/amp/monarchs-kroenen-sich-zum-deutschen-meister-2302716/
- The europeanleague.football site (ELF) no longer resolves (DNS failure on 2026-11-16). ELF links in our sources may be broken.

## Main table

| # | Name | Position | Team | League | 2026 note (stats/awards only if sourced) | Confidence | Status in our DB | Source URL(s) |
|---|---|---|---|---|---|---|---|---|
| 1 | Adrià Botella Moreno | TE (#87) | Frankfurt Galaxy | EFA | AFI calls him a "Spanish international" (17 Apr 2026). Sportschau rosters list him with a Spanish flag all season, including the semifinal against Munich Ravens. The final was Munich Ravens vs Nordic Storm, so Frankfurt went out in the semifinal. I found no individual stats. | CONFIRMED | EXISTING, OK | https://www.americanfootballinternational.com/frankfurt-galaxy-signs-adria-botella-moreno-boosting-offense-for-2026-efa-season/ ; https://www.sportschau.de/live-und-ergebnisse/football/efa/ma12004820/frankfurt-galaxy_paris-musketeers/spiel-kader |
| 2 | Eduardo Pérez (Pérez Pérez) | WR (can also play RB), #17 | Panthers Wrocław | AFLE | First Spanish homegrown signing for Wrocław (31 Mar 2026). Active in the AFLE DB. His team reached the Gold Bowl and lost it 68-5. | CONFIRMED | EXISTING, OK | https://www.aflepro.com/news/spanish-wide-receiver-eduardo-perez-signs-with-the-wroclaw-panthers ; https://aflepro.com/teams/panthers-wroclaw |
| 3 | Aaron David (David Pérez) | WR, #89 | Firenze Red Lions until week 10, then **Alpine Rams** | AFLE | First Spanish player signed under the Solidarity Rule (16 Mar 2026). Roster report for week 10: "Parted Ways: WR Aaron David" (Firenze) and "Signed: WR Aaron David" (Alpine Rams). The AFLE DB now lists him active at alpine-rams. Earlier career per the AFLE article: Zaragoza Hurricanes, Lohja Crusaders, Barcelona Dragons, Dresden Monarchs. | CONFIRMED | EXISTING, **UPDATE TEAM** | https://aflepro.com/news/firenze-red-lions-sign-spanish-wide-receiver-aaron-david ; https://aflepro.com/news/roster-report-what-changed-around-the-league-in-week-10 ; https://aflepro.com/teams/alpine-rams |
| 4 | Andy Vera (Vera Puentenueva) | CB/DB, #27 | Berlin Thunder | AFLE | Berlin's first Spanish homegrown signing (1 Apr 2026). The AFLE DB marks him `is_captain: true`. No stats found. | CONFIRMED | EXISTING, OK (captain is new info) | https://aflepro.com/news/spanish-defensive-back-andy-vera-joins-the-berlin-thunder ; https://aflepro.com/teams/berlin-thunder |
| 5 | Carlos España (España Rosa) | OL (OT), #70 | Berlin Thunder until week 7 | AFLE | Signed 7 May 2026, aged 21. Roster report for week 7: "Parted Ways: OL Carlos España" (Berlin Thunder). The AFLE DB lists him with no team. | CONFIRMED (signing and release) | EXISTING, **OUTDATED: released in week 7** | https://aflepro.com/news/berlin-thunder-sign-spanish-homegrown-offensive-lineman-carlos-espana ; https://aflepro.com/news/roster-report-what-changed-around-the-league-in-week-7 |
| 6 | Nacho Diz (Ignacio Diz Bravo) | LB (has also played TE/FB) | Firenze Red Lions | AFLE | Firenze's second Spanish homegrown signing (3 Apr 2026). The Firenze roster data lists `player_status: inactive` with no jersey number. I found no reason (injury or otherwise). | CONFIRMED (signing); season status UNKNOWN | EXISTING, **FLAG: inactive** | https://www.aflepro.com/news/firenze-red-lions-sign-spanish-homegrown-nacho-diz ; https://aflepro.com/teams/firenze-red-lions |
| 7 | Diego Paz González | DE/DL, #92 | Rhein Fire | AFLE | Signed as an **E-import** (13 Mar 2026), not under the Solidarity Rule. Won **AFLE Most Improved Defensive Player of the Year** at AFLE Honors 2026 (6 Sep 2026). Season line per AFLE (26 Sep 2026): "40 tackles, 8.5 sacks, five tackles for loss, four pass deflections" plus one pick-six. He led the league in sacks in the week-12 leaders list (7.5). He trained with the **New England Patriots** after the season (AFLE, 13 Oct 2026); the article gives no dates and names no program. AFLE calls him a "23-year-old Spaniard". | CONFIRMED | EXISTING, OK; **add stats and Patriots item** | https://aflepro.com/news/rhein-fire-strengthen-defensive-front-with-e-import-diego-paz ; https://www.aflepro.com/news/afle-honors-presented-by-citizen-2026-crowns-the-best-of-the-inaugural-season ; https://aflepro.com/news/diego-paz-finally-got-his-breakout-year-and-the-afle-took-notice ; https://aflepro.com/news/diego-paz-trains-with-the-new-england-patriots-after-a-breakout-afle-season ; https://aflepro.com/news/stats-leaders-after-week-12 |
| 8 | Yago Sánchez (Sánchez Moreno) | CB/DB, #33 | Firenze Red Lions | AFLE | Firenze's third and last Solidarity Rule signing (9 May 2026). Active in the AFLE DB. | CONFIRMED | EXISTING, OK | https://aflepro.com/news/firenze-red-lions-sign-spanish-defensive-back-yago-sanchez ; https://aflepro.com/teams/firenze-red-lions |
| 9 | Pablo de Diego (de Diego Maffrand) | DB (FS), #22 | Berlin Thunder | AFLE | Solidarity Rule signing (30 Apr 2026). **League tackle leader**: 81 tackles in the leaders list after week 12, the latest one published. | CONFIRMED | **NEW** | https://aflepro.com/news/berlin-thunder-strengthen-defensive-backfield-with-spanish-homegrown-pablo-de-diego ; https://aflepro.com/news/stats-leaders-after-week-12 |
| 10 | Alejandro "Iceman" Fernández (Fernández Nieto) | DE/pass rusher, #15 | Vienna Vikings | AFLE | Vienna's third Solidarity Rule signing (30 Apr 2026). **7 sacks**, second in the league, in the leaders list after week 12. His team won the **AFLE Gold Bowl 2026**. I found no source on whether he played in the final itself. | CONFIRMED | **NEW** | https://www.aflepro.com/news/vienna-vikings-strengthen-pass-rush-with-alejandro-iceman-fernandez ; https://aflepro.com/news/stats-leaders-after-week-12 ; https://aflepro.com/news/vienna-vikings-dominate-panthers-wroclaw-to-win-first-afle-gold-bowl |
| 11 | Pablo Araya (Araya Matilla) | S/DB, #31 | Vienna Vikings | AFLE | Solidarity Rule signing (24 Apr 2026). Played college football in the US at Golden West College and Colorado Mesa. Gold Bowl champion team. Mentioned in the AFLE "Homegrowns of week 2" piece. | CONFIRMED | **NEW** | https://aflepro.com/news/former-bravos-defensive-back-pablo-araya-signs-with-the-vienna-vikings ; https://aflepro.com/teams/vienna-vikings |
| 12 | David Culebras (Culebras Sanfrutos) | OL (OG), #56 | Vienna Vikings | AFLE | Solidarity Rule signing (28 Apr 2026). Gold Bowl champion team. | CONFIRMED | **NEW** | https://aflepro.com/news/vienna-vikings-strengthen-offensive-line-with-spanish-homegrown-david-culebras ; https://aflepro.com/teams/vienna-vikings |
| 13 | Jorge Hernández (Hernández Jiménez) | LB, #45 | Panthers Wrocław | AFLE | Wrocław's second Spanish homegrown signing (9 Apr 2026). Active. Gold Bowl finalist. | CONFIRMED | **NEW** | https://www.aflepro.com/news/wroclaw-panthers-sign-spanish-homegrown-jorge-hernandez |
| 14 | Juan Flores-Calderón | WR, #81 | Panthers Wrocław | AFLE | Signed 30 Apr 2026, aged 22. Previously played for Milano Seamen (Offensive Rookie of the Year in his first season, per AFLE) and the Bravos. Active. Gold Bowl finalist. | CONFIRMED | **NEW** | https://aflepro.com/news/european-standout-receiver-juan-flores-calderon-signs-with-the-wroclaw-panthers |
| 15 | Diego Lliteras (Lliteras Ferraz) | QB (backup), #13 | Panthers Wrocław | AFLE | Signed 15 May 2026, from Mallorca. Won the LNFA Serie A title with Las Rozas Black Demons in early May 2026. The AFLE DB lists his nationality as Spanish, secondary Brazilian, with `afle_exp: 0`. That may mean he never appeared in a game; this is unverified. | CONFIRMED (signing) | **NEW** | https://en.pantherswroclaw.com/posts/diego-lliteras-strengthens-the-quarterback-room-of-panthers-wroclaw/544 ; https://www.gridiron-magazine.com/world-football/panthers-add-depth-to-qb-room (search result only, not opened) |
| 16 | Elvys Núñez (Núñez Vargas) | C/OL, #64 | Paris Lights | AFLE | Solidarity Rule signing (22 Apr 2026). Five ELF seasons with Barcelona and Madrid. Active. | CONFIRMED | **NEW** | https://aflepro.com/news/spanish-homegrown-elvys-nunez-strengthens-paris-lights-offensive-line |
| 17 | Celestin Ngimbi | OL | Paris Lights (signing) | AFLE | First Solidarity Rule signing for Paris (19 Mar 2026). Played for Barcelona Dragons 2021-22, Paris Musketeers 2023 and the Bravos. **He does not appear in the current AFLE player DB.** I found no release notice in the roster reports for weeks 4-11. He may have left before week 4. | CONFIRMED (signing); 2026 participation UNKNOWN | **NEW** | https://aflepro.com/news/spanish-offensive-lineman-celestin-ngimbi-joins-the-paris-lights |
| 18 | José Soares | DT/DL | Alpine Rams (signing) | AFLE | Solidarity Rule signing (19 Mar 2026), aged 23. Played 2025 with the Potsdam Royals (GFL). **Not in the current AFLE player DB.** 2026 participation unknown. | CONFIRMED (signing); participation UNKNOWN | **NEW** | https://aflepro.com/news/alpine-rams-strengthen-defensive-line-with-spanish-homegrown-jose-soares |
| 19 | Gabriel Rodríguez | OL (OT) | Alpine Rams | AFLE | Solidarity Rule signing (18 Mar 2026). The AFLE DB lists him as Spanish with no team and no jersey number. Participation unknown. | CONFIRMED (signing); participation UNKNOWN | **NEW** | https://aflepro.com/news/alpine-rams-sign-spanish-offensive-lineman-gabriel-rodriguez |
| 20 | Jackson Obolela Vargas (AFLE DB: "Oliver Noah Obolela Vargas") | LB | Alpine Rams until week 7 | AFLE | Signed 17 Mar 2026. Previously played for Prague Lions and Paris Musketeers. Roster report for week 7: "Parted Ways: LB Jackson Obolela Vargas". **First name differs between sources**: the news story and roster report say Jackson, the AFLE DB says Oliver Noah. Check which is correct before publishing. | CONFIRMED (signing and release); name needs checking | **NEW** | https://www.aflepro.com/news/spanish-linebacker-jackson-obolela-vargas-signs-with-the-alpine-rams ; https://aflepro.com/news/roster-report-what-changed-around-the-league-in-week-7 |
| 21 | Marcos Sánchez González (DB display name "Marcos Gonzalez") | WR, #87 | Firenze Red Lions | AFLE | Roster report for week 11: "Signed: WR Marcos Sanchez Gonzalez" (Firenze). The AFLE DB lists him as Spanish, active, with homegrown cap category. I found no signing article and no information on his earlier clubs. | CONFIRMED (league data) | **NEW** | https://aflepro.com/news/roster-report-what-changed-around-the-league-in-week-11 ; https://aflepro.com/teams/firenze-red-lions |
| 22 | Mikel Gómez Barroso | OL (OG) | Dresden Monarchs (GFL), then Alpine Rams (AFLE) until week 10, then probably Berlin Thunder | GFL / AFLE | Dresden announced him on 14 Apr 2026 as a 29-year-old Spaniard, previously with Barcelona Dragons 2022, Prague Lions 2023 and Gijón Mariners. Roster report for week 10: "Parted Ways: OL Mikel Gomez Barroso" (Alpine Rams). Roster report for week 11: "Signed: OL Mikel Gomez" (Berlin Thunder). The AFLE DB has **two records**: "Mikel Gomez Barroso" (#75, no team) and "Mikel Gomez" (#70, berlin-thunder, Spanish, born in 1996, which fits age 29 in April 2026). They are probably the same person, but no source says so. I don't know whether he played GFL games before joining the AFLE. Dresden won the GFL Bowl. | CONFIRMED (Dresden signing, Rams release); Berlin = REPORTED | **NEW** | https://www.sachsen-fernsehen.de/amp/dresden-monarchs-holen-mikel-gomez-2213568/ ; https://aflepro.com/news/roster-report-what-changed-around-the-league-in-week-10 ; https://aflepro.com/news/roster-report-what-changed-around-the-league-in-week-11 ; https://aflepro.com/teams/berlin-thunder |
| 23 | Agustín Do Eyo | WR | Dresden Monarchs | GFL | Announced 23 Apr 2026 as "Der Spanier", aged 24, from L'Hospitalet Pioners. Dresden won the 2026 GFL Bowl, 27-19 over Potsdam. **I found no source showing he played GFL games or any 2026 stats.** The GFL Bowl report does not mention him. | CONFIRMED (signing); participation UNKNOWN | **NEW** | https://www.sachsen-fernsehen.de/amp/dresden-monarchs-holen-receiver-aus-spanien-2217132/ |
| 24 | Brayan Carbonell | CB | Alpine Rams | AFLE | Appears **only** in the AFLE DB: Spanish, homegrown cap category, `player_status: inactive`, `afle_exp: 1`, no jersey number. No signing article and no roster-report entry found. | REPORTED (league DB only) | **NEW** | https://aflepro.com/teams/alpine-rams ; https://aflepro.com/players |
| 25 | Justus Seelig | RB (#5) | Munich Ravens | EFA | Listed with a **Spanish flag** on Sportschau rosters for every Munich Ravens game, including the final against Nordic Storm, which Munich lost. Search snippets say he was a Bravos rookie in 2025 and won ELF Offensive Rookie of the Year; I could not open those pages because the ELF site is down. **Nationality comes only from the Sportschau data feed.** | REPORTED | **NEW** | https://www.sportschau.de/live-und-ergebnisse/football/efa/ma12423364/munich-ravens_nordic-storm/spiel-kader ; https://www.sportschau.de/live-und-ergebnisse/football/efa/ma12004883/prague-lions_munich-ravens/spiel-kader |
| 26 | Miguel Kabankaya | OL (#78) | Prague Lions | EFA | Listed with a **Spanish flag** on Sportschau rosters for Prague Lions games all season. Per a search snippet, an ELF article counted him as one of Prague's "import" OL; I could not open it. **Nationality comes only from the Sportschau data feed.** | REPORTED | **NEW** | https://www.sportschau.de/live-und-ergebnisse/football/efa/ma12004883/prague-lions_munich-ravens/spiel-kader ; https://europeanleague.football/news/lions-sign-offensive-lineman-miguel-kabankaya-4044 (search result only, site down) |

### Counts

- CONFIRMED (fully or for the signing): 23 rows (1-23). Of these, 6 have unknown 2026 participation: Ngimbi, Soares, G. Rodríguez, Do Eyo, Lliteras (`afle_exp: 0`) and Diz (inactive).
- REPORTED: 3 rows: Carbonell (AFLE DB only), Seelig and Kabankaya (Sportschau nationality flag only). Mikel Gómez at Berlin is also REPORTED, within row 22.
- New names: 18 (rows 9-26).

## Spanish coaches abroad (secondary list)

I found **no Spanish head coach or coordinator** in the AFLE, EFA or GFL in 2026. Checks run:
- AFLE news sitemap, all coaching appointments. Gustavo Figueredo Casagrande, the Warsaw Eagles OL coach announced 2 Nov 2026, is **Brazilian**, not Spanish: https://aflepro.com/news/warsaw-eagles-add-veteran-ol-coach-gustavo-figueredo-casagrande-to-their-staff
- A Spanish-language search for coaches abroad only found the new Spain national-team coaches (Jesús Fernández, Óscar Calatayud), who are domestic roles.
Result: UNKNOWN. Not exhaustive; I did not review position-coach staff lists team by team.

## Corrections and flags for the 8 existing entries

1. **Aaron David**: no longer at Firenze. He moved to the **Alpine Rams in week 10** (AFLE roster report, week 10). The Dresden Monarchs part of his history is consistent with the AFLE article, which does not name the league but says Dresden reached the German Bowl.
2. **Carlos España**: **released by Berlin Thunder in week 7**. The AFLE DB shows no team for him.
3. **Nacho Diz**: listed as **inactive** in Firenze's roster data, with no explanation. Don't state that he finished the season.
4. **Diego Paz González**: correct, and the award is confirmed. Note that he signed as an **E-import**, not under the Solidarity Rule. Add his stat line and the Patriots training invitation, both on AFLE.
5. **Andy Vera**: OK. The AFLE DB lists him as Berlin's captain (`is_captain`).
6. **Eduardo Pérez, Yago Sánchez, Adrià Botella**: OK. Pérez's AFLE position is "WR who can also play RB", which matches what we have.

## Checked, nothing found

- **2027 signings** of any Spaniard: the AFLE sitemap has 658 URLs, and the only 2027 signing articles are non-Spanish players (Florian Larose, Willem Dendelé, Ken Hike Jr., Warsaw Eagles signings). The Solidarity Rule was for 2026 only, so Spaniards would count as imports in 2027. Nothing found.
- **EFA**: I checked all 33 Sportschau match rosters (30 regular-season games, 2 semifinals, the final). The only Spanish flags were Botella (Galaxy), Seelig (Ravens) and Kabankaya (Lions).
- **AFLE London Warriors and Rhein Fire**: no Spaniard other than Paz.
- **Austria AFL, Italy IFL, Finland Vaahteraliiga, Switzerland, France Élite, Sweden, Poland PLFA, Czech, UK BAFA**: targeted web searches found nothing. These searches were shallow, so "nothing found" does not mean there are none.
- **Barcelona Dragons 2026**: no sources on any 2026 activity.

## Leads not verified

- **Gridiron Magazine** items on Lliteras and Pérez ("PANTHERS ADD DEPTH TO QB ROOM", "BRAVO! PANTHERS ADD EDU PEREZ"): seen in search results only, not opened.
- **Justus Seelig**: ELF articles ("rookie justus seelig shines in madrid", "bravos place rising star justus seelig on injured reserve") were seen in search results only, because the ELF site is down. Nationality still needs a second source.
- **Miguel Kabankaya**: nationality needs a second source. He may hold dual nationality, given that Prague reportedly counted him as an import.
- Whether **Ngimbi, Soares, Gabriel Rodríguez, Do Eyo and Lliteras** played any 2026 games: per-game box scores were not reviewed.
- Whether the AFLE DB's "Mikel Gomez" (Berlin) and "Mikel Gomez Barroso" are one person.
- Full-season stats for de Diego and Fernández: only the leaders list after week 12 was found, and the regular season ran beyond week 12.
- GFL/GFL2 team rosters (gfl.info) and europlayers.com: not reviewed. Sportschau has no 2026 GFL rosters.
