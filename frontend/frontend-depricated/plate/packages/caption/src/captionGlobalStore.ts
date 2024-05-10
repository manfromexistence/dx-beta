import { createZustandStore, TPath } from '@udecode/plate-common';

export const captionGlobalStore = createZustandStore('caption')({
  /**
   * When defined, focus end of caption textarea with the same path.
   */
  focusEndCaptionPath: null as TPath | null,

  /**
   * When defined, focus start of caption textarea with the same path.
   */
  focusStartCaptionPath: null as TPath | null,
});
