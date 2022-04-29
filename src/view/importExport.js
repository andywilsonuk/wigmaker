import { h, text } from '../hyperapp'
import { container, flexRowLastRight, plainSpan, dialogButton, dialogConfirmButton, flexRow } from '../viewComponents'
import { DialogBack, ImportFromText, Reset, ShowConfirm } from '../shared/sceneHelpers'
import { sceneTempFlags } from '../shared/sceneTempFlags'
import { objectToCodedText } from '../utils/serializer'

const importAreaId = 'import'
const Import = () => [ImportFromText, document.getElementById(importAreaId).value]

export default (state) => container({ class: 'dialogOverlay' },
  container({ class: 'dialog' }, [
    container({ class: 'dialogHeader' }, text('Import / export')),
    h('textarea', { id: importAreaId }, text(objectToCodedText(state))),
    flexRow([
      dialogButton('Back', DialogBack),
      flexRowLastRight([
        state.sceneTemp === sceneTempFlags.importSuccess && plainSpan('Import successful'),
        state.sceneTemp === sceneTempFlags.restoreError && plainSpan('Error: Invalid import data, check pasted text'),
        state.sceneTemp === sceneTempFlags.resetSuccess && plainSpan('Reset successful')
      ]),
      state.sceneTemp === sceneTempFlags.confirmImport
        ? dialogConfirmButton('Confirm', Import)
        : dialogButton('Import', [ShowConfirm, sceneTempFlags.confirmImport]),
      state.sceneTemp === sceneTempFlags.confirmReset
        ? dialogConfirmButton('Confirm', Reset)
        : dialogButton('Reset', [ShowConfirm, sceneTempFlags.confirmReset])
    ])
  ]))
