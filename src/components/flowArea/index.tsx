import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  EdgeTypes,
  MarkerType,
  OnConnect,
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
    (connection: Edge) => {
      connection.id = String(Math.floor(Math.random() * 100000) + 1);
      setEdges((eds: Edge[]) => [...eds, connection]);
    },
    [setEdges]
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect as OnConnect}
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
