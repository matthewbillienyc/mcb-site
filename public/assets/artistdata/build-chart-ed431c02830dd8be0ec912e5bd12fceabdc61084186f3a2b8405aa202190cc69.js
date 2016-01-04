function D3Charter(){
}

D3Charter.prototype = {
  prepTrackChart(){
    this.tracksTitle = d3.select("#graphbox")
                  .append("h4")
                  .text("Popularity ratings of Top 5 Tracks on Spotify")
    this.svgOne = d3.select("#graphbox")
                  .append("svg")
                  .attr("width", 420)
                  .attr("height", 400)
                  .style("id", "chart")
  },
  chartTracks(artist, index){
    var graph = this.svgOne;
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
  },
  prepArtistChart(){
    var w = 420;
    var h = 420;
    this.artistsTitle = d3.select("#graphbox")
                          .append("h4")
                          .text("Popularity of Artists")
    this.svgTwo = d3.select("#graphbox")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .append("g")
                    .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")")
  },
  chartArtists(artists){
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
    var dataset = [];
    for(var i = 0; i < artists.length; i++){
      dataset[i] = {label: artists[i].name, popularity: artists[i].popularity}
    }
    var color = d3.scale.category20c();
    var graph = this.svgTwo;
    var r = Math.min(420, 420) / 2;
    var donutWidth = 100;
    var arc = d3.svg.arc()
                .innerRadius(r - donutWidth)
                .outerRadius(r);
    var pie = d3.layout.pie()
                .value(function(d) { return d.popularity; } )
                .sort(null);
    var path = graph.selectAll("path")
                    .data(pie(dataset))
                    .enter()
                    .append("path")
                    .attr("d", arc)
                    .attr("fill", function(d, i){
                      return color(d.data.label);
                    })
                    .on("mouseover", function(d, i) {
                       tooltip.transition()
                           .duration(200)
                           .style("opacity", .9);
                       tooltip.html("Popularity rating: " + d.value)
                           .style("left", (d3.event.pageX) + "px")
                           .style("top", (d3.event.pageY - 28) + "px");
                     })
                     .on("mouseout", function() {
                       tooltip.transition()
                       .duration(500)
                       .style("opacity", 0);
                     });

    var legendRectSize = 18;
    var legendSpacing = 4;
    var legend = graph.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                      var height = legendRectSize + legendSpacing;
                      var offset =  height * color.domain().length / 2;
                      var horz = -2 * legendRectSize;
                      var vert = i * height - offset;
                      return 'translate(' + horz + ',' + vert + ')';
    });
    legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', color)
          .style('stroke', color);
    legend.append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .text(function(d) { return d; });
  }
}
