"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { ArrowUpRight, ArrowDownLeft, Trophy, TrendingUp } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "winnings" | "entry_fee";
  label: string;
  description: string;
  amount: number;
  date: string;
}

const transactions: Transaction[] = [
  { id: "1", type: "winnings", label: "Prediction Winnings", description: "Man United vs West Ham", amount: 25.00, date: "May 11" },
  { id: "2", type: "entry_fee", label: "Entry Fee", description: "Tottenham vs Crystal Palace", amount: -5.00, date: "May 11" },
  { id: "3", type: "winnings", label: "Prediction Winnings", description: "Tottenham vs Crystal Palace", amount: 15.00, date: "May 11" },
  { id: "4", type: "entry_fee", label: "Entry Fee", description: "Forest vs Leicester", amount: -5.00, date: "May 11" },
  { id: "5", type: "deposit", label: "Deposit", description: "Via Card ending 4242", amount: 50.00, date: "May 10" },
  { id: "6", type: "withdrawal", label: "Withdrawal", description: "To Bank ending 8910", amount: -20.00, date: "May 8" },
  { id: "7", type: "winnings", label: "Prediction Winnings", description: "Arsenal vs Liverpool", amount: 30.00, date: "May 7" },
  { id: "8", type: "entry_fee", label: "Entry Fee", description: "Arsenal vs Liverpool", amount: -5.00, date: "May 7" },
];

const filterTabs = ["All", "Deposits", "Withdrawals", "Winnings"] as const;

function txIcon(type: Transaction["type"]) {
  switch (type) {
    case "deposit":
      return <ArrowDownLeft size={16} className="text-[var(--accent-green)]" />;
    case "withdrawal":
      return <ArrowUpRight size={16} className="text-[var(--accent-red)]" />;
    case "winnings":
      return <Trophy size={16} className="text-[var(--accent-yellow)]" />;
    case "entry_fee":
      return <TrendingUp size={16} className="text-[var(--accent-blue)]" />;
  }
}

export default function WalletPage() {
  const [activeFilter, setActiveFilter] = useState<typeof filterTabs[number]>("All");

  const balance = 135.00;
  const totalWon = transactions.filter((t) => t.type === "winnings").reduce((s, t) => s + t.amount, 0);
  const totalDeposited = transactions.filter((t) => t.type === "deposit").reduce((s, t) => s + t.amount, 0);

  const filtered = activeFilter === "All"
    ? transactions
    : transactions.filter((t) => {
        switch (activeFilter) {
          case "Deposits": return t.type === "deposit";
          case "Withdrawals": return t.type === "withdrawal";
          case "Winnings": return t.type === "winnings" || t.type === "entry_fee";
        }
      });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-[var(--bg-page)]">
        <TopBar />
        <div className="px-[10px] pt-[10px] flex flex-col gap-[10px]">
          {/* Balance card */}
          <div className="bg-[var(--bg-card)] rounded-[20px] relative">
            <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px] z-0" />
            <div className="relative z-[1] px-[20px] py-[20px] flex items-center justify-between">
              <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] text-[var(--text-disabled)]">Available Balance</span>
                <span className="font-[family-name:var(--font-display)] font-bold text-[32px] tracking-[-1px] text-[var(--text-primary)]">
                  ${balance.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-[8px]">
                <button className="flex items-center gap-[6px] px-[14px] py-[8px] bg-[var(--accent-green)] rounded-[10px] hover:bg-[var(--accent-green-hover)] transition-colors">
                  <ArrowDownLeft size={14} className="text-white" />
                  <span className="font-semibold text-[13px] tracking-[-0.3px] text-white">Deposit</span>
                </button>
                <button className="flex items-center gap-[6px] px-[14px] py-[8px] bg-[var(--bg-interactive)] rounded-[10px] hover:bg-[var(--bg-hover-alt)] transition-colors">
                  <ArrowUpRight size={14} className="text-[var(--text-primary-white)]" />
                  <span className="font-semibold text-[13px] tracking-[-0.3px] text-[var(--text-primary-white)]">Withdraw</span>
                </button>
              </div>
            </div>
          </div>

          {/* Summary stats */}
          <div className="flex gap-[10px]">
            {[
              { label: "Total Won", value: `$${totalWon.toFixed(2)}`, color: "var(--accent-green)" },
              { label: "Total Deposited", value: `$${totalDeposited.toFixed(2)}`, color: "var(--accent-blue)" },
              { label: "Pending", value: "$5.00", color: "var(--accent-yellow)" },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 bg-[var(--bg-card)] rounded-[20px] relative">
                <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px]" />
                <div className="relative px-[15px] py-[12px] flex flex-col gap-[2px]">
                  <span className="text-[11px] text-[var(--text-disabled)]">{stat.label}</span>
                  <span className="font-[family-name:var(--font-display)] font-bold text-[18px] tracking-[-0.5px]" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Transactions */}
          <div className="bg-[var(--bg-card)] rounded-[20px] relative">
            <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px] z-0" />
            <div className="relative z-[1]">
              <div className="flex items-center justify-between px-[15px] py-[7.25px] bg-[var(--bg-card-header)] rounded-t-[20px]">
                <span className="font-[family-name:var(--font-display)] font-semibold text-[16.7px] leading-[25px] text-[var(--text-primary-white)] tracking-[-0.3px]">
                  Transactions
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
                {filtered.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center gap-[12px] px-[15px] py-[10px] border-b border-[var(--bg-card-header)] last:border-b-0"
                  >
                    <div className="w-[32px] h-[32px] rounded-full bg-[var(--bg-card-header)] flex items-center justify-center flex-shrink-0">
                      {txIcon(tx.type)}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-medium text-[13px] tracking-[-0.3px] text-[var(--text-primary)] truncate">
                        {tx.label}
                      </span>
                      <span className="text-[11px] text-[var(--text-disabled)] truncate">{tx.description}</span>
                    </div>
                    <span className="text-[11px] text-[var(--text-disabled)] flex-shrink-0">{tx.date}</span>
                    <span
                      className="font-semibold text-[13px] tracking-[-0.5px] flex-shrink-0 w-[60px] text-right"
                      style={{ color: tx.amount >= 0 ? "var(--accent-green)" : "var(--accent-red)" }}
                    >
                      {tx.amount >= 0 ? "+" : ""}{tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
