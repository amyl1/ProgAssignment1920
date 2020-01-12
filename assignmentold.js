var planRadii = [];
var planDens = [];
var orbRadii = [];
var count = 0;
var sunRadii = 10;
var width = 1000,
    height = 600;
d3.csv("https://raw.githubusercontent.com/amyl1/ProgAssignment1920/master/data.csv", function(data) {
  data.forEach(function (d){
  planRadii.push(d.Radius);
  orbRadii.push(d.Orbradius);
  planDens.push(d.pl_dens);
  return {planRadii, planDens, orbRadii};
  });
  orbRadii.forEach(function populate(item){
    var angle=Math.random()*360;
    if (angle<90){
      var transx=((Math.sin(angle)*(item*5000))+100)
      var transy=((Math.cos(angle)*(item*5000))+100)
    }
    else if (angle<180){
      var transx=-((Math.sin(angle)*(item*5000))+100)
      var transy=((Math.cos(angle)*(item*5000))+100)
    }
    else if (angle<270){
      var transx=((Math.sin(angle)*(item*5000))+100)
      var transy=-((Math.cos(angle)*(item*5000))+100)
    }
    else{
      var transx=-((Math.sin(angle)*(item*5000))+100)
      var transy=-((Math.cos(angle)*(item*5000))+100)
    }
      // Planet

      svg.append("circle")
      .attr("class", count)
      .attr("cx",100)
      .attr("cy",75)
      .attr("r", planRadii[count]*5)
      .transition()
      .attr("transform", "translate("+transx+","+transy+")")
      .attr("stroke","white")
      .attr("stroke-width", 0.5)
      .style("fill", "rgba(0,0,"+planDens[count]*500+",1)");
      count=count+1;
    

    });
});

var spacetime = d3.select('body');

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
  .attr("cx",100)
  .attr("cy",75)
  .attr("stroke","white")
  .attr("stroke-width", 0.5)
  .style("fill", "rgba(255, 204, 0, 1.0)");