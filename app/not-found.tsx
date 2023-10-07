import { Metadata } from "next";

export async function generateMetadata({}: {}): Promise<Metadata> {
  return {
    title: `Not found | Terramida`,
  };
}

export default async function ProfileNotFound({}: {}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[10px] text-slate-500">
      <h2 className="font-extrabold">Not found</h2>
    </div>
  );
}
