## Milestones in the Developer Overview

| Stage | Documented target |
|---|---|
| Proof of Concept | Join, win/lose, build, assign units, fight, basic classes/counters, resources and budget, save/load |
| Vertical Slice | Finished map, audio, gameplay UI including selection markers, behaviours, Norman variant |
| Alpha | Feature complete, at least five handcrafted maps, Occitan and German variants |
| Beta | More maps, map generator, scenario editor, Ranked, mods |
| Gold | Testing, feedback, polish, tutorial and main campaign |

Source: Developer Overview slides 15–19. These are planning targets rather than release commitments or proof that every feature is complete.

## Differences to preserve

- The old pitch says “Early Medieval”; the current project/GDD context is the High Middle Ages around 1200.
- The older GDD sometimes used different Alpha/Beta definitions. Developer Overview and Trello use Alpha as Feature Complete and Beta as Content Complete.
- The deck groups DLCs as New Lands, East, South and Raiders. Trello numbers Western Regions, Byzantines, Seljuks, Mongols and Almohads differently. The deck also mentions Mamluks.
- `DLC_Factions` gives Arabic for Almohads; the Developer Overview gives Amazigh.
- Some apparent numeric fields are read as dates, including `DMGSys!N4`, `DMGSys!Q3` and `GameSystems!I22`. Earlier Excel auto-conversion is possible; do not guess the intended numbers.
- Language review and implementation are at different stages. The annual review does not establish that every associated feature is finished.
