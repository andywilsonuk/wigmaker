import { WarCommences } from "../../src/incidents/war"
import { milestone } from "../../src/shared/milestones"
import { achievedState, logState, noIncidentState } from "../testUtils"

test("War commences", () => {
  const state = {
    ...logState(),
    ...achievedState(),
  }

  const [actualState] = WarCommences(state)

  expect(actualState).toStrictEqual({
    ...state,
    ...logState("3b"),
    ...achievedState(milestone.warStarted),
    ...noIncidentState(),
    incidentDue: 30000,
  })
})
