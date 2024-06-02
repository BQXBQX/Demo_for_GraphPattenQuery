import { isEqual } from "@/lib/isEqual";
import { Edge } from "reactflow";
import { create } from "zustand";

interface EdgesGroupProps {
  relateNode: string[];
  content: Edge[];
}

interface EdgesGroupStoreProps {
  edgesGroups: EdgesGroupProps[];
  addEdge: (relateNode: string[], value: Edge) => void;
  deleteEdge: (relateNode: string[], value: Edge) => void;
}

export const useEdgesGroupStore = create<EdgesGroupStoreProps>((set) => ({
  edgesGroups: [],
  addEdge: (relateNode, value) =>
    set((state) => {
      const index = state.edgesGroups.findIndex((group) =>
        isEqual(group.relateNode, relateNode)
      );
      // 如果没有找到对应的group，就init
      if (index === -1) {
        return {
          edgesGroups: [...state.edgesGroups, { relateNode, content: [value] }],
        };
      } else {
        return {
          edgesGroups: [
            ...state.edgesGroups.slice(0, index),
            {
              ...state.edgesGroups[index],
              content: [...state.edgesGroups[index].content, value],
            },
            ...state.edgesGroups.slice(index + 1),
          ],
        };
      }
    }),
  deleteEdge: (relateNode, value) =>
    set((state) => {
      const index = state.edgesGroups.findIndex((group) =>
        isEqual(group.relateNode, relateNode)
      );
      if (index !== -1) {
        const contentIndex = state.edgesGroups[index].content.findIndex(
          (edge) => edge.id === value.id
        );
        if (contentIndex !== -1) {
          return {
            edgesGroups: [
              ...state.edgesGroups.slice(0, index),
              {
                ...state.edgesGroups[index],
                content: [
                  ...state.edgesGroups[index].content.slice(0, contentIndex),
                  ...state.edgesGroups[index].content.slice(contentIndex + 1),
                ],
              },
              ...state.edgesGroups.slice(index + 1),
            ],
          };
        }
      }
      return state;
    }),
}));
