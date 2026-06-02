"use client";

import GroupNode from "./GroupNode";

import { useQueryStore } from "../../src/store/query-store";

export default function QueryBuilder() {

 const root = useQueryStore(
  state=>state.root
 );

 return (

  <div className="space-y-4">

   <GroupNode node={root} />

  </div>

 );

}