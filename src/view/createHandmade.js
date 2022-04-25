import { container, progressButton } from "../viewComponents"
import { handmadeDuration, getTextById, MakeHandmadeWig } from "../fabrication/handmadeWig"
import { wigMaker } from "../fabrication/makers"
import { fabricatingSubtype } from "../fabrication/fabricatingEnum"

export default (state) => container({ class: "createHandmade" },
  progressButton(
    getTextById(state.handmadeId),
    wigMaker.allowed(state, fabricatingSubtype.hair),
    MakeHandmadeWig,
    handmadeDuration,
    state.handmadeRemaining,
  ))
