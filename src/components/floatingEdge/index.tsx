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
  const [edgePath, setEdgePath] = useState<string>("");

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

  // const [edgePath] = getStraightPath({
  //   sourceX: sx,
  //   sourceY: sy,
  //   targetX: tx,
  //   targetY: ty,
  // });

  console.log(edgePath);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const newEdgePath = generateCurvedLine(sx, sy, tx, ty, edgeIndex);
    setEdgePath(newEdgePath);
    console.log(newEdgePath);
  }, [sx, sy, tx, ty, edgeIndex]);

  return (
    <>
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

function generateCurvedLine(sx, sy, tx, ty, index) {
  // 计算线段的角度
  const angle = Math.atan2(ty - sy, tx - sx);

  // 计算线段的中点坐标
  const midX = (sx + tx) / 2;
  const midY = (sy + ty) / 2;

  // 计算控制点坐标
  const controlX = midX + 40 * Math.cos(angle + Math.PI / 2) * index;
  const controlY = midY + 40 * Math.sin(angle + Math.PI / 2) * index;

  // 生成 SVG 路径字符串
  const edgePath = `M ${sx},${sy} Q ${controlX},${controlY} ${tx},${ty}`;

  return edgePath;
}
