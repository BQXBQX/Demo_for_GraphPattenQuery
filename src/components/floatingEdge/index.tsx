import { getEdgeParams } from "@/lib/edge";
import { isEqual } from "@/lib/isEqual";
import { useEdgesGroupStore } from "@/stores/useEdgesGroupStore";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { ReactFlowState, getStraightPath, useStore } from "reactflow";

interface FloatingEdgeProps {
  id: string;
  source: string;
  target: string;
  markerEnd: string;
  style: CSSProperties;
}

export const FloatingEdge: React.FC<FloatingEdgeProps> = ({
  id,
  source,
  target,
  markerEnd,
  style,
}) => {
  const edgesGroups = useEdgesGroupStore((state) => state.edgesGroups);
  const [edgeIndex, setEdgeIndex] = useState<number>();

  useEffect(() => {
    const groupIndex = edgesGroups.findIndex((group) =>
      isEqual(group.relateNode, [source, target])
    );
    const newEdgeIndex = edgesGroups[groupIndex].content.findIndex(
      (edge) => edge.id === id
    );
    setEdgeIndex(newEdgeIndex);
  }, [edgesGroups, source, target, id]);

  const sourceNode = useStore(
    useCallback(
      (store: ReactFlowState) => store.nodeInternals.get(source),
      [source]
    )
  );
  const targetNode = useStore(
    useCallback(
      (store: ReactFlowState) => store.nodeInternals.get(target),
      [target]
    )
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      {edgeIndex}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
    </>
  );
};
