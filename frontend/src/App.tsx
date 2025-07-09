import {
  addEdge,
  ReactFlow,
  useEdgesState, useNodesState, MiniMap,
  BackgroundVariant, Background, Controls,
  ReactFlowProvider
} from '@xyflow/react';
import './App.css';
import { useCallback, useState } from 'react';
import { CustomNode } from './components/CustomNode';
import Modal from './components/Modal';
import NodeForm from './components/NodeForm';
import { initialEdges, initialNodes } from './data';
import '@xyflow/react/dist/style.css';
import { IPrefillData, ISelectedPrefillField } from './types';
import PrefillData from './components/PrefillData';

const styles = {
  width: '100%',
  height: 300,
};

const nodeTypes = { 'customNode': CustomNode }

const App = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showPrefillModal, setShowPrefillModal] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentNode, setCurrentNode] = useState<import('@xyflow/react').Node | null>(null);
  const [prefillData, setPrefillData] = useState<IPrefillData[]>([]);
  const [configFieldId, setConfigFieldId] = useState<string | null>(null);

  const onConnect = useCallback(
    (connection: import('@xyflow/react').Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const handlePrefillData = (parentIds: string[]) => {
    let data: IPrefillData[] = [];

    if (nodes.length > 0) {
      parentIds.map(id => {
        const parentNode = nodes.find(prev => prev.id === id);
        if (parentNode) {
          data.push({
            form: parentNode.data.heading,
            data: parentNode.data.formData
          });
        }
      });
    }

    setPrefillData(data);
  }

  const handleNodeClick = useCallback((event: React.MouseEvent, node: import('@xyflow/react').Node) => {
    event.preventDefault();
    console.log(node);

    if (node && Array.isArray(node.data.parentIds)) {
      handlePrefillData(node.data.parentIds);
    }

    setShowFormModal(false);
    setCurrentNode(node);
    setShowFormModal(true);
  }, []);

  const closeModal = () => {
    setShowFormModal(false);
    setCurrentNode(null);
  }

  const openConfigPrefill = (fieldId: string) => {
    setShowPrefillModal(true);
    setConfigFieldId(fieldId);
  }

  const handleClearPrefill = useCallback(
    (
      nodeId: string,
      fieldId: string,
      prefill: ISelectedPrefillField[]
    ) => {
      // setNodes((nds) =>
      //   nds.map((n) => {
      //     if (n.id !== node.id) return n;

      //     return {
      //       ...n,
      //       data: {
      //         ...n.data,
      //         fields: n.data.fields.map((field: any) =>
      //           field.id === fieldId ? { ...field, prefill: undefined } : field
      //         ),
      //       },
      //     };
      //   })
      // );
    },
    [setNodes]
  );


  const handleSavePrefill = useCallback(
    (
      nodeId: string,
      fieldId: string,
      prefill: ISelectedPrefillField[]
    ) => {
      console.log(nodeId, fieldId, prefill);
      const newNodes = nodes.map((n) => {
        if (n.id !== nodeId) return n;

        return {
          ...n,
          data: {
            ...n.data,
            fields: n.data.fields.map((field: any) =>
              field.id === fieldId ? { ...field, prefill } : field
            ),
          },
        };
      });

      console.log(newNodes);
      // setNodes(newNodes);
      // setNodes((nds) =>

      // );
    },
    [setNodes]
  );


  return (
    <div className='container'>
      <ReactFlowProvider>
        <div className="app-container">
          <ReactFlow
            style={styles}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            onConnect={onConnect}>
            <Controls />
            <Background color="#FBEAE7" variant={BackgroundVariant.Dots} />
            <MiniMap nodeStrokeWidth={2} zoomable pannable />
          </ReactFlow>
        </div>

        {showFormModal && currentNode && (
          <Modal title={`${currentNode?.data?.heading}`} show={showFormModal} onClose={() => setShowFormModal(false)}>
            <NodeForm
              formData={currentNode?.data.formData as import('./types').NodeData}
              onChange={(data) => console.log('Form data changed:', data)}
              onSubmit={(data) => {
                console.log('Form submitted:', data);
                setShowFormModal(false);
              }}
              onCancel={closeModal}
              openConfigPrefill={openConfigPrefill}
              fields={currentNode?.data?.fields as import('./types').FormField[]}
            />
          </Modal>
        )}

        {showPrefillModal && currentNode && configFieldId && (
          <Modal
            title={`Configure Prefill for ${(currentNode.data.fields as import('./types').FormField[]).find((f: import('./types').FormField) => f.id === configFieldId)?.label}`}
            show={showPrefillModal}
            onClose={closeModal}
          >
            <PrefillData
              targetFieldId={configFieldId}
              fields={{ form: currentNode.id, data: currentNode.data as unknown as import('./types').NodeData }}
              selected={[]}
              currentNodeId={currentNode.id}
              currentData={currentNode.data as unknown as import('./types').NodeData}
              onSubmit={(nodeId, targetId, selected) => handleSavePrefill(nodeId, targetId, selected)}
            />
          </Modal>
        )}
      </ReactFlowProvider>
    </div>
  );
}

export default App;
