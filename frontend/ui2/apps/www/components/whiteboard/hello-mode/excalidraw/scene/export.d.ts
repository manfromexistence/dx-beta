import { ExcalidrawFrameLikeElement, NonDeletedExcalidrawElement } from "../element/types";
import { AppState, BinaryFiles } from "../types";
export declare const exportToCanvas: (elements: readonly NonDeletedExcalidrawElement[], appState: AppState, files: BinaryFiles, { exportBackground, exportPadding, viewBackgroundColor, exportingFrame, }: {
    exportBackground: boolean;
    exportPadding?: number | undefined;
    viewBackgroundColor: string;
    exportingFrame?: ExcalidrawFrameLikeElement | null | undefined;
}, createCanvas?: (width: number, height: number) => {
    canvas: HTMLCanvasElement;
    scale: number;
}) => Promise<HTMLCanvasElement>;
export declare const exportToSvg: (elements: readonly NonDeletedExcalidrawElement[], appState: {
    exportBackground: boolean;
    exportPadding?: number;
    exportScale?: number;
    viewBackgroundColor: string;
    exportWithDarkMode?: boolean;
    exportEmbedScene?: boolean;
    frameRendering?: AppState["frameRendering"];
}, files: BinaryFiles | null, opts?: {
    /**
     * if true, all embeddables passed in will be rendered when possible.
     */
    renderEmbeddables?: boolean;
    exportingFrame?: ExcalidrawFrameLikeElement | null;
}) => Promise<SVGSVGElement>;
export declare const getExportSize: (elements: readonly NonDeletedExcalidrawElement[], exportPadding: number, scale: number) => [number, number];
