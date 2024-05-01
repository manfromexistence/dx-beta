/**
 * This Apache-2.0 licensed file has been modified by Udecode and other
 * contributors. See /packages/diff/LICENSE for more information.
 */

import { isElement, isText, TDescendant } from '@udecode/plate-common';
import isEqual from 'lodash/isEqual.js';

import { ComputeDiffOptions } from '../../computeDiff';
import { copyWithout } from './copy-without';

export function diffNodes(
  originNodes: TDescendant[],
  targetNodes: TDescendant[],
  { elementsAreRelated }: ComputeDiffOptions
) {
  const result: NodeRelatedItem[] = [];
  let relatedNode: TDescendant | undefined;
  const leftTargetNodes: TDescendant[] = [...targetNodes];

  originNodes.forEach((originNode: TDescendant) => {
    let childrenUpdated = false;
    let nodeUpdated = false;
    relatedNode = leftTargetNodes.find((targetNode: TDescendant) => {
      if (isElement(originNode) && isElement(targetNode)) {
        const relatedResult =
          elementsAreRelated?.(originNode, targetNode) ?? null;
        if (relatedResult !== null) return relatedResult;
      }
      if (isEqualNode(originNode, targetNode)) {
        childrenUpdated = true;
      }
      if (isEqualNodeChildren(originNode, targetNode)) {
        nodeUpdated = true;
      }
      return nodeUpdated || childrenUpdated;
    });
    if (relatedNode) {
      const insertNodes = leftTargetNodes.splice(
        0,
        leftTargetNodes.indexOf(relatedNode)
      );
      insertNodes.forEach((insertNode) => {
        result.push({
          originNode: insertNode,
          insert: true,
        });
      });
      leftTargetNodes.splice(0, 1);
    }
    result.push({
      originNode,
      relatedNode,
      childrenUpdated,
      nodeUpdated,
      delete: !relatedNode,
    });
  });
  leftTargetNodes.forEach((insertNode) => {
    result.push({
      originNode: insertNode,
      insert: true,
    });
  });
  return result;
}

export type NodeRelatedItem = {
  originNode: TDescendant;
  relatedNode?: TDescendant;
  childrenUpdated?: boolean;
  nodeUpdated?: boolean;
  insert?: boolean;
  delete?: boolean;
};

export function isEqualNode(value: TDescendant, other: TDescendant) {
  return (
    isElement(value) &&
    isElement(other) &&
    value.children !== null &&
    other.children !== null &&
    isEqual(copyWithout(value, ['children']), copyWithout(other, ['children']))
  );
}

export function isEqualNodeChildren(value: TDescendant, other: TDescendant) {
  if (
    isElement(value) &&
    isElement(other) &&
    isEqual(value.children, other.children)
  ) {
    return true;
  }

  return isText(value) && isText(other) && isEqual(value.text, other.text);
}
