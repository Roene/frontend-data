var data = [
  [9962, 1196, 94, 93, 18],
  [1196, 9102, 11, 343, 169],
  [94, 11, 7143, 138, 32],
  [93, 343, 138, 6440, 75],
  [18, 169, 32, 75, 4886]
]

var genres = ["Psychologischverhaal", "Thriller", "Detective", "Romantischverhaal", "Sciencefiction"]

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    outerRadius = Math.min(width, height) * 0.5 - 40,
    innerRadius = outerRadius - 30;

var formatValue = d3.formatPrefix(",.0", 1e3);

var chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending);

var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var ribbon = d3.ribbon()
    .radius(innerRadius);

var color = d3.scaleOrdinal()
    .domain(d3.range(4))
    .range(["#ed0b0b", "#03aa24", "#f2ae04", "#1f03f1", "#e1ed04"]);

var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .datum(chord(data));

var group = g.append("g")
    .attr("class", "groups")
  .selectAll("g")
  .data(function(chords) { return chords.groups; })
  .enter().append("g");

group.append("path")
    .style("fill", function(d) { return color(d.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
    .attr("id", function(d, i) { return "group" + d.index; })
    .attr("d", arc)
    .on("mouseover", fade(.1))         /* Where attempt at mouseover is made */
    .on("mouseout", fade(1));

group.append("title").text(function(d) {
        return groupTip(d);
    });

group.append("text")
         .attr("x", 6)
        .attr("dy", 15)
      .append("textPath")
        .attr("xlink:href", function(d) { return "#group" + d.index; })
        .text(function(chords, i){return genres[i];})
        .style("fill", "white");

var groupTick = group.selectAll(".group-tick")
  .data(function(d) { return groupTicks(d, 1e3); })
  .enter().append("g")
    .attr("class", "group-tick")
    .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

groupTick.append("line")
    .attr("x1", 1)
    .attr("y1", 0)
    .attr("x2", 5)
    .attr("y2", 0)
    .style("stroke", "#000")

groupTick
  .filter(function(d) { return d.value % 1e3 === 0; })
  .append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return formatValue(d.value); });

var ribbons = g.append("g")
    .attr("class", "ribbons")
  .selectAll("path")
  .data(function(chords) { return chords; })
  .enter().append("path")
    .attr("d", ribbon)
    .style("fill", function(d) { return color(d.target.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); })


// Returns an array of tick angles and values for a given group and step.
function groupTicks(d, step) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(function(value) {
    return {value: value, angle: value * k + d.startAngle};
  });
}

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

function groupTip(d) {
        var q = d3.formatPrefix(",.0", 1e1)
        return "Totaal aantal boeken met het genre " + genres[d.index] + ":\n" + q(d.value)
    }