import {
  createPluginFactory,
  ELEMENT_DEFAULT,
  QueryNodeOptions,
} from '@udecode/plate-common';

import { withDelete } from './withDelete';

export type DeletePlugin = {
  query?: QueryNodeOptions;
};

export const KEY_DELETE = 'delete';

/**
 * @see {@link withDelete}
 */
export const createDeletePlugin = createPluginFactory<DeletePlugin>({
  key: KEY_DELETE,
  withOverrides: withDelete,
  options: {
    query: {
      allow: [ELEMENT_DEFAULT],
    },
  },
});
