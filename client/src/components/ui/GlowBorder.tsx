import { useEffect, useRef } from "react";
import gsap from "gsap";

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
}

const GlowBorder = ({
  children,
  className = "",
}: GlowBorderProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const line = card.querySelector<SVGRectElement>(
      ".glow-border-line",
    );

    if (!line) return;

    gsap.set(line, {
      strokeDashoffset: 0,
      opacity: 0,
    });

    const animation = gsap.to(line, {
      strokeDashoffset: -100,
      duration: 3,
      ease: "none",
      repeat: -1,
      paused: true,
    });

    const handleEnter = () => {
      gsap.to(line, {
        opacity: 1,
        duration: 0.2,
      });

      animation.play();
    };

    const handleLeave = () => {
      animation.pause();

      gsap.to(line, {
        opacity: 0,
        duration: 0.2,
      });
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mouseenter", handleEnter);
      card.removeEventListener("mouseleave", handleLeave);
      animation.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl border border-border bg-surface ${className}`}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id="glow-border"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          className="glow-border-line"
          filter="url(#glow-border)"
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="12"
          fill="none"
          stroke="#E7E9ED"
          strokeWidth="1"
          pathLength="100"
          strokeDasharray="8 92"
          strokeDashoffset="0"
        />
      </svg>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlowBorder;