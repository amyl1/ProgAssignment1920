
var spacetime = d3.select('body');
var width = 960,
    height = 500,
    radius = Math.min(width, height);
 
var radii = {
  "sun": radius / 8,
  "earthOrbit": radius / 2.5,
  "earth": radius / 32,
  "moonOrbit": radius / 16,
  "moon": radius / 96
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


// Earth
svg.append("circle")
  .attr("class", "earth")
  .attr("r", radii.earth)
  .attr("transform", "translate(0," + -radii.earthOrbit + ")")
  .style("fill", "rgba(113, 170, 255, 1.0)");
