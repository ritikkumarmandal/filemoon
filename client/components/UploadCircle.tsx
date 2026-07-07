"use client";

import { UploadCloud } from "lucide-react";

export default function UploadCircle() {
  return (
    <div className="relative">

      <div className="w-[300px] h-[300px] rounded-full bg-orange-500 flex items-center justify-center">

        <div className="w-[260px] h-[260px] rounded-full bg-white flex flex-col justify-center items-center">

          <UploadCloud size={60} color="#f97316"/>

          <h2 className="text-3xl font-bold mt-5 text-orange-500">
            Upload
          </h2>
          <div className="glass rounded-3xl p-8 mt-10 w-[360px]">

<p className="text-white text-lg">
Click or Drag Files Here
</p>

<button
className="mt-6 bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-xl text-white w-full"
>
Choose File
</button>

</div>

        </div>

      </div>

    </div>
  );
}