import { useEffect, useRef } from "react";
import gsap from "gsap";

const NexusLoader = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;

    if (!logo) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logo,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      gsap.to(logo, {
        opacity: 0.5,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, logo);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div
        ref={logoRef}
        className="flex items-center gap-3 text-text"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-xl font-bold">
          N
        </div>

        <span className="text-3xl font-semibold tracking-[0.25em]">
          NEXUS
        </span>
      </div>
    </div>
  );
};

export default NexusLoader;