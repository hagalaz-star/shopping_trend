import type { MyDataType } from "@/types/types";
import { useState } from "react";
import axios from "axios";

interface AiSuggestionProps {
  clusterData: MyDataType | null;
}

export default function AiSuggestionBox({ clusterData }: AiSuggestionProps) {
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestion = async () => {
    if (!clusterData) {
      setError("분석할 클러스터 정보가 없습니다. 클러스터를 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiSuggestion(null);

    const prompt = `
      다음 고객 세그먼트 정보를 바탕으로, 이 그룹을 위한 창의적이고 실행 가능한 마케팅 전략 3가지를 구체적인 액션 플랜과 함께 제안해주십시오.
      기존 마케팅 제안이 있다면 참고하되, 중복되지 않는 새로운 아이디어를 원합니다.

      고객 세그먼트 이름: ${clusterData.cluster_name}
      주요 구매 빈도: ${clusterData.dominant_frequency}
      고객 수: ${clusterData.num_customers}명
      평균 연령: 약 ${clusterData.avg_age.toFixed(0)}세
      평균 구매액(USD): 약 $${clusterData.avg_purchase_amount.toFixed(2)}
      구독률: 약 ${(clusterData.subscription_rate * 100).toFixed(1)}%
      현재 기본 마케팅 제안: ${clusterData.marketing_suggestion}

      각 전략과 액션 플랜, 그리고 문단들은 명확한 줄바꿈(예: 문단 사이에 빈 줄 한 칸 삽입)을 사용하여 구분하고, 마크다운 형식(**, ##, * 등)은 사용하지 말아주십시오. 일반 텍스트로만 답변해주세요.


      추가적인 마케팅 전략 제안 (3가지):
    `;

    try {
      const response = await axios.post("/api/generate-suggestion", { prompt });

      setAiSuggestion(response.data.suggestion);
    } catch (err) {
      let errorMessage = "AI 제안을 가져오는 중 문제가 발생했습니다.";
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        typeof err.response.data.error === "string"
      ) {
        errorMessage = err.response.data.error;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("AI 제안 요청 실패 상세 정보:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSuggestion = (suggestionText: string) => {
    const strategies = suggestionText
      .split(/\n\s*\d\.\s+/)
      .filter((s) => s.trim() !== "");

    if (
      strategies.length === 0 ||
      (strategies.length === 1 && !suggestionText.match(/\n\s*\d\.\s+/))
    )
      return (
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {suggestionText}
        </p>
      );

    return strategies.map((strategy, index) => (
      <div key={index} className="mb-4 p-3 bg-gray-50 rounded">
        <h5 className="font-semibold text-indigo-700 mb-1">전략 {index + 1}</h5>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {strategy.trim()}
        </p>
      </div>
    ));
  };

  return (
    <>
      <div className="text-center">
        <button
          onClick={handleSuggestion}
          disabled={isLoading || !clusterData}
          className="bg-gradient-to-r mt-4 from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-5 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "ai 분석중..."
            : clusterData
            ? `${clusterData?.cluster_name} AI 제안 받기`
            : "클러스터 선택필요"}
        </button>
      </div>

      {isLoading && (
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700 mx-auto"></div>
          <p className="text-purple-600 mt-2">
            AI가 열심히 제안을 만들고 있습니다...
          </p>
        </div>
      )}

      {error && (
        <p className="mt-6 text-center text-red-500 p-4 bg-red-50 rounded-md">
          오류: {error}
        </p>
      )}

      {aiSuggestion && !isLoading && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-2">AI 추천:</h4>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {renderSuggestion(aiSuggestion)}
          </div>
        </div>
      )}
    </>
  );
}
