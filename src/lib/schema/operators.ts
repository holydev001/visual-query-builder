import { FieldType } from "../../types/query";

export const OPERATORS: Record<
FieldType,
string[]
>={

string:[
"equals",
"not_equals",
"contains",
"starts_with"
],

number:[
"equals",
"greater_than",
"less_than",
"between"
],

date:[
"equals",
"greater_than",
"less_than",
"between"
],

boolean:[
"equals"
],

enum:[
"equals",
"not_equals",
"in_array"
]

};