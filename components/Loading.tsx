"use client";
import React from "react";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-full items-center justify-center flex">
      <div className="flex flex-col gap-2 items-center">
        <FadeLoader color="#4b5563" className="w-10" />
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;
