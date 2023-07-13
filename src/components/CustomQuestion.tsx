"use client";
import * as React from "react";
import { headers } from "@/constants/header";

import { CREATE_CHAT_COMPLETION } from "@/constants/urls";

type Model = "gpt-4" | "gpt-3.5-turbo" | "text-davinci-003";

function CustomQuestion() {
  // basic state
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState("");

  // configuration state
  const [model, setModel] = React.useState("gpt-4");
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input.length === 0) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(CREATE_CHAT_COMPLETION, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await response.json();

      // 응답으로 온 모델과 오브젝트 볼 수 있음
      // console.log({ data });

      setResult(data.choices[0].message.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-4 w-full">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">모델을 고르세요</span>
          <span className="label-text-alt">Model</span>
        </label>
        <select
          className="select select-bordered"
          value={model}
          onChange={(e) => {
            setModel(e.target.value as Model);
          }}
        >
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT 3.5 Turbo</option>
          <option value="text-davinci-003">Davinci 003(legacy)</option>
        </select>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center gap-4 w-full"
      >
        <input
          className="input w-full input-bordered mb-4"
          type="text"
          name="input"
          placeholder="질문을 입력해주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          className="btn btn-primary mb-2 w-24"
          type="submit"
          value="제출하기"
        />
      </form>

      <div>
        <div className="text-xl text-center">답변</div>
        {loading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
        <div>{result}</div>
      </div>
    </section>
  );
}

export default CustomQuestion;
