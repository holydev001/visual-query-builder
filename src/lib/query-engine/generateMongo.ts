import { GroupNode, ConditionNode, QueryNode } from "../../types/query";

function condition(node: ConditionNode) {
  const opMap = {
    equals: "$eq",

    not_equals: "$ne",

    greater_than: "$gt",

    less_than: "$lt",
  };

  return {
    [node.field]: {
      [opMap[node.operator as keyof typeof opMap] || "$eq"]: node.value,
    },
  };
}

function parse(node: QueryNode): any {
  if (node.type === "condition") {
    return condition(node);
  }

  return {
    [node.logic === "AND" ? "$and" : "$or"]: node.children.map(parse),
  };
}

export function generateMongo(root: GroupNode) {
  return JSON.stringify(
    parse(root),

    null,

    2,
  );
}
