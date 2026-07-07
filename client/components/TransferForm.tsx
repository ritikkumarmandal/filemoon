"use client";

import { useState } from "react";
import { createTransfer } from "@/services/transfer";
import { useRouter } from "next/navigation";

interface Props {
  files: any[];
}

export default function TransferForm({ files }: Props) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    receiverName: "",
    receiverEmail: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleTransfer = async () => {
  try {
    setLoading(true);

    const payload = {
      ...form,
      fileIds: files.map((f: any) => f.id),
    };

    const res = await createTransfer(payload);
    localStorage.setItem(
  "transferLink",
  `${window.location.origin}/transfer/${res.data.token}`
);

router.push("/success");
    console.log("Transfer Response:", res);

    alert("Transfer Created Successfully");

    
  } catch (err) {
    console.error(err);
    alert("Transfer Failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        Transfer Details
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          name="senderName"
          placeholder="Sender Name"
          className="border rounded-xl p-3"
          onChange={handleChange}
        />

        <input
          name="senderEmail"
          placeholder="Sender Email"
          className="border rounded-xl p-3"
          onChange={handleChange}
        />

        <input
          name="receiverName"
          placeholder="Receiver Name"
          className="border rounded-xl p-3"
          onChange={handleChange}
        />

        <input
          name="receiverEmail"
          placeholder="Receiver Email"
          className="border rounded-xl p-3"
          onChange={handleChange}
        />

      </div>

      <input
        name="subject"
        placeholder="Subject"
        className="border rounded-xl p-3 w-full mt-5"
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Message"
        rows={5}
        className="border rounded-xl p-3 w-full mt-5"
        onChange={handleChange}
      />

      <button
  onClick={handleTransfer}
  disabled={loading}
  className="gradient-button w-full py-4 rounded-xl"
>
  {loading ? "Creating..." : "Transfer"}
</button>

    </div>
  );
}