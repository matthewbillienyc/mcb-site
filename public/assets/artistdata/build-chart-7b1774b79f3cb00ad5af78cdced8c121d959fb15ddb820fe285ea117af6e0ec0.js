function D3Charter(){
  this.svg = d3.select("#graphbox")
                .append("svg")
                .attr("width", 420)
                .attr("height", 400)
                .style("id", "chart")
}

D3Charter.prototype = {
  chart(artist, index){
    for(var j = 0; j < 5; j++){
      var graph = this.svg;
      var tooltip = this.tooltip;
      graph.append("rect")
         .attr("x", function(){
           return j * 21 + (index * 105);
         })
         .attr("y", function(){
           return 400 - artist.trackPopularity[j] * 4;
         })
         .attr("width", 20)
         .attr("height", function(){
           return artist.trackPopularity[j] * 4;
         })
         .attr("fill", function(){
           return "rgb(" + artist.trackPopularity[j] * 2 + ", 0, " + index * 50 + ")"
         })
         .text(artist.trackPopularity[j])
        //  .on("mouseover", function(){
        //    tooltip.html(artist.trackNames[j]);
        //  })
    graph.append("text")
       .text(artist.trackPopularity[j])
       .attr("x", function(){
         return j * (105 / artist.trackPopularity.length) + 3 + (index * 105);
       })
       .attr("y", function(){
         return 400 - (artist.trackPopularity[j] * 4) + 15;
       })
       .attr("font-family", "courier")
       .attr("font-size", "11px")
       .attr("fill", "white");
    }
    graph.append("text")
            .text(artist.name)
            .attr("x", function(){
              return 5 + (index * 105);
            })
            .attr("y", 20 + (index * 20))
            .attr("font-family", "courier")
            .attr("font-size", "13px")
            .attr("fill", "black");
  }
}
