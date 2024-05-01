import React from 'react';
import { PlateRenderElementProps } from '@udecode/plate-core';
import { Value } from '@udecode/slate';

export const createNodeHOC =
  <V extends Value, T>(HOC: React.FC<T>) =>
  (Component: any, props: T) =>
    function hoc(childrenProps: PlateRenderElementProps<V>) {
      return (
        <HOC {...childrenProps} {...props}>
          <Component {...childrenProps} />
        </HOC>
      );
    };
