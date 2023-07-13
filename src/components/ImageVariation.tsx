"use client";
import * as React from "react";
import { CREATE_IMAGE } from "@/constants/urls";
import { headers2 } from "@/constants/header";
import Image from "next/image";

function ImageVariation() {
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState<{ url: string }[]>([]);
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const fileField: HTMLInputElement | null =
      document.querySelector('input[type="file"]');

    if (fileField == null || fileField.files == null) {
      return;
    }

    formData.append("n", "2");
    formData.append("size", "512x512");
    formData.append("file", fileField.files[0]);

    console.log([...formData]);
    try {
      // const response = await fetch(CREATE_IMAGE, {
      //   method: "POST",
      //   headers: headers2,
      //   body: formData,
      // });

      const response = await fetch("/api/image", {
        method: "POST",

        body: formData,
      });

      const data = await response.json();

      // 응답으로 온 모델과 오브젝트 볼 수 있음
      console.log({ data });
      if (response.status === 200) {
        setImages(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col justify-center items-center gap-4 w-full">
      <form
        id="image-form"
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center gap-4 w-full"
      >
        <input
          id="file-input"
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          name="file"
        />
        <input className="invisible" name="n" value="2" readOnly />
        <input className="invisible" name="size" value="512x512" readOnly />
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
              width={512}
              height={512}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImageVariation;
