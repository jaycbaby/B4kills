//get all player BFstats 
$.ajax({
	// need to take 
	url: "http://api.bf4stats.com/api/playerInfo?plat=pc&name=AELIUZ&output=js",
	dataType: "jsonp"
	});


var maketimeline = function(data) {
    $(document).ready(function () {
    //JSONP timeline object will store JSON fetched from The Guardian API
    
//desired JSON output example
{
	"user": "",
	"kills": [
	{
	"name": "Weapons",
	   	"children": [
    		{
     		"name": "Weapons",
     		"children": [
		    	{"name": "Weapon1", "size": 3938},
		    	{"name": "Weapon2", "size": 3812}
		    ]
    		},
    {
   	"name": "Vehicles",
     	"children": [
		      {"name": "Tank", "size": 3534},
		      {"name": "Helicopter", "size": 5731}
     ]
    }
     ]
    }
   ]
  },
    //empty date array that will hold new article objects
    "date": []
        }
    };



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

