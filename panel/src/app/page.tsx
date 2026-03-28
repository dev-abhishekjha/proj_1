import { SidebarLayout } from "@/components/sidebar-layout";

export default function Home() {
  return (
    <SidebarLayout>
      <div className="flex flex-1 flex-col gap-4 px-6 py-[14px]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex-1 rounded-xl bg-muted/50 p-8">
          <p className="text-muted-foreground">
            Welcome to your dashboard. Use the sidebar to navigate to different
            sections.
          </p>
        </div>
      </div>
    </SidebarLayout>
  );
}
