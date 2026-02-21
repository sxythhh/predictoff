"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

type PickResult = "won" | "lost" | "pending";

interface UserPick {
  id: string;
  matchId: string;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
  leagueLogo: string;
  leagueName: string;
  date: string;
  pick: "home" | "draw" | "away";
  result: PickResult;
  score?: string;
  points?: number;
}

const picks: UserPick[] = [
  {
    id: "1",
    matchId: "man-united-vs-west-ham",
    homeTeam: "Man United",
    homeTeamLogo: "/teams/man-united.svg",
    awayTeam: "West Ham",
    awayTeamLogo: "/teams/west-ham.svg",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    date: "Sun May 11",
    pick: "home",
    result: "won",
    score: "2 - 1",
    points: 10,
  },
  {
    id: "2",
    matchId: "tottenham-vs-crystal-palace",
    homeTeam: "Tottenham",
    homeTeamLogo: "/teams/tottenham.svg",
    awayTeam: "Crystal Palace",
    awayTeamLogo: "/teams/crystal-palace.svg",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    date: "Sun May 11",
    pick: "home",
    result: "won",
    score: "3 - 1",
    points: 10,
  },
  {
    id: "3",
    matchId: "nottingham-forest-vs-leicester",
    homeTeam: "Nottingham Forest",
    homeTeamLogo: "/teams/nottingham-forest.svg",
    awayTeam: "Leicester",
    awayTeamLogo: "/teams/leicester.svg",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    date: "Sun May 11",
    pick: "away",
    result: "lost",
    score: "2 - 1",
    points: 0,
  },
  {
    id: "4",
    matchId: "man-united-vs-west-ham",
    homeTeam: "Arsenal",
    homeTeamLogo: "/teams/man-united.svg",
    awayTeam: "Liverpool",
    awayTeamLogo: "/teams/west-ham.svg",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    date: "Sat May 17",
    pick: "draw",
    result: "pending",
  },
];

const filterTabs = ["All", "Won", "Lost", "Pending"] as const;

function resultColor(result: PickResult): string {
  switch (result) {
    case "won": return "var(--accent-green)";
    case "lost": return "var(--accent-red)";
    case "pending": return "var(--text-disabled)";
  }
}

function pickLabel(pick: "home" | "draw" | "away"): string {
  switch (pick) {
    case "home": return "Home Win";
    case "draw": return "Draw";
    case "away": return "Away Win";
  }
}

export default function PicksPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<typeof filterTabs[number]>("All");

  const filtered = activeFilter === "All"
    ? picks
    : picks.filter((p) => p.result === activeFilter.toLowerCase());

  const totalPoints = picks.reduce((sum, p) => sum + (p.points ?? 0), 0);
  const totalWon = picks.filter((p) => p.result === "won").length;
  const totalLost = picks.filter((p) => p.result === "lost").length;
  const winRate = picks.filter((p) => p.result !== "pending").length > 0
    ? Math.round((totalWon / picks.filter((p) => p.result !== "pending").length) * 100)
    : 0;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-[var(--bg-page)]">
        <TopBar />
        <div className="px-[10px] pt-[10px] flex flex-col gap-[10px]">
          {/* Stats overview */}
          <div className="flex gap-[10px]">
            {[
              { label: "Total Points", value: totalPoints.toString() },
              { label: "Win Rate", value: `${winRate}%` },
              { label: "Won", value: totalWon.toString() },
              { label: "Lost", value: totalLost.toString() },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 bg-[var(--bg-card)] rounded-[20px] relative">
                <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px]" />
                <div className="relative px-[15px] py-[14px] flex flex-col gap-[2px]">
                  <span className="text-[11px] text-[var(--text-disabled)]">{stat.label}</span>
                  <span className="font-[family-name:var(--font-display)] font-bold text-[22px] tracking-[-0.8px] text-[var(--text-primary)]">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Picks list */}
          <div className="bg-[var(--bg-card)] rounded-[20px] relative">
            <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px] z-0" />
            <div className="relative z-[1]">
              <div className="flex items-center justify-between px-[15px] py-[7.25px] bg-[var(--bg-card-header)] rounded-t-[20px]">
                <span className="font-[family-name:var(--font-display)] font-semibold text-[16.7px] leading-[25px] text-[var(--text-primary-white)] tracking-[-0.3px]">
                  My Picks
                </span>
                <div className="flex gap-[4px]">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`px-[10px] py-[3px] rounded-full text-[12px] font-medium transition-colors ${
                        activeFilter === tab
                          ? "bg-[var(--bg-interactive)] text-[var(--text-primary-white)]"
                          : "text-[var(--text-disabled)] hover:text-[var(--text-subtle)]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                {filtered.map((pick) => (
                  <button
                    key={pick.id}
                    onClick={() => router.push(`/match/${pick.matchId}`)}
                    className="flex items-center gap-[12px] px-[15px] py-[10px] hover:bg-[var(--overlay-hover)] transition-colors border-b border-[var(--bg-card-header)] last:border-b-0"
                  >
                    <div
                      className="w-[4px] h-[36px] rounded-full flex-shrink-0"
                      style={{ backgroundColor: resultColor(pick.result) }}
                    />

                    <div className="flex items-center gap-[8px] flex-1 min-w-0">
                      <Image src={pick.homeTeamLogo} alt={pick.homeTeam} width={28} height={28} className="rounded flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-[13px] tracking-[-0.3px] text-[var(--text-primary)] truncate">
                          {pick.homeTeam} vs {pick.awayTeam}
                        </span>
                        <div className="flex items-center gap-[6px]">
                          <Image src={pick.leagueLogo} alt={pick.leagueName} width={14} height={14} className="rounded flex-shrink-0" />
                          <span className="text-[11px] text-[var(--text-disabled)]">{pick.leagueName}</span>
                          <span className="text-[11px] text-[var(--text-disabled)]">{pick.date}</span>
                        </div>
                      </div>
                    </div>

                    {pick.score && (
                      <span className="font-[family-name:var(--font-display)] font-bold text-[14px] tracking-[-0.5px] text-[var(--text-primary)] flex-shrink-0">
                        {pick.score}
                      </span>
                    )}

                    <div className="flex items-center gap-[8px] flex-shrink-0">
                      <div className={`px-[8px] py-[3px] rounded-full ${
                        pick.result === "won" ? "bg-[var(--accent-green)]/20" : pick.result === "lost" ? "bg-[var(--accent-red)]/20" : "bg-[var(--bg-interactive)]"
                      }`}>
                        <span className="text-[11px] font-semibold tracking-[-0.3px]" style={{ color: resultColor(pick.result) }}>
                          {pickLabel(pick.pick)}
                        </span>
                      </div>
                    </div>

                    <div className="w-[40px] flex-shrink-0 text-right">
                      {pick.points !== undefined ? (
                        <span className="font-semibold text-[13px] tracking-[-0.5px]" style={{ color: pick.points > 0 ? "var(--accent-green)" : "var(--text-disabled)" }}>
                          {pick.points > 0 ? `+${pick.points}` : pick.points}
                        </span>
                      ) : (
                        <span className="text-[12px] text-[var(--text-disabled)]">--</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
