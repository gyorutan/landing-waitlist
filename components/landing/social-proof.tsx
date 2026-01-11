"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

const stats: Stat[] = [
  {
    value: 10000,
    suffix: "+",
    label: "Waitlist Signups",
    description: "Join thousands of early adopters",
  },
  {
    value: 50,
    suffix: "+",
    label: "Countries",
    description: "Global reach and impact",
  },
  {
    value: 99,
    suffix: "%",
    label: "Uptime",
    description: "Reliable and always available",
  },
  {
    value: 4.9,
    prefix: "",
    label: "Rating",
    description: "Based on user reviews",
  },
];

interface SocialProofProps {
  className?: string;
}

function CountUp({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (end - startValue) * easeOut;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const formatValue = (value: number) => {
    if (decimals === 0) {
      return Math.floor(value).toLocaleString();
    }
    return value.toFixed(decimals);
  };

  return (
    <div ref={ref} className="inline-block">
      {prefix}
      {formatValue(count)}
      {suffix}
    </div>
  );
}

export function SocialProof({ className }: SocialProofProps) {
  return (
    <section className={cn("container mx-auto px-4 py-20 md:py-32", className)}>
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Trusted by <span className="gradient-text">thousands</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Join a growing community of innovators and early adopters.
        </p>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl border-0 glass-premium p-5 sm:p-7 transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <div className="mb-2 text-sm sm:text-base font-bold">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Premium Testimonials Preview */}
      <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
        {[
          {
            name: "Sarah Chen",
            role: "Founder, TechStart",
            content:
              "This platform has completely transformed how we work. The waitlist was worth it!",
            rating: 5,
          },
          {
            name: "Michael Rodriguez",
            role: "CEO, InnovateLab",
            content:
              "Early access gave us a competitive edge. The features are exactly what we needed.",
            rating: 5,
          },
          {
            name: "Emily Johnson",
            role: "Product Manager",
            content:
              "Best decision we made. The community and support are incredible.",
            rating: 5,
          },
        ].map((testimonial, index) => (
          <div
            key={testimonial.name}
            className="group relative overflow-hidden rounded-xl border-0 glass-premium p-5 sm:p-7 transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="size-4 sm:size-5 fill-primary text-primary"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="mb-5 text-sm sm:text-base leading-relaxed text-muted-foreground italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="pt-4 border-t border-border/40">
                <div className="text-base sm:text-lg font-bold mb-1">
                  {testimonial.name}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
