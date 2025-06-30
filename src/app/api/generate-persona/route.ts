import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

interface PromtRequest {
  prompt: string;
}

export async function POST(request: Request) {
  try {
    const { prompt: originalKoreanPrompt } =
      (await request.json()) as PromtRequest;
    const apiKey = process.env.GEMINI_API_KEY || "";

    if (!apiKey) {
      return NextResponse.json(
        { error: `AI API 키가 설정되지 않았습니다.` },
        { status: 500 }
      );
    }
    if (
      !originalKoreanPrompt ||
      typeof originalKoreanPrompt !== "string" ||
      originalKoreanPrompt.length > 1000
    ) {
      return NextResponse.json(
        { error: `유효한 프롬프가 필요합니다` },
        { status: 400 }
      );
    }

    const genAi = new GoogleGenAI({ apiKey: apiKey });

    // --- 2. 이미지 생성을 위한 API 호출 ---
    const imagePrompt = `Generate a single, friendly, cartoon-style illustration of a person based on this context: "${originalKoreanPrompt}"`;

    const imageResult = await genAi.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [{ role: "user", parts: [{ text: imagePrompt }] }],
      // config: {
      //   responseModalities: [Modality.TEXT, Modality.IMAGE],
      // },
    });

    // if (
    //   !generationResult.candidates ||
    //   generationResult.candidates.length === 0
    // ) {
    //   throw new Error("AI로부터 유효한 응답 후보를 받지 못했습니다.");
    // }
    // const firstCnadiate = generationResult.candidates[0];

    // if (firstCnadiate.content && firstCnadiate.content.parts) {
    //   for (const part of firstCnadiate.content.parts) {
    //     if (part.text) {
    //       description = part.text;
    //     } else if (part.inlineData) {
    //       const base64Image = part.inlineData.data;
    //       const mimeType = part.inlineData.mimeType;
    //       imageUrl = `data:${mimeType};base64,${base64Image}`;
    //     }
    //   }
    // } else {
    //   throw new Error("AI 응답 내용에 처리할수 있는 데이터가 없습니다");
    // }

    let imageUrl = "";

    if (imageResult.candidates && imageResult.candidates[0]?.content?.parts) {
      const imagePart = imageResult.candidates[0].content.parts.find(
        (part) => part.inlineData
      );
      if (imagePart && imagePart.inlineData) {
        const base64Image = imagePart.inlineData.data;
        const mimeType = imagePart.inlineData.mimeType;
        imageUrl = `data:${mimeType};base64,${base64Image}`;
      }
    }
    if (!imageUrl) {
      console.log(
        "Image Generation Failed. AI Response:",
        JSON.stringify(imageResult, null, 2)
      );
      throw new Error(
        "AI가 이미지를 생성하지 못했습니다. 프롬프트를 확인하거나 다시 시도해주세요."
      );
    }

    const descriptionPrompt = `다음은 어떤 고객 그룹에 대한 정보입니다. 이 정보를 바탕으로, 이 고객의 특징과 라이프스타일을 1~2 문장의 짧고 자연스러운 한글로 설명해주세요: "${originalKoreanPrompt}"`;
    const descriptionResult = await genAi.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [{ role: "user", parts: [{ text: descriptionPrompt }] }],
    });

    let description = "";
    if (
      descriptionResult.candidates &&
      descriptionResult.candidates[0]?.content?.parts
    ) {
      const textPart = descriptionResult.candidates[0].content.parts.find(
        (part) => part.text
      );
      if (textPart && textPart.text) {
        description = textPart.text;
      }
    }
    if (!description) {
      throw new Error("AI가 설명을 생성하지 못했습니다.");
    }

    return NextResponse.json({
      description: description,
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error(
      "Google AI API(@google/genai style) Error in route.ts:', error"
    );
    let errorMessage = "AI 제안 생성 중 서버에서 오류가 발생했습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
