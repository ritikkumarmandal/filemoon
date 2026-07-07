"use client";

import {
  ShieldCheck,
  Folder,
  CloudUpload,
  Share2,
  Lock,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Transfer",
    desc: "Protected file sharing with authentication.",
  },
  {
    icon: Folder,
    title: "Folder Upload",
    desc: "Upload complete folders in one click.",
  },
  {
    icon: CloudUpload,
    title: "Cloud Storage",
    desc: "Fast and reliable storage.",
  },
  {
    icon: Share2,
    title: "Share Link",
    desc: "Generate public download links.",
  },
  {
    icon: Lock,
    title: "Privacy",
    desc: "Encrypted transfer between users.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized upload experience.",
  },
];

export default function Features() {
  return (
    <section className="section py-24">

      <div className="text-center">

        <h2 className="text-5xl font-black">
          Why FileMoon?
        </h2>

        <p className="text-gray-500 mt-5">
          Everything you need for professional file sharing.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

        {features.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="glass rounded-3xl p-8"
            >

              <Icon
                size={45}
                className="text-indigo-600"
              />

              <h3 className="text-2xl font-bold mt-6">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {item.desc}
              </p>

            </motion.div>

          );
        })}

      </div>

    </section>
  );
}