"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  Clock,
  FolderKanban,
  BarChart3,
  Settings,
  Monitor,
  FileCode2,
  Globe,
  Menu,
  X,
  Check,
} from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { NumberTicker } from "@/components/ui/number-ticker";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

const PROJECT_META = {
  "Acme Corp — Website": {
    color: "bg-amber-500",
    billable: true,
    accent: "text-amber-600",
  },
  "StartupX — Brand": {
    color: "bg-teal-500",
    billable: true,
    accent: "text-teal-600",
  },
  "Internal — Litz": {
    color: "bg-zinc-500",
    billable: false,
    accent: "text-zinc-600",
  },
} as const;

type ProjectName = keyof typeof PROJECT_META;

type TimeBlock = {
  id: string;
  app: string;
  file: string;
  project: ProjectName | null;
  duration: number;
  startTime: string;
};

type ActivityEvent = {
  id: string;
  tone: "assigned" | "warning" | "muted";
  text: string;
};

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "#projects", label: "Projects", icon: FolderKanban },
  { href: "#activity", label: "Activity", icon: Settings },
];

const PROJECT_OPTIONS = Object.keys(PROJECT_META) as ProjectName[];

const INITIAL_TIME_BLOCKS: TimeBlock[] = [
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
    project: null,
    duration: 12,
    startTime: "12:17 PM",
  },
];

const BASE_ACTIVITY_LOG: ActivityEvent[] = [
  {
    id: "base-1",
    tone: "muted",
    text: "[10:47] Cursor — src/app/dashboard/page.tsx",
  },
  {
    id: "base-2",
    tone: "muted",
    text: "[10:46] Chrome — github.com",
  },
  {
    id: "base-3",
    tone: "muted",
    text: "[10:45] Figma — Design System",
  },
  {
    id: "base-4",
    tone: "warning",
    text: "[10:44] Idle — 2 min",
  },
];

const APP_ICONS: Record<string, ReactNode> = {
  Cursor: <Monitor className="h-4 w-4" />,
  Chrome: <Globe className="h-4 w-4" />,
  Figma: <FileCode2 className="h-4 w-4" />,
  Slack: <span className="text-xs">💬</span>,
};

const toneClasses: Record<ActivityEvent["tone"], string> = {
  assigned: "text-cyan-400",
  warning: "text-amber-400",
  muted: "text-zinc-400",
};

const hoursFromMinutes = (minutes: number) =>
  Number((minutes / 60).toFixed(minutes % 60 === 0 ? 0 : 1));

const formatAppTime = (minutes: number) =>
  `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

function AppIcon({ app }: { app: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
      {APP_ICONS[app] ?? <Monitor className="h-4 w-4" />}
    </div>
  );
}

export default function DashboardPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [timeBlocks, setTimeBlocks] = useState(INITIAL_TIME_BLOCKS);
  const [activityFilter, setActivityFilter] = useState<"all" | "needs-review">(
    "all"
  );
  const [assignmentEvents, setAssignmentEvents] = useState<ActivityEvent[]>([]);

  const totalTrackedMinutes = timeBlocks.reduce(
    (sum, block) => sum + block.duration,
    0
  );
  const billableMinutes = timeBlocks.reduce((sum, block) => {
    if (!block.project) return sum;
    return PROJECT_META[block.project].billable ? sum + block.duration : sum;
  }, 0);
  const unassignedMinutes = timeBlocks.reduce(
    (sum, block) => (block.project ? sum : sum + block.duration),
    0
  );
  const activeProjectCount = PROJECT_OPTIONS.filter((project) =>
    timeBlocks.some((block) => block.project === project)
  ).length;

  const visibleBlocks =
    activityFilter === "needs-review"
      ? timeBlocks.filter((block) => !block.project)
      : timeBlocks;

  const projectSummaries = PROJECT_OPTIONS.map((project) => ({
    name: project,
    minutes: timeBlocks
      .filter((block) => block.project === project)
      .reduce((sum, block) => sum + block.duration, 0),
    color: PROJECT_META[project].color,
  })).filter((project) => project.minutes > 0);

  const maxProjectMinutes = Math.max(
    ...projectSummaries.map((project) => project.minutes),
    1
  );

  const appsMap = timeBlocks.reduce<Record<string, number>>((acc, block) => {
    acc[block.app] = (acc[block.app] ?? 0) + block.duration;
    return acc;
  }, {});

  const appSummaries = Object.entries(appsMap)
    .map(([name, minutes]) => ({
      name,
      minutes,
      icon:
        name === "Cursor"
          ? "⌘"
          : name === "Chrome"
            ? "🌐"
            : name === "Figma"
              ? "🎨"
              : "💬",
    }))
    .sort((a, b) => b.minutes - a.minutes);

  const activityLog = [...assignmentEvents, ...BASE_ACTIVITY_LOG].slice(0, 5);

  const handleProjectChange = (blockId: string, value: string) => {
    const nextProject = value ? (value as ProjectName) : null;
    const currentBlock = timeBlocks.find((block) => block.id === blockId);

    if (!currentBlock || currentBlock.project === nextProject) {
      return;
    }

    setTimeBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, project: nextProject } : block
      )
    );

    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    setAssignmentEvents((prev) =>
      [
        {
          id: `${blockId}-${Date.now()}`,
          tone: nextProject ? "assigned" : "warning",
          text: `[${timestamp}] ${currentBlock.app} → ${
            nextProject ?? "Returned to unassigned"
          }`,
        },
        ...prev,
      ].slice(0, 5)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <aside className="relative h-full w-72 max-w-[85vw] border-r border-border bg-card">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <span className="font-display text-lg font-semibold">Litz</span>
              <button
                type="button"
                aria-label="Close navigation"
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
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
                onClick={() => setIsMobileNavOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ← Back to home
              </Link>
            </div>
          </aside>
        </div>
      )}

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 border-r border-border bg-card md:block">
        <div className="flex h-16 items-center gap-2 border-b border-border px-4">
          <span className="font-display text-lg font-semibold">Litz</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => (
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

      <main className="md:pl-56">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation"
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
                onClick={() => setIsMobileNavOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </button>
              <div>
                <h1 className="font-display text-lg font-semibold sm:text-xl">
                  Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">
                  Assign one unreviewed block and the totals recalculate live.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
              <Clock className="h-4 w-4" />
              <span>Today</span>
              <span className="font-mono">Mar 7, 2026</span>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Today",
                value: hoursFromMinutes(totalTrackedMinutes),
                unit: "hrs",
                sub: "captured in background",
                decimalPlaces: 1,
              },
              {
                label: "Billable",
                value: hoursFromMinutes(billableMinutes),
                unit: "hrs",
                sub: "ready for invoice export",
                decimalPlaces: 1,
              },
              {
                label: "Active projects",
                value: activeProjectCount,
                unit: "",
                sub: "currently receiving time",
                decimalPlaces: 0,
              },
              {
                label: "Needs review",
                value: unassignedMinutes,
                unit: "min",
                sub: "unassigned right now",
                decimalPlaces: 0,
              },
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
                    <NumberTicker
                      value={stat.value}
                      decimalPlaces={stat.decimalPlaces}
                    />
                    {stat.unit}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.sub}
                  </p>
                </div>
              </MagicCard>
            ))}
          </div>

          <div className="mb-8">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold">
                  Live activity review
                </h2>
                <p className="text-sm text-muted-foreground">
                  Change a project assignment and watch the totals update above.
                </p>
              </div>
              <div className="flex gap-2">
                {[
                  { key: "all", label: "All activity" },
                  { key: "needs-review", label: "Needs review" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      activityFilter === filter.key
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() =>
                      setActivityFilter(
                        filter.key as "all" | "needs-review"
                      )
                    }
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border">
              <BorderBeam
                size={60}
                duration={10}
                colorFrom="#f59e0b"
                colorTo="#14b8a6"
              />
              {visibleBlocks.length > 0 ? (
                <div className="divide-y divide-border">
                  {visibleBlocks.map((block) => (
                    <div
                      key={block.id}
                      className="flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-muted/30 sm:px-6"
                    >
                      <div className="flex items-start gap-4">
                        <AppIcon app={block.app} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{block.file}</p>
                          <p className="text-sm text-muted-foreground">
                            {block.project ?? "Unassigned review queue"}
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
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span className="rounded-full bg-muted px-2 py-1">
                            {block.app}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-1">
                            {block.project
                              ? PROJECT_META[block.project].billable
                                ? "Billable"
                                : "Internal"
                              : "Needs project"}
                          </span>
                        </div>

                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-64">
                          <label
                            htmlFor={`project-${block.id}`}
                            className="sr-only"
                          >
                            Assign project
                          </label>
                          <select
                            id={`project-${block.id}`}
                            value={block.project ?? ""}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
                            onChange={(event) =>
                              handleProjectChange(block.id, event.target.value)
                            }
                          >
                            <option value="">Unassigned</option>
                            {PROJECT_OPTIONS.map((project) => (
                              <option key={project} value={project}>
                                {project}
                              </option>
                            ))}
                          </select>
                          <p className="text-xs text-muted-foreground">
                            {block.project
                              ? "Included in project totals immediately."
                              : "Assign this block to remove it from review."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-teal-600">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    Review queue cleared
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Everything captured today is assigned to a project.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div id="projects" className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-lg font-semibold">
                Time by project
              </h2>
              <MagicCard
                className="rounded-xl border border-border p-6"
                gradientFrom="#f59e0b"
                gradientTo="#14b8a6"
              >
                <div className="space-y-4">
                  {projectSummaries.map((project) => (
                    <div key={project.name} className="flex items-center gap-4">
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
                              width: `${(project.minutes / maxProjectMinutes) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-sm text-muted-foreground">
                        {hoursFromMinutes(project.minutes)}h
                      </span>
                    </div>
                  ))}
                </div>
              </MagicCard>
            </div>

            <div>
              <h2 className="mb-4 font-display text-lg font-semibold">
                Time by app
              </h2>
              <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
                <DotPattern
                  className="absolute inset-0 opacity-30"
                  width={24}
                  height={24}
                />
                <AnimatedList delay={300} className="relative space-y-3">
                  {appSummaries.map((app, i) => (
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
                        {formatAppTime(app.minutes)}
                      </span>
                    </div>
                  ))}
                </AnimatedList>
              </div>
            </div>
          </div>

          <div id="activity" className="mt-8">
            <h2 className="mb-4 font-display text-lg font-semibold">
              Activity log (live)
            </h2>
            <div className="overflow-hidden rounded-xl border border-border bg-zinc-950 font-mono text-sm">
              <div className="flex gap-2 border-b border-zinc-800 px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <div className="space-y-1 p-4">
                {activityLog.map((event) => (
                  <p key={event.id} className={toneClasses[event.tone]}>
                    {event.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
