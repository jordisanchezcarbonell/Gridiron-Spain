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
4. Pendiente: leer las historias de osos-rivas y valencia-firebats, los dos Clupik que
   quedan.
