import { allowed, costTransform } from "./hairWigMakeCost"
import { allowedCheck } from "../utils/hyperAppHelpers"
import { wigMakeLogTransform } from "./wigLogMessages"
import { randomInt } from "../utils/random"
import { audioIds, enqueueAudio } from "../audio"

export const handmadeDuration = 4 * 1000

const mappings = ["a beautiful", "a marvelous", "a fabulous", "a remarkable", "a distinguished", "an extraordinary",
  "a charming", "an outstanding", "a fancy", "a dapper", "an elegant", "a stupendous", "an amazing", "a spectacular",
  "a quaint", "a roguish", "an admirable", "an amiable", "an astonishing", "an astounding", "a fantastic", "a monumental",
  "a smashing", "a superb", "a terrific", "a wondrous", "a miraculous", "a breathtaking", "a stunning", "a tremendous", "a phenomenal",
].map((t) => `Create ${t} wig`).concat([
  "Create a wig of distinction",
  "Create a wig to behold",
])

export const getTextById = (id) => mappings[id]
export const getNext = (last) => {
  const next = randomInt(0, mappings.length - 1)
  if (next !== last) { return next }
  return (next + 1) % mappings.length
}

export const handmadeMaking = (state) => state.handmadeRemaining > 0

const MakeHandmadeWigActual = (state) => [({
  ...state,
  ...costTransform(state, 1),
  handmadeRemaining: handmadeDuration,
}), enqueueAudio(audioIds.button)]
export const MakeHandmadeWig = () => allowedCheck(allowed, MakeHandmadeWigActual)

const StoppedMakingHandmadeWig = (state) => ({
  ...state,
  wigs: state.wigs + 1,
  wigsMade: state.wigsMade + 1,
  wigsHair: state.wigsHair + 1,
  handmadeRemaining: 0,
  handmadeId: getNext(state.handmadeId),
  ...wigMakeLogTransform(state, 1),
})

export const MakeHandmadeUpdate = (state, deltaTime) => {
  let { handmadeRemaining } = state
  if (handmadeRemaining === 0) { return state }

  handmadeRemaining -= deltaTime

  return handmadeRemaining < 0 ? StoppedMakingHandmadeWig : { ...state, handmadeRemaining }
}
