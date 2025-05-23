import { MyDataType } from "@/types/types";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaUsers } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import type { TooltipItem } from "chart.js";

interface SegmentDetailsViewProps {
  selectedClusterId: number | null;
  clusters: MyDataType[];
}

export default function SegmentDetailsView({
  selectedClusterId,
  clusters,
}: SegmentDetailsViewProps) {
  const selectedCluster = clusters.find(
    (cluster) => cluster.cluster_id === selectedClusterId
  );

  if (!selectedCluster) {
    // "선택된 클러스터 없음" 메시지에 Tailwind CSS 적용
    return (
      <div className="p-4 text-center text-gray-500">
        <p>선택한 클러스터가 없습니다</p>
      </div>
    );
  }

  let overall_Avg_purchase_amount = 0;
  if (clusters && clusters.length > 0) {
    const total_Avg_purchase_amount = clusters.reduce(
      (sum, cluster) => sum + cluster.avg_purchase_amount,
      0
    );
    overall_Avg_purchase_amount = Number(
      (total_Avg_purchase_amount / clusters.length).toFixed(2)
    );
  }
  // 바 그래프 데이터 객체 만들기
  const data = {
    labels: [selectedCluster.cluster_name],
    datasets: [
      {
        label: "선택 클러스터 평균 구매액",
        data: [selectedCluster.avg_purchase_amount],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        barThickness: 50,
      },
      {
        label: "전체 클러스터 평균 구매액",
        data: [overall_Avg_purchase_amount],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  const subscribedRate = selectedCluster.subscription_rate * 100;
  const unsubscribedRate = (1 - selectedCluster.subscription_rate) * 100;

  const subscriptionData = {
    labels: [
      `구독 중  (${subscribedRate.toFixed(1)}%)`,
      `비구독 중 (${unsubscribedRate.toFixed(1)}%)`,
    ],
    datasets: [
      {
        // label: "구독비율",
        data: [subscribedRate, unsubscribedRate],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // 구독자 색상
          "rgba(255, 99, 132, 0.6)", // 비구독자 색상
        ],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "평균 구매액 비교",
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }

            if (context.parsed.x !== null && context.parsed.x !== undefined) {
              label += "$" + context.parsed.x;
            }
            return label;
          },
        },
      },
    },
  };
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          title: function (_tooltipItems: TooltipItem<"pie" | "doughnut">[]) {
            return "";
          },

          label: function (_context: TooltipItem<"pie" | "doughnut">) {
            return _context.label || "";
          },
        },
      },
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "클러스터 구독 비율",
        font: { size: 16 },
      },
    },
  };

  return (
    <>
      <h3 className="text-2xl font-bold mb-4 text-gray-700 text-center">
        {selectedCluster.cluster_name}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
        <div className="bg-white p-6 rounded-xl shadow-lg flex-1 min-w-[200px]">
          <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
              <FaUsers className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
            </div>

            <div className="text-left">
              <h4 className="text-sm text-gray-500 mb-1">고객 수</h4>
              <p className="text-gray-800 font-bold text-3xl">
                {`${selectedCluster.num_customers} 명`}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex-1 min-w-[200px]">
          <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 p-2 bg-green-100 rounded-full">
              <FaHandHoldingHeart className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
            </div>

            <div className="text-left">
              <h4 className="text-sm text-gray-500 mb-1">평균 연령</h4>
              <p className="text-gray-800 font-bold text-2xl">
                {`${selectedCluster.avg_age} 세`}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex-1 min-w-[200px]">
          <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 p-2 bg-purple-100 rounded-full">
              <FaShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600" />
            </div>

            <div className="text-left">
              <h4 className="text-gray-500 text-sm mb-1">
                흔하게 나타난 쇼핑 빈도
              </h4>
              <p className="font-bold text-2xl text-gray-800">
                {selectedCluster.dominant_frequency}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          평균 구매액 시각화
        </h3>
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <div className="relative h-[400px] w-full">
              <Bar data={data} options={barChartOptions} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="relative h-[400px] w-full mx-auto max-w-sm">
              <Pie data={subscriptionData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold  mb-4  text-gray-700 text-center">
          마케팅 제안
        </h3>
        <div>
          {(selectedCluster.marketing_suggestion || "")
            .split(/(?<=\.)\s+/)
            .filter((sentence) => sentence.trim() !== "")
            .map((sentence, index) => {
              return (
                <p
                  key={index}
                  className=" text-base text-gray-700 text-center leading-relaxed p-2 mb-2"
                >
                  {sentence.trim()}
                </p>
              );
            })}
        </div>
      </div>
    </>
  );
}
