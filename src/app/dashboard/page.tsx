"use client";

import Link from "next/link";
import {
  Clock,
  FolderKanban,
  BarChart3,
  Settings,
  Monitor,
  FileCode2,
  Globe,
} from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { NumberTicker } from "@/components/ui/number-ticker";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

const MOCK_TIME_BLOCKS = [
  {
    id: "1",
    app: "Cursor",
    file: "src/components/Header.tsx",
    project: "Acme Corp — Website",
    duration: 47,
    startTime: "9:02 AM",
  },
  {
    id: "2",
    app: "Chrome",
    file: "github.com/acme/repo",
    project: "Acme Corp — Website",
    duration: 23,
    startTime: "9:49 AM",
  },
  {
    id: "3",
    app: "Figma",
    file: "Design System v2",
    project: "StartupX — Brand",
    duration: 91,
    startTime: "10:12 AM",
  },
  {
    id: "4",
    app: "Cursor",
    file: "src/app/dashboard/page.tsx",
    project: "Internal — Litz",
    duration: 34,
    startTime: "11:43 AM",
  },
  {
    id: "5",
    app: "Slack",
    file: "general",
    project: "Unassigned",
    duration: 12,
    startTime: "12:17 PM",
  },
];

const MOCK_PROJECTS = [
  { name: "Acme Corp — Website", hours: 12.4, color: "bg-amber-500" },
  { name: "StartupX — Brand", hours: 8.2, color: "bg-teal-500" },
  { name: "Internal — Litz", hours: 4.1, color: "bg-amber-500" },
  { name: "Unassigned", hours: 2.3, color: "bg-zinc-400" },
];

const MOCK_APPS = [
  { name: "Cursor", minutes: 312, icon: "⌘" },
  { name: "Chrome", minutes: 189, icon: "🌐" },
  { name: "Figma", minutes: 156, icon: "🎨" },
  { name: "Slack", minutes: 45, icon: "💬" },
];

function AppIcon({ app }: { app: string }) {
  const icons: Record<string, React.ReactNode> = {
    Cursor: <Monitor className="h-4 w-4" />,
    Chrome: <Globe className="h-4 w-4" />,
    Figma: <FileCode2 className="h-4 w-4" />,
    Slack: <span className="text-xs">💬</span>,
  };
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
      {icons[app] ?? <Monitor className="h-4 w-4" />}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-border bg-card">
        <div className="flex h-16 items-center gap-2 border-b border-border px-4">
          <span className="font-display text-lg font-semibold">Litz</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {[
            { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
            { href: "#", label: "Projects", icon: FolderKanban },
            { href: "#", label: "Settings", icon: Settings },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                item.href === "/dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-56">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-8">
            <h1 className="font-display text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Today</span>
              <span className="font-mono">Mar 7, 2026</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats row */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Today", value: 6, unit: "hrs", sub: "tracked" },
              { label: "This week", value: 34, unit: "hrs", sub: "billable" },
              { label: "Active projects", value: 4, unit: "", sub: "" },
              { label: "Unassigned", value: 12, unit: "min", sub: "" },
            ].map((stat, i) => (
              <MagicCard
                key={i}
                className="rounded-xl border border-border p-6"
                gradientFrom="#f59e0b"
                gradientTo="#14b8a6"
              >
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 font-display text-3xl font-bold tabular-nums">
                    <NumberTicker value={stat.value} />
                    {stat.unit}
                  </p>
                  {stat.sub && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.sub}
                    </p>
                  )}
                </div>
              </MagicCard>
            ))}
          </div>

          {/* Time blocks showcase */}
          <div className="mb-8">
            <h2 className="mb-4 font-display text-lg font-semibold">Recent time blocks</h2>
            <div className="relative overflow-hidden rounded-xl border border-border">
              <BorderBeam size={60} duration={10} colorFrom="#f59e0b" colorTo="#14b8a6" />
              <div className="divide-y divide-border">
                {MOCK_TIME_BLOCKS.map((block) => (
                  <div
                    key={block.id}
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30"
                  >
                    <AppIcon app={block.app} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{block.file}</p>
                      <p className="text-sm text-muted-foreground">
                        {block.project}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-medium">
                        {block.duration} min
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {block.startTime}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two column: Projects + Apps */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Projects by time */}
            <div>
              <h2 className="mb-4 font-display text-lg font-semibold">Time by project</h2>
              <MagicCard
                className="rounded-xl border border-border p-6"
                gradientFrom="#f59e0b"
                gradientTo="#14b8a6"
              >
                <div className="space-y-4">
                  {MOCK_PROJECTS.map((project, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-3 w-3 shrink-0 rounded-full",
                          project.color
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {project.name}
                        </p>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn("h-full rounded-full", project.color)}
                            style={{
                              width: `${(project.hours / 27) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-sm text-muted-foreground">
                        {project.hours}h
                      </span>
                    </div>
                  ))}
                </div>
              </MagicCard>
            </div>

            {/* Apps usage */}
            <div>
              <h2 className="mb-4 font-display text-lg font-semibold">Time by app</h2>
              <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
                <DotPattern
                  className="absolute inset-0 opacity-30"
                  width={24}
                  height={24}
                />
                <AnimatedList delay={400} className="relative space-y-3">
                  {MOCK_APPS.map((app, i) => (
                    <div
                      key={`${app.name}-${i}`}
                      className="flex items-center justify-between rounded-lg border border-border bg-background/80 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-lg">
                          {app.icon}
                        </div>
                        <span className="font-medium">{app.name}</span>
                      </div>
                      <span className="font-mono text-sm text-muted-foreground">
                        {Math.floor(app.minutes / 60)}h {app.minutes % 60}m
                      </span>
                    </div>
                  ))}
                </AnimatedList>
              </div>
            </div>
          </div>

          {/* Terminal-style activity log */}
          <div className="mt-8">
            <h2 className="mb-4 font-display text-lg font-semibold">Activity log (live)</h2>
            <div className="overflow-hidden rounded-xl border border-border bg-zinc-950 font-mono text-sm">
              <div className="flex gap-2 border-b border-zinc-800 px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <div className="space-y-1 p-4 text-zinc-400">
                <p>
                  <span className="text-emerald-400">[10:47]</span> Cursor —
                  src/app/dashboard/page.tsx
                </p>
                <p>
                  <span className="text-emerald-400">[10:46]</span> Chrome —
                  github.com
                </p>
                <p>
                  <span className="text-emerald-400">[10:45]</span> Figma —
                  Design System
                </p>
                <p>
                  <span className="text-amber-400">[10:44]</span> Idle — 2 min
                </p>
                <p className="text-zinc-500">
                  <span className="text-zinc-600">[10:42]</span> Cursor —
                  src/components/Header.tsx
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
