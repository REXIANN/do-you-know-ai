"use client";
import * as React from "react";

function CreateTranscription() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/audio", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log({ response });
      const data = await response.json();
      console.log({ data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          className="btn btn-primary mb-2 w-24"
          type="submit"
          value="제출하기"
        />
      </form>
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

export default CreateTranscription;
