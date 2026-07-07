"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Background from "@/components/Background";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import UploadBox from "@/components/UploadBox";
import TransferForm from "@/components/TransferForm";
import { useState } from "react";

export default function Home() {
   const [files, setFiles] = useState<File[]>([]);
  return (
    <main className="hero-bg">

      <Background />

      <Navbar />

      <Hero />
       {files.length === 0 ? (

        <UploadBox
          onNext={(selectedFiles) =>
            setFiles(selectedFiles)
          }
        />

      ) : (

        <TransferForm files={files} />

      )}

    

      <Stats />

      <Features />

      <Footer />

    </main>
  );
}