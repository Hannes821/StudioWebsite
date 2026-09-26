## Project foundations

**Unreal Engine 5.2** remains the confirmed project version. MasterUnit, MasterBuilding, Behaviour Trees, GameInstance, UI and resource logic are established project concepts. Developer Overview slide 2 lists delegates instead of casts, UI refactoring and replacement of old template logic as development topics.

## Combat sources

Trello card 137, `Battle Damage System`, describes separate melee/ranged block chances and Piercing as reducing block chance in its newer text. Experience slightly improves values. The intended direction is simple, credible combat without excessive health pools.

The card explicitly separates earlier concepts under “Old below”. Do not treat those older numbers as current. `DMGSys` contains earlier weight- and equipment-based calculations, so values need checking against the actual code before implementation.

## Technical detail

Use [Damage System, FF-OI-11](oi-11.html) and the newer [Attribute Components, FF-OI-17](oi-17.html). The conflicting Piercing descriptions are recorded under [Open questions](klaerungen.html).
