
function drawGraph5(svg,data){

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom,
        padding = 100;


    var y = d3.scaleLinear().range([height, 0]);
    var x = d3.scaleTime().range([0, width]);


    // define the line
    var valueline1 = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.usa); });

    var valueline2 = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.costarica); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(svg)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
max_usa = d3.max(data, function(d) { return (d.usa)});
max_costarica = d3.max(data, function(d) { return (d.costarica)});

max_value = d3.max([max_usa,max_costarica])+1;
console.log(max_value)
// Scale the range of the data
  x.domain(d3.extent(data, function (d) { return d.year }));
  y.domain([0, max_value]);

  // Add the valuelin1e path.
  svg.append("path")
      .data([data])
      .attr("class", "line1")
      .attr("d", valueline1);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line2")
      .attr("d", valueline2);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(d3.timeYear.every(1)));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

// gridlines in x axis function
function make_x_gridlines() {		
    return d3.axisBottom(x)
        .ticks(5)
}

// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft(y)
        .ticks(5)
}
     
// add the X gridlines
svg.append("g")			
.attr("class", "grid")
.attr("transform", "translate(0," + height + ")")
.call(make_x_gridlines()
    .tickSize(-height)
    .tickFormat(""));

// add the Y gridlines
svg.append("g")			
.attr("class", "grid")
.call(make_y_gridlines()
    .tickSize(-width)
    .tickFormat(""));


// text label for the x axis
svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 10) + ")")
      .style("text-anchor", "middle")
      .text("Year");

// text label for the y axis
svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left/2))
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Happiness Rank");   
}

// Get the data
d3.csv("dataset/rank.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.year = new Date(parseInt(d.year),0);
      d.usa = +d.usa;
      d.costarica = +d.costarica;

  });
  drawGraph5(document.querySelector('#happiness-rank'),data);
});



