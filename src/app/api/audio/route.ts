import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import fs from "fs";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: "org-Hlcz4MCpXJmdEqS1xOyIneZd",
});

const openai = new OpenAIApi(configuration);

// export async function POST(s: NextRequest) {
//   const res = await openai.createTranscription("whisper-1");
//
//   console.log("DATA: ", res.data);
//   return NextResponse.json(res.data.text);
// }
