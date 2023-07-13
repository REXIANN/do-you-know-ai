import { Configuration, OpenAIApi } from "openai";
import { generatePrompt } from "@/prompts/simple";
import { NextResponse } from 'next/server'
import { NextRequest} from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

export async function POST(s: NextRequest) {
  const body = await s.json()

  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(body.input),
    temperature: 0.6,
  });

  // console.log(res.data)
  return NextResponse.json(res.data.choices[0].text)
}