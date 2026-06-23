"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const SLICE_IDS = ["tailor", "retail", "hardware", "textiles", "professional"] as const;
type SliceId = (typeof SLICE_IDS)[number];

const SLICE_IMAGES: Record<SliceId, string> = {
  tailor: "/home/entrepreneurs/entrepreneur-1.png",
  retail: "/home/entrepreneurs/entrepreneur-2.png",
  hardware: "/home/entrepreneurs/entrepreneur-3.png",
  textiles: "/home/entrepreneurs/entrepreneur-4.png",
  professional: "/home/entrepreneurs/entrepreneur-5.png",
};

/** News article slugs mapped to each entrepreneur persona */
const NEWS_SLUGS: Record<SliceId, string> = {
  tailor: "economic-development-of-roma-community-begins",
  retail:
    "building-and-strengthening-the-papposhop-platform-to-support-roma-entrepreneurs-women-and-youth-in-north-macedonia-albania-and-serbia-including-educational-and-community-awareness-campaign",
  hardware: "visegrad2025",
  textiles: "loans-to-micro-enterprises-in-roma-communities-from-4-countries",
  professional: "redi-economic-development-secures-e2-million-eif-loan-to-support-roma-entrepreneurship",
};

interface EntrepreneurCollageProps {
  variant?: "banner" | "card";
  priority?: boolean;
  className?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function EntrepreneurCollage({
  variant = "banner",
  priority = false,
  className = "",
}: EntrepreneurCollageProps) {
  const t = useTranslations("home.entrepreneurCollage");
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openSlice = useCallback(
    (index: number) => {
      const id = SLICE_IDS[index];
      setActiveIndex(index);
      router.push(`/news/${NEWS_SLUGS[id]}`);
    },
    [router],
  );

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const rowClass =
    variant === "banner"
      ? "min-h-[140px] sm:min-h-[180px] lg:min-h-[220px]"
      : "min-h-[160px] sm:min-h-[200px]";

  const sliceMotion =
    reducedMotion
      ? ""
      : "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg";

  const activeMotion = reducedMotion
    ? "ring-2 ring-primary ring-offset-2"
    : "-translate-y-3 scale-[1.02] shadow-2xl z-10";

  return (
    <div ref={containerRef} className={className}>
      <div
        className={`flex gap-2 overflow-x-auto pb-1 sm:gap-3 sm:overflow-visible ${rowClass}`}
        role="list"
        aria-label={t("selectPrompt")}
      >
        {SLICE_IDS.map((id, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={id}
              type="button"
              role="listitem"
              onClick={() => openSlice(index)}
              aria-label={t(`${id}Label`)}
              aria-pressed={isActive}
              className={`group relative min-w-[28%] flex-1 shrink-0 overflow-hidden rounded-xl shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-w-0 ${sliceMotion} ${
                isActive ? activeMotion : "shadow-md"
              }`}
            >
              <div className="relative aspect-[204/450] w-full">
                <Image
                  src={SLICE_IMAGES[id]}
                  alt={t(`${id}Label`)}
                  fill
                  sizes={
                    variant === "banner"
                      ? "(max-width: 640px) 28vw, (max-width: 1024px) 18vw, 220px"
                      : "(max-width: 640px) 28vw, (max-width: 1024px) 20vw, 200px"
                  }
                  className="object-cover object-center"
                  priority={priority && index < 2}
                />
              </div>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-2 pb-2 pt-8 text-left text-[10px] font-semibold leading-tight text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-xs">
                {t(`${id}Title`)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
