import { ExcalidrawElement, ExcalidrawLinearElement, Arrowhead, ExcalidrawFreeDrawElement, NonDeleted, ElementsMap } from "./types";
import { Drawable, Op } from "roughjs/bin/core";
import { AppState, Point } from "../types";
export type RectangleBox = {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
};
/**
 * x and y position of top left corner, x and y position of bottom right corner
 */
export type Bounds = readonly [
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
];
export type SceneBounds = readonly [
    sceneX: number,
    sceneY: number,
    sceneX2: number,
    sceneY2: number
];
export declare class ElementBounds {
    private static boundsCache;
    static getBounds(element: ExcalidrawElement, elementsMap: ElementsMap): Bounds;
    private static calculateBounds;
}
export declare const getElementAbsoluteCoords: (element: ExcalidrawElement, elementsMap: ElementsMap, includeBoundText?: boolean) => [number, number, number, number, number, number];
export declare const getElementLineSegments: (element: ExcalidrawElement, elementsMap: ElementsMap) => [Point, Point][];
/**
 * Scene -> Scene coords, but in x1,x2,y1,y2 format.
 *
 * Rectangle here means any rectangular frame, not an excalidraw element.
 */
export declare const getRectangleBoxAbsoluteCoords: (boxSceneCoords: RectangleBox) => number[];
export declare const getDiamondPoints: (element: ExcalidrawElement) => number[];
export declare const getCurvePathOps: (shape: Drawable) => Op[];
export declare const getMinMaxXYFromCurvePathOps: (ops: Op[], transformXY?: ((x: number, y: number) => [number, number]) | undefined) => Bounds;
export declare const getBoundsFromPoints: (points: ExcalidrawFreeDrawElement["points"]) => Bounds;
/** @returns number in pixels */
export declare const getArrowheadSize: (arrowhead: Arrowhead) => number;
/** @returns number in degrees */
export declare const getArrowheadAngle: (arrowhead: Arrowhead) => number;
export declare const getArrowheadPoints: (element: ExcalidrawLinearElement, shape: Drawable[], position: "start" | "end", arrowhead: Arrowhead) => number[] | null;
export declare const getElementBounds: (element: ExcalidrawElement, elementsMap: ElementsMap) => Bounds;
export declare const getCommonBounds: (elements: readonly ExcalidrawElement[]) => Bounds;
export declare const getDraggedElementsBounds: (elements: ExcalidrawElement[], dragOffset: {
    x: number;
    y: number;
}) => number[];
export declare const getResizedElementAbsoluteCoords: (element: ExcalidrawElement, nextWidth: number, nextHeight: number, normalizePoints: boolean) => Bounds;
export declare const getElementPointsCoords: (element: ExcalidrawLinearElement, points: readonly (readonly [number, number])[]) => Bounds;
export declare const getClosestElementBounds: (elements: readonly ExcalidrawElement[], from: {
    x: number;
    y: number;
}) => Bounds;
export interface BoundingBox {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    midX: number;
    midY: number;
    width: number;
    height: number;
}
export declare const getCommonBoundingBox: (elements: ExcalidrawElement[] | readonly NonDeleted<ExcalidrawElement>[]) => BoundingBox;
/**
 * returns scene coords of user's editor viewport (visible canvas area) bounds
 */
export declare const getVisibleSceneBounds: ({ scrollX, scrollY, width, height, zoom, }: AppState) => SceneBounds;
