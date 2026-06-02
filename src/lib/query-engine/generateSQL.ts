import { GroupNode, QueryNode, ConditionNode } from "../../types/query";

function parseCondition(condition: ConditionNode) {
  const value =
    typeof condition.value === "string"
      ? `'${condition.value}'`
      : condition.value;

  const map = {
    equals: "=",

    not_equals: "!=",

    contains: "LIKE",

    starts_with: "LIKE",

    greater_than: ">",

    less_than: "<",

    between: "BETWEEN",

    in_array: "IN",
  };

  const operator = map[condition.operator] ?? "=";

  if (condition.operator === "contains") {
    return `${condition.field}
    LIKE '%${condition.value}%'`;
  }

  if (condition.operator === "starts_with") {
    return `${condition.field}
    LIKE '${condition.value}%'`;
  }

  return `${condition.field}
  ${operator}
  ${value}`;
}

function parseNode(node: QueryNode): string {
  if (node.type === "condition") {
    return parseCondition(node);
  }

  const children = node.children.map(parseNode);

  return `(
 ${children.join(` ${node.logic} `)}
 )`;
}

export function generateSQL(root: GroupNode) {
  return `
SELECT *

FROM users

WHERE

${parseNode(root)}
`;
}
