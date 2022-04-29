import { audioIds, enqueueAudio } from '../audio'
import { effectWithPayload } from '../utils/hyperAppHelpers'
import { sceneTempFlags } from './sceneTempFlags'

export const scenes = {
  titles: 0,
  main: 1,
  import: 2,
  options: 3,
  theEnd: 4,
  credits: 5
}
export const changeSceneTransform = (scene) => ({ scene, sceneTemp: sceneTempFlags.none })

export const ChangeScene = (state, scene) => [{ ...state, ...changeSceneTransform(scene) }, enqueueAudio(audioIds.titlesNav)]
export const changeScene = (scene) => [effectWithPayload, { action: ChangeScene, payload: scene }]
