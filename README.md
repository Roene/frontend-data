# Frontend data
Deze repo is voor het project frontend data. Hierin ga ik een interactieve datavisualisatie maken met de data van de OBA api.

## Inhoud
* [To Do](#to-do)
* [Installatie](#installatie)
* [Ideeën](#ideeën)
* [Schetsen](#schetsen)
* [Problemen](#problemen)
* [Observable](#observable)
* [Shout outs](#shout-outs)
* [Licentie](#licentie)

## To-Do

Tijdens dit project wil ik de volgende dingen gaan doen.

- [X] Data ophalen uit de oba api
- [X] Bedenken wat ik wil gaan visualiseren
- [ ] Statische visualisatie maken met D3
- [ ] Juiste data toevoegen aan deze statische visualisatie
- [ ] Interactie toevoegen aan de visualisatie

## Instalatie
Om dit project te installeren ga je naar je *terminal* en voer je dit uit : 
```
git clone https://github.com/Roene/frontend-data
cd frontend-data
npm install rijkvanzanten/node-oba-api
npm install
```
Dit project maakt gebruik van de volgende packages :
* [node-oba-api](https://github.com/rijkvanzanten/node-oba-api)
* [dotenv](https://www.npmjs.com/package/dotenv)

## Ideeën
Mijn eerste idee was om autheurs te gaan gebruiken voor de visualisatie. Wanneer de gebruiker hierop klikt krijgt hij zij de genres te zien van de autheur. Klikt de gebruiker op een genre dan krijgt hij de boeken van de bepaalde autheur. 

*Na de feedback van Bas Pieren op 12-11-2018 kwam ik tot een nieuw inzicht om dit andersom te gaan doen* 

Ik wil genres gaan gebruiken voor mijn visualisatie, wanneer de gebruiker hierop klikt moet hij/zij de autheurs binnen dit genre kunnen zien. Vervolgens wil ik dat als de gebruiker op de autheur klikt hij/zij de boeken te zien krijgt van deze autheur binnen een genre.

*14-11-2018 Feedback van Laurens, Jesse & Loc*

Mijn idee wat hierboven staat was nog niet zo concreet en niet zo interessant. Aangezien er boeken met meerdere genres zijn kwam Laurens met het idee om de 5 genres tegen elkaar uit te zetten, zodat je kunt zien hoe deze genres bij elkaar horen dus bijvoorbeeld thriller ten opzichte van romantiek. Dit zou je kunnen visualiseren door een [Chord-diagram](https://beta.observablehq.com/@mbostock/d3-chord-diagram) te gebruiken. Met dit concept ga ik dan ook door. 

De genres die ik wil gaan gebruiken zijn :
* Pyschologisch verhaal
* Thriller
* Detective
* Romantisch verhaal
* Science fiction 

Dit zijn de grootste 5 genres van de OBA. 

*15-11-2018 Voorbeelden*
Ik ben gaan kijken naar voorbeelden van chord diagrams, vervolgens ben ik gaan kijken of ik deze werkend kreeg. Dit [voorbeeld](http://blockbuilder.org/mbostock/4062006) heb ik werkend gekregen.

*15-11-2018 Feedback*
Aan het einde van deze dag hebben we het idee gepitcht aan de klas. Ik had nog geen idee van welke interactie ik ga gebruiken, vanuit de klas kreeg ik tips om bijvoorbeeld extra genres toe te voegen of andere jaren te selecteren ipv alles.

Ik ga als interactie toevoegen dat gebruikers andere jaren kunnen selecteren. 

## Interessante charts
Deze charts vond ik tot nu toe interessant om voor mijn idee te gebruiken en om de visualisatie interactief te maken.
* Sunburst chart 📊
* Bubble chart
* Chord diagram (na feedback op 14-11-2018)

*13-11-2018 Ik ben nog meer charts aan het zoeken voor inspiratie*

Tof voorbeeld voor een [interactieve sunburst](https://beta.observablehq.com/@mbostock/d3-zoomable-sunburst)

Dit is ook een tof voorbeeld van een [interactieve chord diagram](http://projects.delimited.io/experiments/chord-transitions/demos/trade.html)

## Schetsen
✏️📐📏

![schets1](images/schets1.jpg)
> Sunburst en bubble chart 

![schets2](images/schets2.jpg)
> Sunburst uitgewerkt

![schets3](images/schets3.jpg)
> 1e Chord diagram

![schets4](images/schets4.jpg)
> 2e Chord diagram

## Probelemen
* Wat wil ik visualiseren?
* Wat wil ik dat de gebruiker uit de data visualisatie kan halen zodat hij/zij de data kan gaan ontdekken?
* Welke charts ga ik hiervoor gebruiken?
* Welke charts vind ik zelf interessant / leip om te maken?
* Wat zijn interessante patronen om te gebruiken?

## Observable

## Shout outs
🙏🏻 Special thanks naar deze mensen die mij hebben geholpen tijdens dit project. 🙏🏻
* [Bas Pieren](https://github.com/BasPieren) voor het halen van ☕

## Licentie
[MIT](https://choosealicense.com/licenses/mit/) © [Roene Verbeek](https://github.com/Roene)