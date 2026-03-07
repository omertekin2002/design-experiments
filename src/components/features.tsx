"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import {
  Monitor,
  FolderKanban,
  Receipt,
  Shield,
} from "lucide-react";

const workflow = [
  {
    icon: Monitor,
    step: "01",
    title: "Capture real work context",
    description:
      "Litz passively records the apps, files, and domains behind each work session, so billable context is captured while you are still in it.",
    details: [
      "Editors, browsers, design tools, and research tabs are tracked automatically.",
      "Idle gaps stay visible so you can separate work from drift before export.",
    ],
  },
  {
    icon: FolderKanban,
    step: "02",
    title: "Map activity to projects",
    description:
      "Turn raw activity into client-ready time by mapping files, folders, domains, and apps to the right project once.",
    details: [
      "Repeated work starts auto-categorizing after the first few assignments.",
      "Unassigned blocks stay in a review queue until you decide where they belong.",
    ],
  },
  {
    icon: Receipt,
    step: "03",
    title: "Export audit-ready billing",
    description:
      "Ship a clean timeline instead of a guess. Every block already includes source context, duration, and project attribution.",
    details: [
      "Use live review to fix edge cases before they become invoice disputes.",
      "Export summaries with enough detail to defend the total without rebuilding your day.",
    ],
  },
];

const trustHighlights = [
  {
    title: "Metadata over surveillance",
    description:
      "The product story stays centered on apps, files, and domains that explain billable context, not keystroke theater.",
  },
  {
    title: "Review queue for edge cases",
    description:
      "Anything ambiguous stays unassigned until you place it, so the exported record stays defensible.",
  },
  {
    title: "Project rules compound over time",
    description:
      "A few deliberate assignments make the next week cleaner by teaching the project map what belongs where.",
  },
  {
    title: "Ready to hand to clients",
    description:
      "The output is framed as proof of work completed, not raw employee-monitoring noise.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <BlurFade delay={0.1} inView>
          <div className="text-center">
            <Badge
              variant="secondary"
              className="border border-border bg-background px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
            >
              Workflow
            </Badge>
            <h2 className="mt-4 font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
              From raw activity to
              <br />
              <span className="text-teal-600">invoice-ready proof</span>
            </h2>
          </div>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            The product earns trust by showing exactly how capture, review, and
            export fit together.
          </p>
        </BlurFade>
        <div className="mt-16 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            {workflow.map((step, i) => {
              const Icon = step.icon;
              return (
                <BlurFade key={step.title} delay={0.08 * i} inView>
                  <MagicCard
                    gradientFrom="#f59e0b"
                    gradientTo="#14b8a6"
                    className="overflow-hidden rounded-2xl border border-border p-6"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-start">
                      <div className="flex items-center gap-4 md:w-52 md:flex-col md:items-start">
                        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
                          {step.step}
                        </span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-semibold tracking-tight">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                          {step.description}
                        </p>
                        <div className="mt-4 grid gap-3">
                          {step.details.map((detail) => (
                            <div
                              key={detail}
                              className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground"
                            >
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </MagicCard>
                </BlurFade>
              );
            })}
          </div>

          <BlurFade delay={0.2} inView>
            <div id="privacy">
              <MagicCard
                gradientFrom="#14b8a6"
                gradientTo="#f59e0b"
                className="h-full rounded-3xl border border-border p-8"
              >
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-teal-600" />
                  Trust model
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                  Built for client billing, not surveillance theater
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  The strongest part of the demo should answer the obvious trust
                  questions up front: what gets tracked, what stays reviewable,
                  and why the output is something you would actually send to a
                  client.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {trustHighlights.map((highlight) => (
                    <div
                      key={highlight.title}
                      className="rounded-2xl border border-border bg-background/75 p-4"
                    >
                      <p className="font-medium">{highlight.title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-border bg-background/85 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        Typical week
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold">
                        18h captured, 15.5h billable, 45m left for review
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="border border-border bg-muted/60 px-3 py-1 text-xs"
                    >
                      Export-ready
                    </Badge>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {[
                      "Apps, files, and domains reveal where the work happened.",
                      "Review queue isolates uncertainty before it leaks into billing.",
                      "Final output reads like project proof, not an activity dump.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
