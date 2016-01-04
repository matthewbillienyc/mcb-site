function D3Charter(){
  this.svg = d3.select("#graphbox")
                .append("svg")
                .attr("width", 420)
                .attr("height", 400)
                .style("id", "chart")
}

D3Charter.prototype = {
  chart(artist, index){
    var graph = this.svg;
    var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
    graph.selectAll("."+artist.name)
      .data(artist.trackPopularity)
      .enter()
      .append("rect")
      .attr("class", artist.name)
      .attr("x", function(d, i){
        return i * 21 + (index * 105);
      })
      .attr("y", function(d, i){
        return 400 - d * 4;
      })
      .attr("width", 20)
      .attr("height", function(d, i){
        return d * 4;
      })
      .attr("fill", function(d){
        return "rgb(" + d * 2 + ", 0, " + index * 50 + ")"
      })
      .on("mouseover", function(d, i) {
         div.transition()
             .duration(200)
             .style("opacity", .9);
         div.html(artist.trackNames[i])
             .style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
       })
       .on("mouseout", function() {
         div.transition()
         .duration(500)
         .style("opacity", 0);
       });

    graph.selectAll(".text"+artist.name)
       .data(artist.trackPopularity)
       .enter()
       .append("text")
       .text(function(d){
         return d
       })
       .attr("x", function(d, i){
         return i * (105 / artist.trackPopularity.length) + 3 + (index * 105);
       })
       .attr("y", function(d){
         return 400 - (d * 4) + 15;
       })
       .attr("font-family", "courier")
       .attr("font-size", "11px")
       .attr("fill", "white");

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
