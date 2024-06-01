import { memo } from "react";
import { Handle, Position } from "reactflow";

export const CustomNode = memo(({ data, isConnectable }) => {
  return (
    <>
      <div className="relative w-36 h-36">
        <div className="bg-white w-32 h-32 border-4 border-black rounded-full absolute z-10 inset-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu">
          span
        </div>
        <Handle
          type="target"
          id="a"
          position={Position.Left}
          isConnectable={isConnectable}
          className="bg-slate-500 w-36 h-36 z-0 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu opacity-0 hover:opacity-100"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          className="bg-transparent w-32 h-32 z-20 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu opacity-1"
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
});
