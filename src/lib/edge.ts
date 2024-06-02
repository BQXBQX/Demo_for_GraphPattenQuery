import { Node, Position } from "reactflow";

/**
 *
 * @param intersectionNode
 * @param targetNode
 * @returns source 和 target 两个 Node 中心连接线的焦点的坐标
 */

function getNodeIntersection(circleNode: Node, targetNode: Node) {
  const { width, height, positionAbsolute } = circleNode;
  const radius = Math.min(width!, height!) / 2;
  const centerX = positionAbsolute!.x + width! / 2;
  const centerY = positionAbsolute!.y + height! / 2;

  const targetX = targetNode.positionAbsolute!.x + targetNode.width! / 2;
  const targetY = targetNode.positionAbsolute!.y + targetNode.height! / 2;

  const dx = targetX - centerX;
  const dy = targetY - centerY;
  const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

  if (distanceFromCenter <= radius) {
    // 目标点在圆内,返回目标点坐标
    return { x: targetX, y: targetY };
  }

  // 计算交点坐标
  const ratio = radius / distanceFromCenter;
  const intersectionX = centerX + dx * ratio;
  const intersectionY = centerY + dy * ratio;

  return { x: intersectionX, y: intersectionY };
}

/**
 *
 * @param node Node
 * @param intersectionPoint
 * @returns 根据坐标确定 Position 的哪个位置
 */
//TODO: position type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEdgePosition(node: Node, intersectionPoint: any) {
  const n = { ...node.positionAbsolute, ...node };
  const nx = Math.round(n.x!);
  const ny = Math.round(n.y!);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.width! - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y! + n.height! - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}
/**
 *
 * @param source
 * @param target
 * @returns path position
 */
export function getEdgeParams(source: Node, target: Node) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}
