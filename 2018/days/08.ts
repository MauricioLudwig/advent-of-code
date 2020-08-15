import { getAsSingleLine } from '../input';
import { success, end } from '../utils/logger';

export default (): void => {
  const input = getAsSingleLine('08.txt');

  const nodes1 = input.split(' ').map(Number);
  const metadataEntriesSum = getMetadataEntriesSum(nodes1, 0);
  success(`Part 1: ${metadataEntriesSum}`);

  const nodes2 = input.split(' ').map(Number);
  const rootNodeSum = getRootNodeSum(nodes2, 0);
  success(`Part 2: ${rootNodeSum}`);

  end();
};

type NodeSum = (nodes: number[], sum: number) => number;

const getMetadataEntriesSum: NodeSum = (nodes, metadataEntriesSum) => {
  const [childNodesCount, metadataEntriesCount] = nodes.splice(0, 2);

  if (childNodesCount === 0) {
    return nodes
      .splice(0, metadataEntriesCount)
      .reduce((acc, curr): number => acc + curr, 0);
  } else {
    let childMetadataEntriesSum = 0;

    for (let i = 0; i < childNodesCount; i++) {
      childMetadataEntriesSum += getMetadataEntriesSum(
        nodes,
        metadataEntriesSum
      );
    }

    const parentMetadataEntriesSum = nodes
      .splice(0, metadataEntriesCount)
      .reduce((acc, curr): number => acc + curr, 0);
    return (
      childMetadataEntriesSum + metadataEntriesSum + parentMetadataEntriesSum
    );
  }
};

interface ChildNodes {
  [key: string]: number;
}

const getRootNodeSum: NodeSum = (nodes, rootNodeSum) => {
  const [childNodesCount, metadataEntriesCount] = nodes.splice(0, 2);

  if (childNodesCount === 0) {
    return nodes
      .splice(0, metadataEntriesCount)
      .reduce((acc, curr): number => acc + curr, 0);
  } else {
    const childNodes: ChildNodes = {};

    for (let i = 0; i < childNodesCount; i++) {
      childNodes[i + 1] = getRootNodeSum(nodes, rootNodeSum);
    }

    const childNodeSum = nodes
      .splice(0, metadataEntriesCount)
      .reduce((acc, curr): number => acc + (childNodes[curr] || 0), 0);
    return rootNodeSum + childNodeSum;
  }
};
