/* eslint-disable import/no-unresolved */
import buttonSound from "url:./multimedia_button_click_028.mp3"
import toggleSound from "url:./multimedia_button_click_013.mp3"
import lowPowerSound from "url:./lesser_vibes_HTIS_Power_Down_01_029.mp3"
import tabChangeSound from "url:./multimedia_button_click_007.mp3"
import meshIterationSound from "url:./zapsplat_multimedia_game_sound_positive_action_tone_022_25081.mp3"
import researchCompleteSound from "url:./zapsplat_multimedia_alert_double_click_66567.mp3"
import theEndSound from "url:./zapsplat_multimedia_game_sound_pause_music_loop_soft_chime_calm_70247 - short.mp3"
import incidentSound from "url:./zapsplat_multimedia_alert_notification_ui_ping_chime_mallet_like_error_002_65663.mp3"
import pauseSound from "url:./multimedia_rollover_038.mp3"
import startSound from "url:./zapsplat_multimedia_alert_prompt_ui_mallet_simple_hit_notification_two_tone_70218.mp3"
import computeZeroSound from "url:./zapsplat_multimedia_alert_short_bold_musical_warm_attention_warning_73077.mp3"
import meshModeSound from "url:./zapsplat_magic_wand_zap_spark_power_004_12554.mp3"
import AudioPlayer from "./audioPlayer"
import { audioIds } from "."

export default [
  new AudioPlayer(audioIds.button, new Audio(buttonSound), 0.3, false),
  new AudioPlayer(audioIds.toggle, new Audio(toggleSound), 1, false),
  new AudioPlayer(audioIds.lowPower, new Audio(lowPowerSound), 0.9, false),
  new AudioPlayer(audioIds.tabChange, new Audio(tabChangeSound), 0.5, false),
  new AudioPlayer(audioIds.titlesNav, new Audio(buttonSound), 0.2, false),
  new AudioPlayer(audioIds.meshIteration, new Audio(meshIterationSound), 0.4, false),
  new AudioPlayer(audioIds.researchComplete, new Audio(researchCompleteSound), 1, false),
  new AudioPlayer(audioIds.theEnd, new Audio(theEndSound), 0.7, true),
  new AudioPlayer(audioIds.incident, new Audio(incidentSound), 1, false),
  new AudioPlayer(audioIds.pause, new Audio(pauseSound), 1, false),
  new AudioPlayer(audioIds.start, new Audio(startSound), 1, false),
  new AudioPlayer(audioIds.computeZero, new Audio(computeZeroSound), 0.6, false),
  new AudioPlayer(audioIds.meshMode, new Audio(meshModeSound), 1, false),
]
