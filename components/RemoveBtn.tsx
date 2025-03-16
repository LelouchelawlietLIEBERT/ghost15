"use client";

import { HiOutlineTrash } from "react-icons/hi";
import React from "react";

interface rsd {
  id: string;
}

const RemoveBtn: React.FC<rsd> = ({ id }) => {
  const removeTopic = async () => {
    const confirmed = confirm("Are you Sure ?");
    if (confirmed) {
      await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    }
  };
  return (
    <button className="text-red-400 hover:cursor-pointer" onClick={removeTopic}>
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
