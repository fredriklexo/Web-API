# Web-API

## Github: https://github.com/fredriklexo/Web-API

## Uppgift
Alla neråt stående krav har uppfylts.

### Beskrivning
API’erI den här inlämningen skall du skapa en hemsida som visar information hämtat ifrån ert egenbyggda API. Erat egna API skall även hämta data ifrån ett externt API och sedan skicka datan vidare till klienten. Ert egna API skall vara en Express-server byggd i NodeJS som hanterar en valfri resurs. För G skall det finnas en endpoint för att hämta samtliga entiteter ifrån er resurs (GET) samt en endpoint för att skapa en ny entitet (POST). För VG skall API:et byggas ut med endpoints för att uppdatera en entitet (PUT), ta bort en entitet (DELETE) samt hämta en specifik entitet (GET). Det skall i ert klientgränssnitt tydligt framgå att ni hämtar data ifrån ett externt valfritt API. Data som hämtas skall alltså visas upp i ert gränssnitt. Om du vill kombinera ditt anrop till externt API med ditt egna API kan du prata med läraren och få okej på din Idé.Ni väljer sedan själva om ni vill använda en utökad utvecklings-stack i projektet, notera att detta inte är ett krav. Exempel på ramverk ni kan lägga till i er stack är: Typescript, React, Vue, Angular, mm. Låt kreativiteten flöda!

### Krav för godkänt:
1. Skapa ett API baserat på en valfri resurs (GET & POST)
2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest)
3. Datan som API:et hanterar sparas lokalt i serverfilen
4. Ett simpelt klient-gränssnitt skall finnas för att anropa ert API olika endpoints, samt visa upp resultatet vid GET anrop
5. Ert API skall hämta och data ifrån ett externt API och skicka vidare datan till klienten 
6. Git & GitHub har använts
7. Projektmappen innehåller en README.md fil (läs ovan för mer info)
8. Uppgiften lämnas in i tid!

### Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda
2. Resursen i ert API skall även ha endpoints för PUT, DELETE och GET för en entitetLYCKA

### Uppbyggnad
Frontend: Vanilla js med static files. 
Backend: node.js & express
### Start: 
1. npm i
2. npm start