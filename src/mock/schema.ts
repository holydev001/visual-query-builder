import { QuerySchema } from "../types/schema";

export const userSchema: QuerySchema = [

  {
    name:"name",
    type:"string"
  },

  {
    name:"age",
    type:"number"
  },

  {
    name:"country",
    type:"string"
  },

  {
    name:"status",
    type:"enum",

    enumValues:[
      "active",
      "inactive",
      "pending"
    ]
  },

  {
    name:"createdAt",
    type:"date"
  }

];