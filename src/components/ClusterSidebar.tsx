import React from "react";
import { MyDataType } from "../types/types";
import { group } from "console";

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
  const sideCluster = groups.find(
    (group) => selectedClusterId === group.cluster_id
  );

  const formatPercentManual = (rate: number) => {
    return (rate * 100).toFixed(1) + " %";
  };
  return (
    <>
      <div className="w-64 bg-blue-950 flex-col h-[1200px] p-4 space-y-9 ">
        <h2 className="text-white font-bold mb-4">Basic information</h2>

        {sideCluster ? (
          <div className=" bg-white p-4 round-lg shadow space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-600">
                평균나이
              </span>
              <span className="text-lg font-bold text-gray-900">
                {sideCluster.avg_age} 세
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-600">
                평균구매액
              </span>
              <span className="text-lg font-bold text-gray-900">
                $ {sideCluster.avg_purchase_amount}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-600">구독률</span>
              <span className="text-lg font-bold text-gray-900">
                {formatPercentManual(sideCluster.subscription_rate)}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg cursor-pointer mb-2">
            클러스터를 선택해 주세여
          </div>
        )}
        <div className="text-white flex justify-center items-center bg-blue-400">
          <button> Ai </button>
        </div>
      </div>
    </>
  );
}
