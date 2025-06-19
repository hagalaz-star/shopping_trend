import React from "react";

interface DashboardLayoutProps {
  selectOptions: React.ReactNode;
  sidebar: React.ReactNode;
  mainContent: React.ReactNode;
}

export default function DashboardLayout({
  selectOptions,
  sidebar,
  mainContent,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-amber-100 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl bg-white shadow-xl">
        <div>{selectOptions}</div>

        <div className="flex">
          <div className="flex-shrink-0 max-w-8xl"> {sidebar}</div>
          <div className="flex-1 p-6"> {mainContent}</div>
        </div>
      </div>
    </div>
  );
}
