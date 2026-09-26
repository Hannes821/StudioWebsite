## Three distinct levels

1. Major gameplay faction families: Latins, Byzantines, Seljuks, Almohads and Mongols (`DLC_Factions`).
2. Regional variants within the Latin world: Normannic/Western, German/Central, Occitan/Southern, Nordic and Eastern (Developer Overview, slides 16–29).
3. Specific houses, cities and orders with selection names, banner materials, regions, languages and playable flags (`Factions`, `BannerMI`, `Provinces`). The many rows in `Factions` do not represent equally many completely different gameplay factions.

## Design profiles in the Developer Overview

| Region / family | Documented design profile | Language in the deck |
|---|---|---|
| Western Europe | Heavy cavalry, crossbows/longbows, Latin canon law, crusade politics, tournaments | Norman French |
| Central Europe | Defence and economy, legal pluralism and court assemblies | Middle High German |
| Northern Europe | Infantry, Popularity and raids, Volketing | Norse |
| Southern Europe | Defence and religion, Inquisition | Occitan |
| Byzantines | Versatile weapon combinations, bureaucracy and support from Constantinople | Middle Greek |
| Seljuks | Cavalry and field control, Iqta with autonomous allied rulers | Written as “Old Trukic” in the deck |
| Almohads | Religion, infantry, defence and skirmishing, religious centralism | Amazigh |
| Mongols | Raids, taking over buildings, camps instead of conventional castle building, fear and Tengrism | Middle Mongolian |

These are design descriptions from slides 26–33, not newly validated historical assessments. The Mongol profile explicitly uses warriors and camps rather than ordinary villagers.

## Banner colours

`Factions!E1` documents eight banner colour identifiers: silver 1–4 and gold 5–8, each paired with red, blue, green or black. Do not assume these identifiers equal runtime player indices or Custom Stencil values.

The language assigned to the Almohads differs between sources: `DLC_Factions` says Arabic, while the Developer Overview says Amazigh. Keep this visible until the design is resolved.
