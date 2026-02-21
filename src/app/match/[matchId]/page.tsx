import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { MatchDetail } from "@/components/MatchDetail";
import type { MatchDetailProps } from "@/components/MatchDetail";

const matchData: Record<string, MatchDetailProps> = {
  "man-united-vs-west-ham": {
    homeTeam: "Man United",
    homeTeamLogo: "/teams/man-united.svg",
    awayTeam: "West Ham",
    awayTeamLogo: "/teams/west-ham.svg",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    date: "Sun, May 11th",
    time: "3:15 PM",
    stadium: "Old Trafford",
    stats: [
      { label: "Ball Possession", homeValue: 58, awayValue: 42, isPossession: true },
      { label: "Expected Goals", homeValue: 1.8, awayValue: 1.2 },
      { label: "Total Shots", homeValue: 14, awayValue: 9 },
      { label: "Shots on Target", homeValue: 6, awayValue: 3 },
      { label: "Blocked Shots", homeValue: 3, awayValue: 4 },
      { label: "Fouls Committed", homeValue: 11, awayValue: 13 },
      { label: "Offsides", homeValue: 2, awayValue: 3 },
      { label: "Corners", homeValue: 7, awayValue: 4 },
    ],
    predictions: {
      total: 1247,
      homeWin: 687,
      draw: 248,
      awayWin: 312,
    },
    events: [
      { minute: 12, type: "goal", player: "B. Fernandes", team: "home" },
      { minute: 23, type: "yellow_card", player: "K. Phillips", team: "away" },
      { minute: 38, type: "goal", player: "M. Antonio", team: "away" },
      { minute: 45, type: "yellow_card", player: "L. Martinez", team: "home" },
      { minute: 56, type: "substitution", player: "A. Garnacho", playerOut: "Antony", team: "home" },
      { minute: 67, type: "goal", player: "R. Hojlund", team: "home" },
      { minute: 72, type: "substitution", player: "D. Ings", playerOut: "M. Antonio", team: "away" },
      { minute: 81, type: "yellow_card", player: "Casemiro", team: "home" },
      { minute: 88, type: "red_card", player: "K. Phillips", team: "away" },
    ],
    homeLineup: {
      formation: "4-2-3-1",
      starting: [
        { number: 1, name: "A. Onana" },
        { number: 20, name: "D. Dalot" },
        { number: 6, name: "L. Martinez" },
        { number: 5, name: "H. Maguire" },
        { number: 23, name: "L. Shaw" },
        { number: 18, name: "Casemiro" },
        { number: 4, name: "S. Amrabat" },
        { number: 10, name: "M. Rashford" },
        { number: 8, name: "B. Fernandes" },
        { number: 17, name: "Antony" },
        { number: 9, name: "R. Hojlund" },
      ],
      substitutes: [
        { number: 22, name: "T. Heaton" },
        { number: 49, name: "A. Garnacho" },
        { number: 39, name: "S. McTominay" },
        { number: 14, name: "C. Eriksen" },
        { number: 12, name: "T. Malacia" },
      ],
    },
    awayLineup: {
      formation: "4-2-3-1",
      starting: [
        { number: 1, name: "A. Areola" },
        { number: 2, name: "B. Johnson" },
        { number: 4, name: "K. Zouma" },
        { number: 27, name: "N. Aguerd" },
        { number: 3, name: "A. Cresswell" },
        { number: 28, name: "T. Soucek" },
        { number: 41, name: "D. Rice" },
        { number: 7, name: "J. Bowen" },
        { number: 20, name: "J. Maddison" },
        { number: 11, name: "S. Benrahma" },
        { number: 9, name: "M. Antonio" },
      ],
      substitutes: [
        { number: 13, name: "L. Fabianski" },
        { number: 18, name: "D. Ings" },
        { number: 8, name: "K. Phillips" },
        { number: 31, name: "B. Mavropanos" },
        { number: 15, name: "K. Mavropanos" },
      ],
    },
  },
  "tottenham-vs-crystal-palace": {
    homeTeam: "Tottenham",
    homeTeamLogo: "/teams/tottenham.svg",
    awayTeam: "Crystal Palace",
    awayTeamLogo: "/teams/crystal-palace.svg",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    date: "Sun, May 11th",
    time: "3:15 PM",
    stadium: "Tottenham Hotspur Stadium",
    stats: [
      { label: "Ball Possession", homeValue: 62, awayValue: 38, isPossession: true },
      { label: "Expected Goals", homeValue: 2.1, awayValue: 0.9 },
      { label: "Total Shots", homeValue: 16, awayValue: 7 },
      { label: "Shots on Target", homeValue: 7, awayValue: 2 },
      { label: "Blocked Shots", homeValue: 4, awayValue: 3 },
      { label: "Fouls Committed", homeValue: 9, awayValue: 14 },
      { label: "Offsides", homeValue: 1, awayValue: 4 },
      { label: "Corners", homeValue: 8, awayValue: 3 },
    ],
    predictions: {
      total: 983,
      homeWin: 541,
      draw: 196,
      awayWin: 246,
    },
    events: [
      { minute: 8, type: "goal", player: "H. Son", team: "home" },
      { minute: 19, type: "yellow_card", player: "J. Schlupp", team: "away" },
      { minute: 34, type: "goal", player: "J. Maddison", team: "home" },
      { minute: 52, type: "goal", player: "J. Mateta", team: "away" },
      { minute: 61, type: "substitution", player: "D. Kulusevski", playerOut: "R. Sessegnon", team: "home" },
      { minute: 75, type: "yellow_card", player: "P. Sarr", team: "home" },
      { minute: 82, type: "goal", player: "R. Richarlison", team: "home" },
    ],
    homeLineup: {
      formation: "4-3-3",
      starting: [
        { number: 1, name: "G. Vicario" },
        { number: 23, name: "P. Porro" },
        { number: 17, name: "C. Romero" },
        { number: 6, name: "M. van de Ven" },
        { number: 3, name: "D. Udogie" },
        { number: 5, name: "P. Sarr" },
        { number: 29, name: "P. Bissouma" },
        { number: 10, name: "J. Maddison" },
        { number: 21, name: "D. Kulusevski" },
        { number: 7, name: "H. Son" },
        { number: 9, name: "R. Richarlison" },
      ],
      substitutes: [
        { number: 20, name: "F. Forster" },
        { number: 38, name: "R. Sessegnon" },
        { number: 14, name: "I. Perisic" },
        { number: 8, name: "Y. Bissouma" },
        { number: 27, name: "L. Bergvall" },
      ],
    },
    awayLineup: {
      formation: "4-3-3",
      starting: [
        { number: 1, name: "S. Johnstone" },
        { number: 2, name: "J. Ward" },
        { number: 6, name: "M. Guehi" },
        { number: 16, name: "J. Andersen" },
        { number: 3, name: "T. Mitchell" },
        { number: 15, name: "J. Schlupp" },
        { number: 28, name: "C. Doucoure" },
        { number: 8, name: "A. Wharton" },
        { number: 7, name: "M. Olise" },
        { number: 9, name: "J. Mateta" },
        { number: 11, name: "W. Zaha" },
      ],
      substitutes: [
        { number: 13, name: "R. Matthews" },
        { number: 17, name: "N. Clyne" },
        { number: 10, name: "E. Eze" },
        { number: 14, name: "J. Lerma" },
        { number: 20, name: "A. Ayew" },
      ],
    },
  },
  "nottingham-forest-vs-leicester": {
    homeTeam: "Nottingham Forest",
    homeTeamLogo: "/teams/nottingham-forest.svg",
    awayTeam: "Leicester",
    awayTeamLogo: "/teams/leicester.svg",
    leagueLogo: "/leagues/premier-league.svg",
    leagueName: "Premier League",
    date: "Sun, May 11th",
    time: "3:15 PM",
    stadium: "The City Ground",
    stats: [
      { label: "Ball Possession", homeValue: 45, awayValue: 55, isPossession: true },
      { label: "Expected Goals", homeValue: 1.5, awayValue: 1.7 },
      { label: "Total Shots", homeValue: 11, awayValue: 13 },
      { label: "Shots on Target", homeValue: 4, awayValue: 5 },
      { label: "Blocked Shots", homeValue: 5, awayValue: 2 },
      { label: "Fouls Committed", homeValue: 12, awayValue: 10 },
      { label: "Offsides", homeValue: 3, awayValue: 1 },
      { label: "Corners", homeValue: 5, awayValue: 6 },
    ],
    predictions: {
      total: 756,
      homeWin: 302,
      draw: 189,
      awayWin: 265,
    },
    events: [
      { minute: 15, type: "yellow_card", player: "W. Boly", team: "home" },
      { minute: 29, type: "goal", player: "J. Vardy", team: "away" },
      { minute: 41, type: "goal", player: "C. Hudson-Odoi", team: "home" },
      { minute: 55, type: "substitution", player: "H. Barnes", playerOut: "K. Dewsbury-Hall", team: "away" },
      { minute: 63, type: "yellow_card", player: "J. Vardy", team: "away" },
      { minute: 70, type: "goal", player: "M. Gibbs-White", team: "home" },
      { minute: 78, type: "substitution", player: "E. Dennis", playerOut: "T. Awoniyi", team: "home" },
      { minute: 85, type: "yellow_card", player: "R. Yates", team: "home" },
    ],
    homeLineup: {
      formation: "4-2-3-1",
      starting: [
        { number: 1, name: "M. Sels" },
        { number: 2, name: "N. Williams" },
        { number: 4, name: "M. Moussa Niakhate" },
        { number: 3, name: "W. Boly" },
        { number: 15, name: "H. Toffolo" },
        { number: 22, name: "R. Yates" },
        { number: 8, name: "D. Sangare" },
        { number: 10, name: "M. Gibbs-White" },
        { number: 11, name: "C. Hudson-Odoi" },
        { number: 20, name: "B. Johnson" },
        { number: 9, name: "T. Awoniyi" },
      ],
      substitutes: [
        { number: 26, name: "C. Hennessey" },
        { number: 7, name: "N. Elanga" },
        { number: 14, name: "E. Dennis" },
        { number: 19, name: "O. Mangala" },
        { number: 23, name: "J. Worrall" },
      ],
    },
    awayLineup: {
      formation: "4-1-4-1",
      starting: [
        { number: 1, name: "D. Ward" },
        { number: 2, name: "J. Justin" },
        { number: 6, name: "J. Evans" },
        { number: 3, name: "W. Faes" },
        { number: 15, name: "L. Thomas" },
        { number: 24, name: "N. Mendy" },
        { number: 10, name: "J. Maddison" },
        { number: 22, name: "K. Dewsbury-Hall" },
        { number: 7, name: "H. Barnes" },
        { number: 11, name: "M. Albrighton" },
        { number: 9, name: "J. Vardy" },
      ],
      substitutes: [
        { number: 12, name: "D. Iversen" },
        { number: 8, name: "Y. Tielemans" },
        { number: 14, name: "K. Iheanacho" },
        { number: 20, name: "P. Daka" },
        { number: 27, name: "T. Castagne" },
      ],
    },
  },
};

export default async function MatchPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  const match = matchData[matchId];

  if (!match) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto bg-[var(--bg-page)]">
          <TopBar />
          <div className="px-[10px] pt-[50px] flex items-center justify-center">
            <span className="text-[16px] text-[var(--text-disabled)]">Match not found</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-[var(--bg-page)]">
        <TopBar />
        <MatchDetail {...match} />
      </main>
    </div>
  );
}
