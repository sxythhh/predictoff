import Image from "next/image";

const leagues = [
  { name: "Nedbank Cup", logo: "/leagues/nedbank-cup.svg" },
  { name: "Premier League", logo: "/leagues/premier-league.svg" },
  { name: "Liga Portugal", logo: "/leagues/liga-portugal.svg" },
  { name: "La Liga", logo: "/leagues/la-liga.svg" },
  { name: "Serie A", logo: "/leagues/serie-a.svg" },
];

export function LeagueList() {
  return (
    <div className="w-[320px] min-w-[320px] px-[10px]">
      <div className="w-[300px] max-w-[300px] h-[286px] bg-[var(--bg-card)] rounded-[20px] flex flex-col relative">
        {/* Overlay+Shadow */}
        <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px] z-0" />

        {/* Header */}
        <div className="flex items-center px-[15px] py-[5px] h-[30px] bg-[var(--bg-card-header)] rounded-t-[20px] z-[1]">
          <span className="font-normal text-[12.9px] leading-[20px] text-[var(--text-primary-white)]">
            Top Leagues
          </span>
        </div>

        {/* League rows */}
        <div className="flex-1 overflow-y-auto min-h-[232px] z-[2]">
          {leagues.map((league) => (
            <button
              key={league.name}
              className="flex items-center w-full px-[15px] py-[7px] hover:bg-[var(--overlay-hover-subtle)] transition-colors"
            >
              <div className="flex items-center pr-[5px]">
                <div className="w-[22px] min-w-[22px] max-w-[22px] h-[22px] rounded-[4px]">
                  <Image
                    src={league.logo}
                    alt={league.name}
                    width={22}
                    height={22}
                    className="rounded-[4px]"
                  />
                </div>
              </div>
              <span className="font-normal text-[11px] leading-[17px] text-[var(--text-primary-white)]">
                {league.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
