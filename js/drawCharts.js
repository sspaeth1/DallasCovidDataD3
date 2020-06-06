console.log();
// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 70, left: 50 },
  width = window.innerWidth / 2 - margin.left - margin.right,
  height = window.innerHeight / 2 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3
  .line()
  .x(function (d) {
    return x(d.date);
  })
  .y(function (d) {
    return y(d.value);
  });

const newCases = "./data/Dallas_County_Coronavirus_newCases.csv";
const totalActiveCases =
  "./data/Dallas_County_Coronavirus_TotalActiveCases.csv";
const Ro = "./data/Dallas_County_Coronavirus_Ro.csv";
const Rt = "./data/Dallas_County_Coronavirus_Rt.csv";

// Get the data
function data(dataFile, selector) {
  d3.csv(dataFile, function (error, data) {
    if (error) throw error;

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3
      .select(selector)
      .append("div")
      // Container class to make it responsive.
      .classed("svg-container", true)
      .append("svg")
      // Responsive SVG needs these 2 attributes and no width and height attr.
      .attr("preserveAspectRatio", "xMinYMin meet")
      //   .attr("viewBox", "0 0 600 400")
      // Class to make it responsive.
      .classed("svg-content-responsive", true)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("rect")
      .attr("fill", "#f7f7f7")
      .attr("width", width)
      .attr("height", height);

    // format the data
    data.forEach(function (d) {
      d.date = parseTime(d.date);
      d.value = +d.value;
    });

    // Scale the range of the data
    x.domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);

    // Add the valueline path.
    svg.append("path").data([data]).attr("class", "line").attr("d", valueline);

    // Add the X Axis
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(10))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // Add the Y Axis
    svg.append("g").attr("class", "axis").call(d3.axisLeft(y));

    // Add X axis label:
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + margin.left + margin.right)
      .attr("y", height + margin.top + 50)
      .text("Date (2020)");

    // Y axis label:
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", -height / 2)
      .text("Value");
  });
}

data(newCases, "#newCases");
data(totalActiveCases, "#totalCases");
data(Ro, "#Ro");
data(Rt, "#Rt");
