//get all player BFstats 
$.ajax({
	// need to take 
	url: "http://api.bf4stats.com/api/playerInfo?plat=pc&name=AELIUZ&output=js",
	dataType: "jsonp"
	});


// var maketimeline = function(data) {
//     $(document).ready(function () {
//     //JSONP timeline object will store JSON fetched from The Guardian API
    
//desired JSON output example
B4JSON{
 "name": "Kills",
 "children": [
    {
	   "name": "Weapons",
	   "children": [
	      {"name": "AgglomerativeCluster", "size": 3938},
	      {"name": "CommunityStructure", "size": 3812},
	      {"name": "HierarchicalCluster", "size": 6714},
	      {"name": "MergeEdge", "size": 743}
    	]
    }
  {
	     "name": "Vehicles",
	     "children": [
	      {"name": "tank", "size": 3534},
	      {"name": "LinkDistance", "size": 5731},
	      {"name": "MaxFlowMinCut", "size": 7840},
	      {"name": "ShortestPaths", "size": 5914},
	      {"name": "SpanningTree", "size": 3416}
     ]
    }  
			] 
}

//convert data into desired d3 JSON output
    _.each(data.response.results, function(article, i){
        //creating new article object and appending data into 'date' array
        articleJSON.timeline.date.push({
            startDate: article.webPublicationDate,
            headline: article.fields.headline,
            text: article.fields.standfirst,
            asset: {
                media: article.fields.thumbnail,
                caption: article.webUrl
            }
        });
    });

