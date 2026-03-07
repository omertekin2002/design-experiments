"use client";

import Link from "next/link";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight">
            Litz
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#dashboard"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#timeblocks"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Time Blocks
          </Link>
        </nav>
        <Link href="/dashboard">
          <ShimmerButton
            background="oklch(0.65 0.15 160)"
            shimmerColor="rgba(255,255,255,0.4)"
            className="text-sm font-medium"
          >
            Get Started
          </ShimmerButton>
        </Link>
      </div>
    </header>
  );
}
