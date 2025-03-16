"use client";

import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useState } from "react";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and Description are required!!");
      console.clear();
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        window.location.href = "/";
      } else {
        throw new Error("Failed to create a Topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="border border-slate-300 px-8 py-3 text-white placeholder:text-white"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <SimpleMDE
        onChange={(e) => {
          setDescription(e);
        }}
      />
      <button
        type="submit"
        className="bg-green-600 w-fit px-6 py-3 font-bold text-white"
      >
        Add
      </button>
    </form>
  );
}
