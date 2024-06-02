import { useCallback } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeTypes,
  MarkerType,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import initialNodes from "./nodes.ts";
import initialEdges from "./edges.ts";
import { CustomNode } from "../customNode/index.tsx";
import { FloatingEdge } from "../floatingEdge/index.tsx";

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};

export const FlowArea = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
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
      defaultEdgeOptions={defaultEdgeOptions}
      edgeTypes={edgeTypes as unknown as EdgeTypes}
      className="flex-grow"
      fitView
    >
      <Background></Background>
      <Controls></Controls>
    </ReactFlow>
  );
};
