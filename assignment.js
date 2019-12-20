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
var width = 1300,
    height = 1000,
    radius = Math.min(width, height);
 

 
// Space
var svg = spacetime.append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 
// Sun
svg.append("circle")
  .attr("class", "sun")
  .attr("r", sunRadii)
  .style("fill", "rgba(255, 204, 0, 1.0)");



   