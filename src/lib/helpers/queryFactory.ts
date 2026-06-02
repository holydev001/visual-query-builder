import { ConditionNode, GroupNode } from "../../types/query";

export function createCondition(): ConditionNode {

  return {

    id: crypto.randomUUID(),

    type:"condition",

    field:"",

    operator:"equals",

    value:""

  };

}

export function createGroup(): GroupNode {

  return {

    id: crypto.randomUUID(),

    type:"group",

    logic:"AND",

    collapsed:false,

    children:[]
  };

}