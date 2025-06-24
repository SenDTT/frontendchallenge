import { addEdge, ReactFlow, useEdgesState, useNodesState, Position, MiniMap, BackgroundVariant, Background, Controls } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1', position: { x: 150, y: 200 }, data: { label: 'form', heading: "Form A", isLeft: false, isRight: true },
    targetPosition: Position.Right, sourcePosition: Position.Left,
    type: 'customNode',
  },
  {
    id: '2', position: { x: 500, y: 100 }, data: { label: 'form', heading: "Form B", isLeft: true, isRight: true }, targetPosition: Position.Right, sourcePosition: Position.Left,
    type: 'customNode'
  },
  {
    id: '3', position: { x: 500, y: 300 }, data: { label: 'form', heading: "Form C", isLeft: true, isRight: true }, targetPosition: Position.Right, sourcePosition: Position.Left,
    type: 'customNode'
  },
  {
    id: '4', position: { x: 850, y: 100 }, data: { label: 'form', heading: "Form D", isLeft: true, isRight: false }, targetPosition: Position.Right, sourcePosition: Position.Left,
    type: 'customNode'
  },
  {
    id: '5', position: { x: 850, y: 300 }, data: { label: 'form', heading: "Form E", isLeft: true, isRight: false }, targetPosition: Position.Right, sourcePosition: Position.Left,
    type: 'customNode'
  },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
];

const styles = {
  width: '100%',
  height: 300,
};

const nodeTypes = { 'customNode': CustomNode }

const App = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentNode, setCurrentNode] = useState<import('@xyflow/react').Node | null>(null);
  const [titleModal, setTitleModal] = useState<string>();

  const onConnect = useCallback(
    (connection: import('@xyflow/react').Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const handleNodeClick = useCallback((event: React.MouseEvent, node: import('@xyflow/react').Node) => {
    setShowFormModal(false);
    setCurrentNode(node);
    setShowFormModal(true);
  }, []);

  return (
    <div className='container'>
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

      {showFormModal && (
        <Modal title={`${currentNode?.data?.heading}`} show={showFormModal} onClose={() => setShowFormModal(false)}>
          <NodeForm
            formData={{ name: '', type: '', priority: 0 }}
            onChange={(data) => console.log('Form data changed:', data)}
            onSubmit={(data) => {
              console.log('Form submitted:', data);
              setShowFormModal(false);
            }}
            onCancel={() => setShowFormModal(false)}
            fields={[
              { id: 'name', name: 'name', label: 'Name', type: 'text', value: '', required: true, placeholder: 'Enter name' },
              { id: 'type', name: 'type', label: 'Type', type: 'select', value: '', options: [{ label: 'Type A', value: 'A' }, { label: 'Type B', value: 'B' }], required: true },
              { id: 'priority', name: 'priority', label: 'Priority', type: 'number', value: 0, required: true, placeholder: 'Enter priority' }
            ]}
          />
        </Modal>
      )}
    </div>
  );
}

import './App.css';
import { useCallback, useState } from 'react';
import { CustomNode } from './components/CustomNode';
import Modal from './components/Modal';
import NodeForm from './components/NodeForm';

export default App;
