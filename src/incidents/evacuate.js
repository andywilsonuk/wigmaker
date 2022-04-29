import { evacuateId } from './incidentIds'
import { JustLog } from './common'
import { initMessage } from '../shared/logData'

const resetLog = initMessage('3n', 'Life resumes')

export default {
  id: evacuateId,
  title: 'Fire!',
  description: ['An alarm was triggered and the warehouse evacuated.', 'No fire was found.'],
  actions: [[[JustLog, resetLog], 'Reset']],
  allowed: ({ wigs }) => wigs >= 100
}
