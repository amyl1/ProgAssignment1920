var now = d3.time.year.floor(new Date());
var planRadii = [];
var planDens = [];
var orbRadii = [];
var count = 0;
var sunRadii = 66;
d3.csv("https://raw.githubusercontent.com/amyl1/ProgAssignment1920/master/data.csv", function(data) {
  data.forEach(function (d){
  planRadii.push(d.Radius);
  orbRadii.push(d.Orbradius);
  planDens.push(d.pl_dens);
  return {planRadii, planDens, orbRadii};
  });
  orbRadii.forEach(function(item){
    var angle=Math.random()*90;  
    var transx=Math.cos(angle)*item;
    var transy=Math.sin(angle)*item;
      
      // Planet
      svg.append("circle")
      .attr("class", "planet")
      .attr("r", planRadii[count]*10)
      .attr("transform", "translate("+ (sunRadii+(transx*1000))+"," + (sunRadii+(transy*1000))+ ")")
      .style("fill", "rgba("+planDens[count]*100+","+planDens[count]*100+","+planDens[count]*100+",1.0)");
    count=count+1;

    });
});
var spacetime = d3.select('body');
var width = 960,
    height = 500,
    radius = Math.min(width, height);
 
var radii = {
  "sun": radius / 8,
  "earthOrbit": radius / 2.5,
  "earth": radius / 32,
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
 
 
// Current position of Earth in its orbit
var earthOrbitPosition = d3.svg.arc()
  .outerRadius(radii.earthOrbit + 1)
  .innerRadius(radii.earthOrbit - 1)
  .startAngle(0)
  .endAngle(0);

 
// Earth
svg.append("circle")
  .attr("class", "earth")
  .attr("r", radii.earth)
  .attr("transform", "translate(0," + -radii.earthOrbit + ")")
  .style("fill", "rgba(113, 170, 255, 1.0)");
 
// Time of day
var day = d3.svg.arc()
  .outerRadius(radii.earth)
  .innerRadius(0)
  .startAngle(0)
  .endAngle(0);


 
// Update the clock every second
setInterval(function () {
  now = new Date();
  
  var interpolateEarthOrbitPosition = d3.interpolate(earthOrbitPosition.endAngle()(), (2 * Math.PI * Math.random(), 2 * Math.PI * Math.random()));
  
  var interpolateDay = d3.interpolate(day.endAngle()(), (2 * Math.PI * d3.time.seconds(d3.time.day.floor(now), now).length / d3.time.seconds(d3.time.day.floor(now), d3.time.day.ceil(now)).length));
  
  
  d3.transition().tween("orbit", function () {
    return function (t) {
      // Animate Earth orbit position
      d3.select(".earthOrbitPosition")
        .attr("d", earthOrbitPosition.endAngle(interpolateEarthOrbitPosition(t)));
 
      // Transition Earth
      d3.select(".earth")
        .attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
 
      // Animate day
      // Transition day
      d3.select(".day")
        .attr("d", day.endAngle(interpolateDay(t)))
        .attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
      

    };
  });
}, 1000);
