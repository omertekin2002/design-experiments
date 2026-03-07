"use client";

import { useRouter } from "next/navigation";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function CTA() {
  const router = useRouter();

  return (
    <section className="relative py-24">
      <DotPattern
        className="absolute inset-0 opacity-30"
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={0.5}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <BlurFade delay={0.1} inView>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Stop guessing. Start billing.
          </h2>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <p className="mt-4 text-muted-foreground">
            Join thousands of freelancers and teams who bill with confidence.
          </p>
        </BlurFade>
        <BlurFade delay={0.3} inView>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ShimmerButton
              background="oklch(0.65 0.15 160)"
              shimmerColor="rgba(255,255,255,0.4)"
              className="px-10 py-4 text-base font-medium"
              onClick={() => router.push("/dashboard")}
            >
              Start Free Trial
            </ShimmerButton>
            <p className="text-sm text-muted-foreground">
              No credit card required · 14-day trial
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
