import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { LeagueList } from "@/components/LeagueList";
import { DateNav } from "@/components/DateNav";
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

export default function FixturesPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-[var(--bg-page)]">
        <TopBar />
        <div className="flex px-0 pt-[10px]">
          <LeagueList />
          <div className="flex-1 flex flex-col gap-[10px]">
            <div className="px-[10px]">
              <div className="bg-[var(--bg-card)] rounded-[20px] relative">
                <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px] z-0" />
                <div className="relative z-[1]">
                  <DateNav />
                </div>
              </div>
            </div>
            <div className="px-[10px] overflow-y-auto min-h-[232px]">
              <div className="flex flex-wrap gap-4">
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
