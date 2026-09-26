## Cheats, buildings and UI

- **OI-01:** Chat commands use `/`; `/testersrights` enables testing rights. Data lives in `CA_DT_Cheats`; implementation in `CA_ServerCheatsComponent` on BP_RTSController. Row Name must match the Cheat field. Add `ExecuteCheat_*` functions and connect them through `ExecuteCheat`. Use public interfaces rather than bypassing private state.
- **OI-03:** IndividualTag links a Blueprint to `DT_Objects_info` (Class, Icon, Description, Name). Construction/Destruction mesh arrays need at least one entry and follow Health from 0 to 100%. Spline buildings require PillarsMeshes. Costs use RequiredResources and, for splines, CostUnitDistance. StabilityComponent holds Init Max Value.
- **OI-03:** Building storage is documented as a proxy for PlayerState storage, not a regular bounded individual store. Add ResourceProduction and WorkersComponent only where needed. Production recipes must also exist in the production table.
- **OI-04:** `BP_Submenu_Buildings` contains Page Manager, MenuPage and index-aligned Pages. The documented limit is ten buttons per submenu. Missing Class in `DT_Objects_info` prevents spawn/cost resolution. A red devil placeholder indicates a missing icon. The Granary example uses `Building.Category.Communal.Granary`.

## Components and attributes

OI-17, dated **10 September 2026**, is a newer architecture source than older design notes.

- Abstract `BaseAttributeComponent` encapsulates a float value, MaxValue, initialisation and optional regeneration. Attribute components manage values; other systems decide gameplay triggers.
- `UpdateValue(Delta)` resets the regeneration timer and calls SetValue. `SetValue` calls SetValueSilent and broadcasts OnAttributeValueChanged. `SetValueSilent` clamps between 0 and MaxValue without broadcasting. These functions are not interchangeable.
- Dispatchers include OnAttributeValueChanged (Value, DeltaValue, MaxValue), OnMaxValueUpdated and OnInitComplete. Overrides must preserve relevant events or UI and components may stop updating.
- **HealthComponent:** At zero the Actor is dead, ordinary external healing stops and regeneration ends. TryToRestoreHealth uses SetValue, so it does not reset the regeneration timer. There are dedicated events for damage, block, evade, death and UnderAttack.
- **StabilityComponent:** Inherits from HealthComponent, can recover from zero and uses neither evade nor block. ConstructionComplete remains set after initial completion, including after damage; otherwise appearance would incorrectly revert to construction. Terrain can affect HP. This does not establish that all resistances are disabled.
- **ExperienceComponent:** Separates committed Experience and AccumulatedExp. ManualLevelUpOnly buffers experience until ManualLevelUpRequest. Overflow can cause multiple levels. Threshold formula: y=kx+b from level 2; level 1 is the starting level.
- **Morale:** Regenerates towards a baseline in both directions, not towards maximum. ApplyMoraleEvent uses DT_CA_MoraleEvents. Gameplay responses belong in MoraleListenerComponent.
- **Stamina:** ReduceStamina consumes it; regeneration runs between StartRest and StopRest. Rest parameters may be overridden per instance and reset.

## Damage system

OI-11 describes the technical snapshot of **23 June 2026**.

- Damage type `CA_DamageType` (Physical/Fire) is separate from delivery `E_CA_DamageDeliveryType` (Melee/RangedSmallProjectile/RangedLargeProjectile).
- DefenseComponent keeps Block/Evade maps by delivery and Resistance by DamageType; getters combine base values and modifiers.
- Standard attacks call ApplyDamage and HealthComponent on the server. Delivery/Piercing come from the DamageCauser through `BPI_DamageDealer`. Melee checks Accuracy; projectile impact determines a ranged hit in the documented implementation.
- StatusEffectsManagerComponent creates, maintains and removes dynamic effect components. `BPI_StatusEffectTarget` decouples reactions and removal. New effects need lifecycle events and relevant OnStart/OnEnd reactions.
- Burn is documented as an indefinite periodic effect that must be explicitly removed.
- ApplyEffectDamage is a separate server path: Resistance applies, Evade/Block do not. It avoids reapplying the same effect on every tick. OI-17 adds that Effect Damage does not trigger UnderAttack.
- **Unresolved:** OI-11 pages 6/12 describe Piercing as a portion of damage bypassing block, but page 7 says it reduces block chance. Older Trello notes also mention chance reduction. Do not merge these interpretations without checking current implementation.
- Kinetic impact, Attack speed and Anim notify on pages 15–17 are explicitly under development.

## Materials, assets and levels

- **OI-02:** Reuse existing atlases/trimsheets and plan materials to reduce draw calls and file sizes. CA_M_TownProps, CA_M_Props02 and CA_M_Siege are examples in this snapshot. No healthbar material graph is established here.
- **OI-07:** Manageable historical maps based on geographic data, with regional biomes. The pipeline goes from XYZ through CloudCompare and DCC/heightmaps into Unreal, then covers automaterial, boundaries, fog, water, navmesh, Ultra Dynamic Sky/Weather, animals, player/NPC camps and travellers. Several methods are experimental or incomplete.
- **OI-09:** Metahuman export, material preparation, texture baking, a combined UV map, preserved skeleton names and removal of hidden geometry. Consult original screenshots for exact steps.
- **OI-10:** Design feasibility, agreed concept art, 3D work, optimisation, baking/texturing, implementation and QA form one pipeline. Consider historical character, consistency and performance early.
- **OI-13:** Role colours: red for military; orange for siege/construction; blue for agents/Church; light green for civilians/domestic animals; dark green for wildlife. Outer ring shows main class, inner ring subclass; lords use gold accents. These are not player colours.

## Collaboration and engineering practice

- **OI-05:** References `https://github.com/Hannes821/Castellum` and UE 5.2 plugins including Journeymans Minimap, Advanced Sessions and Steam Advanced Sessions. Paths and compiler requirements are not yet a complete validated installation guide.
- **OI-06:** Trello claims, personal WIP assignment, coordination, submission, review and Done.
- **OI-08:** Small functions, reusable data structures, components/inheritance, and delegates or event dispatchers instead of unnecessary hard references. Naming conventions refer to the DevSheet.
- **OI-12:** Integrate Main into the working branch first, preserve intended work, open/compile/test, close the editor, check unintended changes, describe and submit. Never infer permission to discard uncommitted work.
- **OI-15:** A short outline, not proof of a complete documented networking architecture.
- **OI-16:** Calendar sharing, then-Friday team meetings and individual 1:1s. Confirm the current schedule before planning meetings.
