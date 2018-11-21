// Genres, check de readme daar staat visueel hoe je dit uitleest. 
var data = [
  [9962, 1196, 94, 93, 18],
  [1196, 9102, 11, 343, 169],
  [94, 11, 7143, 138, 32],
  [93, 343, 138, 6440, 75],
  [18, 169, 32, 75, 4886]
]

var updateData = [
  [0, 1196, 94, 93, 18],
  [1196, 0, 11, 343, 169],
  [94, 11, 0, 138, 32],
  [93, 343, 138, 0, 75],
  [18, 169, 32, 75, 0],
]

var genres = ["Psychologischverhaal", "Thriller", "Detective", "Romantischverhaal", "Sciencefiction"]

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    outerRadius = Math.min(width, height) * 0.5 - 40,
    innerRadius = outerRadius - 30;

// Zet getallen naar 1K ipv 1000
var formatValue = d3.formatPrefix(",.0", 1e3);

// Maak chord diagram
var chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.ascending);

// Arc radius meegeven
var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

// Zet ribbons (ook wel chords genoemd)
var ribbon = d3.ribbon()
    .radius(innerRadius);

// Stel kleuren in voor elke arc 
var color = d3.scaleOrdinal()
    .range(["#ed0b0b", "#03aa24", "#f2ae04", "#1f03f1", "#e1ed04"]);

// De visualisatie wordt gemaakt binnen het <g> element
// Alle coordinaten staan relatief aan het midden van de cirkel
var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .datum(chord(data));

// Hier word elke "groep" gedefinieerd voor de arcs in het chord diagram
var group = g.append("g")
    .attr("class", "groups")
  .selectAll("g")
  .data(function(chords) { return chords.groups; })
  .enter().append("g");

// Hier worden de arc's gemaakt voor elke genre
group.append("path")
    .style("fill", function(d) { return color(d.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
    .attr("id", function(d, i) { return "group" + d.index; })
    .attr("d", arc)
    .on("mouseover", fade(.1))    // Bij een hover functie uitvoeren 
    .on("mouseout", fade(1));

group.append("title").text(function(d) {
        return groupTip(d);
});

// Hier worden per arc de labels toegevoegd vanuit de array genres
group.append("text")
        .attr("x", 6)
        .attr("dy", 15)
      .append("textPath")
        .attr("xlink:href", function(d) { return "#group" + d.index; })
        .text(function(chords, i){return genres[i];})
        .style("fill", "black");

// Hier worden de ticks gemaakt voor elke arc, deze worden op basis van de data gemaakt
// Ticks worden per 1000 weergegeven pas je de 1e3 aan naar 1e2 zie je meerdere ticks
var groupTick = group.selectAll(".group-tick")
  .data(function(d) { return groupTicks(d, 1e3); })
  .enter().append("g")
    .attr("class", "group-tick")
    .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

// Kleur en lengte van de lijntjes aan de buitenkant
groupTick.append("line")
    .attr("x2", 5)
    .style("stroke", "#000")

groupTick
  .filter(function(d) { return d.value % 1e3 === 0; })
  .append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return formatValue(d.value); });

// Hier worden de ribbons gemaakt die van het ene genre naar andere genre lopen (en naar zichzelf) 
// De kleur wordt meegegeven door het genre waar de ribbon naar toe loopt
var ribbons = g.append("g")
    .attr("class", "ribbons")
  .selectAll("path")
  .data(function(chords) { return chords; })
  .enter().append("path")
    .attr("d", ribbon)
    .style("fill", function(d) { return color(d.target.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); })

// Als je me de muis over een ribbon gaat verschijnt hier een tekst door de functie chordTip
ribbons.append("title").
    text(function(d){return chordTip(d);});

// Deze functie geeft een array van de tick richtingen en de waardes voor elke arc. 
function groupTicks(d, step) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(function(value) {
    return {value: value, angle: value * k + d.startAngle};
  });
}

// Fade functie die wordt uitgevoerd bij een hover
// Opacity van de arcs en ribbons waar over gehovert wordt gaat naar beneden. 
function fade(opacity) {
  return function(d, i) {
    ribbons
        .filter(function(d) {
          return d.source.index != i && d.target.index != i;
        })
      .transition()
        .style("opacity", opacity);
  };
}

// Dit zorgt ervoor dat als hovert over een arc of ribbon je een tekst terug krijgt
// hoeveel boeken er in een genre zit.
function chordTip(d){
  var j = d3.formatPrefix(",.0", 1e1)
     return "Aantal boeken met genres:\n"
        + genres[d.target.index] + " en " + genres[d.source.index] + ": " + j(d.source.value)
}

function groupTip(d) {
        var j = d3.formatPrefix(",.0", 1e1)
        return "Totaal aantal boeken met het genre " + genres[d.index] + ":\n" + j(d.value)
}

// Update functie 
function update(data) {
  var chords = chord(data);

  var ribbonsUpdate = ribbons.selectAll("path")
    .data(chords, ({source, target}) => source.index + '-' + target.index)

  var duration = 3000;

  ribbonsUpdate
    .transition()
      .duration(duration)
      .attr("d", ribbon)
      .style("fill", function(d) { return color(d.target.index); })
      .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); })

  ribbonsUpdate
    .enter()
      .append("path")
      .attr("opacity", 0)
      .attr("d", ribbon)
      .style("fill", function(d) { return color(d.target.index); })
      .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); })
      .transition()
        .duration(duration)
        .attr('opacity', 1)

  ribbonsUpdate
    .exit()
      .transition()
        .duration(duration)
        .attr("opacity", 0)
        .remove();
}