var planRadii = [];
var planDens = [];
d3.csv("https://raw.githubusercontent.com/amyl1/ProgAssignment1920/master/data.csv", function(data) {
  data.forEach(function (d){
  planRadii.push(d.Radius);
  planDens.push(d.pl_dens);
  return {planRadii, planDens};
  });
  planRadii.forEach(function(item){
    console.log(item);
  });
});


var spacetime = d3.select('body');
var width = 900,
    height = 800,
    radius = Math.min(width, height);
 
var radii = {
  "sun": radius / 15,
  "planetOrbit": radius / 2.5,
  "planet": radius / 32,
};
 
// Space
var svg = spacetime.append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 
// Sun
svg.append("circle")
  .attr("class", "sun")
  .attr("r", radii.sun)
  .style("fill", "rgba(255, 204, 0, 1.0)");


  // Planet
    svg.append("circle")
      .attr("class", "planet")
      .attr("r", radii.planet)
      .attr("transform", "translate(0," + -radii.planetOrbit + ")")
      .style("fill", "rgba(113, 170, 255, 1.0)");
   