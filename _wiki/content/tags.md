## Tag hierarchy

`GameplayTags` describes Units, Buildings, Resources, Buttons and Landscape. It covers military units, civilians, animals, agents, siege equipment, actions, formations and behaviours. Source examples include `Unit.military`, `Unit.Siege.Ram` and `Unit.AnimalWild.Wolf`.

## Type and function

A specific Actor type is separate from additional functional tags assigned alongside it. `GameplayTags!B187:H198` includes Watersource, AddonWall/Gate/Tower, Earthworks, Stone, Wood, OnGras, OnRock, OnStone and NeedsWater. These relate to placement, damage, flammability and water.

Capitalisation and spelling vary in the sheet. Do not invent canonical paths or silently normalise identifiers. Check the actual Unreal tag configuration before implementation.

The building submenu example in [FF-OI-04](oi-04.html) uses `Building.Category.Communal.Granary`; older table paths should not override that example without verification.
