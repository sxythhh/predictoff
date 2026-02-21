"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Zap, Medal, CircleDot, Wallet, Settings, Sun, Moon, Monitor, LogOut, ChevronUp, User } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useAuth } from "@/context/AuthProvider";

const navItems = [
  { icon: null, label: "Home", href: "/" },
  { icon: Zap, label: "My Picks", href: "/picks" },
  { icon: Medal, label: "Leagues", href: "/leagues" },
  { icon: CircleDot, label: "Fixtures", href: "/fixtures" },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const themeOptions = [
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "system" as const, label: "System", icon: Monitor },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-[240px] min-w-[240px] h-screen bg-[var(--bg-sidebar)] flex flex-col">
      {/* Nav items */}
      <div className="flex-1 flex justify-center px-[5px] pt-[5px] pb-[20px]">
        <div className="w-full flex flex-col gap-[10px]">
          <div className="flex flex-col items-center pt-[5px]">
            <div className="w-full flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.href)}
                    className={`w-full h-[35px] flex items-center gap-1 px-[10px] rounded-lg transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-transparent to-[var(--bg-active-end)]"
                        : "hover:bg-[var(--bg-hover)]"
                    }`}
                  >
                    <div className="w-[22px] h-[22px] flex items-center justify-center">
                      {item.label === "Home" ? (
                        <Image
                          src="/logo-icon.png"
                          alt="Home"
                          width={22}
                          height={22}
                          className="rounded"
                        />
                      ) : item.icon ? (
                        <item.icon
                          size={22}
                          strokeWidth={1.375}
                          className="text-[var(--text-icon)]"
                        />
                      ) : null}
                    </div>
                    <div className="pl-[2px]">
                      <span
                        className={`text-[13px] leading-[14px] font-normal ${
                          isActive ? "text-[var(--text-primary-white)]" : "text-[var(--text-secondary)]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom menu */}
      <div className="px-[5px] pb-[5px]">
        {/* Expandable panel */}
        {menuOpen && (
          <div className="mb-[4px] bg-[var(--bg-card)] rounded-[12px] overflow-hidden">
            {/* Theme selector */}
            <div className="px-[10px] py-[8px]">
              <span className="text-[10px] font-semibold tracking-[0.5px] text-[var(--text-disabled)] uppercase">
                Theme
              </span>
              <div className="flex gap-[4px] mt-[6px]">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`flex-1 flex items-center justify-center gap-[4px] py-[6px] rounded-[8px] text-[11px] font-medium tracking-[-0.3px] transition-colors ${
                      theme === opt.value
                        ? "bg-[var(--accent-green)]/20 text-[var(--accent-green)]"
                        : "bg-[var(--bg-card-header)] text-[var(--text-subtle)] hover:text-[var(--text-primary-white)]"
                    }`}
                  >
                    <opt.icon size={12} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--bg-divider)] mx-[10px]" />

            {/* Logout */}
            <button onClick={logout} className="w-full flex items-center gap-[8px] px-[10px] py-[8px] hover:bg-[var(--overlay-hover)] transition-colors">
              <LogOut size={14} className="text-[var(--accent-red)]" />
              <span className="text-[12px] text-[var(--accent-red)]">Log Out</span>
            </button>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full flex items-center gap-[8px] px-[10px] py-[8px] rounded-[10px] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <div className="w-[28px] h-[28px] rounded-full bg-[var(--bg-interactive)] flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-[var(--text-subtle)]" />
          </div>
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-[12px] font-medium text-[var(--text-primary)] truncate">Player1</span>
            <span className="text-[10px] text-[var(--text-disabled)]">@player1</span>
          </div>
          <ChevronUp
            size={14}
            className={`text-[var(--text-disabled)] transition-transform ${menuOpen ? "" : "rotate-180"}`}
          />
        </button>
      </div>
    </nav>
  );
}
