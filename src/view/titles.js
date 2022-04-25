import { h, text } from "../hyperapp"
import { hasFlag, sceneTempFlags } from "../shared/sceneTempFlags"
import { ChangeScene, scenes } from "../shared/scenes"
import { button, container, line, path, svg } from "../viewComponents"
import { Continue } from "../shared/sceneHelpers"
import { isCurrentTheme } from "../shared/optionsManager"
import { optionFlags } from "../shared/options"
import { canInstall, InstallApp } from "../appInstall"
import { installIcon } from "../viewComponents/icons"

const logo = svg("0 0 200 180", { class: "titlesLogo" }, [
  // eslint-disable-next-line max-len
  path("m39.943 166.56c-0.87093-19.59 6.0965-39.181 18.29-52.585 12.193-14.435 29.612-21.653 46.159-19.59 14.806 1.0311 28.741 8.2486 39.192 21.653 9.5802 12.373 16.548 29.901 16.548 47.429"),
  line(82.5, 128, 117.5, 128),
  line(72.5, 148, 127.5, 148),
  line(39, 150, 39, 167, { class: "titlesEars" }),
  line(161, 150, 161, 167, { class: "titlesEars" }),
  h("g", { class: "logoPlus" }, [
    line(85, 60, 115, 60),
    line(100, 45, 100, 75),
  ]),
])
const titlesButton = (label, action) => button({ key: label, class: "titlesButton", onclick: action }, text(label))

export default (state) => container({ class: "titlesContainer" }, [
  container({ class: "titles" }, [
    container({ class: "titlesLeft" }, [
      logo,
      isCurrentTheme(optionFlags.meshTheme) && container({ class: ["titlesMeshMode", "logoFont"] }, text("mesh mode")),
    ]),
    container({ class: "titlesRight" }, [
      h("h1", { class: ["title", "logoFont"] }, text("wigmaker")),
      hasFlag(state.sceneTemp, sceneTempFlags.initial)
        ? titlesButton("Start", Continue)
        : titlesButton("Continue", Continue),
      titlesButton("Options", [ChangeScene, scenes.options]),
      titlesButton("Import / Export", [ChangeScene, scenes.import]),
      titlesButton("Credits", [ChangeScene, scenes.credits]),
    ]),
  ]),
  canInstall() && container({ class: "installBanner" }, [
    container({ class: "installIconContainer" }, installIcon()),
    titlesButton("Install as app (allows offline play)", InstallApp),
  ]),
])
