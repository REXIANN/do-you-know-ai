"use client";
import * as React from "react";
import { CREATE_IMAGE } from "@/constants/urls";
import { headers } from "@/constants/header";
import Image from "next/image";

type TSize = "small" | "medium" | "large";

const IMAGE_SIZE = {
  small: "256x256",
  medium: "512x512",
  large: "1024x1024",
};

const IMAGE_WIDTH = {
  small: 256,
  medium: 512,
  large: 1024,
};

function CreateImage() {
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(1);
  const [size, setSize] = React.useState<TSize>("small");
  const [input, setInput] = React.useState("");
  const [images, setImages] = React.useState<{ url: string }[]>([]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input.length === 0) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(CREATE_IMAGE, {
        method: "POST",
        headers,
        body: JSON.stringify({
          prompt: input,
          n: count,
          size: IMAGE_SIZE[size],
        }),
      });

      const data = await response.json();

      // 응답으로 온 모델과 오브젝트 볼 수 있음
      console.log({ data });
      setImages(data.data);
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
          <span className="label-text">사이즈를 고르세요</span>
          <span className="label-text-alt">Model</span>
        </label>
        <select
          className="select select-bordered"
          value={size}
          onChange={(e) => {
            setSize(e.target.value as TSize);
          }}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">이미지를 몇 장을 만들까요?</span>
        </label>
        <select
          className="select select-bordered"
          value={count}
          onChange={(e) => {
            setCount(Number(e.target.value));
          }}
        >
          <option value={1}>1 개</option>
          <option value={2}>2 개</option>
          <option value={3}>3 개</option>
          <option value={3}>4 개</option>
          <option value={3}>5 개</option>
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
          placeholder="그리고자 하는 상황을 묘사해주세요"
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
        <div>결과</div>
        {loading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
        <div className="flex flex-wrap justify-center">
          {images.map((image) => (
            <Image
              src={image.url}
              key={image.url.slice(0, 50)}
              alt="image created by AI"
              width={IMAGE_WIDTH[size]}
              height={IMAGE_WIDTH[size]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CreateImage;
