"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import {
  Monitor,
  FileCode,
  Globe,
  FolderKanban,
  Receipt,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "App Tracking",
    description:
      "Automatically logs which applications you use and for how long. No manual timers.",
  },
  {
    icon: FileCode,
    title: "File Association",
    description:
      "Links specific files and folders to projects. Time spent in each file counts toward the right project.",
  },
  {
    icon: Globe,
    title: "Website Tracking",
    description:
      "Tracks time on websites and domains. Assign research or client portals to projects.",
  },
  {
    icon: FolderKanban,
    title: "Project Mapping",
    description:
      "Map apps, files, and URLs to projects. One place to define what belongs where.",
  },
  {
    icon: Receipt,
    title: "Accurate Billing",
    description:
      "Generate invoices from time blocks. Defensible, granular records for every billable hour.",
  },
  {
    icon: Zap,
    title: "Background Operation",
    description:
      "Runs silently. No interruptions. Just accurate time data when you need it.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <BlurFade delay={0.1} inView>
          <h2 className="font-display text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for
            <br />
            <span className="text-teal-600">project-based billing</span>
          </h2>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            From automatic tracking to invoice-ready reports.
          </p>
        </BlurFade>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <BlurFade key={feature.title} delay={0.1 * (i % 3)} inView>
                <MagicCard
                  gradientFrom="#f59e0b"
                  gradientTo="#14b8a6"
                  className="h-full p-6"
                >
                  <Icon className="mb-4 h-10 w-10 text-amber-500" />
                <h3 className="font-display text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </MagicCard>
            </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
