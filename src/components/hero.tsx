"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <DotPattern
        className="absolute inset-0 opacity-40"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={0.5}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <BlurFade delay={0.1} inView>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Automatic time tracking for projects</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Track every app, file & website.
              <br />
              <AnimatedGradientText
                colorFrom="#f59e0b"
                colorTo="#14b8a6"
                className="font-display"
              >
                Bill every project.
              </AnimatedGradientText>
            </h1>
            <BlurFade delay={0.3} inView>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Litz runs quietly in the background, logging every app, website,
                and file you use. Assign time blocks to projects for precise
                billing—no manual timers, no guesswork.
              </p>
            </BlurFade>
            <BlurFade delay={0.4} inView>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ShimmerButton
                  background="oklch(0.65 0.15 160)"
                  shimmerColor="rgba(255,255,255,0.4)"
                  className="px-8 py-3 text-base font-medium"
                >
                  Start Free Trial
                </ShimmerButton>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  See how it works
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </BlurFade>
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: 98, label: "Accuracy %" },
              { value: 12, label: "Apps tracked" },
              { value: 24, label: "Hours saved/week" },
              { value: 1000, suffix: "+", label: "Projects billed" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl font-bold tabular-nums sm:text-4xl">
                  <NumberTicker value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
