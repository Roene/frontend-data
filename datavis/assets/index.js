/* ------ Bronnen
Project gebasseerd op : https://beta.observablehq.com/@mbostock/d3-chord-diagram 
https://jsfiddle.net/rjonean4/
https://jsfiddle.net/wcat76y1/5/
------ */

// Dit is de data voor het aantal boeken per genre
// Zie Readme voor het uitlezen van het matrix tabel
var data = [
  [9962, 1196, 94, 93, 18],
  [1196, 9102, 11, 343, 169],
  [94, 11, 7143, 138, 32],
  [93, 343, 138, 6440, 75],
  [18, 169, 32, 75, 4886]
]

var dataUpdate = [
  [0, 1196, 94, 93, 18],
  [1196, 0, 11, 343, 169],
  [94, 11, 0, 138, 32],
  [93, 343, 138, 0, 75],
  [18, 169, 32, 75, 0],
]

var genres = ["Psychologischverhaal", "Thriller", "Detective", "Romantischverhaal", "Sciencefiction"]

//Bron https://jsfiddle.net/wcat76y1/5/
var svg = d3.select("svg")

var width = +svg.attr("width")

var height = +svg.attr("height")

var outerRadius = Math.min(width, height) * 0.5 - 40

var innerRadius = outerRadius - 30

// Bron https://beta.observablehq.com/@mbostock/d3-chord-diagram
// Format voor getallen 1K ipv 1000
var formatValue = d3.formatPrefix(",.0", 1e3)

var chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.ascending)

// Arc's (labels) en ribbons (chords) een radius meegeven
var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
 
var ribbon = d3.ribbon()
    .radius(innerRadius)
// Einde bron https://jsfiddle.net/wcat76y1/5/

var color = d3.scaleOrdinal()
    .range(["#ed0b0b", "#03aa24", "#f2ae04", "#1f03f1", "#e1ed04"])
// Einde Bron https://beta.observablehq.com/@mbostock/d3-chord-diagram

// Zet coordinaten relatief aan het midden van de cirkel
var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

// Hier geef ik classes mee aan de g elementen
var ribbons = g.append("g")
    .attr("class", "ribbons")

var group = g.append("g")
    .attr("class", "groups")

// Binnen deze functie wordt alles getekend
// Als er op een button geklikt is, word deze functie uitgevoerd met
// data of dataUpdate
function update(data) {
  var chords = chord(data)

  var ribbonsUpdate = ribbons.selectAll("path")
    .data(chords, ({source, target}) => source.index + " " + target.index)

  var groupUpdate = group.selectAll("g")
    .data(chords.groups)

  // Duur van 2 seconde voor animatie instellen
  var duration = 2000;

// Ribbons (chords) worden getekend
  ribbonsUpdate
    .transition()
      .duration(duration)
        .attr("d", ribbon)
        .style("fill", function(d) { return color(d.target.index) })
        .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker() })

  ribbonsUpdate
    .enter()
      .append("path")
      .attr("opacity", 0)
      .attr("d", ribbon)
      .style("fill", function(d) { return color(d.target.index) })
      .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker() })
      .transition()
        .duration(duration)
        .attr("opacity", 1)

  ribbonsUpdate
    .exit()
      .transition()
        .duration(duration)
        .attr("opacity", 0)
        .remove()

 // Arc's (labels) worden hier getekend
  groupUpdate
    .select("path")
    .transition()
      .duration(duration)
      .attr("d", arc)
      .style("fill", function(d) { return color(d.index) })
      .style("stroke", function(d) { return d3.rgb(color(d.index)).darker() })

  var groupUpdateGroup = groupUpdate.enter().append("g")

  groupUpdateGroup
    .append("path")
      .attr("opacity", 0)
      .attr("d", arc)
      .attr("id", function(d, i) { return "group" + d.index })
      .style("fill", function(d) { return color(d.index) })
      .style("stroke", function(d) { return d3.rgb(color(d.index)).darker() })
      .transition()
        .duration(duration)
        .attr("opacity", 1)

// Bron https://jsfiddle.net/rjonean4/
  groupUpdateGroup
    .append("text")
      .attr("x", 6)
      .attr("dy", 15)
      .append("textPath")
      .attr("xlink:href", function(d) { return "#group" + d.index })
      .text(function(chords, i){return genres[i]})
      .style("fill", "black")
      .transition()
        .duration(duration)
        .attr("opacity", 1)
// Einde Bron https://jsfiddle.net/rjonean4/

  groupUpdateGroup
    .append("title")

  groupUpdate
    .select("title")
    .text(function(d) {return "Totaal aantal boeken met het genre " + genres[d.index] + " " + (d.value) })

  groupUpdate
    .exit()
      .transition()
      .duration(duration)
      .attr("opacity", 0)
      .remove()
}

update(data)

// Functie uitvoeren als er op een van de buttons wordt geklikt
document.getElementById("doubleGenre").onclick = function(){ 
  update(dataUpdate)
}

document.getElementById("reset").onclick = function(){ 
  update(data)
}