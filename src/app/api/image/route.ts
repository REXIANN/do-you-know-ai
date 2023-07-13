import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: "org-Hlcz4MCpXJmdEqS1xOyIneZd",
});

const openai = new OpenAIApi(configuration);

export async function POST(s: NextRequest) {
  const body = await s.formData();

  const size = body.get("size");
  const file = body.get("file");
  const n = body.get("n");
  console.log(size, n, typeof file);
  if (
    file == null ||
    size == null ||
    n == null ||
    !(file instanceof File) ||
    size instanceof File
  ) {
    return NextResponse.error();
  }

  const res = await openai.createImageVariation(file, Number(n), size);

  console.log("DATA: ", res.data);
  return NextResponse.json([]);
}
