import { GroupNode, ConditionNode, QueryNode } from "../../types/query";

function condition(node: ConditionNode) {
  if (!node.field) return null;

  const opMap = {
    equals: "$eq",
    not_equals: "$ne",
    greater_than: "$gt",
    less_than: "$lt",
    contains: "$regex",
    starts_with: "$regex",
  };

  if (node.operator === "contains") {
    return {
      [node.field]: {
        $regex: String(node.value),
        $options: "i",
      },
    };
  }

  if (node.operator === "starts_with") {
    return {
      [node.field]: {
        $regex: `^${String(node.value)}`,
        $options: "i",
      },
    };
  }

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

  const children = node.children.map(parse).filter(Boolean);

  if (children.length === 0) {
    return null;
  }

  return {
    [node.logic === "AND" ? "$and" : "$or"]: children,
  };
}

export function generateMongo(root: GroupNode) {
  const query = parse(root);

  if (!query) {
    return JSON.stringify({}, null, 2);
  }

  return JSON.stringify(query, null, 2);
}