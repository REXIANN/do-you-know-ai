import { Configuration, OpenAIApi } from "openai";
import { generatePrompt } from "@/prompts/simple";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: "org-Hlcz4MCpXJmdEqS1xOyIneZd",
});

const openai = new OpenAIApi(configuration);

export async function POST(s: NextRequest) {
  const body = await s.json();

  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(body.input),
    temperature: 0.6,
    // logprobs: 5,
    // max_tokens: 10
    // presence_penalty: 2 // -2.0 ~ 2.0
  });

  console.log("DATA: ", res.data.choices[0].logprobs);
  return NextResponse.json(res.data.choices[0].text);
}
