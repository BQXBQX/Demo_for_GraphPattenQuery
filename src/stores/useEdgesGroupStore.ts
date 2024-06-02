import { Edge } from "reactflow";
import { create } from "zustand";

interface EdgesGroupProps {
  source: string;
  target: string;
  content: Edge[];
}

interface EdgesGroupStoreProps {
  edgesGroup: EdgesGroupProps[];
  initEdgesGroup: (source: string, target: string, value: Edge) => void;
  addEdge: (source: string, target: string, value: Edge) => void;
  deleteEdge: (source: string, target: string, value: Edge) => void;
}

export const useEdgesGroupStore = create<EdgesGroupStoreProps>((set) => ({
  edgesGroup: [],
  initEdgesGroup: (source, target, value) =>
    set((state) => ({
      edgesGroup: [...state.edgesGroup, { source, target, content: [value] }],
    })),
  addEdge: (source, target, value) =>
    set((state) => {
      const index = state.edgesGroup.findIndex(
        (group) => group.source === source && group.target === target
      );
      return {
        edgesGroup: [
          ...state.edgesGroup.slice(0, index),
          {
            ...state.edgesGroup[index],
            content: [...state.edgesGroup[index].content, value],
          },
          ...state.edgesGroup.slice(index + 1),
        ],
      };
    }),
  deleteEdge: (source, target, value) =>
    set((state) => {
      const index = state.edgesGroup.findIndex(
        (group) => group.source === source && group.target === target
      );
      if (index !== -1) {
        const contentIndex = state.edgesGroup[index].content.findIndex(
          (edge) => edge.id === value.id
        );
        if (contentIndex !== -1) {
          return {
            edgesGroup: [
              ...state.edgesGroup.slice(0, index),
              {
                ...state.edgesGroup[index],
                content: [
                  ...state.edgesGroup[index].content.slice(0, contentIndex),
                  ...state.edgesGroup[index].content.slice(contentIndex + 1),
                ],
              },
              ...state.edgesGroup.slice(index + 1),
            ],
          };
        }
      }
      return state;
    }),
}));
