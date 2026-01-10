import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { EmailList } from "@/components/dashboard/email-list";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-2 hover:bg-muted/50"
            >
              <Link href="/">
                <ArrowLeft className="size-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Waitlist Dashboard
            </h1>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground">
              Manage and view your waitlist signups
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 sm:mb-8">
          <StatsCards />
        </div>

        {/* Email List */}
        <div>
          <EmailList />
        </div>
      </div>
    </div>
  );
}
