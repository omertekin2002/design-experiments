"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FileCode,
  Globe,
  Monitor,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";

const mockTimeBlocks = [
  {
    id: 1,
    project: "Acme Corp — Website",
    app: "Figma",
    context: "acme-redesign.fig",
    duration: "2h 34m",
    time: "9:00 AM – 11:34 AM",
    type: "file" as const,
    assigned: true,
  },
  {
    id: 2,
    project: "Acme Corp — Website",
    app: "Chrome",
    context: "github.com/acme/repo/pulls",
    duration: "1h 12m",
    time: "11:45 AM – 1:00 PM",
    type: "website" as const,
    assigned: true,
  },
  {
    id: 3,
    project: "StartupX — Brand",
    app: "Figma",
    context: "startupx-homepage-v3.fig",
    duration: "45m",
    time: "2:00 PM – 2:45 PM",
    type: "file" as const,
    assigned: true,
  },
  {
    id: 4,
    app: "Slack",
    context: "#acme-feedback",
    duration: "12m",
    time: "3:00 PM – 3:18 PM",
    type: "app" as const,
    project: "Acme Corp — Website",
    assigned: true,
    changed: true,
  },
];

function TypeIcon({ type }: { type: "file" | "website" | "app" }) {
  if (type === "file") return <FileCode className="h-3.5 w-3.5" />;
  if (type === "website") return <Globe className="h-3.5 w-3.5" />;
  return <Monitor className="h-3.5 w-3.5" />;
}

export function TimeblockShowcase() {
  return (
    <section id="timeblocks" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <BlurFade delay={0.1} inView>
          <div className="text-center">
            <Badge
              variant="secondary"
              className="border border-border bg-background px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
            >
              Review Queue
            </Badge>
            <h2 className="mt-4 font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Ambiguous work stays visible until
              <br />
              <span className="text-teal-600">you place it on purpose</span>
            </h2>
          </div>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            The review queue is where trust is won. Nothing fuzzy gets mixed
            into client totals until you confirm what it belongs to.
          </p>
        </BlurFade>
        <BlurFade delay={0.3} inView>
          <div className="relative mx-auto mt-16 max-w-4xl">
            <BorderBeam
              colorFrom="#14b8a6"
              colorTo="#f59e0b"
              size={60}
              duration={10}
              reverse
            />
            <Card className="overflow-hidden border-border bg-card shadow-xl">
              <CardHeader className="border-b border-border">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Review Queue</span>
                    <Badge variant="secondary" className="text-xs">
                      Today
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="border border-border bg-background text-xs text-foreground">
                      All activity
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="border border-amber-500/20 bg-amber-500/10 text-xs text-amber-700"
                    >
                      Changed just now
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockTimeBlocks.map((block) => (
                    <div
                      key={block.id}
                      className="flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          <TypeIcon type={block.type} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate font-medium">{block.app}</p>
                            {block.changed && (
                              <Badge
                                variant="secondary"
                                className="border border-teal-500/20 bg-teal-500/10 text-[11px] text-teal-700"
                              >
                                Assigned just now
                              </Badge>
                            )}
                          </div>
                          <p className="truncate text-sm text-muted-foreground">
                            {block.context}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-sm text-muted-foreground">
                            {block.duration}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {block.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="secondary"
                            className="gap-1 bg-teal-500/20 text-teal-700"
                          >
                            <Check className="h-3 w-3" />
                            {block.project}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="border border-border bg-background text-foreground"
                          >
                            {block.type}
                          </Badge>
                        </div>
                        <p className="max-w-sm text-sm text-muted-foreground">
                          {block.changed
                            ? "This Slack follow-up moved out of review and into the client ledger immediately."
                            : "Context stays attached to the final project record so the export still reads clearly later."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border bg-muted/30 px-6 py-5">
                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-amber-600" />
                        After this assignment
                      </div>
                      <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
                        Review queue cleared. Billable total now 2.9h.
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        The dashboard does not ask you to remember what happened
                        later. It lets you fix the edge case while the context
                        is still obvious.
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="justify-center border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm text-teal-700"
                    >
                      Ready for export
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
