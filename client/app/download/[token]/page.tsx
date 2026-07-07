import DownloadCard from "@/components/transfer/DownloadCard";

interface Props {
  params: {
    token: string;
  };
}

export default function Page({ params }: Props) {
  return (
    <main className="min-h-screen gradient flex items-center justify-center p-10">
      <DownloadCard token={params.token} />
    </main>
  );
}