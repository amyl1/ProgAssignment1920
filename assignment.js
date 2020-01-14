var sunRadii = 10;
var width = screen.width;
var height = screen.height;
var dataset=[];
var names = [];
var radius=10;
document.addEventListener("DOMContentLoaded", setup);
function setup(){
  d3.csv("https://raw.githubusercontent.com/amyl1/ProgAssignment1920/master/data.csv", function(data) {
    
  var spacetime = d3.select('body');

  // Define the div for the tooltip
  var div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);
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
      
      names.push(d.name);
      
      dataset.push(d);
  });

  var circleAttr={
    cx:100,
    cy:75,
    r : function Calc_Radii(d) { return (d.Radius)*5},
    stroke:"white",
    }
        // Add planets to svg
        svg.selectAll("dot")
        .data(dataset)//This is a list of circle objects to make
        .enter()
        .append("circle")
        .attr(circleAttr)
        .transition()
        .attr("transform", function Transform(d) { return "translate("+d.transx+","+d.transy+")"})
        .style("fill", function gen_Colour(d){return "rgba(0,"+(d.pl_dens*100)+","+(d.pl_dens*100)+",1)";})
        .on("mouseover", function(d) {		
          div.transition()		
              .duration(200)		
              .style("opacity", .9);		
          div	.html((d.pl_name) + "<br/>"  + d.Orbradius)	
              .style("left", (d3.event.pageX) + "px")		
              .style("top", (d3.event.pageY - 28) + "px");	
          })					
      
          .on("mouseout", function(d) {		
          div.transition()		
              .duration(500)		
              .style("opacity", 0);	
      })
      
      /*
        
        for (var i = 0; i < dataset.length; i++) {
          x.on("mouseover", function(event) {
              alert("Hello");
          });
      }
      
        svg.on("mouseover",function handleMouseOver(d, i){
          svg.append("text")
          .attr({
            fill: "white",
            id: function(d, i) { "t";},
            cx: 0,
            cy: 0
          })
          
        .text(function gen_text(names,i){
          document.getElementById("info").innerHTML=(names[i]);     
        });

        })
        .on("mouseout",function handleMouseOut(d){
          document.getElementById("info").innerHTML=("Planet Name:"); 
        })
        */
      });
    };