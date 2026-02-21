import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { MatchCard } from "@/components/MatchCard";

const matches = [
  {
    id: "man-united-vs-west-ham",
    date: "Sun May 11, 15:15",
    status: "Upcoming",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    homeTeam: "Man United",
    homeTeamLogo: "/teams/man-united.svg",
    awayTeam: "West Ham",
    awayTeamLogo: "/teams/west-ham.svg",
  },
  {
    id: "tottenham-vs-crystal-palace",
    date: "Sun May 11, 15:15",
    status: "Upcoming",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    homeTeam: "Tottenham",
    homeTeamLogo: "/teams/tottenham.svg",
    awayTeam: "Crystal Palace",
    awayTeamLogo: "/teams/crystal-palace.svg",
  },
  {
    id: "nottingham-forest-vs-leicester",
    date: "Sun May 11, 15:15",
    status: "Upcoming",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    homeTeam: "Nottingham Forest",
    homeTeamLogo: "/teams/nottingham-forest.svg",
    awayTeam: "Leicester",
    awayTeamLogo: "/teams/leicester.svg",
  },
];

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-[var(--bg-page)]">
        <TopBar />
        <div className="px-[10px] pt-[10px]">
          <div className="bg-[var(--bg-card)] rounded-[20px]">
            <div className="flex items-center px-[15px] py-[7.25px] bg-[var(--bg-card-header)] rounded-t-[20px]">
              <span className="font-[family-name:var(--font-display)] font-semibold text-[16.7px] leading-[25px] text-[var(--text-primary-white)] tracking-[-0.3px]">
                Upcoming Matches
              </span>
            </div>
            <div className="px-[10px] pt-[5px] pb-6">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {matches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
