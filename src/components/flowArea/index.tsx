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
import { useEdgesGroupStore } from "@/stores/useEdgesGroupStore.ts";

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
  const addEdge = useEdgesGroupStore((state) => state.addEdge);

  const onConnect = useCallback(
    (connection: Edge) => {
      //TODO: 这里暂时用随机数替代ID， 以后用具体的source和target和key 组成ID
      connection.id = String(Math.floor(Math.random() * 100000000) + 1);
      addEdge([connection.source, connection.target], connection);
      setEdges((eds: Edge[]) => [...eds, connection]);
    },
    [setEdges, addEdge]
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
