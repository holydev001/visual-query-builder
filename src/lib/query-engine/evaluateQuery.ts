import { ConditionNode, GroupNode, QueryNode } from "../../types/query";

function evaluateCondition(condition: ConditionNode, item: any) {
  const value = item[condition.field];

  switch (condition.operator) {
    case "equals":
      return value === condition.value;

    case "not_equals":
      return value !== condition.value;

    case "greater_than":
      return value > (condition.value as any);

    case "less_than":
      return value < (condition.value as any);

    case "contains":
      return String(value).includes(String(condition.value));

    case "starts_with":
      return String(value).startsWith(String(condition.value));

    default:
      return false;
  }
}

function evaluateNode(node: QueryNode, item: any): boolean {
  if (node.type === "condition") {
    return evaluateCondition(node, item);
  }

  const results = node.children.map((child) => evaluateNode(child, item));

  if (node.logic === "AND") {
    return results.every(Boolean);
  }

  return results.some(Boolean);
}

export function executeQuery(root: GroupNode, dataset: any[]) {
  return dataset.filter((item) => evaluateNode(root, item));
}
