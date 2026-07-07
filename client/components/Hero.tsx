"use client";

import { motion } from "framer-motion";
import UploadBox from "./UploadBox";

export default function Hero() {
  return (
    <section className="section min-h-screen flex flex-col lg:flex-row items-center justify-between pt-32 pb-20 gap-20">

      {/* Left */}

      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .8 }}
        className="flex-1"
      >

        <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
          Secure Cloud Storage
        </span>

        <h1 className="text-5xl lg:text-7xl font-black mt-8 leading-tight">

          Send Files

          <br />

          Without

          <span className="text-indigo-600">
            {" "}Limits
          </span>

        </h1>

        <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">

          Upload files and folders securely.

          Share download links instantly.

          Fast, reliable and beautifully simple.

        </p>

        <div className="flex gap-5 mt-10 flex-wrap">

          <button className="gradient-button px-8 py-4 rounded-xl font-semibold">

            Get Started

          </button>

          <button className="px-8 py-4 rounded-xl border border-indigo-300 hover:bg-white">

            Learn More

          </button>

        </div>

      </motion.div>

      {/* Right */}

      <div className="flex-1 flex justify-center">

        

      </div>

    </section>
  );
}