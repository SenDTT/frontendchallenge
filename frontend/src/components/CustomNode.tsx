import { Handle, NodeProps, Position } from "@xyflow/react";
import { PiTableLight } from "react-icons/pi";

export const CustomNode = (props: NodeProps) => {
    const { heading, label, isLeft, isRight } = props.data as { heading: string; label: string; isLeft?: boolean; isRight?: boolean };
    if (!heading || !label) {
        console.error("CustomNode requires 'heading' and 'label' in data.");
        return null;
    }
    return (
        <div className="custom-node">
            <div className="custom-node-left">
                <PiTableLight className="custom-node-icon" />
            </div>
            <div className="custom-node-right">
                <p className="custom-node-label">{label}</p>
                <h3 className="custom-node-heading">{heading}</h3>
            </div>

            {isLeft && (
                <Handle className="custom-node-handle" type="target" position={Position.Left} />
            )}
            {isRight && (
                <Handle className="custom-node-handle" type="source" position={Position.Right} />
            )}
        </div>
    );
}