/**
 * Available cursor images and configurations.
 * Each cursor config defines hotspot offsets so the visual cursor aligns with the click point.
 */

export type CursorConfig = {
  id: string;
  src: string;
  width: number;
  height: number;
  hotspotX: number;
  hotspotY: number;
};

/**
 * Cursor library - add or remove cursors here.
 * The system will randomly select from this list when the custom cursor is enabled.
 */
export const CURSORS: CursorConfig[] = [
  { id: "abby_head", src: "/images/cursors/abby_head.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "agility_skill_cape", src: "/images/cursors/agility_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "ahrims_hood", src: "/images/cursors/ahrims_hood.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "ahrims_robe_skirt", src: "/images/cursors/ahrims_robe_skirt.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "ahrims_robe_top", src: "/images/cursors/ahrims_robe_top.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "ahrims_staff", src: "/images/cursors/ahrims_staff.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "ancient_staff", src: "/images/cursors/ancient_staff.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "ancientstaff", src: "/images/cursors/ancientstaff.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "anti_dragon_shield", src: "/images/cursors/anti_dragon_shield.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "attack_skill_cape", src: "/images/cursors/attack_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "bandos_godsword", src: "/images/cursors/bandos_godsword.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "black_cat", src: "/images/cursors/black_cat.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "black_cav", src: "/images/cursors/black_cav.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "black_mask", src: "/images/cursors/black_mask.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "blue_hween_mask", src: "/images/cursors/blue_hween_mask.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "blue_party_hat", src: "/images/cursors/blue_party_hat.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "chrismas_cracker", src: "/images/cursors/chrismas_cracker.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "coins", src: "/images/cursors/coins.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "construction_skill_cape", src: "/images/cursors/construction_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "cooked_shark", src: "/images/cursors/cooked_shark.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "cooking_skill_cape", src: "/images/cursors/cooking_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "crystal_bow", src: "/images/cursors/crystal_bow.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "d_fire_shield", src: "/images/cursors/d_fire_shield.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "d_full_helm", src: "/images/cursors/d_full_helm.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "d_med", src: "/images/cursors/d_med.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "d_skimmy", src: "/images/cursors/d_skimmy.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dark_bow", src: "/images/cursors/dark_bow.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "defence_skill_cape", src: "/images/cursors/defence_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dharok_helmet", src: "/images/cursors/dharok_helmet.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dharok_plate_body", src: "/images/cursors/dharok_plate_body.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dharok_plate_legs", src: "/images/cursors/dharok_plate_legs.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_axe", src: "/images/cursors/dragon_axe.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_chainbody", src: "/images/cursors/dragon_chainbody.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_dagger", src: "/images/cursors/dragon_dagger.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_hally", src: "/images/cursors/dragon_hally.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_mace", src: "/images/cursors/dragon_mace.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_plate_legs", src: "/images/cursors/dragon_plate_legs.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_plate_skirt", src: "/images/cursors/dragon_plate_skirt.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_shield", src: "/images/cursors/dragon_shield.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_spear", src: "/images/cursors/dragon_spear.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "dragon_stone", src: "/images/cursors/dragon_stone.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "easter_egg", src: "/images/cursors/easter_egg.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "fire_cape", src: "/images/cursors/fire_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "fletching_skill_cape", src: "/images/cursors/fletching_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "g_maul", src: "/images/cursors/g_maul.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "green_hween_mask", src: "/images/cursors/green_h'ween_mask.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "green_phat", src: "/images/cursors/green_phat.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "guthans_chainskirt", src: "/images/cursors/guthans_chainskirt.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "guthans_helm", src: "/images/cursors/guthans_helm.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "guthans_plate_body", src: "/images/cursors/guthans_plate_body.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "guthix_staff", src: "/images/cursors/guthix_staff.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "hitpoint_skill_cape", src: "/images/cursors/hitpoint_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "hunter_skill_cape", src: "/images/cursors/hunter_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "infinity_hat", src: "/images/cursors/infinity_hat.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "k_bow", src: "/images/cursors/k_bow.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "k_coif", src: "/images/cursors/k_coif.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "k_skirt", src: "/images/cursors/k_skirt.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "k_top", src: "/images/cursors/k_top.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "key", src: "/images/cursors/key.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "lobster", src: "/images/cursors/lobster.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "mage_book", src: "/images/cursors/mage_book.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "masterwand", src: "/images/cursors/masterwand.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "monk_fish", src: "/images/cursors/monk_fish.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "mystic_mud_staff", src: "/images/cursors/mystic_mud_staff.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "obby_maul", src: "/images/cursors/obby_maul.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "one_of_the_barrows_brothers_spear", src: "/images/cursors/one_of_the_barrows_brother's_spear.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "partyhat", src: "/images/cursors/partyhat.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "purple_phat", src: "/images/cursors/purple_phat.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "quest_point_cape", src: "/images/cursors/quest_point_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "range_skill_cape", src: "/images/cursors/range_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "red_chinchompa", src: "/images/cursors/red_chinchompa.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "red_halloween_mask", src: "/images/cursors/red_halloween_mask.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "robbin_hood_hat_1", src: "/images/cursors/robbin_hood_hat_1.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "robbin_hood_hat_2", src: "/images/cursors/robbin_hood_hat_2.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "santa_hat", src: "/images/cursors/santa_hat.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "sara_crozier", src: "/images/cursors/sara_crozier.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "sara_staff", src: "/images/cursors/sara_staff.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "scythe", src: "/images/cursors/scythe.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "strength_skill_cape", src: "/images/cursors/strength_skill_cape.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "suqah_tooth", src: "/images/cursors/suqah_tooth.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "torag_hammers", src: "/images/cursors/torag_hammers.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "v_brassy", src: "/images/cursors/v_brassy.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "v_flail", src: "/images/cursors/v_flail.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "v_helm", src: "/images/cursors/v_helm.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "v_skirt", src: "/images/cursors/v_skirt.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "whip", src: "/images/cursors/whip.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "white_phat", src: "/images/cursors/white_phat.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "yellow_phat", src: "/images/cursors/yellow_phat.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "zammy_spear", src: "/images/cursors/zammy_spear.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
  { id: "zammy_staff", src: "/images/cursors/zammy_staff.cur", width: 32, height: 32, hotspotX: 0, hotspotY: 0 },
];

/**
 * Get a random cursor from the library.
 */
export function getRandomCursor(): CursorConfig {
  return CURSORS[Math.floor(Math.random() * CURSORS.length)];
}

/**
 * Get a cursor by id, or return the first one as fallback.
 */
export function getCursorById(id: string): CursorConfig {
  return CURSORS.find((c) => c.id === id) || CURSORS[0];
}
