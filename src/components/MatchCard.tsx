"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MatchCardProps {
  id: string;
  date: string;
  status: string;
  leagueLogo: string;
  leagueName: string;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
}

type PickType = "home" | "draw" | "away" | null;

export function MatchCard({
  id,
  date,
  status,
  leagueLogo,
  leagueName,
  homeTeam,
  homeTeamLogo,
  awayTeam,
  awayTeamLogo,
}: MatchCardProps) {
  const [selectedPick, setSelectedPick] = useState<PickType>(null);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/match/${id}`)}
      className="w-[400px] min-w-[400px] h-[292.39px] bg-[var(--bg-card-inner)] rounded-[20px] relative flex-shrink-0 flex-grow cursor-pointer">
      {/* Header: Date + Status Badge */}
      <div className="absolute left-4 right-4 top-4">
        <div className="flex items-center justify-between pb-3">
          <span className="font-semibold text-sm leading-5 tracking-[-0.3px] text-[var(--text-label)]">
            {date}
          </span>
          <div className="flex items-center px-2 py-1 bg-[var(--bg-badge)]/90 rounded-full">
            <span className="font-semibold text-xs leading-[17px] text-[var(--text-primary-white)]">
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* League badge */}
      <div className="absolute left-4 right-4 top-[52.79px] flex justify-center items-center">
        <div className="flex items-center">
          <div className="w-[25px] h-[25px] rounded mr-[2px]">
            <Image
              src={leagueLogo}
              alt={leagueName}
              width={25}
              height={25}
              className="rounded"
            />
          </div>
          <span className="font-normal text-[12.5px] leading-[18px] tracking-[-0.3px] text-[var(--text-label)] text-center">
            {leagueName}
          </span>
        </div>
      </div>

      {/* Teams */}
      <div className="absolute left-4 right-4 top-[77.79px]">
        <div className="flex items-center justify-between pb-4">
          {/* Home Team */}
          <div className="flex flex-col items-center w-[146px]">
            <div className="pb-2">
              <div className="w-11 h-11 rounded">
                <Image
                  src={homeTeamLogo}
                  alt={homeTeam}
                  width={44}
                  height={44}
                  className="rounded"
                />
              </div>
            </div>
            <span className="font-[family-name:var(--font-display)] font-semibold text-[15px] leading-6 text-[var(--text-primary)] text-center tracking-[-0.3px]">
              {homeTeam}
            </span>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center w-[54px]">
            <span className="font-[family-name:var(--font-display)] font-bold text-[13px] leading-5 tracking-[-0.8px] text-[var(--text-subtle)] text-center">
              VS
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center w-[146px]">
            <div className="pb-2">
              <div className="w-11 h-11 rounded">
                <Image
                  src={awayTeamLogo}
                  alt={awayTeam}
                  width={44}
                  height={44}
                  className="rounded"
                />
              </div>
            </div>
            <span className="font-[family-name:var(--font-display)] font-semibold text-[15px] leading-6 text-[var(--text-primary)] text-center tracking-[-0.3px]">
              {awayTeam}
            </span>
          </div>
        </div>
      </div>

      {/* Pick Section */}
      <div className="absolute left-4 right-4 top-[169.79px]">
        {/* Pick Header */}
        <div className="flex items-center justify-between pb-1">
          <span className="font-medium text-[12.9px] leading-5 text-[var(--text-dim)]">
            Select Your Pick
          </span>
          <span className="font-medium text-[12.7px] leading-5 text-[var(--text-primary-white)]">
            View All
          </span>
        </div>

        {/* Pick Buttons */}
        <div className="flex gap-2 mt-[13.6px]">
          {(["home", "draw", "away"] as const).map((pick) => (
            <button
              key={pick}
              onClick={(e) => { e.stopPropagation(); setSelectedPick(pick === selectedPick ? null : pick); }}
              className={`flex-1 h-10 flex items-center justify-center rounded-md transition-colors ${
                selectedPick === pick
                  ? "bg-[var(--accent-green)]/30 border border-[var(--accent-green-border)]"
                  : "bg-[var(--bg-input)] hover:bg-[var(--bg-interactive)]"
              }`}
            >
              <span className="font-medium text-[13px] leading-[21px] tracking-[-0.3px] text-[var(--text-muted)] text-center">
                {pick === "home" ? "Home Win" : pick === "draw" ? "Draw" : "Away Win"}
              </span>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-[10px]">
          <button onClick={(e) => e.stopPropagation()} className="w-full h-[33px] flex items-center justify-center bg-[var(--accent-green)]/30 border-t border-[var(--accent-green-border)] rounded-[10px]">
            <span className="font-bold text-[13px] leading-[18px] tracking-[-0.5px] text-[var(--text-primary-white)]">
              Submit
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
