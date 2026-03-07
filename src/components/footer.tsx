import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <span className="font-display text-lg font-medium">Litz</span>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              Passive time capture for independent teams and studios who need
              invoice-ready context instead of reconstructed timesheets.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 md:justify-end">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Workflow
            </Link>
            <Link
              href="#privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Live Demo
            </Link>
            <Link
              href="mailto:hello@litz.app"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Litz. Time tracking for accurate billing.</p>
          <p>No screenshots. No keystrokes. Context only.</p>
        </div>
      </div>
    </footer>
  );
}
