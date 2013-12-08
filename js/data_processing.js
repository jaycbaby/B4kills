// Initialize a global container variable that
// will will be populated via AJAX request in the
// document ready function.
var leaguedata;
    var health = [];
    var names = [];

// TODO: filter champion list by type so that you can compare mages, fighters, marksman...etc.

$(document).ready(function(){

    console.log('- - - - - - - - - - document ready fired - - - - - - - - - - ');

    // TODO: init load spinner

    // Use D3 to load JSON data
    d3.json('js/league_data.json', function(error, json){
        console.log('- - - - - - - - - - d3 json request fired - - - - - - - - - - ');
        if (error) {
            return console.warn(error);
        }
        console.log('- - - - - - - - - - d3 json request success - - - - - - - - - - ');
        leaguedata = json;

        // TODO: remove load spinner

        // TODO: fire visualize function

        // TESTING: logging champion health
        processData(leaguedata.data);
    });
});

function processData(data){
    // data arrays


    // svg canvas size
    var w = 800;
    var h = 500;

    // push json data to separate arrays
    _.each(data, function(d){
        health.push(d.stats.hp);
        names.push(d.name);
    });

    var xScale = d3.scale.linear()
                        .domain([0, names.length])
                        .range([0, w]);
    var yScale = d3.scale.linear()
                        .domain([d3.min(health), d3.max(health)])
                        .range([0, h]);
    // line generator
    line = d3.svg.line()
            .x(function(d,i) {return x(i);})
            .y(function(d) {return -1 * y(d);});

    // var vis = d3.select(".graph").select("svg").select("graph");

    var vis = d3.select(".graph")
        .append("svg:svg")
        .attr("width", w)
        .attr("height", h);

    // TODO: adjust transform to account for H1
    var g = vis.append("svg:g");

        g.append("svg:line")
            .attr("x1", "0")
            .attr("y1", "100")
            .attr("x2", "600")
            .attr("y2", "-50");
            // .attr("x1", xScale(0))
            // .attr("y1", -1 * yScale(0))
            // .attr("x2", xScale(w))
            // .attr("y2", -1 * yScale(0));

        g.append("svg:path")
            .attr("d", line(health));
}

// 

function visualize(data){

    // Set width and height
    var w = 800;
    var h = 800;
}