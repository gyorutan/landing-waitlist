"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Zap, Shield, User, Lock, Star } from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient?: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed with cutting-edge technology that delivers instant results.",
    gradient: "from-primary/20 to-accent/20",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Enterprise-grade security that protects your data and privacy.",
    gradient: "from-accent/20 to-primary/20",
  },
  {
    icon: User,
    title: "User-Centric Design",
    description: "Intuitive interface designed with your needs in mind.",
    gradient: "from-primary/20 via-accent/20 to-secondary/20",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your data stays yours. We never sell or share your information.",
    gradient: "from-accent/20 to-primary/20",
  },
];

interface FeaturesGridProps {
  className?: string;
}

export function FeaturesGrid({ className }: FeaturesGridProps) {
  return (
    <section className={cn("container mx-auto px-4 py-20 md:py-32", className)}>
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Everything you need to <span className="gradient-text">succeed</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Powerful features designed to help you build, grow, and scale your
          business.
        </p>
      </div>

      {/* Premium Bento Grid Layout */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Large Feature Card - Premium */}
        <Card className="group/card relative overflow-hidden border-0 glass-premium transition-all duration-200 hover:shadow-lg hover:scale-[1.01] sm:col-span-2 lg:row-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-0 transition-opacity duration-200 group-hover/card:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CardHeader className="relative z-10">
            <div className="mb-4 inline-flex rounded-xl bg-primary/20 p-3.5 group-hover/card:bg-primary/25 transition-all duration-200">
              <Zap className="size-7 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Powerful & Intuitive
            </CardTitle>
            <CardDescription className="text-base md:text-lg leading-relaxed">
              Experience the perfect balance of power and simplicity. Our
              platform gives you everything you need without the complexity.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex flex-wrap gap-2.5">
              {["Fast", "Secure", "Scalable", "Modern"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Premium Regular Feature Cards */}
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className="group/card relative overflow-hidden border-0 glass-premium transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-200 group-hover/card:opacity-100",
                feature.gradient || "from-primary/15 to-accent/15"
              )}
            />
            <CardHeader className="relative z-10">
              <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 transition-all duration-200 group-hover/card:bg-primary/20">
                <feature.icon className="size-6 text-primary" />
              </div>
              <CardTitle className="text-xl md:text-2xl font-bold mb-2">{feature.title}</CardTitle>
              <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}

        {/* Premium Stats Card */}
        <Card className="group/card relative overflow-hidden border-0 glass-premium transition-all duration-200 hover:shadow-lg hover:scale-[1.01] sm:col-span-2 lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-primary/10 to-transparent opacity-0 transition-opacity duration-200 group-hover/card:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/3 to-transparent" />
          <CardContent className="relative z-10 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0">
              <div className="w-full sm:w-auto">
                <div className="mb-3 flex items-center gap-2">
                  <Star className="size-5 sm:size-6 text-primary fill-primary" />
                  <span className="text-sm sm:text-base font-semibold text-muted-foreground">
                    Trusted by
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-1">
                  10,000+
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">
                  Active users
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <div className="mb-3 flex items-center gap-2 sm:justify-end">
                  <span className="text-sm sm:text-base font-semibold text-muted-foreground">
                    Rating
                  </span>
                  <Star className="size-5 sm:size-6 fill-primary text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-1">
                  4.9
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">out of 5</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
