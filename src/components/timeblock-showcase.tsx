"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FileCode,
  Globe,
  Monitor,
  ChevronDown,
  Check,
  Clock,
} from "lucide-react";

const mockTimeBlocks = [
  {
    id: 1,
    project: "Acme Corp Redesign",
    app: "Figma",
    context: "acme-redesign.fig",
    duration: "2h 34m",
    time: "9:00 AM – 11:34 AM",
    type: "file" as const,
    assigned: true,
  },
  {
    id: 2,
    project: "Acme Corp Redesign",
    app: "VS Code",
    context: "components/Header.tsx",
    duration: "1h 12m",
    time: "11:45 AM – 1:00 PM",
    type: "file" as const,
    assigned: true,
  },
  {
    id: 3,
    project: "Mobile App v2",
    app: "Chrome",
    context: "github.com/mobile-app",
    duration: "45m",
    time: "2:00 PM – 2:45 PM",
    type: "website" as const,
    assigned: true,
  },
  {
    id: 4,
    project: null,
    app: "Slack",
    context: "General",
    duration: "18m",
    time: "3:00 PM – 3:18 PM",
    type: "app" as const,
    assigned: false,
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
          <h2 className="font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Assign time blocks to projects
          </h2>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Review captured activity and assign each block to a project. One
            click to bill.
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Time Blocks</span>
                    <Badge variant="secondary" className="text-xs">
                      Today
                    </Badge>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockTimeBlocks.map((block) => (
                    <div
                      key={block.id}
                      className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          <TypeIcon type={block.type} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{block.app}</p>
                          <p className="truncate text-sm text-muted-foreground">
                            {block.context}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-4">
                        <span className="font-mono text-sm text-muted-foreground">
                          {block.duration}
                        </span>
                        <span className="hidden text-sm text-muted-foreground sm:inline">
                          {block.time}
                        </span>
                        {block.assigned ? (
                          <Badge
                            variant="secondary"
                            className="gap-1 bg-teal-500/20 text-teal-400"
                          >
                            <Check className="h-3 w-3" />
                            {block.project}
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-amber-500/30 text-amber-400/90"
                          >
                            Unassigned
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
