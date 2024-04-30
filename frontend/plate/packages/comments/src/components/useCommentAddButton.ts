import React from 'react';

import {
  useAddCommentMark,
  useCommentsActions,
  useCommentsSelectors,
} from '../stores/index';

export const useCommentAddButton = () => {
  const addCommentMark = useAddCommentMark();
  const setFocusTextarea = useCommentsActions().focusTextarea();
  const myUserId = useCommentsSelectors().myUserId();

  const onClick = React.useCallback<React.MouseEventHandler<HTMLSpanElement>>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      addCommentMark();
      setFocusTextarea(true);
    },
    [addCommentMark, setFocusTextarea]
  );

  return {
    hidden: !myUserId,
    props: { onClick },
  };
};
