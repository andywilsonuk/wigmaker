/* eslint-env jest */
import { initMessage } from '../../src/shared/logData'
import { JustLog, WhenWigs } from '../../src/incidents/common'
import { logState, noIncidentState, wigStockState } from '../testUtils'

const testLog = initMessage('test-justlog', 'Testing')
test('Just log', () => {
  const state = {
    ...logState()
  }

  const [actual] = JustLog(state, testLog)

  expect(actual).toStrictEqual({
    ...state,
    ...noIncidentState(),
    ...logState('test-justlog')
  })
})

const positiveAction = jest.fn()
const negativeAction = jest.fn()
test('When wigs, has wigs', () => {
  const state = {
    ...logState(),
    ...wigStockState([1, 0, 0, 0, 0])
  }

  const actual = WhenWigs(positiveAction, negativeAction)(state)

  expect(actual).toBe(positiveAction)
})
test('When wigs, no wigs', () => {
  const state = {
    ...logState(),
    ...wigStockState([0, 0, 0, 0, 0])
  }

  const actual = WhenWigs(positiveAction, negativeAction)(state)

  expect(actual).toBe(negativeAction)
})
test('When wigs, no wigs, default', () => {
  const state = {
    ...logState(),
    ...wigStockState([0, 0, 0, 0, 0])
  }

  const [action, message] = WhenWigs(positiveAction)(state)

  expect(action).toBe(JustLog)
  expect(message).toBeTruthy()
})
