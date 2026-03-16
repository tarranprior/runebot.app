## March 16, 2026
**Runebot v1.0.6-dev.3**

* {https://github.com/tarranprior/runebot/commit/e51f6c3d457b28e784f511f32fddb0251845b118} [notice] ⚙️ Update /Runebot/: feat(accounts) enforce max. 5 account limit
    - add `MaximumAccountsReached` as a project exception
    - raise an explicit exception when a user attempts to save > 5 accounts
* {https://github.com/tarranprior/runebot/commit/df7ce9bfc4fcc40dc0be31801d8e7d7133d47702} [added] ✨ Update /Runebot/: feat(accounts) introduce account manager (beta), add account switching
    - add an Account Manager (Beta) entrypoint to `/stats`
    - open a dedicated ephemeral account management surface
    - add a dropdown flow for switching the default account

---

## March 15, 2026
**Runebot v1.0.6-dev.2**

* {https://github.com/tarranprior/runebot/commit/5cd88fb5b437a165e9dc39541988690f66430f96} [notice] 🪲 Update /Runebot/: fix(database) restore fresh-db username fallback, prevent case-variant account duplicates
    - remove completed multi-account migration runtime hook from startup
    - prevent duplicate saved accounts when username case is different
    - fix guild ID tuple flattening and suggestion return typing
* {https://github.com/tarranprior/runebot/commit/89538e2f8bc1b0e49414cbb84b7619aa46d7d4a6} [improved] ✨ Update /Runebot/: feat(players) update `/setrsn` and `/unsetrsn` for multi-account behaviour
    - align `/setrsn` to support multiple accounts per user
    - align `/unsetrsn` to clear all saved usernames for a user
* {https://github.com/tarranprior/runebot/commit/885bc44b4b0e30c5af2c4e00a54e28878689eb4e} [added] ✨ Update /Runebot/: feat(accounts) prepare multi-profile player schema and unset flow
    - introduce `user_accounts` storage for multi-account player support
    - add `default_account_id` to preserve a user's active/default profile
    - add migration and backfill logic for existing `all_users` records
    - enable WAL mode and foreign key support during startup
    - introduce account lookup and default-account helpers
* {https://github.com/tarranprior/runebot/commit/444a1dcce29efc52cb2b6770838f99a4a45fa355} [added] ✨ Update /Runebot/: feat(runelite) introduce pilot ingest for future RuneLite integrations

---

## March 10, 2026
**Runebot v1.0.6-dev.1**

* {https://github.com/tarranprior/runebot/commit/5c8beb79d9c3c1cceb5d19fe68ec57e001a63907} [added] ✨ Update /Runebot/: feat(api) expose public community stats endpoint
    - add public `/community-stats` route for website consumption
    - retain `/api/internal/community-stats` with bearer authentication (for later updates)
    - refactor handler to share payload generation logic
    - add request path parsing to support query strings
    - improve API logging and error handling
* {https://github.com/tarranprior/runebot/commit/41665c600dbc075d95230f870f16f34b0fa4ba20} [added] 🛠️ Update /Runebot/: feat(runtime) add internal stats API and runtime community metrics
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

## March 14, 2026
**Runebot.app**

* {https://github.com/tarranprior/runebot.app/commit/a0fb333373fb075f7ac1e000368478dea179bc15} [added] ✨ Update /Runebot.app/: feat(changelog) add development section and improve timeline structure
    - separate unreleased builds from release history
    - add "Development" section for dev versions (i.e., `v1.0.6-dev.1`)
    - improve changelog parser IDs for stable anchors
    - simplify timeline rendering and remove duplicate text block
    - update `CHANGELOG.md` entries for recent Runebot and website updates
* {https://github.com/tarranprior/runebot.app/commit/297172c0e05136cb2be7010f248654f6c9c12d23} [improved] ⚙️ Update /Runebot.app/: feat(stats) fetch community stats from public API
    - replace generated JSON stats pipeline with runtime API fetch
    - add server-only fetch helper with Next.js revalidation
    - split Statistics component into server wrapper and client UI
    - remove generated stats file and generator script
    - remove GitHub Actions workflow previously used to update stats
    - site now reads live stats from `api.runebot.app/community-stats`
* {https://github.com/tarranprior/runebot.app/commit/eeebfa8fcdcf4d9d967fcec955843b163a6e2b14} [added] ✨ Update /Runebot.app/: feat(stats) add stats pipeline and static stats section

---

## March 09, 2026
**Runebot.app**

* {https://github.com/tarranprior/runebot.app/commit/21fce51be693cd3cc52c68aef612a9f83c78b06d} [notice] 🎉 Initial launch of the new Runebot website!

---

## Oct 14, 2023
**Runebot v1.0.5** (Current)

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
