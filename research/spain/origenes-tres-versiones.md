---
id: origenes-tres-versiones
type: open-question
prepared: 2026-10-18
status: sin resolver
---

# Cuando se jugo el primer partido de futbol americano en Espania

Tenemos **tres fechas distintas**, cada una de una fuente distinta, y las tres podrian ser
ciertas porque no hablan de lo mismo. Esto ya no es una contradiccion con un club: es el
relato del origen del deporte en el pais, y lo publicamos mal.

## Las tres versiones

| Fecha | Que paso | Quien lo cuenta |
|---|---|---|
| **16-11-1958** | En el Santiago Bernabeu, tras un Real Madrid-Valencia de liga, juegan los **Tigers** (base de Toul, Francia) contra los **Tacooners** (base de Giebelstadt, Alemania), dos equipos de las Fuerzas Aereas de EEUU en Europa. El club lo llama "el primer partido de Football Americano registrado en suelo espaniol" y acompania imagen de archivo de RTVE | [Camioneros de Coslada](https://www.camionerosdecoslada.com/es/content/pages/13509) (`camioneros-historia-club`) |
| **15-10-1960** | Knights 20-6 Zaragoza Zebras. El club lo presenta como el primer partido de futbol americano de Espania | [Royal Oaks Knights](https://www.royaloaksknights.com/es/content/pages/5719) (`rok-quienes-somos`) |
| **19-03-1988** | Badalona Drags contra Palermo Cardinals. Es lo que **nosotros publicamos** como el primer partido disputado en Espania | FCFA (`fcfa-historia`), [Badalona Dracs](https://www.badalonadracs.es/es/content/pages/39155) (`dracs-historia-club`) |

## Por que probablemente no se contradicen

Camioneros da la clave sin pretenderlo. Su cronica distingue dos cosas:

- 1958 es "el primer partido **registrado en suelo espaniol**"
- 1988 es "el **partido fundacional** de este deporte en Espania"

Y explica el intervalo: *"Tendrian de pasar casi 30 anios, en los cuales el futbol
americano en Espania estuvo recluido en las bases de la USAAF, con los Raiders de Torrejon
de Ardoz... y los Knights de Torrejon H.S. disputando las ligas colegiales contra las High
Schools de otras bases."*

Es decir: **futbol americano en territorio espaniol desde 1958, pero dentro del circuito
militar estadounidense; futbol americano espaniol desde 1988.** Las tres fechas encajan en
ese marco.

Lo notable es que Camioneros **confirma de forma independiente** el relato de Royal Oaks
Knights sobre las ligas colegiales de las bases. Ya no es solo la version del club.

## Lo que publicamos y por que esta mal

En cuatro archivos decimos, sin matizar, que el primer partido de futbol americano
disputado en Espania fue el 19 de marzo de 1988:

- `src/data/timeline/index.ts`
- `src/data/articles/historia-espana.ts`
- `src/data/articles/badalona-dracs.ts`
- `src/data/teams/catalonia.ts`

Con tres fuentes independientes apuntando a actividad anterior, esa frase ya no se sostiene
tal cual. **La correccion no es cambiar la fecha: es cualificarla.**

## Otra discrepancia, menor pero publicada

El marcador del Dracs-Palermo de 1988. Badalona publica **12-8** y Camioneros **12-18**.
Ambos coinciden en que gano Palermo. Lo publicamos el 18-10-2026 como 12-8 citando solo a
los Dracs; corregido el mismo dia para mostrar las dos versiones.

## Material nuevo de la cronica de Camioneros

- El club se llamo antes **Dolphins**: "defendiendo la camiseta de Dolphins o Camioneros"
- **Raiders de Torrejon de Ardoz**, equipo formado por militares estadounidenses
- A finales de los 80 se invita a espanioles a ver football en Torrejon, sobre todo en el
  Corredor del Henares y **El Encinar de los Reyes / La Moraleja** — el barrio de Royal Oaks
- **Christian y Oscar Perez Navarro**, de 21 y 20 anios, fundan los **Madrid Bears el 8 de
  marzo** de 1988, primer equipo madrilenio, "hoy conocido como Osos Rivas". Nuestra ficha
  de osos-rivas no recoge ni el nombre anterior ni a los fundadores
- Campos historicos: los de tierra de la **calle Mexico** y la hierba de **Valleaguado**

## Que hacer

1. **Antes de tocar los cuatro archivos**, contrastar el partido del Bernabeu de 1958 con
   una fuente independiente del club. La imagen es de RTVE: el archivo de RTVE o la
   hemeroteca deportiva de noviembre de 1958 deberian tenerlo.
2. Preguntarselo a Marco Chamon en la entrevista. Royal Oaks es el club que queda de
   aquella epoca y su web ya documenta 1958 por su lado.
3. Si se confirma, reescribir el origen con las tres capas en vez de con una fecha. Seria
   el mejor contenido que ha producido este archivo.
4. Hecho: leidas las siete webs de Clupik. Resultado:
   - **badalona-dracs**: cronica 1987-1996, el mayor hallazgo
   - **camioneros-de-coslada**: el partido del Bernabeu de 1958 y el marcador en disputa
   - **sevilla-linces**: confirma la fundacion del 14-09-1992 y aniade siete titulos
     regionales que la ficha no tenia
   - **sueca-ricers**: confirma 2007, aniade el registro de 2008 y el origen en la playa
     de Cullera en 1987 con Frank Tiozzo
   - **osos-rivas**: confirma la fundacion como Madrid Bears en la primavera de 1989, que
     estaba marcada como pendiente de fuente primaria, y aniade el origen en el equipo
     Larios y la ayuda de militares de Torrejon
   - **murcia-cobras**: no tiene pagina de historia
   - **valencia-firebats**: su pagina de "Historia" son objetivos y valores, sin fechas

   Cinco de siete tenian material que no teniamos. El patron merece aplicarse a los clubes
   con web que no usan Clupik.

## Una discrepancia menor entre clubes

Camioneros situa la fundacion de los Madrid Bears el **8 de marzo de 1988**, una semana
antes del Dracs-Palermo. Los propios Osos dicen **primavera de 1989**, y la cronica de los
Dracs tambien situa la aparicion de los Osos de Madrid en 1989, despues de la I Supercopa
de esa primavera. Dos fuentes contra una: mantenemos 1989.

## Torrejon aparece en tres relatos independientes

Royal Oaks Knights, Camioneros de Coslada y Osos Rivas citan por separado la base aerea de
Torrejon de Ardoz como origen o apoyo. Tres clubes sin relacion entre si apuntando al mismo
sitio es la pista mas solida que tenemos sobre como entro el deporte en Espania.


---

## 18-10-2026: la via estadounidense, y es gratis

La idea era ir al archivo de *Stars and Stripes*, el diario de las tropas estadounidenses en
Europa, que cubria el deporte de las bases. Aviso: **starsandstripesarchive.com no sirve**,
es un producto en DVD solo de la Segunda Guerra Mundial (junio del 44 a mayo del 45). Las
ediciones europeas de 1948 a 1999 estan en NewspaperArchive y en Fold3, **las dos de pago**.

Pero buscando esa via aparecio otra mejor y abierta: la **American Overseas Schools
Historical Society** (aoshs.org), que conserva el archivo de los institutos estadounidenses
en el extranjero y tiene ficha propia del Madrid High School y del Torrejon High School.

### Lo que aporta, y no es poco

| Dato | Fuente |
|---|---|
| **El tackle football llega al Madrid High School en el curso 1960-61**, y es el primer anio en que el equipo viaja fuera de Espania para competir | [AOSHS Madrid HS](https://aoshs.org/collections/school-histories/eu/es/940/) |
| El instituto opera de 1955 a 1970, como parte de la Madrid American Dependents School | AOSHS Madrid HS |
| 6 de septiembre de 1955, empieza el segundo curso. 8 de septiembre de 1959, inauguracion del edificio nuevo | AOSHS Madrid HS |
| Casi 750 alumnos en 1959 y mas de 900 en 1960-61 | AOSHS Madrid HS |
| "Los equipos de futbol y baloncesto fueron campeones de Espania durante muchos anios" | AOSHS Madrid HS |
| Mascota: **Silver Knights**, colores rojo y plata | [AOSHS Torrejon HS](https://aoshs.org/collections/school-histories/eu/es/683/) |

**Lo importante:** Royal Oaks situa su primer partido de tackle el 15 de octubre de 1960.
El curso 1960-61 empieza en septiembre de 1960. **La fecha del club cae exactamente dentro
del curso en que, segun un archivo independiente y estadounidense, el tackle llego al
instituto.** Es la primera corroboracion de ese dato que no viene de un club espaniol.

### Y una discrepancia nueva, para la entrevista

AOSHS situa el cambio de nombre a Torrejon American High School **en el curso 1970-71**, y
Wikipedia lo da oficialmente en **1971**. Royal Oaks situa en **1972** la division del
distrito escolar que creo THS Knights y Royal Oaks Knights.

Ademas, AOSHS describe los equipos del instituto organizados por zonas: "the Royal Oaks,
the housing area, and the Base", y mas tarde como equipos Red y White. Eso suena a
**equipos internos dentro de un mismo instituto**, no a dos institutos separados.

Puede que sean dos cosas distintas, el renombrado en 1970-71 y la division del distrito en
1972, o puede que el club haya comprimido ambas. **Preguntarselo a Marco.**

### Lo que queda por explorar

1. **NewspaperArchive o Fold3**, un mes de suscripcion, buscando *Stars and Stripes*
   europeo de noviembre de 1958 y octubre de 1960. Ahi estarian las cronicas reales.
2. **Los anuarios del Madrid High School**, el *Accolade*. Hay ejemplares en Classmates y en
   Ancestry, y al menos uno de 1958. Un anuario de 1960-61 tendria la foto del equipo y el
   calendario de aquella primera temporada de tackle.
3. **AOSHS acepta donaciones y consultas de archivo.** Son la via mas directa, y gratis.
