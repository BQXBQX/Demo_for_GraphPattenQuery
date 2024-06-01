export interface EdgeProps {
  key: string;
  type: string;
  properties: Map<string, string | number>;
  edgeFrom: string;
  edgeTo: string;
}
