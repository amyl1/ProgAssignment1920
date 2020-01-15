/** Sets the width of the visulisation to the brower screen width. */
var width = screen.width;
/** Sets the height of the visulisation to the brower screen height. */
var height = screen.height;
/**
  * @function loadData
  * @description loads the data from the csv file which is held on github
  * @param data the data held within the csv file
*/
d3.csv("https://raw.githubusercontent.com/amyl1/ProgAssignment1920/master/data.csv", function loadData(data) {
/** @member spacetime 
 * @description sets up d3*/  
  var spacetime = d3.select('body');

  /**@member div
   * @description Defines the div for the tooltip */ 
  var div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);

   /**@member svg
    * @description sets up svg canvas.
    */
  var svg = spacetime.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  //Introduces the sun element
  svg.append("circle")
    .attr("class", "sun")
    .attr("r", 10)
    .attr("cx",100)
    .attr("cy",75)
    .attr("stroke","white")
    .attr("stroke-width", 0.5)
    .style("fill", "rgba(255, 204, 0, 1.0)");
     /**@member {array} dataset
    * @description holds the data from the csv file in an array.
    */
    var dataset=[];
    /** Populates dataset with data for each item in the CSV */

    data.forEach(function GenTransform(d){
    /** @function GenTransform
     * @description For each planet, work out the translation values, designed to randomly distribute the planets around the sun. The distance from the centre of the sun in this visualisation is to scale with the distace of the exoplanet from their nearest sun. Pushes each data item to the dataset array. 
     * @param d data from the csv file*/
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
  /** @member circleAttr
   * @description contains the attributes for the planets. Radius is to scale, based on the actual radius of the exoplanet, compared to the radius of the Earth. */
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
        .transition()
        /**
         * @function Transform
         * @param d The data from the csv
         * @description Transforms the planets from the sun, based on the traslation variables calcualted in the GenTransform function.
         */
        .attr("transform", function Transform(d) 
        { return "translate("+d.transx+","+d.transy+")"})
        /**
         * @function genColour
         * @param d The data from the csv
         * @description Sets the colour of the planet based on its density. The darker the colour in the visualisation, the more dense the planet is.
         */
        .attr("fill", function genColour(d){return "rgba(0,"+(d.pl_dens*100)+","+(d.pl_dens*100)+",1)";})
                /**
         * @function showTooltip
         * @param d The data from the csv
         * @description Creates a tooltip, containing the name of the planet that the circle represents, when the mouse is hovered over the object.
         */
        .on("mouseover", function showTooltip(d) {		
          div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.pl_name)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");
        })
              /**
         * @function hideTooltip
         * @description Removes the description when the mouse is moved from over the planet.
         */    			
      .on("mouseout", function hideTooltip() {	
        div.transition()		
                .duration(500)		
                .style("opacity", 0);		
      })

      });
 