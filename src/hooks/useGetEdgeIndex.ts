// import { useEdgesGroupStore } from "@/stores/useEdgesGroupStore";
// import { useEffect, useState } from "react";
// import { Edge } from "reactflow";

// export const useGetEdgeIndex = (
//   source: string,
//   target: string,
//   id: string,
//   setIndex: (value: number) => void
// ) => {
//   const edgesGroup = useEdgesGroupStore((state) => state.edgesGroup);
//   const [totalEdges, setTotalEdges] = useState<Edge[]>([]);

//   useEffect(() => {
//     const index = edgesGroup.findIndex(
//       (group) => group.source === source && group.target === target
//     );
//     if (index === -1) {
//       setTotalEdges([]);
//     } else {
//       const backIndex = edgesGroup.findIndex(
//         (group) => group.source === target && group.target === source
//       );
//       if (backIndex === -1) {
//         setTotalEdges(edgesGroup[index].content);
//       } else {
//         setTotalEdges([
//           ...edgesGroup[backIndex].content,
//           ...edgesGroup[index].content,
//         ]);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [source, target, setIndex]);

//   useEffect(() => {
//     if (totalEdges.length) {
//       setIndex(totalEdges.findIndex((edge) => edge.id === id));
//     }
//   }, [id, totalEdges, setIndex]);
// };
