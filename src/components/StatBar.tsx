interface StatBarProps {
  label: string;
  homeValue: number;
  awayValue: number;
  homeColor?: string;
  awayColor?: string;
  isPossession?: boolean;
}

export function StatBar({
  label,
  homeValue,
  awayValue,
  homeColor = "var(--accent-green)",
  awayColor = "var(--accent-blue)",
  isPossession = false,
}: StatBarProps) {
  const total = homeValue + awayValue;
  const homePercent = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercent = total > 0 ? (awayValue / total) * 100 : 50;
  const barHeight = isPossession ? "h-[18px]" : "h-[6px]";

  return (
    <div className="flex flex-col gap-[6px]">
      {/* Label */}
      <span className="text-[12px] text-[var(--text-primary-white)] text-center">{label}</span>

      {/* Bar with values */}
      <div className="flex items-center gap-[8px]">
        {/* Home value */}
        <span className="font-semibold text-[13px] tracking-[-0.5px] text-[var(--text-primary)] w-[32px] text-right">
          {isPossession ? `${homeValue}%` : homeValue}
        </span>

        {/* Bar */}
        <div
          className={`flex-1 ${barHeight} bg-[var(--bg-divider)] rounded-[20px] overflow-hidden flex`}
        >
          <div
            className="h-full rounded-l-[20px]"
            style={{
              width: `${homePercent}%`,
              backgroundColor: homeColor,
            }}
          />
          <div className="flex-1" />
          <div
            className="h-full rounded-r-[20px]"
            style={{
              width: `${awayPercent}%`,
              backgroundColor: awayColor,
            }}
          />
        </div>

        {/* Away value */}
        <span className="font-semibold text-[13px] tracking-[-0.5px] text-[var(--text-primary)] w-[32px] text-left">
          {isPossession ? `${awayValue}%` : awayValue}
        </span>
      </div>
    </div>
  );
}
