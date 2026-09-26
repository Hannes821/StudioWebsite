## Documentation requiring attention

1. **FF-OI-14:** The title is Virtual Runtime Textures, but pages 2–4 contain UI icon instructions. Text inspection and a visual check of page 2 confirm the mismatch. Do not use it as an RVT guide.
2. **FF-OI-08 / FF-OI-09:** Inner titles incorrectly refer to FF-OI-05 and FF-OI-10 respectively. Use the filename, header and topic for identification pending correction.
3. **FF-OI-11:** Pages 6 and 12 describe Piercing as a `BaseDamage × PiercingPercent` portion bypassing block. Page 7 describes reduced block chance. Check current Blueprints or an explicit design decision before resolving this. Three final chapters remain under development.
4. **FF-OI-05:** The plugin path and dependency list are incomplete or unconfirmed.
5. **FF-OI-07:** Older UE4 references and an explicitly UE-5.5+ Nav Link note must not be applied to UE 5.2 without checking. Layer and heightmap settings are context-dependent.
6. **FF-OI-13 / FF-OI-15:** Buildings, Resources and Actions are only headings in OI-13. Advanced Sessions and Syncing are barely developed in OI-15.

## Healthbar verification

The current Unreal project has not been inspected for healthbar light emission. Check the actual material, widget space and lighting settings. [Working context](healthbar.html).
