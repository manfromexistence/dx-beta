import { useTheme } from './useTheme';
import { getId } from '@fluentui/utilities';
import { useWindow } from '@fluentui/react-window-provider';
import { mergeStylesRenderer } from './styleRenderers/mergeStylesRenderer';
import type { IStyle } from '@fluentui/style-utilities';
import type { Theme } from '@fluentui/theme';
import { useEffect } from 'react';

type GraphPath = readonly [windowId: string | undefined, id: number, theme: Theme | undefined];
export type StylesClassMapping<TStyleSet extends { [key in keyof TStyleSet]: IStyle }> = {
  [key in keyof TStyleSet]: string;
};
type Graph<TStyleSet extends { [key in keyof TStyleSet]: IStyle }> = Map<
  string | undefined,
  Map<number, Map<Theme | undefined, { classMap: StylesClassMapping<TStyleSet>; refCount: number }>>
>;

const graphGet = <TStyleSet extends { [key in keyof TStyleSet]: IStyle }>(
  graphNode: Graph<TStyleSet>,
  [windowId, id, theme]: GraphPath,
): StylesClassMapping<TStyleSet> | undefined => {
  return graphNode.get(windowId)?.get(id)?.get(theme)?.classMap;
};

const graphSet = <TStyleSet extends { [key in keyof TStyleSet]: IStyle }>(
  graphNode: Graph<TStyleSet>,
  [windowId, id, theme]: GraphPath,
  classMap: StylesClassMapping<TStyleSet>,
) => {
  const windowNode =
    graphNode.get(windowId) ??
    new Map<number, Map<Theme | undefined, { classMap: StylesClassMapping<TStyleSet>; refCount: number }>>();
  graphNode.set(windowId, windowNode);

  const idNode =
    windowNode.get(id) ?? new Map<Theme | undefined, { classMap: StylesClassMapping<TStyleSet>; refCount: number }>();
  windowNode.set(id, idNode);

  idNode.set(theme, { classMap, refCount: 0 });
};

function graphRef<TStyleSet extends { [key in keyof TStyleSet]: IStyle }>(
  graphNode: Graph<TStyleSet>,
  [windowId, id, theme]: GraphPath,
) {
  const node = graphNode.get(windowId)?.get(id)?.get(theme);
  if (node) {
    node.refCount++;
  }
}

function graphDeref<TStyleSet extends { [key in keyof TStyleSet]: IStyle }>(
  graphNode: Graph<TStyleSet>,
  [windowId, id, theme]: GraphPath,
) {
  const node = graphNode.get(windowId)?.get(id)?.get(theme);
  if (node) {
    node.refCount--;

    if (node.refCount === 0) {
      graphNode.get(windowId)?.get(id)?.delete(theme);

      if (graphNode.get(windowId)?.get(id)?.size === 0) {
        graphNode.get(windowId)?.delete(id);

        if (graphNode.get(windowId)?.size === 0) {
          graphNode.delete(windowId);
        }
      }
    }
  }
}

/**
 * Options that can be provided to the hook generated by `makeStyles`.
 * @deprecated Only used in deprecated `makeStyles` implementation below.
 */
export type UseStylesOptions = {
  theme?: Theme;
};

type WindowWithId = Window & {
  __id__: string;
};

/**
 * Registers a css object, optionally as a function of the theme.
 *
 * @param styleOrFunction - Either a css javascript object, or a function which takes in `ITheme`
 * and returns a css javascript object.
 *
 * @deprecated Use `mergeStyles` instead for v8 related code. We will be using a new implementation of `makeStyles` in
 * future versions of the library.
 */
export function makeStyles<TStyleSet extends { [key in keyof TStyleSet]: IStyle } = { [key: string]: IStyle }>(
  styleOrFunction: TStyleSet | ((theme: Theme) => TStyleSet),
  // eslint-disable-next-line deprecation/deprecation
): (options?: UseStylesOptions) => StylesClassMapping<TStyleSet> {
  // Create graph of inputs to map to output.
  const graph: Graph<TStyleSet> = new Map();
  // Retain a dictionary of window ids we're tracking
  const allWindows = new Set<string>();

  // cleanupMapEntries will
  // 1. remove all the graph branches for the window,
  // 2. remove the event listener,
  // 3. delete the allWindows entry.
  const cleanupMapEntries = (ev: PageTransitionEvent) => {
    const win = ev.currentTarget as WindowWithId;
    const winId = win.__id__;
    graph.delete(winId);
    win.removeEventListener('unload', cleanupMapEntries);
    allWindows.delete(winId);
  };

  // eslint-disable-next-line deprecation/deprecation
  return (options: UseStylesOptions = {}): StylesClassMapping<TStyleSet> => {
    let { theme } = options;
    let winId: string | undefined;
    const win = useWindow() as WindowWithId | undefined;
    if (win) {
      win.__id__ = win.__id__ || getId();
      winId = win.__id__;
      if (!allWindows.has(winId)) {
        allWindows.add(winId);
        win.addEventListener('unload', cleanupMapEntries);
      }
    }

    const contextualTheme = useTheme();

    theme = theme || contextualTheme;
    const renderer = mergeStylesRenderer;

    const id = renderer.getId();
    const path: GraphPath = [winId, id, theme] as const;
    let value = graphGet(graph, path);

    // Don't keep around unused styles
    useEffect(() => {
      graphRef(graph, [winId, id, theme]);

      return () => graphDeref(graph, [winId, id, theme]);
    }, [winId, id, theme]);

    if (!value) {
      const styles = isStyleFunction(styleOrFunction)
        ? (styleOrFunction as (theme: Theme) => TStyleSet)(theme!)
        : styleOrFunction;

      value = mergeStylesRenderer.renderStyles<TStyleSet>(styles, { targetWindow: win, rtl: !!theme!.rtl });
      graphSet(graph, path, value);
    }

    return value;
  };
}

function isStyleFunction<TStyleSet extends { [key in keyof TStyleSet]: IStyle }>(
  styleOrFunction: TStyleSet | ((theme: Theme) => TStyleSet),
): styleOrFunction is (theme: Theme) => TStyleSet {
  return typeof styleOrFunction === 'function';
}
