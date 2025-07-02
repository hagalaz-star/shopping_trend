import { MyDataType } from "@/types/types";
import Image from "next/image";

interface ClusterProps {
  groups: MyDataType[];
  selectedClusterId: number | null;
  onClusterSelect: (clusterId: number) => void;
}

export default function Header({
  groups,
  selectedClusterId,
  onClusterSelect,
}: ClusterProps) {
  console.log("Header received groups:", groups);

  return (
    <header className="bg-blue-950 ">
      <div className="mx-auto flex max-w-7xl h-full items-center justify-between  px-10 py-10">
        <h1 className="bg-blue-950 font-bold text-2xl text-white flex items-center gap-6">
          <Image
            src="/images/ai-logo.png"
            alt="AI Persona Logo"
            width={60}
            height={32}
            className="rounded-2xl -ml-20"
          />
          <span>AI Persona</span>
        </h1>
        <select
          className="text-white text-2xl bg-blue-600 rounded-2xl p-3"
          value={selectedClusterId ?? ""}
          onChange={(e) => onClusterSelect(Number(e.target.value))}
        >
          <option value="" disabled>
            Clustering Group
          </option>
          {groups.map((group) => (
            <option key={group.cluster_id} value={group.cluster_id}>
              {group.cluster_name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
