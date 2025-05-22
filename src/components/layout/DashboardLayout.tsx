import React from "react";
import Header from "@/components/Header";

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  mainContent: React.ReactNode;
}

export default function DashboardLayout({
  sidebar,
  mainContent,
}: DashboardLayoutProps) {
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="flex h-screen bg-gray-100">
        <div>{sidebar}</div>
        <div className="flex-1 p-6 overflow-y-auto">{mainContent}</div>
      </div>
    </>
  );
}
