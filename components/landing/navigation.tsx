"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBrandName } from "@/lib/brand";
import { LayoutDashboard } from "lucide-react";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const brandName = getBrandName();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/60 bg-background/98 backdrop-blur-xl shadow-premium"
          : "border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/50",
        className
      )}
    >
      <div className="container mx-auto flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold group transition-transform hover:scale-105"
        >
          <span className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text">
            {brandName}
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="size-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
