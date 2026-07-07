"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <>

      {/* Cloud */}

      <motion.div
        animate={{
          x: [0, 120, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="absolute top-24 left-10 w-56 h-24 bg-white/70 blur-xl rounded-full"
      />

      {/* Cloud */}

      <motion.div
        animate={{
          x: [0, -100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
        className="absolute top-40 right-16 w-64 h-28 bg-white/60 blur-xl rounded-full"
      />

      {/* Orange Glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="absolute bottom-24 left-20 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl"
      />

      {/* Blue Glow */}

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
        className="absolute top-48 right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"
      />

      {/* Paper Plane */}

      <motion.div
        animate={{
          x: [-500, 900],
          y: [0, -120],
          rotate: [0, 10],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
        className="absolute top-52 text-5xl opacity-60"
      >
        ✈️
      </motion.div>

      {/* Floating Dots */}

      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute left-1/4 top-72 h-4 w-4 rounded-full bg-indigo-500"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
        className="absolute right-1/3 top-80 h-5 w-5 rounded-full bg-orange-500"
      />

    </>
  );
}