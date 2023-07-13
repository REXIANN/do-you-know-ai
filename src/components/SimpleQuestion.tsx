"use client";

import * as React from "react";

function SimpleQuestion() {
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState("");

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (input.length === 0) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      console.log({ response });
      const data = await response.json();
      // console.log({ data });

      if (response.status !== 200) {
        throw data.error || new Error("Request Failed");
      }

      setResult(data);
      setInput("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div></div>
      <div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center"
        >
          <input
            className="input w-full input-bordered mb-4"
            type="text"
            name="input"
            placeholder="질문을 입력해주세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div></div>
          <input
            className="btn btn-primary mb-2 w-24"
            type="submit"
            value="제출하기"
          />
        </form>
      </div>
      <div>
        <div>답변</div>
        {loading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
        <div>{result}</div>
      </div>
    </section>
  );
}

export default SimpleQuestion;
