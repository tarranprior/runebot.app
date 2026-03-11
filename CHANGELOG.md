## March 10/03/2026
**Runebot v1.0.6** (Current)

* {https://github.com/tarranprior/runebot/commit/767a138f9e1fd85bafdf64e226961f0128ec5202} [improved] ⚙️ Update /Runebot/: feat(ui) add and normalize refresh interaction behaviour across `/price` and `/stats`
    - introduce refresh button for `/price` and `/stats` embeds
    - add reusable `build_loading_button_view()` helper for interaction loading states
    - disable active button while interaction is processing to prevent duplicate clicks
    - standardize refresh behaviour across commands
* {https://github.com/tarranprior/runebot/commit/b6bc4a65eef9ede8fc70f2c65d92ff468ee2c691} [improved] 🛠️ Update /Runebot/: switch to application-based emojis
* {https://github.com/tarranprior/runebot/commit/de8f54022852a84af6346b5cc31a80e0d1668b36} [notice] 🛠️ Update /Runebot/: align Python 3.10 runtime + dependencies
    - bump Python requirement from `^3.8` → `^3.10`
    - add `boto3` as explicit dependency (production requirement)
    - raise requests to `>=2.31.0` (advisory)
    - regenerate lockfile for deterministic installs
    - sync local and production environments
* {https://github.com/tarranprior/runebot/commit/c2eced85a5c281facf84ce33265ff8223cbfffde} [notice] ⚙️ Update /Runebot/: add +3783, update 618 articles in `runebot.db`

---

## March 09, 2026
**Runebot.app**

* [notice] 🎉 Initial launch of the new Runebot website!

---

## Oct 14, 2023
**Runebot v1.0.5**

* [notice] 🎉 Runebot is now a verified Discord application!
* [added] Users can now set a username with `/setrsn` (for use with `/stats` and other future updates.)
* [added] Users can also lookup stats by Discord username.
* [added] New bosses have been added to `/stats`.
* [changed] Rework of `/stats` which now uses buttons to switch between categories. 
* [added] Clue scrolls and bounty hunter scores added to `/stats`.
* [improved] Input validation and exception handling across all commands.
* [added] Timestamps added to applicable embeds.
* [added] Ironmen icons added to `/stats` when searching for IM/HCIM/UIM accounts.

See the release notes @ [https://github.com/tarranprior/runebot/releases/tag/v1.0.5](https://github.com/tarranprior/runebot/releases/tag/v1.0.5)

---

## June 2, 2023

**Runebot v1.0.4**

* [notice] We're now officially live! Invite the bot @ [https://runebot.org/](https://runebot.org/)
* [improved] Full rewrite of code to comply with conventional PEP8 standards and improve performance.
* [added] New `/stats` feature allowing users to lookup a player's stats.
* [improved] More robust searching mechanism to prevent inaccurate "*Nonexistent*" errors.
* [added] Autocomplete support for all available commands (`/wikipedia`, `/price`, `/quests` etc.)
* [added] Footer added to all applicable embeds.

See the release notes @ [https://github.com/tarranprior/runebot/releases/tag/v1.0.4](https://github.com/tarranprior/runebot/releases/tag/v1.0.4)
