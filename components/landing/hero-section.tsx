"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const waitlistFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to join waitlist");
      }

      setIsSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={cn(
        "relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pb-20 md:pb-32",
        className
      )}
    >
      {/* Premium Gradient Background with Multiple Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main gradient orbs */}
        <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/30 via-accent/15 to-transparent blur-3xl animate-gradient-orb" />
        <div
          className="absolute left-1/4 top-1/4 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/25 via-primary/15 to-transparent blur-3xl animate-gradient-orb"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-[600px] w-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl animate-gradient-orb"
          style={{ animationDelay: "4s" }}
        />

        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/5 opacity-60" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl text-center">
        {/* Premium Badge */}
        <div className="mb-0 animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-5 py-2 text-sm font-medium glass-premium shadow-premium hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-full w-full rounded-full bg-primary shadow-glow" />
            </span>
            Join 10,000+ early adopters
          </span>
        </div>

        {/* Premium Headline */}
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl animate-fade-in-up px-2 leading-tight">
          <span className="block mb-2 text-foreground">Build Something</span>
          <span className="text-foreground block drop-shadow-lg">
            Extraordinary
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mb-8 text-base text-muted-foreground sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto animate-slide-up px-4"
          style={{ animationDelay: "0.1s" }}
        >
          Join thousands of innovators who are already building the future. Get
          early access to our revolutionary platform.
        </p>

        {/* Premium Waitlist Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-6 sm:mb-8 flex w-full max-w-lg flex-col gap-4 px-4 sm:px-0 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="flex-1 w-full relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className={cn(
                  "h-12 sm:h-14 w-full text-base sm:text-sm glass-premium border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-premium",
                  errors.email && "border-destructive focus:ring-destructive/20"
                )}
                disabled={isSubmitting || isSuccess}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-2 text-xs sm:text-sm text-destructive px-1 animate-fade-in">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || isSuccess}
              className="group h-12 sm:h-14 px-8 sm:px-10 gap-2 w-full sm:w-auto text-base font-semibold"
            >
              {isSubmitting ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Joining...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="size-5" />
                  Joined!
                </>
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="size-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </>
              )}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-destructive text-center animate-fade-in">
              {error}
            </p>
          )}
          {isSuccess && (
            <p className="text-sm text-primary text-center font-medium animate-fade-in">
              ✨ Thank you for joining! We&apos;ll notify you soon.
            </p>
          )}
        </form>

        {/* Premium Trust Indicators */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-muted-foreground animate-fade-in px-4"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center gap-2.5 group cursor-default">
            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors duration-200">
              <svg
                className="size-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="font-medium">No spam, ever</span>
          </div>
          <div className="flex items-center gap-2.5 group cursor-default">
            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors duration-200">
              <svg
                className="size-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center gap-2.5 group cursor-default">
            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors duration-200">
              <svg
                className="size-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="font-medium">Early Access</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:flex">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs">Scroll to explore</span>
          <svg
            className="size-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
