"use client";

import Image from "next/image";
import { Flame } from "lucide-react";

export function TopBar() {
  return (
    <header className="w-full h-[48px] bg-[var(--bg-sidebar)] relative flex items-center justify-between px-6">
      {/* Shadow overlay */}
      <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)]" />

      {/* Logo */}
      <div className="relative flex items-center h-full z-10">
        <div className="relative w-[152px] h-[22px]">
          <span className="absolute left-0 top-[8px] font-[family-name:var(--font-display)] italic font-bold text-[13.9px] leading-[14px] tracking-[-0.5px] text-[var(--text-primary-white)]/95">
            PLAY
          </span>
          <div className="absolute left-[39.42px] bottom-0 w-[22px] h-[22px] rounded">
            <Image
              src="/logo-icon.png"
              alt="PredictOff"
              width={22}
              height={22}
              className="rounded"
            />
          </div>
          <span className="absolute left-[61.42px] bottom-0 font-[family-name:var(--font-display)] font-bold text-[17.9px] leading-[18px] tracking-[-0.5px] text-[var(--text-primary)]/95">
            PICKOFF
          </span>
          <span className="absolute left-[137.43px] bottom-0 font-[family-name:var(--font-display)] font-bold text-[9.8px] leading-[10px] tracking-[-0.5px] text-[var(--accent-green)]">
            .IO
          </span>
        </div>
      </div>

      {/* Invite Friends Button */}
      <div className="relative flex items-center h-full z-10">
        <button className="flex items-center justify-center gap-[5px] px-[10px] py-[5px] w-[140px] h-[34px] bg-[var(--bg-button)] rounded-[30px]">
          <Flame size={16} strokeWidth={1.5} className="text-[var(--text-primary-white)]" />
          <span className="font-medium text-[12.9px] leading-[21px] tracking-[-0.3px] text-[var(--text-primary-white)] text-center">
            Invite Friends
          </span>
        </button>
      </div>
    </header>
  );
}
