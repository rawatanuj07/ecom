import { BsCart4 } from "react-icons/bs";
import { defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BsCart4,
  fields: [],
});
