import { ConditionNode, GroupNode, QueryNode } from "../../types/query";

function parseCondition(node: ConditionNode) {
  if (!node.field) return null;

  return {
    field: node.field,
    operator: node.operator,
    value: node.value,
  };
}

function parseNode(node: QueryNode): any {
  if (node.type === "condition") {
    return parseCondition(node);
  }

  const children = node.children.map(parseNode).filter(Boolean);

  if (children.length === 0) return null;

  return {
    logic: node.logic,
    conditions: children,
  };
}

export function generateGraphQL(root: GroupNode) {
  const filter = parseNode(root);

  return `query Users {
  users(filter: ${JSON.stringify(filter ?? {}, null, 2)}) {
    id
    name
    age
    country
    status
  }
}`;
}