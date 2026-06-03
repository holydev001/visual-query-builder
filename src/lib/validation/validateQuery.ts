import { GroupNode, QueryNode, ConditionNode } from "../../types/query";
import { getSchema } from "../../mock/schema";
import { DatasetType } from "../../store/query-store";
import { OPERATORS } from "../schema/operators";

export interface ValidationError {
  nodeId: string;
  message: string;
}

function validateCondition(
  node: ConditionNode,
  dataset: DatasetType,
): ValidationError[] {
  const errors: ValidationError[] = [];

  const schema = getSchema(dataset);
  const field = schema.find((item) => item.name === node.field);

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

function walk(node: QueryNode, dataset: DatasetType): ValidationError[] {
  if (node.type === "condition") {
    return validateCondition(node, dataset);
  }

  const errors: ValidationError[] = [];

  if (node.children.length === 0) {
    errors.push({
      nodeId: node.id,
      message: "Group must contain at least one condition or group",
    });
  }

  node.children.forEach((child) => {
    errors.push(...walk(child, dataset));
  });

  return errors;
}

export function validateQuery(
  root: GroupNode,
  dataset: DatasetType = "users",
): ValidationError[] {
  return walk(root, dataset);
}
