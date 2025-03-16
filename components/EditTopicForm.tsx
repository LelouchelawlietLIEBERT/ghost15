"use client";

import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useState } from "react";

interface rsd {
  id: string;
  title: string;
  description: string;
}

const EditTopicForm: React.FC<rsd> = ({ id, title, description }) => {
  const [newTitle, setTitle] = useState(title);
  const [newDescription, setDescription] = useState(description);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and Description are Required!!");
      console.clear();
      return;
    }
    try {
      const res = await fetch(`https://ghost15.vercel.app/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error("Failed to update");
      }
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        placeholder="New Title"
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
        Update
      </button>
    </form>
  );
};

export default EditTopicForm;
