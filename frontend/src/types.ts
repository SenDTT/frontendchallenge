export interface RootNodeData {
  name: string;
  type: string;
  priority: number;
}

export interface FirstChildNodeData {
  flowName: string;
  team: string;
  type: string;
}

export interface SecondChildNodeData {
  flowName: string;
  approver: string;
  priority: number;
}

export interface FirstGrandChildNodeData {
  flowName: string;
  team: string;
  status: string;
  priority: number;
  orgName: string;
}

export interface SecondGrandChildNodeData {
  flowName: string;
  approver: string;
  deadline: Date | string;
  priority: number;
  userId: string;
}

export type NodeData =
  | RootNodeData
  | FirstChildNodeData
  | SecondChildNodeData
  | FirstGrandChildNodeData
  | SecondGrandChildNodeData;

export interface PropsNodeForm {
  formData: NodeData;
  onChange: (data: NodeData) => void;
  onSubmit: (data: NodeData) => void;
  onCancel: () => void;
  fields: FormField[];
  openConfigPrefill: (fieldId: string) => void;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  value: any;
  required?: boolean;
  options?: { label: string; value: any }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
}

export interface IPrefillData {
  form: string;
  data: NodeData;
}

export interface IPrefillDataProps {
  fields: IPrefillData;
  selected: ISelectedPrefillField[];
  currentNodeId: string;
  currentData: NodeData;
  targetFieldId: string;
  onSubmit: (
    nodeId: string,
    targetId: string,
    selected: ISelectedPrefillField[]
  ) => void;
}

export interface ISelectedPrefillField {
  sourceId: string;
  field: string;
  targetId: string;
  sourceType?: string;
}

export interface GlobalDataSource {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
}

export interface DependencyFields {
  formId: string;
  formName: string;
  fields: FormField[];
}

export interface ReactFlowNodeData {
  label: string;
  heading: string;
  isLeft: boolean;
  isRight: boolean;
  formData: Record<string, any>;
  fields: FormField[];
  parentIds?: string[];
  prefillConfig?: Record<string, ISelectedPrefillField>;
}
