"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ClusterSidebar from "@/components/ClusterSidebar";
import SegmentDetailsView from "@/components/SegmentDetailsView";
import axios from "axios";
import { useEffect, useState } from "react";
import { MyDataType } from "@/types/types";

export default function Home() {
  const [clusters, setClusters] = useState<MyDataType[]>([]);
  const [selectedClusterId, setSelectedClusterId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/data/customer_segments.json")
      .then((response) => {
        console.log("Fetched data structure:", response.data);
        setClusters(response.data);

        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message || "데이터를 불러오는 중 에러가 발생했습니다.");
        setClusters([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleClusterSelect = (clusterId: number) => {
    setSelectedClusterId(clusterId);
    console.log("Home with ID:", clusterId);
  };

  if (isLoading) {
    return <p>데이터를 불러오는중...</p>;
  }

  if (error) {
    return <p>에러: {error} </p>;
  }

  console.log(
    "Home component rendering with selectedClusterId:",
    selectedClusterId
  );
  return (
    <div>
      <DashboardLayout
        sidebar={
          <ClusterSidebar
            groups={clusters}
            selectedClusterId={selectedClusterId}
            onClusterSelect={handleClusterSelect}
          />
        }
        mainContent={
          <SegmentDetailsView
            selectedClusterId={selectedClusterId}
            clusters={clusters}
          />
        }
      />
    </div>
  );
}
