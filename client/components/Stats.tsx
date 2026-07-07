"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "50K+",
    label: "Files Uploaded",
  },
  {
    value: "20K+",
    label: "Users",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

export default function Stats() {
  return (
    <section className="section py-20">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="glass rounded-3xl p-8 text-center"
          >
            <h2 className="text-4xl font-black text-indigo-600">
              {item.value}
            </h2>

            <p className="mt-3 text-gray-600">
              {item.label}
            </p>

          </motion.div>
        ))}

      </div>

    </section>
  );
}