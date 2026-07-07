import DownloadCard from "@/components/transfer/DownloadCard";

interface Props {
  params: {
    token: string;
  };
}

export default function TransferPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <DownloadCard token={params.token} />
    </main>
  );
}