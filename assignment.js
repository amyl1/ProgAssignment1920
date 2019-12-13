var planRadii = [];
var planDens = [];
var count =0;
d3.csv("https://raw.githubusercontent.com/amyl1/ProgAssignment1920/master/data.csv", function(data) {
  data.forEach(function (d){
  planRadii.push(d.Radius);
  planDens.push(d.pl_dens);
  return {planRadii, planDens};
  });
  planRadii.forEach(function(item){
      var trans=item/Math.pow(2,0.5);
      console.log(trans);
      // Planet
      svg.append("circle")
      .attr("class", "planet")
      .attr("r", radii.planet)
      .attr("transform", "translate("+ trans*1000+"," + trans*1000+ ")")
      .style("fill", "rgba(0, 0, "+planDens[count]*100+",1.0)");
      console.log(planDens[count]);
    count=count+1;
    });
});


var spacetime = d3.select('body');
var width = 1300,
    height = 1000,
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



   