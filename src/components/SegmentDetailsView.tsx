import { MyDataType, OverallDataSummary } from "@/types/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
  BarElement,
  TooltipItem,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
// import { Pie } from "react-chartjs-2";
import AiSuggestionBox from "./AiSuggestionBox";
import { Ban } from "lucide-react";
import TopPaymentCard from "./TopPaymentCard";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Chart.js에 필요한 요소들을 등록합니다.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

interface SegmentDetailsViewProps {
  selectedClusterId: number | null;
  clusters: MyDataType[];
  summary: OverallDataSummary | null;
}

export default function SegmentDetailsView({
  selectedClusterId,
  clusters,
  summary,
}: SegmentDetailsViewProps) {
  const selectedCluster = clusters.find(
    (cluster) => cluster.cluster_id === selectedClusterId
  );

  if (!selectedCluster) {
    // "선택된 클러스터 없음"
    return (
      <div className="p-4 text-center text-gray-500 text-2xl">
        <div className="flex justify-center items-center space-x-2">
          <Ban />
          <span>선택한 클러스터가 없습니다</span>
        </div>
      </div>
    );
  }
  const topItems = selectedCluster.top_items;

  // top_items 배열에서 'items' 이름만 추출하여 새로운 배열 생성
  const itemLables = topItems.map((item) => item.items);

  // top_items 배열에서 'count' 숫자만 추출하여 새로운 배열 생성
  const itemCounts = topItems.map((item) => item.count);

  // 바 그래프 데이터 객체 만들기
  const barData = {
    labels: itemLables,
    datasets: [
      {
        label: "구매 수량",
        data: itemCounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };
  const barOptions = {
    indexAxis: "x" as const,
    responsive: true,
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `총 ${summary?.total_unique_items} 가지 아이템중  Top 5 구매 수량`,
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const index = context.dataIndex;

            const currentItem = topItems[index];
            const percentage = currentItem.percentage.toFixed(2);
            const label = context.dataset.label || "";

            const value = context.formattedValue;

            return `${label}: ${value}개 (${percentage}%)`;
          },
        },
      },
    },

    layout: {
      padding: {
        left: 20,
      },
    },
  };

  const topCategories = selectedCluster.top_categories;
  const categoryPercentage = topCategories.map((item) => item.percentage);
  const categoryLables = topCategories.map((item) => item.category);

  const categoryData = {
    labels: categoryLables,
    datasets: [
      {
        label: "카테고리 비율",
        data: categoryPercentage,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 165,0)",
        ],
      },
    ],
  };

  const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Top 카테고리 (전체 ${summary?.total_unique_categories}종)`,
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie" | "doughnut">) {
            const datasetLabel = context.dataset.label || "비율";

            const value = context.parsed;
            return `  ${datasetLabel}: ${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  const topLocation = selectedCluster.top_location;
  const locationLabel = topLocation.map((item) => item.location);
  const locationPercentage = topLocation.map((item) => item.percentage);

  const barLocation = {
    labels: locationLabel,
    datasets: [
      {
        label: "판매지역",
        data: locationPercentage,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  const locationOption = {
    indexAxis: "x" as const,
    responsive: true,
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `상위 판매 지역 Top 3 (전체 ${summary?.total_unique_locations}개 지역)`,
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const datasetLabel = context.dataset.label || "";
            const value = context.formattedValue;

            return ` ${datasetLabel} ${value} %`;
          },
        },
      },
    },
  };

  const topSeason = selectedCluster.top_season;
  const seasonLabel = topSeason.map((item) => item.season);
  const seasonPercentage = topSeason.map((item) => item.percentage);

  const seasonPie = {
    labels: seasonLabel,
    datasets: [
      {
        label: "계절에 따른 판매 순위",
        data: seasonPercentage,
        backgroundColor: [
          "rgb(160, 82, 45)",
          "rgb(65, 105, 225)",
          "rgb(255, 215,0)",
          "rgb(211, 211, 211)",
        ],
      },
    ],
  };

  const seasonOptions = {
    indexAxis: "x" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "계절에 따른 판매 순위",
        font: {
          size: 18,
        },
      },

      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed;

            return ` ${datasetLabel} ${value.toFixed(2)} %`;
          },
        },
      },
    },
  };

  const topPayments = selectedCluster.top_payment.slice(0, 3);
  console.log("실제로 렌더링에 사용되는 topPayments 데이터:", topPayments);

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-[400px] w-full">
          <Bar data={barData} options={barOptions} />
        </div>

        <div className="relative h-[400px] w-full">
          <Bar data={barLocation} options={locationOption} />
        </div>

        <div className="relative h-[400px] w-full mx-auto max-w-sm">
          <Doughnut data={categoryData} options={categoryOptions} />
        </div>

        <div className="relative h-[400px] w-full">
          <Pie data={seasonPie} options={seasonOptions} />
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-bold mb-4 text-center">
          Top Payment Methods
        </h3>

        <div className="flex justify-evenly">
          {topPayments.map((payment) => (
            <div className="w-60" key={payment.payment}>
              <TopPaymentCard
                title={payment.payment}
                count={payment.count}
                percentage={payment.percentage}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Separator className="my-8" />
        <Alert className="text-center p-6">
          <AlertTitle className="text-2xl font-bold text-gray-800 mb-6">
            AI 기반 마케팅 제안
          </AlertTitle>
          <AlertDescription className="flex justify-center mt-4">
            <AiSuggestionBox clusterData={selectedCluster} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
