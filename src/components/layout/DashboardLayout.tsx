import React from "react";
import Header from "../Header";
interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  mainContent: React.ReactNode;
}

export default function DashboardLayout({
  sidebar,
  mainContent,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-amber-100 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl bg-white shadow-xl">
        <div>
          <Header />
        </div>

        <div> {sidebar}</div>
        <div> {mainContent}</div>
      </div>
    </div>
  );
}
