import React from "react";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="">
        <img src="404.png" alt="" className="w-72" />
        <p className="text-xl text-center pt-6">404 Not Found !</p>
      </div>
    </div>
  );
}
