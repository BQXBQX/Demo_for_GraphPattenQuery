export interface NodeProps {
  key: string;
  caption: string;
  labels: string[];
  properties: Map<string, string | number>;
  sourceNode: string[];
  targetNode: string[];
  isSelect: boolean;
  sendEdge: string[];
  acceptEdge: string[];
}
