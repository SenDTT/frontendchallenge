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
}

export interface SecondGrandChildNodeData {
  flowName: string;
  approver: string;
  deadline: Date | string;
  priority: number;
}

export type NodeData = RootNodeData | FirstChildNodeData | SecondChildNodeData | FirstGrandChildNodeData | SecondGrandChildNodeData;

export interface PropsNodeForm {
  formData: NodeData;
  onChange: (data: NodeData) => void;
  onSubmit: (data: NodeData) => void;
  onCancel: () => void;
  fields?: FormField[];
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
