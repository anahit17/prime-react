import { PanelMenu } from "primereact/panelmenu";
import "./Menus.scss";
import React from "react";

const items = [
  {
    label: "Configuration",
    items: [
      {
        label: "User Management",
        items: [],
      },
      {
        label: "Trading Partner",
        items: [
          {
            label: "Client",
            url: "/client",
          },
          {
            label: "Supplier",
            url: "/supplier",
          },
          {
            label: "Customer",
            url: "/customer",
          },
        ],
      },
      {
        label: "Warehouse Setup",
        items: [
          {
            label: "Warehouse",
            url: "/warehouse",
          },
          {
            label: "Storage Location",
            url: "/storagelocation",
          },
          {
            label: "Location Zone",
            url: "/locationzone",
          },
          {
            label: "Pick Area",
            url: "/pickArea",
          },
          {
            label: "Location Category",
            url: "/locationcategory",
          },
          {
            label: "Location",
            url: "/location",
          },
          {
            label: "Door Lock",
            url: "/doorLock",
          },
        ],
      },
      {
        label: "Activity Setup",
        items: [
          {
            label: "Attribute",
          },
          {
            label: "Activity",
          },
          {
            label: "Work Flow",
          },
          {
            label: "Work Flow Assignment",
          },
        ],
      },
      {
        label: "Rule Engine",
        items: [
          {
            label: "Rules",
          },
          {
            label: "Strategy",
          },
          {
            label: "Strategy Assigment",
          },
        ],
      },
      {
        label: "Item Master",
        items: [
          {
            label: "Item Category",
          },
          {
            label: "Item",
          },
        ],
      },
      {
        label: "Transport Setup",
        items: [
          {
            label: "Carrier",
          },
          {
            label: "Route",
          },
          {
            label: "Carrier Service",
          },
          {
            label: "Trailler",
          },
        ],
      },
    ],
  },
];

export default function Menu() {
  return <PanelMenu model={items} style={{ width: "300px" }} />;
}
