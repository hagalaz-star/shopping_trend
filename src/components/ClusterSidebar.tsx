import React from "react";
import { MyDataType } from "../types/types";
import { Button } from "@/components/ui/button";
import {
  HeartMinus,
  WalletCards,
  UserCheck,
  DiamondPercent,
  Star,
  MousePointerClick,
} from "lucide-react";

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
      <div className="w-80 bg-blue-950 flex-col h-[1200px] p-4 space-y-9 ">
        <h2 className="text-white font-bold mb-4 text-3xl m-4">
          Basic information
        </h2>

        {sideCluster ? (
          <div className=" round-lg shadow space-y-3 my-15">
            <div className="flex flex-col justify-between items-center my-8">
              <div className="flex space-x-2">
                <HeartMinus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                <span className="text-lg font-medium text-white">평균나이</span>
              </div>

              <span className="text-lg font-bold text-white">
                {sideCluster.avg_age}세
              </span>
            </div>

            <div className="flex flex-col justify-between items-center my-8">
              <div className="flex space-x-2">
                <WalletCards className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                <span className="text-lg font-medium text-white">
                  평균구매액
                </span>
              </div>

              <span className="text-lg font-bold text-white">
                ${sideCluster.avg_purchase_amount}
              </span>
            </div>

            <div className="flex flex-col justify-between items-center my-8">
              <div className="flex space-x-2">
                <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                <span className="text-lg font-medium text-white">구독률</span>
              </div>

              <span className="text-lg font-bold text-white">
                {formatPercentManual(sideCluster.subscription_rate)}
              </span>
            </div>

            <div className="flex flex-col justify-between items-center my-8">
              <div className="flex space-x-2">
                <DiamondPercent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                <span className="text-lg font-medium text-white">
                  할인이용률
                </span>
              </div>

              <span className="text-lg font-bold text-white">
                {`${sideCluster.discount_usage_rate} %`}
              </span>
            </div>

            <div className="flex flex-col justify-between items-center my-8">
              <div className="flex space-x-2">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                <span className="text-lg font-medium text-white">
                  리뷰 평점
                </span>
              </div>

              <span className="text-lg font-bold text-white">
                {`${sideCluster.review_rating_score} / 5`}
              </span>
            </div>

            <div className="flex justify-center items-center w-full">
              <Button className=" bg-blue-400 px-13 py-6 text-white font-bold text-2xl">
                Ai
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg cursor-pointer mb-2 ">
            <div className="flex text-center py-10 text-white space-x-2">
              <MousePointerClick />
              <span>클러스터를 선택해 주세요 !!!</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
