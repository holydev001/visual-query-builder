export type LogicOperator = "AND" | "OR";

export type FieldType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "enum";

export type OperatorType =
  | "equals"
  | "not_equals"
  | "contains"
  | "starts_with"
  | "greater_than"
  | "less_than"
  | "between"
  | "in_array";

export interface ConditionNode {
  id: string;

  type: "condition";

  field: string;

  operator: OperatorType;

  value: unknown;
}

export interface GroupNode {
  id: string;

  type: "group";

  logic: LogicOperator;

  children: QueryNode[];

  collapsed?: boolean;
}

export type QueryNode =
  | ConditionNode
  | GroupNode;