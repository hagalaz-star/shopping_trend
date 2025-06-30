import { MyDataType } from "@/types/types";
import axios from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface aiResultDialogProps {
  clusterData: MyDataType | null;
}

interface AiResultType {
  imageUrl: string;
  description: string;
}

function AiResultDialog({ clusterData }: aiResultDialogProps) {
  const [aiOpen, setAiOpen] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AiResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersona = async () => {
    if (!clusterData) {
      setError("분석할 클러스터가 없습니다 !!! ");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiOpen(true);
    setAiResult(null);

    const prompt = `
  Generate a single, friendly, cartoon-style illustration of a person who represents this customer group.
  Also, write a simple, one-paragraph description for this person.

  This person is in their ${clusterData.avg_age.toFixed(0)}s,
  and their favorite things to buy are ${clusterData.top_items
    .slice(0, 2)
    .map((item) => item.items)
    .join(" and ")}.
`;
    try {
      const response = await axios.post("/api/generate-persona", { prompt });

      setAiResult(response.data);
    } catch (err) {
      let errorMessage = "AI 가 이미지를 만들지 못하였습니다.";
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
      console.error("AI 제안 요청실패 :", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-blue-400 px-8 py-6 text-white font-bold text-2xl rounded-xl">
          AI 페르소나 생성
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>AI persona</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[70vh] p-1">
          {isLoading && (
            <div className="mt-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700 mx-auto"></div>
              <p className="text-purple-600 mt-2">
                AI가 페르소나를 형상화 하고있습니다...
              </p>
            </div>
          )}
          {error && (
            <p className="mt-6 text-center text-red-500 p-4 bg-red-50 rounded-md">
              오류: {error}
            </p>
          )}

          {/* API 호출 후, 화면 */}
          {aiOpen && !isLoading && aiResult && (
            <div>
              <div>
                <Image
                  src={aiResult.imageUrl}
                  alt="AI가 생성한 페르소나 이미지"
                  width={800} // Next.js Image 컴포넌트는 width와 height가 필요.
                  height={500}
                  className="rounded-lg"
                />
              </div>
              <div className="mt-6 p-4 bg-grey-50 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  페르소나 분석
                </h3>
                <p className="mt-10 text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {aiResult?.description}
                </p>
              </div>
            </div>
          )}
          {/* API 호출 전, 최초 화면 */}
          {!aiResult && !isLoading && !error && (
            <div className="text-center py-8">
              <p>아래 버튼을 눌러 페르소나를 생성하세요.</p>
            </div>
          )}
        </div>
        <DialogFooter className="mt-10">
          <Button
            type="button"
            onClick={handlePersona}
            disabled={isLoading || !clusterData}
          >
            {isLoading
              ? "생성 중..."
              : aiResult
              ? "다시 생성하기"
              : " 생성하기"}
          </Button>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AiResultDialog;
