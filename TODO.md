### Todo
- [ ] Enhance the user experience (UX).
- [ ] Undertake a complete redesign of the factory page.
- [ ] Implement search list caching to boost performance.
- [ ] Create individual pages for each good and component, displaying all available game data.
- [ ] Create individual pages for each turret, displaying all available game data.
- [x] Develop a blueprint saving system for turrets:
   - [ ] Support a 5MB history length.
   - [ ] Notify the user when storage space is insufficient, and provide a list of turrets for deletion.
- [ ] Migrate from `LocalStorage` to `IndexedDB`
- [ ] Add tabs for turret lists

### Research
- [ ] Investigate and implement a method for constructing turrets and goods based on game files (currently, all data is manually writen).
- [ ] Galaxy map with stations locations
    - [ ] Generate map the same way as game generates it
    - [ ] Use seed provided by game server (`/seed` command in the game)