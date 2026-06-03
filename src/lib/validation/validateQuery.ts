import { GroupNode, QueryNode, ConditionNode } from "../../types/query";
import { userSchema } from "../../mock/schema";
import { OPERATORS } from "../schema/operators";

export interface ValidationError {
  nodeId: string;
  message: string;
}

function validateCondition(node: ConditionNode): ValidationError[] {
  const errors: ValidationError[] = [];

  const field = userSchema.find((item) => item.name === node.field);

  if (!node.field) {
    errors.push({ nodeId: node.id, message: "Field is required" });
    return errors;
  }

  if (!field) {
    errors.push({ nodeId: node.id, message: "Invalid field selected" });
    return errors;
  }

  if (!OPERATORS[field.type].includes(node.operator)) {
    errors.push({
      nodeId: node.id,
      message: `${node.operator} is not valid for ${field.type}`,
    });
  }

  if (node.value === "" || node.value === null || node.value === undefined) {
    errors.push({ nodeId: node.id, message: "Value is required" });
  }

  if (field.type === "number" && Number.isNaN(Number(node.value))) {
    errors.push({ nodeId: node.id, message: "Value must be a number" });
  }

  return errors;
}

function walk(node: QueryNode): ValidationError[] {
  if (node.type === "condition") {
    return validateCondition(node);
  }

  const errors: ValidationError[] = [];

  if (node.children.length === 0) {
    errors.push({
      nodeId: node.id,
      message: "Group must contain at least one condition or group",
    });
  }

  node.children.forEach((child) => {
    errors.push(...walk(child));
  });

  return errors;
}

export function validateQuery(root: GroupNode): ValidationError[] {
  return walk(root);
}