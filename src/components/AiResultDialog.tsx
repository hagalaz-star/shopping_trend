import { MyDataType } from "@/types/types";
import { useState } from "react";

interface aiResultDialogProps {
  clusterData: MyDataType | null;
}

interface AiResultType {
  imageUrl: string;
  description: string;
}

function AiResultDialog({ clusterData }: aiResultDialogProps) {
  const [aiOpen, setAiOpen] = useState<boolean>(false);
  const [aiReasult, setAiResult] = useState<AiResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  return <div></div>;
}

export default AiResultDialog;
