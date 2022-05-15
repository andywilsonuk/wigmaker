import { fabricatingSubtype, fabricatingIndex } from './fabricatingEnum'
import { achievedLookup, research } from '../shared/milestones'
import { audioIds, enqueueAudio } from '../audio'

const getDemand = ({
  orders: [wigHairOrders, wigNylonOrders, wigSiliconeOrders, wigAlgaeOrders, wigSmartOrders],
  wigsHair, wigsNylon, wigsSilicone, wigsAlgae, wigsSmart
}) => {
  let demand = [
    { subtype: fabricatingSubtype.hair, orders: Math.max(0, wigHairOrders - wigsHair) },
    { subtype: fabricatingSubtype.nylon, orders: Math.max(0, wigNylonOrders - wigsNylon) },
    { subtype: fabricatingSubtype.silicone, orders: Math.max(0, wigSiliconeOrders - wigsSilicone) },
    { subtype: fabricatingSubtype.algae, orders: Math.max(0, wigAlgaeOrders - wigsAlgae) },
    { subtype: fabricatingSubtype.smart, orders: Math.max(0, wigSmartOrders - wigsSmart) }
  ].filter((d) => d.orders > 100)
  demand = demand.sort((a, b) => b.orders - a.orders)
  return demand.map((x) => x.subtype)
}

const getLatest = ({ achieved }) => {
  if (achievedLookup.has(achieved, research.smartWigs)) { return fabricatingSubtype.smart }
  if (achievedLookup.has(achieved, research.algaeIncubator)) { return fabricatingSubtype.algae }
  return fabricatingSubtype.silicone
}

const manualChangeDuration = 60
const autoChangeDuration = 3
const longChangeDuration = 10
let remainingBeforeChange = 0
let previousSubtype = null
let roundRobinSubtypeList = null
let roundRobinSubtypeIndex = null
let achievedMemo

const selectSubtype = (state) => {
  let { wigMakerSubtype } = state

  if (achievedMemo !== state.achieved) {
    // reset when achievements change
    achievedMemo = state.achieved
    roundRobinSubtypeIndex = null
    remainingBeforeChange = 0
    previousSubtype = wigMakerSubtype
  }

  if (previousSubtype !== null && previousSubtype !== wigMakerSubtype) {
    remainingBeforeChange = manualChangeDuration
  } else {
    remainingBeforeChange -= 1
  }

  if (remainingBeforeChange <= 0) {
    if (roundRobinSubtypeIndex !== null) {
      roundRobinSubtypeIndex += 1
      wigMakerSubtype = roundRobinSubtypeList[roundRobinSubtypeIndex]
      if (roundRobinSubtypeIndex === roundRobinSubtypeList.length - 1) {
        roundRobinSubtypeIndex = null
      }
    } else {
      roundRobinSubtypeList = getDemand(state)
      if (roundRobinSubtypeList.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        wigMakerSubtype = roundRobinSubtypeList[0]

        if (roundRobinSubtypeList.length > 1) {
          roundRobinSubtypeIndex = 0
        }
      } else {
        wigMakerSubtype = getLatest(state)
      }
    }
    remainingBeforeChange = wigMakerSubtype === fabricatingSubtype.algae ? longChangeDuration : autoChangeDuration
  }

  previousSubtype = wigMakerSubtype
  return wigMakerSubtype
}

export const AutoMakeWigSwitch = (state) => (achievedLookup.has(state.achieved, research.wigMakerSwitcher) && state.fabricating[fabricatingIndex.wig].allocated !== 0
  ? { ...state, wigMakerSubtype: selectSubtype(state) }
  : state)

export const UpdateWigSelection = (state, subtype) => [{
  ...state,
  wigMakerSubtype: subtype
}, enqueueAudio(audioIds.button)]
