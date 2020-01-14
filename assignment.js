var sunRadii = 10;
var width = screen.width;
var height = screen.height;
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
    dataset = []
          //Populate things (your "dataset" variable that I didn't see) with properties of each planet

  data.forEach(function GenerateTransVar(d){
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
    var name = d.pl_name;
    d.name = name;
    dataset.push(d);
});
      // Add planets to svg
      svg.selectAll("circle")
      .data(dataset)//This is a list of circle objects to make
      .enter()
      .append("circle")
      .attr("cx",100)
      .attr("cy",75)
      .attr("r", function Calc_Radii(d) { return (d.Radius)*5;})
      .attr("id", function(d, i) { return dataset[i].pl_name;})
      .transition()
      .attr("transform", function Transform(d) { return "translate("+d.transx+","+d.transy+")"})
      .attr("stroke","white")
      .attr("stroke-width", 0.5)
      .style("fill", function gen_Colour(d){return "rgba(0,"+(d.pl_dens*100)+","+(d.pl_dens*100)+",1)";});
      svg.on("mouseover",function handleMouseOver(d, i){
        d3.select(this)
          .style("fill","red");
        svg.append("text")
        .attr({
          fill: "white",
          id: "t",
          cx: 0,
          cy: 0
        })
        
      .text(function gen_text(d,i){
        var name = function gen_Name(d,i){return (data[i].pl_name);}
        document.getElementById("info").innerHTML=(name);     
      });

      })
      .on("mouseout",function handleMouseOut(d){
        document.getElementById("info").innerHTML=("Planet Name:"); 
      })
    });
