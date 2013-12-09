// Empty dataset for D3 processing
var dataset = {
  "name": "Battefield Player Stats",
  "children": [{
    "name": "Weapons",
    "children": []
  },
  {
    "name": "Vehicles",
    "children": []
  }
  ]
};

$(document).ready(function(){



$("form").on("submit", function(e){
  e.preventDefault();
  console.log(e);
});

// AJAX call for stats

$.ajax({
  type: "GET",
  url: "http://api.bf4stats.com/api/playerInfo?plat=ps4&name=AELIUZ",
  dataType: "json",

  // Visualize data on success

  success: function(data){
    var stats = data;
    var weapons = data.weapons;
    var vehicles = data.vehicles;

    parseData(weapons);
    parseVehicleData(vehicles);
    visualize(dataset);
  },

  error: function(error){
    console.warn(error);
  }

});

// ***** Data functions

// Parse AJAX data into D3 visualization format
// as per the empty dataset above

function parseData(weapons){

  var weaponCategories = [];

  _.each(weapons, function(weapon){
    var category = weapon.detail.category;
    var weaponName = weapon.detail.name;
    var weaponKills = weapon.stat.kills;
    var categoryIndex;

    if (weaponKills > 0) {
      categoryIndex = _.indexOf(weaponCategories, category);
      if (categoryIndex === -1) {
        weaponCategories.push(category);
        categoryIndex = weaponCategories.length - 1;
        addCategory(category);
      }
      addWeapon(category, categoryIndex, weaponName, weaponKills);
    }
  });
}

// Add a weapon category to the dataset

function addCategory(category){
  dataset.children[0].children.push({
    "name": category,
    "children": []
  });
}

// Add a weapon and kills to the dataset

function addWeapon(category, categoryIndex, weaponName, weaponKills){
  dataset.children[0].children[categoryIndex].children.push({
    "name": weaponName,
    "size": weaponKills
  });
}


// TODO: Refactor
function parseVehicleData(vehicles){

  var vehicleCategories = [];

  _.each(vehicles, function(vehicle){
    var category = vehicle.detail.category;
    var vehicleName = vehicle.detail.name;
    var vehicleKills = vehicle.stat.kills;
    var categoryIndex;

    if (vehicleKills > 0) {
      categoryIndex = _.indexOf(vehicleCategories, category);
      if (categoryIndex === -1) {
        vehicleCategories.push(category);
        categoryIndex = vehicleCategories.length - 1;
        addVehicleCategory(category);
      }
      addVehicle(category, categoryIndex, vehicleName, vehicleKills);
    }
  });
}

// Add a weapon category to the dataset

function addVehicleCategory(category){
  dataset.children[1].children.push({
    "name": category,
    "children": []
  });
}

// Add a weapon and kills to the dataset

function addVehicle(category, categoryIndex, vehicleName, vehicleKills){
  dataset.children[1].children[categoryIndex].children.push({
    "name": vehicleName,
    "size": vehicleKills
  });
}


// ***** D3

var margin = 10,
    outerDiameter = 760,
    innerDiameter = outerDiameter - margin - margin;

var x = d3.scale.linear()
    .range([0, innerDiameter]);

var y = d3.scale.linear()
    .range([0, innerDiameter]);

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(2)
    .size([innerDiameter, innerDiameter])
    .value(function(d) { return d.size; });

// TODO: Change this so that it is appending into the appropriate area on the page
var svg = d3.select("body").append("svg")
    .attr("width", outerDiameter)
    .attr("height", outerDiameter)
  .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

function visualize(root) {
  var focus = root,
      nodes = pack.nodes(root);

  svg.append("g").selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { return zoom(focus == d ? root : d); });

  svg.append("g").selectAll("text")
      .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? null : "none"; })
      .text(function(d) { return d.name; });

  d3.select(window)
      .on("click", function() { zoom(root); });

  function zoom(d, i) {
    var focus0 = focus;
    focus = d;

    var k = innerDiameter / d.r / 2;
    x.domain([d.x - d.r, d.x + d.r]);
    y.domain([d.y - d.r, d.y + d.r]);
    d3.event.stopPropagation();

    var transition = d3.selectAll("text,circle").transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    transition.filter("circle")
        .attr("r", function(d) { return k * d.r; });

    transition.filter("text")
      .filter(function(d) { return d.parent === focus || d.parent === focus0; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }
}

d3.select(self.frameElement).style("height", outerDiameter + "px");

});
