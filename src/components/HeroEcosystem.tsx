"use client";

import React, { useState, useEffect } from "react";
import { Banknote, GraduationCap, Megaphone, Users } from "lucide-react";

interface HeroEcosystemProps {
  labels: Record<string, string>;
}

export function HeroEcosystem({ labels }: HeroEcosystemProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLabel = (key: string, fallback: string) => labels[key] ?? fallback;

  const nodes = [
    {
      id: "funding",
      title: "Funding",
      items: [getLabel("rediFund", "REDI Fund"), getLabel("grantSupport", "Grants")],
      icon: Banknote,
      x: 85,
      y: 15,
      color: "#D4A017",
      bg: "from-[#D4A017]/20 to-[#D4A017]/5",
      border: "border-[#D4A017]/30",
      path: "M 250 250 C 350 250, 350 75, 425 75",
      delay: "0s",
      floatDelay: "0s",
    },
    {
      id: "learning",
      title: "Learning",
      items: [
        getLabel("incubator", "Incubator"),
        getLabel("technicalSupport", "Tech Support"),
        "REDI.business",
      ],
      icon: GraduationCap,
      x: 85,
      y: 85,
      color: "#003399",
      bg: "from-[#003399]/20 to-[#003399]/5",
      border: "border-[#003399]/30",
      path: "M 250 250 C 320 250, 300 425, 425 425",
      delay: "1.5s",
      floatDelay: "1s",
    },
    {
      id: "advocacy",
      title: "Advocacy",
      items: [getLabel("euProjects", "EU Projects")],
      icon: Megaphone,
      x: 15,
      y: 15,
      color: "#1B4332",
      bg: "from-[#1B4332]/20 to-[#1B4332]/5",
      border: "border-[#1B4332]/30",
      path: "M 250 250 C 150 250, 150 75, 75 75",
      delay: "3s",
      floatDelay: "2s",
    },
    {
      id: "community",
      title: "Community",
      items: [getLabel("businessClubs", "Business Clubs")],
      icon: Users,
      x: 15,
      y: 85,
      color: "#E91E63",
      bg: "from-[#E91E63]/20 to-[#E91E63]/5",
      border: "border-[#E91E63]/30",
      path: "M 250 250 C 180 250, 200 425, 75 425",
      delay: "4.5s",
      floatDelay: "3s",
    },
  ];

  if (!mounted) return <div className="w-full max-w-[600px] aspect-square mx-auto" />;

  return (
    <div className="relative mx-auto w-full max-w-[600px] aspect-square">
      {/* Background glowing orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite_1s]" />
      </div>

      {/* SVG Connections */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none z-0"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {nodes.map((node) => (
            <linearGradient key={`grad-${node.id}`} id={`grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={node.color} stopOpacity="0.1" />
              <stop offset="100%" stopColor={node.color} stopOpacity="0.8" />
            </linearGradient>
          ))}
        </defs>

        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isDimmed = hoveredNode !== null && !isHovered;

          return (
            <g
              key={`path-${node.id}`}
              className={`transition-all duration-500 ${isDimmed ? "opacity-10" : "opacity-100"}`}
            >
              {/* Thick invisible path for hover area if we wanted to make paths interactive */}
              
              {/* Base path */}
              <path
                id={`curve-${node.id}`}
                d={node.path}
                fill="none"
                stroke={`url(#grad-${node.id})`}
                strokeWidth={isHovered ? "3" : "2"}
                strokeDasharray={isHovered ? "none" : "6 6"}
                className={`transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-40"}`}
              />
              
              {/* Animated glowing particle along the path */}
              <circle
                r={isHovered ? "5" : "3.5"}
                fill={node.color}
                filter="url(#glow)"
                className="motion-reduce:hidden"
              >
                <animateMotion
                  dur={isHovered ? "3s" : "6s"}
                  repeatCount="indefinite"
                  begin={node.delay}
                  calcMode="linear"
                >
                  <mpath href={`#curve-${node.id}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.9;1"
                  dur={isHovered ? "3s" : "6s"}
                  repeatCount="indefinite"
                  begin={node.delay}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Central Hub */}
      <div 
        className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        onMouseEnter={() => setHoveredNode(null)}
      >
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-2 rounded-full border border-primary/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
        
        {/* Core orb */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/60 bg-white/80 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-110">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />
          <span className="relative text-center font-heading text-sm font-bold leading-tight tracking-tight text-primary">
            Roma<br />Ecosystem
          </span>
        </div>
      </div>

      {/* Orbital Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        const isDimmed = hoveredNode !== null && !isHovered;
        const Icon = node.icon;

        return (
          <div
            key={node.id}
            className={`absolute z-20 w-40 sm:w-48 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              isDimmed ? "opacity-40 scale-95 blur-[1px]" : "opacity-100 scale-100 blur-0"
            } ${isHovered ? "z-30" : ""}`}
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              animation: `float 6s ease-in-out infinite ${node.floatDelay}`
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className={`group relative overflow-hidden rounded-2xl border bg-white/70 backdrop-blur-xl transition-all duration-500 ${
                isHovered 
                  ? `shadow-[0_20px_40px_-15px_${node.color}40] -translate-y-2 border-white/80` 
                  : "shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-white/40"
              }`}
            >
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Header */}
              <div
                className={`relative flex items-center gap-3 border-b px-4 py-3 transition-colors duration-500 ${node.border} bg-gradient-to-r ${node.bg}`}
              >
                <div 
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ color: node.color }}
                >
                  <Icon size={16} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-bold tracking-tight text-text">
                  {node.title}
                </span>
              </div>
              
              {/* Items */}
              <div className="relative px-4 py-3 bg-white/40">
                <ul className="space-y-2">
                  {node.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs font-medium text-text-muted transition-colors duration-300 group-hover:text-text"
                    >
                      <span 
                        className="block h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-125"
                        style={{ backgroundColor: isHovered ? node.color : 'rgba(0,0,0,0.2)' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-50%, calc(-50% - 10px)); }
        }
      `}} />
    </div>
  );
}
