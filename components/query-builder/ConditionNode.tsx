"use client";

import { ConditionNode as ConditionType }
from "../../src/types/query";

interface Props{

 node:ConditionType;

}

export default function ConditionNode(
 {node}:Props
){

 return(

<div className="border rounded p-2">

{node.field || "Empty Condition"}

</div>

)

}