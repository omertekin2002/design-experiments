"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import {
  BarChart3,
  Clock,
  FolderOpen,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const mockProjects = [
  { name: "Acme Corp Redesign", hours: 24.5, color: "bg-amber-500" },
  { name: "Mobile App v2", hours: 18.2, color: "bg-teal-500" },
  { name: "API Integration", hours: 12.8, color: "bg-violet-500" },
];

const mockApps = [
  { name: "VS Code", mins: 142, icon: "⌘" },
  { name: "Figma", mins: 89, icon: "◆" },
  { name: "Chrome", mins: 67, icon: "◉" },
  { name: "Slack", mins: 34, icon: "◇" },
];

export function DashboardShowcase() {
  return (
    <section id="dashboard" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <BlurFade delay={0.1} inView>
          <h2 className="font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Your time, at a glance
          </h2>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            A unified dashboard showing projects, apps, and billable hours.
          </p>
        </BlurFade>
        <BlurFade delay={0.3} inView>
          <div className="relative mx-auto mt-16 max-w-5xl">
            <BorderBeam
              colorFrom="#f59e0b"
              colorTo="#14b8a6"
              size={80}
              duration={8}
            />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              {/* Mock header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Litz Dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Today · Last 7 days
                </div>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-3">
                {/* Stats row */}
                <div className="md:col-span-3 flex gap-4">
                  <Card className="flex-1 border-border bg-muted/30">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Total Tracked</span>
                      </div>
                      <p className="mt-2 font-display text-3xl font-bold">
                        <NumberTicker value={47} />h
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        This week
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 border-border bg-muted/30">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FolderOpen className="h-4 w-4" />
                        <span className="text-sm">Active Projects</span>
                      </div>
                      <p className="mt-2 font-display text-3xl font-bold">
                        <NumberTicker value={8} />
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        With time this week
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 border-border bg-muted/30">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">Billable</span>
                      </div>
                      <p className="mt-2 font-display text-3xl font-bold text-teal-600">
                        $<NumberTicker value={4230} />
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        At $90/hr
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Projects */}
                <Card className="md:col-span-2 border-border bg-muted/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Projects</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProjects.map((project) => (
                        <div
                          key={project.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-2 w-2 rounded-full ${project.color}`}
                            />
                            <span className="text-sm">{project.name}</span>
                          </div>
                          <span className="font-mono text-sm text-muted-foreground">
                            {project.hours}h
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Apps */}
                <Card className="border-border bg-muted/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Top Apps</span>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockApps.map((app) => (
                        <div
                          key={app.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              {app.icon}
                            </span>
                            <span className="text-sm">{app.name}</span>
                          </div>
                          <span className="font-mono text-xs text-muted-foreground">
                            {app.mins}m
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
