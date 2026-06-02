import { FieldType } from "./query";

export interface SchemaField {

  name: string;

  type: FieldType;

  enumValues?: string[];

}

export type QuerySchema = SchemaField[];