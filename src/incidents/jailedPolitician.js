import { jailedPoliticianId } from './incidentIds'
import { initNews, logTransform } from '../shared/logData'
import { incidentOutcome, incidentTransform, JustLog } from './common'
import { cashString } from '../utils/humanize'
import { Chance } from '../utils/random'

const finedLog = initNews('3L', 'Wig maker fined after publicly declaring association with corrupt politician')
const associationLog = initNews('3M', 'Wig maker fined after police link with corrupt politician')
const noAssociationLog = initNews('3N', 'Police unable to link wig maker with corrupt politician')

const payFine = 250000
const payAssociationFine = 750000
const minBribes = 7

export const PayFine = (state) => incidentOutcome({
  ...state,
  cash: state.cash - payFine,
  ...incidentTransform(state),
  ...logTransform(state, finedLog)
})

export const PayAssociation = (state) => incidentOutcome({
  ...state,
  cash: state.cash - payAssociationFine,
  ...incidentTransform(state),
  ...logTransform(state, associationLog)
})

export default {
  id: jailedPoliticianId,
  title: 'Politician jailed for corruption',
  description: ['Police probe link of assocation.', `Admit misconduct and pay ${cashString(payFine)} fine?`],
  actions: [
    [PayFine, 'Pay fine'],
    [Chance(70, PayAssociation, [JustLog, noAssociationLog]), 'Deny wrongdoing']
  ],
  allowed: ({ cash, bribes }) => cash > payAssociationFine && bribes >= minBribes
}
