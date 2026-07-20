## July 19, 2026
**Runebot v1.0.7-dev.3** [Commit](https://github.com/tarranprior/runebot/commit/3d5fe2ea9bd0c75b8e0744283779625aa9a7282a)

* {https://github.com/tarranprior/runebot/commit/3d5fe2ea9bd0c75b8e0744283779625aa9a7282a} [fixed] 🪲 Update /Runebot/: fix(price) force runtime fallback ephemeral
    - make `ack_runtime_failure` always send ephemeral responses.
    - resolve the `/price` Feeling Lucky selection before deferring so fallback acknowledgements remain valid.
* {https://github.com/tarranprior/runebot/commit/13a8047c83c19aa6bbc72a16acea2a7bcf95745e} [fixed] 🪲 Update /Runebot/: fix(stats) add Maggot King boss mapping
* {https://github.com/tarranprior/runebot/commit/2216c4126697aa3edaed9449f8991ad54fc7d7d4} [improved] 🪲 Update /Runebot/: fix(logging) log colour extraction fallbacks
    - add `log_colour_extraction_failure` for handled colour fallback warnings.
    - record command context, image host, exception type, and `fallback_colour` without interrupting user responses.
* {https://github.com/tarranprior/runebot/commit/7e2ad6b1ca56740c4250dcdb8c6111ca36731f48} [changed] ⚙️ Update /Runebot/: refactor(components) centralise stale control acknowledgements
    - route stale `/stats` and `/price` controls through `ack_component_failure`.
    - remove duplicate acknowledgement and structured logging implementations.
* {https://github.com/tarranprior/runebot/commit/fcd33b748e692ce8742ae11ae8d43911fc45ca8b} [removed] ⚙️ Update /Runebot/: refactor(config) remove obsolete fallback thumbnails
* {https://github.com/tarranprior/runebot/commit/2a5dc77ecc7645fad7f11a779c7a73f137f77c3c} [fixed] 🪲 Update /Runebot/: fix(commands) highlight wiki request failures
* {https://github.com/tarranprior/runebot/commit/f66b40d167f1ed45c3f722e69d9fe6d660bb33de} [fixed] 🪲 Update /Runebot/: fix(stats) correct hiscores request exception mapping
    - map hiscores request failures to `NoHiscoreData`.
    - stop routing stats transport failures through `WikiRequestFailed`.
* {https://github.com/tarranprior/runebot/commit/17536e80b1ac0a7a32b804c9ba1d46d49f3762db} [improved] ⚙️ Update /Runebot/: fix(wikipedia) add embed footer timestamp parity
* {https://github.com/tarranprior/runebot/commit/f017a571b4719663ef3fe6d6c351ff8e14a34f57} [fixed] 🪲 Update /Runebot/: fix(logging) disable rich traceback diagnostics
    - disable rich traceback diagnostics for runtime exception logging.
    - prevent local-variable capture in persisted file and internal log output.
* {https://github.com/tarranprior/runebot/commit/7d1c2e02b7efb7887faf86960c3e7f5ec2b3d3b2} [fixed] 🪲 Update /Runebot/: fix(setrsn) handle max. accounts failure
    - handle `MaximumAccountsReached` as an expected user-visible failure.
    - return the failure response ephemerally without falling through to runtime handling.
* {https://github.com/tarranprior/runebot/commit/de5d8ff8887fe56cca671cf25fa62f6fa9fce099} [fixed] 🪲 Update /Runebot/: fix(stats) split user account failures
    - distinguish a mentioned Discord user without a saved default account using `MentionedUserAccountNonexistent`.
    - keep mentioned-user lookup failures on the expected ephemeral failure path.
* {https://github.com/tarranprior/runebot/commit/32c304b2b0d2481ea22adc3e87b2fe1634b2974d} [improved] 🪲 Update /Runebot/: fix(exceptions) polish usage and permission copy
* {https://github.com/tarranprior/runebot/commit/9a1ea6b70f93eb00a2a7f5035df7272fe9890b82} [added] 🪲 Update /Runebot/: fix(commands) add runtime failure acknowledgement helper
    - add `ack_runtime_failure` for unexpected command failures.
    - reuse the helper across player and search commands for consistent ephemeral acknowledgements.
* {https://github.com/tarranprior/runebot/commit/c60a64c40fb7f750f9d66ae55e218f33f5ed3600} [added] 🪲 Update /Runebot/: fix(components) add reusable failure acknowledgements
    - add `ack_component_failure` for handled component interaction failures.
    - standardise neutral ephemeral responses and failure logging.
* {https://github.com/tarranprior/runebot/commit/1467f91f21a51d89d23ef328369acb7bb4f66b39} [added] 🪲 Update /Runebot/: fix(components) add owner mismatch acknowledgement helper
    - add `ack_wrong_component_user` for controls used by a different Discord user.
    - return a neutral ephemeral acknowledgement and preserve structured component metadata.
* {https://github.com/tarranprior/runebot/commit/65fa62d101d77265d6b5c59efd6b1eba0fb8c652} [improved] 🪲 Update /Runebot/: fix(commands) refine ephemeral responses
* {https://github.com/tarranprior/runebot/commit/e0a563da141c97da2ee98a3a2014a5c5c4f5b3d0} [improved] 🪲 Update /Runebot/: fix(stats) refine ephemeral setup embeds
* {https://github.com/tarranprior/runebot/commit/9bb3543e4152a2a879ee769190f5163e88e53894} [fixed] 🪲 Update /Runebot/: fix(components) acknowledge stale component payloads
    - acknowledge expired `/stats` and `/price` controls with neutral ephemeral responses.
    - capture component prefix and action metadata for structured invalid-component logs.
* {https://github.com/tarranprior/runebot/commit/f0250d3ba674371fd973f0841d955eacd9acc01d} [fixed] 🪲 Update /Runebot/: fix(price) blacklist known `NoPrice` candidates
* {https://github.com/tarranprior/runebot/commit/255e841740c0e9bb1ed1e73dc39f1e88d6c6ed35} [fixed] 🪲 Update /Runebot/: fix(price) add validation to item names
    - validate catalogue item names before slugifying refresh metadata.
    - map missing or empty item names to the existing `NoPrice` soft failure path.
* {https://github.com/tarranprior/runebot/commit/81c7f3e1eed630fec029ede933fc8a7ec4b3ea43} [improved] ⚙️ Update /Runebot/: fix(embeds) add `/setrsn` mention to empty accounts prompt

---

## May 19, 2026
**Runebot v1.0.7-dev.2** [Tag](https://github.com/tarranprior/runebot/releases/tag/v1.0.7-dev.2) [Commit](https://github.com/tarranprior/runebot/commit/80b667d352ca43d87f76d54245cb336800b824ad)

* {https://github.com/tarranprior/runebot/commit/9dc95dbb2430aa763902c457732c2a600e8a7f2e} [fixed] 🪲 Update /Runebot/: fix(wikipedia) restore stub article embed
* {https://github.com/tarranprior/runebot/commit/b5fe86efecf9fdb687f7a6e5a9fb7c0d636d6688} [fixed] 🪲 Update /Runebot/: fix(stats) restore account type mismatch failures
* {https://github.com/tarranprior/runebot/commit/4c92ea53c4f055ea3564308df0e14cbabbfece27} [added] ⚙️ Update /Runebot/: refactor(logging) add shared internal log emission
    - centralise internal log emission behind the shared logging helper.
    - preserve structured context while reducing repeated logging setup across cogs.
* {https://github.com/tarranprior/runebot/commit/fd10becd29701950f7433b54f0ef7deca9a8913b} [changed] ⚙️ Update /Runebot/: refactor(logging) reduce logger boilerplate across `./cogs`

---

## May 17, 2026
**Runebot v1.0.7-dev.1** [Tag](https://github.com/tarranprior/runebot/releases/tag/v1.0.7-dev.1) [Commit](https://github.com/tarranprior/runebot/commit/6e2ee80e01e37712b4c81ec3f8e0931358b1d19d)

* {https://github.com/tarranprior/runebot/commit/2c3eb721994c1afb0a52339cfd6638119c40f7ab} [fixed] 🪲 Update /Runebot/: fix(logging) make internal log ingest idempotent
* {https://github.com/tarranprior/runebot/commit/73a525372feba0852460b5f0c92570f51755c6bb} [fixed] 🪲 Update /Runebot/: fix(logging) harden internal log SQLite connections
    - apply `busy_timeout` consistently across internal log database connections
    - keep WAL setup scoped to schema initialisation
* {https://github.com/tarranprior/runebot/commit/2bdff0b894effbffbbe504f1a0d1159a63b2f2a9} [fixed] 🪲 Update /Runebot/: fix(api) structure internal API failure logs
    - handle client disconnects during JSON response writes as structured warnings
    - add structured context to internal API timeout, persistence, and query failure logs
* {https://github.com/tarranprior/runebot/commit/b56c250dae621f493f6fb454bd299671a5866b98} [added] ⚙️ Update /Runebot/: feat(logging) add guild lifecycle visibility
    - add structured guild join and remove lifecycle logs
    - capture safe guild metadata, counts, locale, features, and bot permission snapshots
    - preserve tokenized lifecycle messages for dashboard parsing
    - log guild persistence failures with structured exception metadata and traceback
* {https://github.com/tarranprior/runebot/commit/7b51ece8e077ad3c94f9431eb2bd9368b5421621} [added] ⚙️ Update /Runebot/: feat(logging) add native time range filters to logs API
* {https://github.com/tarranprior/runebot/commit/2a00261400f04252291609d95d9b660ad7daf402} [added] ⚙️ Update /Runebot/: feat(logging) introduce initial internal logging pipeline
    - add structured Loguru-based logging with internal API ingestion and SQLite persistence
    - add first-class `trace_id` and `session_id` fields for correlating logs across command flows and bot sessions
    - add log session tracking, local log file output, and a `logs/.gitkeep` placeholder
    - add internal log ingest, query, session, and health endpoints for future admin/reporting tooling
    - add reusable logging helpers for consistent command messages, metadata, and `log_params`
    - add command lifecycle logging across search, stats, account, parser, API, and failure flows
    - add structured context for users, guilds, channels, invocation source, resolution source, and expected user-visible failures
    - add runtime configuration for development and production log database paths

---

## March 17, 2026
**Runebot v1.0.6** (Current) [Tag](https://github.com/tarranprior/runebot/releases/tag/v1.0.6) [Commit](https://github.com/tarranprior/runebot/commit/8029d2fff02836508c422d3559d76cc51d1c5a2f)

### March 16, 2026
**Runebot v1.0.6-dev.3** [Tag](https://github.com/tarranprior/runebot/releases/tag/v1.0.6-dev.3) [Commit](https://github.com/tarranprior/runebot/commit/8029d2fff02836508c422d3559d76cc51d1c5a2f)

* {https://github.com/tarranprior/runebot/commit/8029d2fff02836508c422d3559d76cc51d1c5a2f} [fixed] 🪲 Update /Runebot/: fix(price) resolve datetime namespace collision in price timestamps
* {https://github.com/tarranprior/runebot/commit/3a5598c91927149b14e1a0397e57bf7026c5aeb3} [improved] ✨ Update /Runebot/: feat(accounts) refine `/setrsn` and deprecate `/unsetrsn`
    - update `/setrsn` response to reflect default account
    - guide users to Account Manager for multi-account management
    - deregister `/unsetrsn` command registration (deprecate for removal post v1.0.6)
    - update default activity to "/wikipedia — Runebot"
* {https://github.com/tarranprior/runebot/commit/e0e76813dccc2ec4193a8fc14d32a0598dde83ae} [improved] ✨ Update /Runebot/: feat(accounts) update Account Manager and dropdown
    - add account-type emojis to Account Manager dropdown options
    - remove redundant "[default]" marker from account list
    - align dropdown and embed visuals for cleaner account selection UX
* {https://github.com/tarranprior/runebot/commit/6922dd7570cd61e2a06b374341f596d83a4ad388} [added] ✨ Update /Runebot/: feat(accounts) add account delete flow, enhance Account Manager view
    - add refresh and delete controls to the Account Manager view
    - add confirmation and cancel prompts to delete action
    - remove accounts via. database helper
    - reassign the default account automatically after deletion
* {https://github.com/tarranprior/runebot/commit/e51f6c3d457b28e784f511f32fddb0251845b118} [notice] ⚙️ Update /Runebot/: feat(accounts) enforce max. 5 account limit
    - add `MaximumAccountsReached` as a project exception
    - raise an explicit exception when a user attempts to save > 5 accounts
* {https://github.com/tarranprior/runebot/commit/df7ce9bfc4fcc40dc0be31801d8e7d7133d47702} [added] ✨ Update /Runebot/: feat(accounts) introduce account manager (beta), add account switching
    - add an Account Manager (Beta) entrypoint to `/stats`
    - open a dedicated ephemeral account management surface
    - add a dropdown flow for switching the default account

### March 15, 2026
**Runebot v1.0.6-dev.2** [Tag](https://github.com/tarranprior/runebot/releases/tag/v1.0.6-dev.2) [Commit](https://github.com/tarranprior/runebot/commit/5cd88fb5b437a165e9dc39541988690f66430f96)

* {https://github.com/tarranprior/runebot/commit/5cd88fb5b437a165e9dc39541988690f66430f96} [fixed] 🪲 Update /Runebot/: fix(database) restore fresh-db username fallback, prevent case-variant account duplicates
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

### March 14, 2026
**Runebot v1.0.6-dev.1** [Tag](https://github.com/tarranprior/runebot/releases/tag/v1.0.6-dev.1) [Commit](https://github.com/tarranprior/runebot/commit/5c8beb79d9c3c1cceb5d19fe68ec57e001a63907)

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

## March 09, 2026
**Runebot.app**

* {https://github.com/tarranprior/runebot.app/commit/21fce51be693cd3cc52c68aef612a9f83c78b06d} [notice] 🎉 Initial launch of the new Runebot website!

---

## Oct 14, 2023
**Runebot v1.0.5** [Tag](https://github.com/tarranprior/runebot/releases/tag/v1.0.5) [Commit](https://github.com/tarranprior/runebot/commit/6d7b5dbeb58cd1f1a9b5a0b82b8e5437eb5370f5)

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
