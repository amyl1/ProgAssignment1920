/** Sets the width of the visulisation to the brower screen width. */
var width = screen.width;
/** Sets the height of the visulisation to the brower screen height. */
var height = screen.height;

  /** Sets up the visualisation 
   * @param data data from the CSV fle, which is held on github
*/
function setup(){
  d3.csv("https://raw.githubusercontent.com/amyl1/ProgAssignment1920/master/data.csv", function loadData(data) {
  /** Sets up d3 */ 
  var spacetime = d3.select('body');

  /**Defines the div for the tooltip */ 
  var div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);
   /** Sets up SVG */
  var svg = spacetime.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  /**Introduces the sun element */
  svg.append("circle")
    .attr("class", "sun")
    .attr("r", 10)
    .attr("cx",100)
    .attr("cy",75)
    .attr("stroke","white")
    .attr("stroke-width", 0.5)
    .style("fill", "rgba(255, 204, 0, 1.0)");
    /** Contains the data used for the visulisation.  */
    var dataset=[];
    var names=[];
    /** Populates dataset with data for each item in the CSV */

    data.forEach(function GenerateData(d){
    /** For each planet, work out the translation values and name. Adds them to the list of planets */
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
      names.push(d.pl_name);
      return (names);
  });
  /**Contains the attributes for the planets */
  var circleAttr={
    cx:100,
    cy:75,
    r : function Calc_Radii(d) { return (d.Radius)*5},
    stroke:"white",
    fill: "red"
    }
  
        //Add planets to svg
        svg.selectAll("dot")
        .data(dataset)//This is a list of circle objects to make
        .enter()
        .append("circle")
        .attr(circleAttr)
        //.transition()
        .attr("transform", function Transform(d) { return "translate("+d.transx+","+d.transy+")"})
        .attr("fill", function gen_Colour(d){return "rgba(0,"+(d.pl_dens*100)+","+(d.pl_dens*100)+",1)";})
        .on("mouseover", function(d) {		
          div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.pl_name)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");
        })
          			
      .on("mouseout", function(d) {	
        div.transition()		
                .duration(500)		
                .style("opacity", 0);		
      })

      });
    }
   setup() 