import { useCallback } from "react";
import ReactFlow, {
  Background,
  Connection,
  Edge,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import initialNodes from "./nodes.ts";
import initialEdges from "./edges.ts";
import { CustomNode } from "../customNode/index.tsx";

const nodeTypes = {
  custom: CustomNode,
};

export const FlowArea = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      setEdges((eds: Edge[]) => addEdge(connection, eds)),
    [setEdges]
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      className="flex-grow"
    >
      <Background></Background>
    </ReactFlow>
  );
};
