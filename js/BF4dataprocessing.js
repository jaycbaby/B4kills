//make ajax call to BFstats API



//convert data into desired d3 JSON output



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
     "name": "graph",
     "children": [
      {"name": "BetweennessCentrality", "size": 3534},
      {"name": "LinkDistance", "size": 5731},
      {"name": "MaxFlowMinCut", "size": 7840},
      {"name": "ShortestPaths", "size": 5914},
      {"name": "SpanningTree", "size": 3416}
     ]
    },
    {
     "name": "optimization",
     "children": [
      {"name": "AspectRatioBanker", "size": 7074}
     ]
    }
   ]
  },