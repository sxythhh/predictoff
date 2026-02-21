"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { StatBar } from "./StatBar";

// --- Types ---

export interface MatchEvent {
  minute: number;
  type: "goal" | "yellow_card" | "red_card" | "substitution";
  player: string;
  playerOut?: string;
  team: "home" | "away";
}

export interface MatchPredictions {
  total: number;
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface LineupPlayer {
  number: number;
  name: string;
}

export interface TeamLineup {
  formation: string;
  starting: LineupPlayer[];
  substitutes: LineupPlayer[];
}

export interface MatchDetailProps {
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
  leagueLogo: string;
  leagueName: string;
  date: string;
  time: string;
  stadium: string;
  stats: {
    label: string;
    homeValue: number;
    awayValue: number;
    isPossession?: boolean;
  }[];
  events: MatchEvent[];
  predictions: MatchPredictions;
  homeLineup: TeamLineup;
  awayLineup: TeamLineup;
}

const tabs = ["Predictions", "Events", "Statistics", "Lineups"];

// --- Event icon helpers ---

function EventIcon({ type }: { type: MatchEvent["type"] }) {
  switch (type) {
    case "goal":
      return (
        <div className="w-[20px] h-[20px] rounded-full bg-[var(--accent-green)] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="white" strokeWidth="1.5" />
            <circle cx="5" cy="5" r="1.5" fill="white" />
          </svg>
        </div>
      );
    case "yellow_card":
      return (
        <div className="w-[14px] h-[18px] rounded-[2px] bg-[var(--accent-yellow)]" />
      );
    case "red_card":
      return (
        <div className="w-[14px] h-[18px] rounded-[2px] bg-[var(--accent-red)]" />
      );
    case "substitution":
      return (
        <div className="w-[20px] h-[20px] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 11L7 8L3 5" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 5L9 8L13 11" stroke="var(--accent-red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
  }
}

function eventLabel(type: MatchEvent["type"]): string {
  switch (type) {
    case "goal": return "Goal";
    case "yellow_card": return "Yellow Card";
    case "red_card": return "Red Card";
    case "substitution": return "Substitution";
  }
}

// --- Main component ---

export function MatchDetail({
  homeTeam,
  homeTeamLogo,
  awayTeam,
  awayTeamLogo,
  leagueLogo,
  leagueName,
  date,
  time,
  stadium,
  stats,
  events,
  predictions,
  homeLineup,
  awayLineup,
}: MatchDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Statistics");
  const [userPick, setUserPick] = useState<"home" | "draw" | "away" | null>(null);

  return (
    <div className="px-[10px] pt-[10px]">
      <div className="bg-[var(--bg-card)] rounded-[20px]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-[15px] py-[7.25px] bg-[var(--bg-card-header)] rounded-t-[20px]">
          <div className="flex items-center gap-[10px]">
            <button
              onClick={() => router.push("/")}
              className="w-[32px] h-[32px] flex items-center justify-center bg-[var(--bg-interactive)] rounded-full"
            >
              <ArrowLeft size={16} className="text-[var(--text-primary-white)]" />
            </button>
            <span className="font-[family-name:var(--font-display)] font-semibold text-[16.7px] leading-[25px] text-[var(--text-primary-white)] tracking-[-0.3px]">
              Matches
            </span>
          </div>
          <div className="flex items-center gap-[4px]">
            <Image src={leagueLogo} alt={leagueName} width={25} height={25} className="rounded" />
            <span className="font-normal text-[12.5px] leading-[18px] tracking-[-0.3px] text-[var(--text-label)]">
              {leagueName}
            </span>
          </div>
        </div>

        {/* Info row */}
        <div className="flex items-center justify-center gap-[20px] pt-[14px] pb-[6px]">
          <div className="flex items-center gap-[5px]">
            <Calendar size={14} className="text-[var(--text-disabled)]" />
            <span className="text-[13px] text-[var(--text-disabled)]">{date}</span>
          </div>
          <div className="flex items-center gap-[5px]">
            <MapPin size={14} className="text-[var(--text-disabled)]" />
            <span className="text-[13px] text-[var(--text-disabled)]">{stadium}</span>
          </div>
        </div>

        {/* Teams row */}
        <div className="flex items-center justify-center px-[20px] py-[16px]">
          <div className="flex items-center gap-[12px] flex-1 justify-end">
            <span className="font-[family-name:var(--font-display)] font-medium text-[16.5px] text-[var(--text-primary)] tracking-[-0.3px]">
              {homeTeam}
            </span>
            <Image src={homeTeamLogo} alt={homeTeam} width={50} height={50} className="rounded" />
          </div>
          <div className="flex flex-col items-center px-[20px]">
            <span className="font-[family-name:var(--font-display)] font-bold text-[17.8px] tracking-[-0.8px] text-[var(--text-primary-white)]">
              {time}
            </span>
            <span className="text-[12px] text-[var(--text-disabled)]">{date}</span>
          </div>
          <div className="flex items-center gap-[12px] flex-1">
            <Image src={awayTeamLogo} alt={awayTeam} width={50} height={50} className="rounded" />
            <span className="font-[family-name:var(--font-display)] font-medium text-[16.5px] text-[var(--text-primary)] tracking-[-0.3px]">
              {awayTeam}
            </span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex px-[10px] gap-[4px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-[8px] font-semibold text-[14px] tracking-[-0.5px] text-center rounded-t-[10px] transition-colors ${
                activeTab === tab
                  ? "text-[var(--text-primary-white)] bg-[var(--bg-card-header)]"
                  : "text-[var(--text-disabled)] hover:text-[var(--text-subtle)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ===================== TAB CONTENT ===================== */}

        {/* --- Predictions --- */}
        {activeTab === "Predictions" && (
          <div className="px-[20px] py-[20px] flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[14px]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[13px] tracking-[-0.5px] text-[var(--text-primary-white)]">
                  Community Predictions
                </span>
                <span className="text-[12px] text-[var(--text-disabled)]">
                  {predictions.total.toLocaleString()} predictions
                </span>
              </div>

              {[
                { label: "Home Win", value: predictions.homeWin, key: "home" as const },
                { label: "Draw", value: predictions.draw, key: "draw" as const },
                { label: "Away Win", value: predictions.awayWin, key: "away" as const },
              ].map((item) => {
                const pct = predictions.total > 0
                  ? Math.round((item.value / predictions.total) * 100)
                  : 0;
                return (
                  <div key={item.key} className="flex flex-col gap-[4px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[var(--text-primary)]">{item.label}</span>
                      <span className="font-semibold text-[13px] tracking-[-0.5px] text-[var(--text-primary)]">
                        {pct}%
                      </span>
                    </div>
                    <div className="h-[6px] bg-[var(--bg-divider)] rounded-[20px] overflow-hidden">
                      <div
                        className="h-full rounded-[20px]"
                        style={{
                          width: `${pct}%`,
                          backgroundColor:
                            item.key === "home" ? "var(--accent-green)" : item.key === "away" ? "var(--accent-blue)" : "var(--text-label)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-[var(--bg-divider)]" />

            <div className="flex flex-col gap-[10px]">
              <span className="font-semibold text-[13px] tracking-[-0.5px] text-[var(--text-primary-white)]">
                Your Prediction
              </span>
              <div className="flex gap-[8px]">
                {(["home", "draw", "away"] as const).map((pick) => (
                  <button
                    key={pick}
                    onClick={() => setUserPick(pick === userPick ? null : pick)}
                    className={`flex-1 h-[40px] flex items-center justify-center rounded-[10px] transition-colors ${
                      userPick === pick
                        ? "bg-[var(--accent-green)]/30 border border-[var(--accent-green-border)]"
                        : "bg-[var(--bg-card-header)] hover:bg-[var(--bg-divider)]"
                    }`}
                  >
                    <span className="font-medium text-[13px] leading-[21px] tracking-[-0.3px] text-[var(--text-muted)]">
                      {pick === "home" ? "Home Win" : pick === "draw" ? "Draw" : "Away Win"}
                    </span>
                  </button>
                ))}
              </div>
              {userPick && (
                <button className="w-full h-[33px] flex items-center justify-center bg-[var(--accent-green)]/30 border-t border-[var(--accent-green-border)] rounded-[10px]">
                  <span className="font-bold text-[13px] leading-[18px] tracking-[-0.5px] text-[var(--text-primary-white)]">
                    Submit Prediction
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* --- Events --- */}
        {activeTab === "Events" && (
          <div className="px-[20px] py-[20px]">
            {events.length === 0 ? (
              <div className="py-[30px] flex items-center justify-center">
                <span className="text-[14px] text-[var(--text-disabled)]">No events yet</span>
              </div>
            ) : (
              <div className="relative flex flex-col">
                <div className="absolute left-[39px] top-0 bottom-0 w-px bg-[var(--bg-divider)]" />

                {events.map((event, i) => {
                  const isHome = event.team === "home";
                  return (
                    <div key={i} className="flex items-center gap-[12px] py-[10px] relative">
                      <div className="w-[30px] flex-shrink-0 flex items-center justify-end">
                        <span className="font-semibold text-[12px] tracking-[-0.3px] text-[var(--text-disabled)]">
                          {event.minute}&apos;
                        </span>
                      </div>

                      <div className="w-[18px] flex-shrink-0 flex items-center justify-center z-[1]">
                        <div className="w-[8px] h-[8px] rounded-full bg-[var(--bg-interactive)] border-2 border-[var(--text-disabled)]" />
                      </div>

                      <div className="flex-1 flex items-center gap-[10px] px-[12px] py-[8px] bg-[var(--bg-card-header)] rounded-[10px]">
                        <EventIcon type={event.type} />
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center gap-[6px]">
                            <span className="font-medium text-[13px] tracking-[-0.3px] text-[var(--text-primary)] truncate">
                              {event.player}
                            </span>
                            {event.type === "substitution" && event.playerOut && (
                              <span className="text-[12px] text-[var(--text-disabled)] truncate">
                                for {event.playerOut}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[var(--text-disabled)]">
                            {eventLabel(event.type)}
                          </span>
                        </div>
                        <div
                          className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                          style={{ backgroundColor: isHome ? "var(--accent-green)" : "var(--accent-blue)" }}
                        />
                        <span className="text-[11px] text-[var(--text-disabled)] flex-shrink-0">
                          {isHome ? homeTeam : awayTeam}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- Statistics --- */}
        {activeTab === "Statistics" && (
          <div className="px-[20px] py-[20px] flex flex-col gap-[16px]">
            {stats.map((stat) => (
              <StatBar
                key={stat.label}
                label={stat.label}
                homeValue={stat.homeValue}
                awayValue={stat.awayValue}
                isPossession={stat.isPossession}
              />
            ))}
          </div>
        )}

        {/* --- Lineups --- */}
        {activeTab === "Lineups" && (
          <div className="px-[20px] py-[20px]">
            <div className="flex gap-[16px]">
              {/* Home lineup */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-[8px] pb-[12px]">
                  <Image src={homeTeamLogo} alt={homeTeam} width={24} height={24} className="rounded" />
                  <span className="font-semibold text-[13px] tracking-[-0.5px] text-[var(--text-primary)]">
                    {homeTeam}
                  </span>
                  <span className="text-[12px] text-[var(--text-disabled)] ml-auto">
                    {homeLineup.formation}
                  </span>
                </div>

                <div className="flex flex-col">
                  {homeLineup.starting.map((player) => (
                    <div key={player.number} className="flex items-center gap-[10px] px-[12px] py-[7px] border-b border-[var(--bg-card-header)] last:border-b-0">
                      <span className="w-[22px] font-semibold text-[12px] tracking-[-0.3px] text-[var(--text-disabled)] text-center">
                        {player.number}
                      </span>
                      <span className="font-normal text-[13px] tracking-[-0.3px] text-[var(--text-primary)]">
                        {player.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-[12px]">
                  <div className="px-[12px] py-[6px]">
                    <span className="text-[11px] font-semibold tracking-[-0.3px] text-[var(--text-disabled)] uppercase">
                      Substitutes
                    </span>
                  </div>
                  <div className="flex flex-col">
                    {homeLineup.substitutes.map((player) => (
                      <div key={player.number} className="flex items-center gap-[10px] px-[12px] py-[7px] border-b border-[var(--bg-card-header)] last:border-b-0">
                        <span className="w-[22px] font-semibold text-[12px] tracking-[-0.3px] text-[var(--text-disabled)] text-center">
                          {player.number}
                        </span>
                        <span className="font-normal text-[13px] tracking-[-0.3px] text-[var(--text-subtle)]">
                          {player.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-px bg-[var(--bg-divider)]" />

              {/* Away lineup */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-[8px] pb-[12px]">
                  <Image src={awayTeamLogo} alt={awayTeam} width={24} height={24} className="rounded" />
                  <span className="font-semibold text-[13px] tracking-[-0.5px] text-[var(--text-primary)]">
                    {awayTeam}
                  </span>
                  <span className="text-[12px] text-[var(--text-disabled)] ml-auto">
                    {awayLineup.formation}
                  </span>
                </div>

                <div className="flex flex-col">
                  {awayLineup.starting.map((player) => (
                    <div key={player.number} className="flex items-center gap-[10px] px-[12px] py-[7px] border-b border-[var(--bg-card-header)] last:border-b-0">
                      <span className="w-[22px] font-semibold text-[12px] tracking-[-0.3px] text-[var(--text-disabled)] text-center">
                        {player.number}
                      </span>
                      <span className="font-normal text-[13px] tracking-[-0.3px] text-[var(--text-primary)]">
                        {player.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-[12px]">
                  <div className="px-[12px] py-[6px]">
                    <span className="text-[11px] font-semibold tracking-[-0.3px] text-[var(--text-disabled)] uppercase">
                      Substitutes
                    </span>
                  </div>
                  <div className="flex flex-col">
                    {awayLineup.substitutes.map((player) => (
                      <div key={player.number} className="flex items-center gap-[10px] px-[12px] py-[7px] border-b border-[var(--bg-card-header)] last:border-b-0">
                        <span className="w-[22px] font-semibold text-[12px] tracking-[-0.3px] text-[var(--text-disabled)] text-center">
                          {player.number}
                        </span>
                        <span className="font-normal text-[13px] tracking-[-0.3px] text-[var(--text-subtle)]">
                          {player.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
