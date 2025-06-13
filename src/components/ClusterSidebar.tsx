import React from "react";
import { MyDataType } from "../types/types";

interface ClusterSidebarProps {
  groups: MyDataType[];
  selectedClusterId: number | null;
  onClusterSelect: (clusterId: number) => void;
}

export default function ClusterSidebar({
  groups,
  selectedClusterId,
  onClusterSelect,
}: ClusterSidebarProps) {
  return (
    <>
      <div className="w-64 bg-blue-950 flex-col h-[1200px] p-4 space-y-2 ">
        {groups.map((group) => {
          return (
            <div
              key={group.cluster_id}
              className={`p-4 rounded-lg cursor-pointer mb-2 ${
                selectedClusterId === group.cluster_id
                  ? "bg-purple-300 text-purple-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                console.log("클릭됨", group.cluster_id);
                onClusterSelect(group.cluster_id);
              }}
            >
              {group.cluster_name}
            </div>
          );
        })}
      </div>
    </>
  );
}
