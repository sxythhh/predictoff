"use client";

import { useState } from "react";
import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Search } from "lucide-react";

interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  teams: number;
  matches: number;
  season: string;
  following: boolean;
}

const leagues: League[] = [
  { id: "premier-league", name: "Premier League", country: "England", logo: "/leagues/premier-league.svg", teams: 20, matches: 380, season: "2024/25", following: true },
  { id: "la-liga", name: "La Liga", country: "Spain", logo: "/leagues/la-liga.svg", teams: 20, matches: 380, season: "2024/25", following: true },
  { id: "serie-a", name: "Serie A", country: "Italy", logo: "/leagues/serie-a.svg", teams: 20, matches: 380, season: "2024/25", following: false },
  { id: "liga-portugal", name: "Liga Portugal", country: "Portugal", logo: "/leagues/liga-portugal.svg", teams: 18, matches: 306, season: "2024/25", following: false },
  { id: "nedbank-cup", name: "Nedbank Cup", country: "South Africa", logo: "/leagues/nedbank-cup.svg", teams: 32, matches: 31, season: "2025", following: false },
];

export default function LeaguesPage() {
  const [search, setSearch] = useState("");
  const [followState, setFollowState] = useState<Record<string, boolean>>(
    Object.fromEntries(leagues.map((l) => [l.id, l.following]))
  );

  const filtered = search
    ? leagues.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.country.toLowerCase().includes(search.toLowerCase())
      )
    : leagues;

  const toggleFollow = (id: string) => {
    setFollowState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-[var(--bg-page)]">
        <TopBar />
        <div className="px-[10px] pt-[10px] flex flex-col gap-[10px]">
          {/* Search bar */}
          <div className="bg-[var(--bg-card)] rounded-[20px] relative">
            <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px] z-0" />
            <div className="relative z-[1] flex items-center gap-[10px] px-[15px] py-[10px]">
              <Search size={16} className="text-[var(--text-disabled)] flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leagues..."
                className="flex-1 bg-transparent text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none"
              />
            </div>
          </div>

          {/* Leagues grid */}
          <div className="grid grid-cols-2 gap-[10px]">
            {filtered.map((league) => (
              <div key={league.id} className="bg-[var(--bg-card)] rounded-[20px] relative">
                <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px] z-0" />
                <div className="relative z-[1] flex flex-col">
                  <div className="flex items-center gap-[10px] px-[15px] py-[12px]">
                    <Image src={league.logo} alt={league.name} width={36} height={36} className="rounded-[6px] flex-shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-[family-name:var(--font-display)] font-semibold text-[14px] tracking-[-0.3px] text-[var(--text-primary)] truncate">
                        {league.name}
                      </span>
                      <span className="text-[11px] text-[var(--text-disabled)]">{league.country}</span>
                    </div>
                    <button
                      onClick={() => toggleFollow(league.id)}
                      className={`px-[10px] py-[4px] rounded-full text-[11px] font-semibold tracking-[-0.3px] transition-colors flex-shrink-0 ${
                        followState[league.id]
                          ? "bg-[var(--accent-green)]/20 text-[var(--accent-green)]"
                          : "bg-[var(--bg-interactive)] text-[var(--text-subtle)] hover:text-[var(--text-primary-white)]"
                      }`}
                    >
                      {followState[league.id] ? "Following" : "Follow"}
                    </button>
                  </div>

                  <div className="h-px bg-[var(--bg-card-header)] mx-[15px]" />

                  <div className="flex items-center px-[15px] py-[10px] gap-[16px]">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[14px] tracking-[-0.5px] text-[var(--text-primary)]">{league.teams}</span>
                      <span className="text-[10px] text-[var(--text-disabled)]">Teams</span>
                    </div>
                    <div className="w-px h-[24px] bg-[var(--bg-divider)]" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[14px] tracking-[-0.5px] text-[var(--text-primary)]">{league.matches}</span>
                      <span className="text-[10px] text-[var(--text-disabled)]">Matches</span>
                    </div>
                    <div className="w-px h-[24px] bg-[var(--bg-divider)]" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[14px] tracking-[-0.5px] text-[var(--text-primary)]">{league.season}</span>
                      <span className="text-[10px] text-[var(--text-disabled)]">Season</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
