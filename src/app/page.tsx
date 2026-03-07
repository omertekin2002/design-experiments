import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { DashboardShowcase } from "@/components/dashboard-showcase";
import { TimeblockShowcase } from "@/components/timeblock-showcase";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <DashboardShowcase />
        <TimeblockShowcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
