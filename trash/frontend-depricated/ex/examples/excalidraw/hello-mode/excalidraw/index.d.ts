import React from "react";
import "./css/app.scss";
import "./css/styles.scss";
import "../../public/fonts/fonts.css";
import { ExcalidrawProps } from "./types";
import Footer from "./components/footer/FooterCenter";
import MainMenu from "./components/main-menu/MainMenu";
import WelcomeScreen from "./components/welcome-screen/WelcomeScreen";
import LiveCollaborationTrigger from "./components/live-collaboration/LiveCollaborationTrigger";
export declare const Excalidraw: React.MemoExoticComponent<
  (props: ExcalidrawProps) => JSX.Element
>;
export {
  getSceneVersion,
  hashElementsVersion,
  hashString,
  isInvisiblySmallElement,
  getNonDeletedElements,
} from "./element";
export { defaultLang, useI18n, languages } from "./i18n";
export {
  restore,
  restoreAppState,
  restoreElements,
  restoreLibraryItems,
} from "./data/restore";
export { reconcileElements } from "./data/reconcile";
export {
  exportToCanvas,
  exportToBlob,
  exportToSvg,
  exportToClipboard,
} from "../utils/export";
export { serializeAsJSON, serializeLibraryAsJSON } from "./data/json";
export {
  loadFromBlob,
  loadSceneOrLibraryFromBlob,
  loadLibraryFromBlob,
} from "./data/blob";
export { getFreeDrawSvgPath } from "./renderer/renderElement";
export { mergeLibraryItems, getLibraryItemsHash } from "./data/library";
export { isLinearElement } from "./element/typeChecks";
export {
  FONT_FAMILY,
  THEME,
  MIME_TYPES,
  ROUNDNESS,
  DEFAULT_LASER_COLOR,
} from "./constants";
export {
  mutateElement,
  newElementWith,
  bumpVersion,
} from "./element/mutateElement";
export { StoreAction } from "./store";
export { parseLibraryTokensFromUrl, useHandleLibrary } from "./data/library";
export {
  sceneCoordsToViewportCoords,
  viewportCoordsToSceneCoords,
} from "./utils";
export { Sidebar } from "./components/Sidebar/Sidebar";
export { Button } from "./components/Button";
export { Footer };
export { MainMenu };
export { useDevice } from "./components/App";
export { WelcomeScreen };
export { LiveCollaborationTrigger };
export { DefaultSidebar } from "./components/DefaultSidebar";
export { TTDDialog } from "./components/TTDDialog/TTDDialog";
export { TTDDialogTrigger } from "./components/TTDDialog/TTDDialogTrigger";
export { normalizeLink } from "./data/url";
export { zoomToFitBounds } from "./actions/actionCanvas";
export { convertToExcalidrawElements } from "./data/transform";
export { getCommonBounds, getVisibleSceneBounds } from "./element/bounds";
export {
  elementsOverlappingBBox,
  isElementInsideBBox,
  elementPartiallyOverlapsWithOrContainsBBox,
} from "../utils/withinBounds";
