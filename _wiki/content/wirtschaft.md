## Population and Popularity

The `GameSystems` sheet describes Popularity on a 0–100 scale, food rations and variety, housing, water, beer, festivals and sermons. The draft requires available beds, food, water and Popularity above 50 for immigration. Low Popularity can lead to emigration or revolt.

Several storage-location fields explicitly say `Game Instance?`. These are open design notes, not confirmed architecture decisions.

## Renown and influence

Renown is considered separately for nobles, bandits, the Church, merchants and knightly orders. Proposed consequences include support, trade privileges, fiefs, sanctions, excommunication, raids and crusades. Episcopal elections and Church influence are also described.

Source: `GameSystems`, particularly rows 3–100 and the subsequent system entries.

## Buildings and production

`Buildings` records terrain requirements, water needs, grid dimensions, costs, construction time, add-ons, worker assignment, Behaviour Trees and UI connections. `ResCycle` and `ResourceSpawner` link natural deposits, raw materials, processing, storage and transport.

Economy and unit production are closely connected: wood, for example, becomes weapons and equipment. For technical building setup, see [FF-OI-03](oi-03.html).
