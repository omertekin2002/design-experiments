"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Clock,
  FolderOpen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const reviewSignals = [
  {
    label: "Needs review",
    value: "12 min",
    detail: "Slack conversation waiting for project assignment",
  },
  {
    label: "Billable after review",
    value: "2.9 hrs",
    detail: "Updates invoice totals the moment the queue is cleared",
  },
  {
    label: "Confidence",
    value: "High",
    detail: "Every block includes source context before export",
  },
];

const projectLedger = [
  { name: "Acme Corp — Website", hours: 1.4, width: "82%", color: "bg-amber-500" },
  { name: "StartupX — Brand", hours: 1.5, width: "88%", color: "bg-teal-500" },
  { name: "Internal — Litz", hours: 0.6, width: "36%", color: "bg-zinc-500" },
];

const exportReadiness = [
  "Apps, files, and domains already mapped to the final ledger.",
  "Review queue isolates ambiguity instead of blending it into totals.",
  "Export reads like client proof, not raw monitoring output.",
];

export function DashboardShowcase() {
  return (
    <section id="dashboard" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <BlurFade delay={0.1} inView>
          <div className="text-center">
            <Badge
              variant="secondary"
              className="border border-border bg-background px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
            >
              Dashboard
            </Badge>
            <h2 className="mt-4 font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
              The dashboard answers the billing question
              <br />
              <span className="text-amber-600">before you export</span>
            </h2>
          </div>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            The point is not another analytics surface. It is a review surface
            that tells you what is billable, what is ambiguous, and what is
            ready to hand to a client.
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
                <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                  Review queue active
                </div>
              </div>

              <div className="grid gap-6 p-6 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-4">
                  {reviewSignals.map((signal) => (
                    <Card key={signal.label} className="border-border bg-muted/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{signal.label}</span>
                        </div>
                        <p className="mt-3 font-display text-3xl font-bold tracking-tight">
                          {signal.value === "2.9 hrs" ? (
                            <>
                              <NumberTicker value={2.9} decimalPlaces={1} />
                              hrs
                            </>
                          ) : signal.value === "12 min" ? (
                            <>
                              <NumberTicker value={12} />
                              min
                            </>
                          ) : (
                            signal.value
                          )}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {signal.detail}
                        </p>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="border-border bg-zinc-950 text-zinc-100">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Sparkles className="h-4 w-4 text-amber-400" />
                        Export outlook
                      </div>
                      <div className="mt-4 space-y-3">
                        {exportReadiness.map((item) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm leading-6 text-zinc-300"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-border bg-muted/30">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Project ledger
                        </p>
                        <h3 className="mt-1 font-display text-2xl font-semibold">
                          What changes after one clean assignment
                        </h3>
                      </div>
                      <Badge
                        variant="secondary"
                        className="border border-border bg-background/80"
                      >
                        Live recalculation
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-2xl border border-border bg-background/70 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-4 w-4 text-amber-600" />
                          <span className="font-medium">Acme Corp — Website</span>
                        </div>
                        <span className="font-mono text-muted-foreground">
                          +12 min
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        A Slack follow-up is assigned to the client project,
                        the review queue clears, and the billable total updates
                        without rebuilding the day.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {projectLedger.map((project) => (
                        <div key={project.name}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{project.name}</span>
                            <span className="font-mono text-muted-foreground">
                              {project.hours}h
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-background">
                            <div
                              className={cn("h-full rounded-full", project.color)}
                              style={{ width: project.width }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border bg-background/70 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          Billable now
                        </p>
                        <p className="mt-2 font-display text-3xl font-semibold text-teal-600">
                          <NumberTicker value={2.9} decimalPlaces={1} />h
                        </p>
                      </div>
                      <div className="rounded-2xl border border-border bg-background/70 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          Ready to export
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-sm font-medium">
                          Send project summary
                          <ArrowUpRight className="h-4 w-4 text-amber-600" />
                        </div>
                      </div>
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
