import React, { memo } from "react";
import { Handle, Position, ReactFlowState, useStore } from "reactflow";

const connectionNodeIdSelector = (state: ReactFlowState) =>
  state.connectionNodeId;

interface CustomNodeProps {
  id: string;
  isConnectable: boolean;
}

export const CustomNode: React.FC<CustomNodeProps> = memo(
  ({ id, isConnectable }) => {
    const connectionNodeId = useStore(connectionNodeIdSelector);

    const isTarget = connectionNodeId && connectionNodeId !== id;

    return (
      <>
        <div className="relative w-32 h-32 rounded-full">
          <div className="bg-white w-32 h-32 border-4 border-black rounded-full absolute z-10 inset-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu">
            {id}
          </div>
          {!isTarget && (
            <Handle
              type="source"
              id="a"
              position={Position.Left}
              className="bg-slate-500 w-36 h-36 absolute z-0 inset-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu opacity-0 hover:opacity-100"
            />
          )}
          <Handle
            type="target"
            position={Position.Right}
            id="b"
            className="bg-transparent w-32 h-32 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu opacity-1"
            style={{ zIndex: `${isTarget ? "20" : "0"}` }}
            isConnectable={isConnectable}
          />
        </div>
      </>
    );
  }
);
