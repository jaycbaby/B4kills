D3 Data Visualization- Battlefield 4 stats
=======

Pulling player stats from unofficial Battlefield 4 database to allow players to visualize their (or their friends') kill distribution. 

Features:
- selectable platforms (PS4, XB One, etc) 
- 3 layers of visualization: 
    //kills favoring either weapons or vehicles
    //weapon class (snipers, LMGs, assault) or vehicle category (helicopter, boat)
    //specific weapons (AK-47, M-60) or vehicles (AC-130 Gunship)

Key challenges:
- parsing JSON to D3-friendly format (accomplished)
- no real-time data available from bf4 database (no control over this)

To do's:
- add tooltips to dynamically display assets, descriptions and total count of each individual weapon
