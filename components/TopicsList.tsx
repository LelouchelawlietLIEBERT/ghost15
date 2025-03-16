import Link from "next/link";
import React from "react";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "./RemoveBtn";

const GetTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await res.json();
    return { topics: data.topics || [] };
  } catch (error) {
    console.error("Error loading topics:", error);
    return { topics: [] };
  }
};

const TopicsList = async () => {
  const { topics } = await GetTopics();
  if (!topics || topics.length === 0) {
    return <div>No topics available</div>;
  }
  return (
    <>
      {topics.map((t: { _id: string; title: string; description: string }) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start text-white"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
