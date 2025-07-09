// utils/graph.ts
import { Node, Edge } from "@xyflow/react";
import { DependencyFields, FormField } from "../types";
import { initialEdges, initialNodes } from "../data";

export function getDependencyFields(
  nodeId: string,
  nodes: Node[] = initialNodes,
  edges: Edge[] = initialEdges
): DependencyFields[] {
  const result: DependencyFields[] = [];
  const visited = new Set<string>();

  function traverse(currentId: string) {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const node = nodes.find((n) => n.id === currentId);
    if (!node) return;

    result.push({
      formId: node.id,
      formName: (node.data as { heading: string }).heading,
      fields: (node.data as { fields: FormField[] }).fields,
    });

    const parentIds = edges
      .filter((edge) => edge.target === currentId)
      .map((edge) => edge.source);
    parentIds.forEach((parentId) => traverse(parentId));
  }

  traverse(nodeId);
  return result.filter((dep) => dep.formId !== nodeId); // Exclude current node
}
