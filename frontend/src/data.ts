import { Position } from "@xyflow/react";
import {
  FormField,
  RootNodeData,
  FirstChildNodeData,
  SecondChildNodeData,
  FirstGrandChildNodeData,
  SecondGrandChildNodeData,
} from "./types";

// Node 1: Root Node (RootNodeData)
export const dataFormOne = {
  formData: {
    name: "Main Flow",
    type: "process",
    priority: 1,
  } as RootNodeData,
  fields: [
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      value: "Main Flow",
      required: true,
    },
    {
      id: "type",
      name: "type",
      label: "Type",
      type: "select",
      value: "process",
      options: [
        { label: "Process", value: "process" },
        { label: "Task", value: "task" },
      ],
    },
    {
      id: "priority",
      name: "priority",
      label: "Priority",
      type: "number",
      value: 1,
    },
  ] as FormField[],
};

// Node 2: First Child Node (FirstChildNodeData)
export const dataFormTwo = {
  formData: {
    flowName: "Assign Team",
    team: "Engineering",
    type: "assignment",
  } as FirstChildNodeData,
  fields: [
    {
      id: "flowName",
      name: "flowName",
      label: "Flow Name",
      type: "text",
      value: "Assign Team",
    },
    {
      id: "team",
      name: "team",
      label: "Team",
      type: "text",
      value: "Engineering",
    },
    {
      id: "type",
      name: "type",
      label: "Type",
      value: "assignment",
      type: "select",
      options: [
        { label: "Assignment", value: "assignment" },
        { label: "Draft", value: "draft" },
      ],
    },
  ] as FormField[],
};

// Node 3: Second Child Node (SecondChildNodeData)
export const dataFormThree = {
  formData: {
    flowName: "Request Approval",
    approver: "Manager",
    priority: 2,
  } as SecondChildNodeData,
  fields: [
    {
      id: "flowName",
      name: "flowName",
      label: "Flow Name",
      type: "text",
      value: "Request Approval",
    },
    {
      id: "approver",
      name: "approver",
      label: "Approver",
      type: "text",
      value: "Manager",
    },
    {
      id: "priority",
      name: "priority",
      label: "Priority",
      type: "number",
      value: 2,
    },
  ] as FormField[],
};

// Node 4: First Grandchild Node (FirstGrandChildNodeData)
export const dataFormFour = {
  formData: {
    flowName: "Execute Task",
    team: "Operations",
    status: "Pending",
    priority: 3,
    orgName: "Avantos",
  } as FirstGrandChildNodeData,
  fields: [
    {
      id: "flowName",
      name: "flowName",
      label: "Flow Name",
      type: "text",
      value: "Execute Task",
    },
    {
      id: "team",
      name: "team",
      label: "Team",
      type: "text",
      value: "Operations",
    },
    {
      id: "status",
      name: "status",
      label: "Status",
      type: "select",
      value: "Pending",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Completed", value: "Completed" },
      ],
    },
    {
      id: "priority",
      name: "priority",
      label: "Priority",
      type: "number",
      value: 3,
    },
    {
      id: "orgName",
      name: "orgName",
      label: "Organization Name",
      type: "text",
      value: "Avantos",
    },
  ] as FormField[],
};

// Node 5: Second Grandchild Node (SecondGrandChildNodeData)
export const dataFormFive = {
  formData: {
    flowName: "Review Task",
    approver: "Supervisor",
    deadline: "2025-07-10",
    priority: 4,
    userId: "12345",
  } as SecondGrandChildNodeData,
  fields: [
    {
      id: "flowName",
      name: "flowName",
      label: "Flow Name",
      type: "text",
      value: "Review Task",
    },
    {
      id: "approver",
      name: "approver",
      label: "Approver",
      type: "text",
      value: "Supervisor",
    },
    {
      id: "deadline",
      name: "deadline",
      label: "Deadline",
      type: "date",
      value: "2025-07-10",
    },
    {
      id: "priority",
      name: "priority",
      label: "Priority",
      type: "number",
      value: 4,
    },
    {
      id: "userId",
      name: "userId",
      label: "User ID",
      type: "text",
      value: "12345",
    },
  ] as FormField[],
};

export const initialNodes = [
  {
    id: "1",
    position: { x: 150, y: 200 },
    data: {
      label: "form",
      heading: "Form A",
      isLeft: false,
      isRight: true,
      ...dataFormOne,
    },
    targetPosition: Position.Right,
    sourcePosition: Position.Left,
    type: "customNode",
  },
  {
    id: "2",
    position: { x: 500, y: 100 },
    data: {
      label: "form",
      heading: "Form B",
      isLeft: true,
      isRight: true,
      parentIds: ["1"],
      ...dataFormTwo,
    },
    targetPosition: Position.Right,
    sourcePosition: Position.Left,
    type: "customNode",
    parentId: "1",
  },
  {
    id: "3",
    position: { x: 500, y: 300 },
    data: {
      label: "form",
      heading: "Form C",
      isLeft: true,
      isRight: true,
      parentIds: ["1"],
      ...dataFormThree,
    },
    targetPosition: Position.Right,
    sourcePosition: Position.Left,
    type: "customNode",
    parentId: "1",
  },
  {
    id: "4",
    position: { x: 850, y: 100 },
    data: {
      label: "form",
      heading: "Form D",
      isLeft: true,
      isRight: false,
      parentIds: ["1", "2"],
      ...dataFormFour,
    },
    targetPosition: Position.Right,
    sourcePosition: Position.Left,
    type: "customNode",
    parentId: "2",
  },
  {
    id: "5",
    position: { x: 850, y: 300 },
    data: {
      label: "form",
      heading: "Form E",
      isLeft: true,
      isRight: false,
      parentIds: ["1", "3"],
      ...dataFormFive,
    },
    targetPosition: Position.Right,
    sourcePosition: Position.Left,
    type: "customNode",
    parentId: "3",
  },
];
export const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-5", source: "3", target: "5" },
];
export const globalData = [
  {
    id: "userId",
    name: "userId",
    label: "User ID",
    type: "text",
    value: "12345",
  },
  {
    id: "orgName",
    name: "orgName",
    label: "Organization Name",
    type: "text",
    value: "Avantos",
  },
];
