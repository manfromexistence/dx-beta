import {
  createPluginFactory,
  ELEMENT_DEFAULT,
  getPluginType,
  isHtmlBlockElement,
  KEY_DESERIALIZE_HTML,
  PlateRenderElementProps,
  postCleanHtml,
  TElement,
  traverseHtmlElements,
} from '@udecode/plate-common';

import { injectIndentListComponent } from './injectIndentListComponent';
import { onKeyDownIndentList } from './onKeyDownIndentList';
import { GetSiblingIndentListOptions } from './queries/getSiblingIndentList';
import { ListStyleType } from './types';
import { withIndentList } from './withIndentList';

export const KEY_LIST_STYLE_TYPE = 'listStyleType';
export const KEY_LIST_START = 'listStart';
export const KEY_LIST_RESTART = 'listRestart';
export const KEY_LIST_CHECKED = 'checked';
export const KEY_TODO_STYLE_TYPE = 'todo';

export type MarkerFC = React.FC<Omit<PlateRenderElementProps, 'children'>>;
export type LiFC = React.FC<PlateRenderElementProps>;

export interface IndentListPlugin {
  getSiblingIndentListOptions?: GetSiblingIndentListOptions<TElement>;

  /**x
   * Map html element to list style type.
   */
  getListStyleType?: (element: HTMLElement) => ListStyleType;

  listStyleTypes?: Record<
    string,
    {
      type: string;
      markerComponent?: MarkerFC;
      liComponent?: LiFC;
      isOrdered?: boolean;
    }
  >;
}

export const createIndentListPlugin = createPluginFactory<IndentListPlugin>({
  key: KEY_LIST_STYLE_TYPE,
  inject: {
    belowComponent: injectIndentListComponent,
  },
  withOverrides: withIndentList,
  handlers: {
    onKeyDown: onKeyDownIndentList,
  },
  options: {
    getListStyleType: (element) => element.style.listStyleType as ListStyleType,
  },
  then: (editor, { options }) => ({
    inject: {
      pluginsByKey: {
        [KEY_DESERIALIZE_HTML]: {
          editor: {
            insertData: {
              transformData: (data) => {
                const document = new DOMParser().parseFromString(
                  data,
                  'text/html'
                );
                const { body } = document;

                traverseHtmlElements(body, (element) => {
                  if (element.tagName === 'LI') {
                    const { childNodes } = element;

                    // replace li block children (e.g. p) by their children
                    const liChildren: Node[] = [];
                    childNodes.forEach((child) => {
                      if (isHtmlBlockElement(child as Element)) {
                        liChildren.push(...child.childNodes);
                      } else {
                        liChildren.push(child);
                      }
                    });

                    element.replaceChildren(...liChildren);

                    // TODO: recursive check on ul parents for indent

                    return false;
                  }

                  return true;
                });

                return postCleanHtml(body.innerHTML);
              },
            },
          },
        },
      },
    },
    deserializeHtml: {
      isElement: true,
      getNode: (element) => ({
        type: getPluginType(editor, ELEMENT_DEFAULT),
        listStyleType: options.getListStyleType?.(element),
        // gdoc uses aria-level attribute
        indent: Number(element.getAttribute('aria-level')),
      }),
      rules: [
        {
          validNodeName: 'LI',
        },
      ],
    },
  }),
});
