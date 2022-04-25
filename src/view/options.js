import { text } from "../hyperapp"
import { optionFlags } from "../shared/options"
import { ChangeSound, ChangeTheme, ChangeView, isCurrentTheme, isSoundOn, isMeshAllowed, isTabbedMode } from "../shared/optionsManager"
import { DialogBack } from "../shared/sceneHelpers"
import { container, plainSpan, dialogButton, dialogOptionButton, flexRow } from "../viewComponents"

export default () => container({ class: "dialogOverlay" },
  container({ class: "dialog" }, [
    container({ class: "dialogHeader" }, text("Options")),
    flexRow([
      plainSpan("Theme:"),
      dialogOptionButton([ChangeTheme, optionFlags.lightTheme], "Light", !isCurrentTheme(optionFlags.lightTheme)),
      dialogOptionButton([ChangeTheme, optionFlags.darkTheme], "Dark", !isCurrentTheme(optionFlags.darkTheme)),
      isMeshAllowed() && dialogOptionButton([ChangeTheme, optionFlags.meshTheme], "Mesh", !isCurrentTheme(optionFlags.meshTheme)),
    ]),
    flexRow([
      plainSpan("View:"),
      dialogOptionButton(ChangeView, "Tabbed", !isTabbedMode()),
      dialogOptionButton(ChangeView, "Flat", isTabbedMode()),
    ]),
    flexRow([
      plainSpan("Sound:"),
      dialogOptionButton(ChangeSound, "On", !isSoundOn()),
      dialogOptionButton(ChangeSound, "Off", isSoundOn()),
    ]),
    flexRow(dialogButton("Back", DialogBack)),
  ]))
