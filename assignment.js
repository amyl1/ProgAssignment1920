var sunRadii = 10;
var width = 1000;
var height = 600;
var dataset=[];
var radius=10;
d3.csv("https://raw.githubusercontent.com/amyl1/ProgAssignment1920/master/data.csv", function(data) {
   
var spacetime = d3.select('body');
//Get SVG ready
var svg = spacetime.append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 
// Add sun
svg.append("circle")
  .attr("class", "sun")
  .attr("r", sunRadii)
  .attr("cx",100)
  .attr("cy",75)
  .attr("stroke","white")
  .attr("stroke-width", 0.5)
  .style("fill", "rgba(255, 204, 0, 1.0)");
    things = []
          //Populate things (your "dataset" variable that I didn't see) with properties of each planet

  data.forEach(function populate(d){
      //For each planet, work out properties and add to the list of planets
    var angle=Math.random()*360;
    if (angle<90){
      var transx=((Math.sin(angle)*(d.Orbradius*5000))+100)
      var transy=((Math.cos(angle)*(d.Orbradius*5000))+100)
    }
    else if (angle<180){
      var transx=-((Math.sin(angle)*(d.Orbradius*5000))+100)
      var transy=((Math.cos(angle)*(d.Orbradius*5000))+100)
    }
    else if (angle<270){
      var transx=((Math.sin(angle)*(d.Orbradius*5000))+100)
      var transy=-((Math.cos(angle)*(d.Orbradius*5000))+100)
    }
    else{
      var transx=-((Math.sin(angle)*(d.Orbradius*5000))+100)
      var transy=-((Math.cos(angle)*(d.Orbradius*5000))+100)
    }
    d.transx = transx;
    d.transy = transy;

    dataset.push(d);
});
      // Add planets to svg
      svg.selectAll("circle")
      .data(dataset)//This is a list of circle objects to make
      .enter()
      .append("circle")
      .attr("cx",100)
      .attr("cy",75)
      .attr("r", function (d) { return (d.Radius)*5;})
      .transition()
      .attr("transform", function(d) { return "translate("+d.transx+","+d.transy+")"})
      .attr("stroke","white")
      .attr("stroke-width", 0.5)
      .style("fill", function(d){return "rgba(0,"+(d.pl_dens*100)+","+(d.pl_dens*100)+",1)";});
      svg.on("mouseover",function(){
        svg.append("text").data(dataset)
        .attr({
          fill: "white",
          id: "t"+function(d) {return (d.pl_name)},
          x: 0,
          y: 0
        })
      .text(function(d){
        return (d.pl_name);
      });
      })
    });
