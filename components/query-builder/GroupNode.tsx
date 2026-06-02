"use client";

import { GroupNode as GroupType } from "../../src/types/query";

import ConditionNode from "./ConditionNode";

import { createCondition, createGroup }
from "../../src/lib/helpers/queryFactory";

import { useQueryStore }
from "../../src/store/query-store";

import { updateNode }
from "../../src/lib/traversal/updateNode";

interface Props{

 node:GroupType;

}

export default function GroupNode(
 {node}:Props
){

 const root=
 useQueryStore(
  state=>state.root
 );

 const setRoot=
 useQueryStore(
  state=>state.setRoot
 );

 function addCondition(){

  setRoot(

   updateNode(
    root,
    node.id,
    (group:any)=>({

     ...group,

     children:[
      ...group.children,

      createCondition()
     ]

    })

   )

  );

 }

 function addGroup(){

  setRoot(

   updateNode(
    root,
    node.id,
    (group:any)=>({

     ...group,

     children:[
      ...group.children,

      createGroup()
     ]

    })

   )

  );

 }

 return (

<div className="border p-4 rounded">

<div className="flex gap-2">

<button onClick={addCondition}>

+ Condition

</button>

<button onClick={addGroup}>

+ Group

</button>

</div>

<div className="space-y-3 mt-4">

{node.children.map(
 child=>{

if(child.type==="group"){

return(

<GroupNode

key={child.id}

node={child}

/>

)

}

return(

<ConditionNode

key={child.id}

node={child}

/>

)

})

}

</div>

</div>

)

}