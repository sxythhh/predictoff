"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { User, Bell, Shield, Palette, LogOut } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-[36px] h-[20px] rounded-full transition-colors flex-shrink-0 ${
        enabled ? "bg-[var(--accent-green)]" : "bg-[var(--bg-interactive)]"
      }`}
    >
      <div
        className={`w-[16px] h-[16px] rounded-full bg-white transition-transform mx-[2px] ${
          enabled ? "translate-x-[16px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}

const settingsSections = ["Profile", "Notifications", "Privacy", "Appearance"] as const;

function sectionIcon(section: typeof settingsSections[number]) {
  switch (section) {
    case "Profile": return <User size={16} className="text-[var(--text-disabled)]" />;
    case "Notifications": return <Bell size={16} className="text-[var(--text-disabled)]" />;
    case "Privacy": return <Shield size={16} className="text-[var(--text-disabled)]" />;
    case "Appearance": return <Palette size={16} className="text-[var(--text-disabled)]" />;
  }
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<typeof settingsSections[number]>("Profile");
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    matchStart: true,
    predictionResults: true,
    leagueUpdates: false,
    promotions: false,
  });
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showPicks: true,
    showStats: false,
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-[var(--bg-page)]">
        <TopBar />
        <div className="px-[10px] pt-[10px]">
          <div className="flex gap-[10px]">
            {/* Settings nav */}
            <div className="w-[220px] min-w-[220px]">
              <div className="bg-[var(--bg-card)] rounded-[20px] relative">
                <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px] z-0" />
                <div className="relative z-[1] flex flex-col py-[6px]">
                  {settingsSections.map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`flex items-center gap-[10px] px-[15px] py-[9px] transition-colors ${
                        activeSection === section
                          ? "bg-[var(--overlay-hover-strong)]"
                          : "hover:bg-[var(--overlay-hover)]"
                      }`}
                    >
                      {sectionIcon(section)}
                      <span className={`text-[13px] tracking-[-0.3px] ${
                        activeSection === section ? "text-[var(--text-primary-white)] font-medium" : "text-[var(--text-subtle)]"
                      }`}>
                        {section}
                      </span>
                    </button>
                  ))}

                  <div className="h-px bg-[var(--bg-card-header)] mx-[15px] my-[4px]" />

                  <button className="flex items-center gap-[10px] px-[15px] py-[9px] hover:bg-[var(--overlay-hover)] transition-colors">
                    <LogOut size={16} className="text-[var(--accent-red)]" />
                    <span className="text-[13px] tracking-[-0.3px] text-[var(--accent-red)]">Log Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Settings content */}
            <div className="flex-1 bg-[var(--bg-card)] rounded-[20px] relative">
              <div className="absolute inset-0 bg-[var(--overlay-white)] shadow-[var(--shadow-card)] rounded-[20px] z-0" />
              <div className="relative z-[1]">
                <div className="flex items-center px-[15px] py-[7.25px] bg-[var(--bg-card-header)] rounded-t-[20px]">
                  <span className="font-[family-name:var(--font-display)] font-semibold text-[16.7px] leading-[25px] text-[var(--text-primary-white)] tracking-[-0.3px]">
                    {activeSection}
                  </span>
                </div>

                {/* Profile */}
                {activeSection === "Profile" && (
                  <div className="px-[20px] py-[20px] flex flex-col gap-[16px]">
                    {[
                      { label: "Display Name", value: "Player1" },
                      { label: "Email", value: "player1@example.com" },
                      { label: "Username", value: "@player1" },
                    ].map((field) => (
                      <div key={field.label} className="flex flex-col gap-[6px]">
                        <span className="text-[11px] font-semibold tracking-[-0.3px] text-[var(--text-disabled)] uppercase">
                          {field.label}
                        </span>
                        <div className="flex items-center justify-between px-[12px] py-[9px] bg-[var(--bg-card-header)] rounded-[10px]">
                          <span className="text-[13px] text-[var(--text-primary)]">{field.value}</span>
                          <button className="text-[12px] font-medium text-[var(--accent-green)] hover:text-[var(--accent-green-hover)] transition-colors">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex flex-col gap-[6px]">
                      <span className="text-[11px] font-semibold tracking-[-0.3px] text-[var(--text-disabled)] uppercase">
                        Member Since
                      </span>
                      <div className="px-[12px] py-[9px] bg-[var(--bg-card-header)] rounded-[10px]">
                        <span className="text-[13px] text-[var(--text-subtle)]">January 2025</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeSection === "Notifications" && (
                  <div className="px-[20px] py-[20px] flex flex-col gap-[4px]">
                    {[
                      { key: "matchStart" as const, label: "Match Start", desc: "Get notified when a match you predicted on starts" },
                      { key: "predictionResults" as const, label: "Prediction Results", desc: "Get notified when your prediction results are in" },
                      { key: "leagueUpdates" as const, label: "League Updates", desc: "Standings changes, fixtures updates" },
                      { key: "promotions" as const, label: "Promotions", desc: "Special offers and bonus opportunities" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between px-[12px] py-[12px] rounded-[10px] hover:bg-[var(--overlay-hover)] transition-colors"
                      >
                        <div className="flex flex-col gap-[2px]">
                          <span className="font-medium text-[13px] tracking-[-0.3px] text-[var(--text-primary)]">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-[var(--text-disabled)]">{item.desc}</span>
                        </div>
                        <Toggle
                          enabled={notifications[item.key]}
                          onToggle={() =>
                            setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Privacy */}
                {activeSection === "Privacy" && (
                  <div className="px-[20px] py-[20px] flex flex-col gap-[4px]">
                    {[
                      { key: "showProfile" as const, label: "Public Profile", desc: "Allow others to see your profile" },
                      { key: "showPicks" as const, label: "Show Picks", desc: "Allow others to see your prediction history" },
                      { key: "showStats" as const, label: "Show Statistics", desc: "Show your win rate and points on leaderboards" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between px-[12px] py-[12px] rounded-[10px] hover:bg-[var(--overlay-hover)] transition-colors"
                      >
                        <div className="flex flex-col gap-[2px]">
                          <span className="font-medium text-[13px] tracking-[-0.3px] text-[var(--text-primary)]">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-[var(--text-disabled)]">{item.desc}</span>
                        </div>
                        <Toggle
                          enabled={privacy[item.key]}
                          onToggle={() =>
                            setPrivacy((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Appearance */}
                {activeSection === "Appearance" && (
                  <div className="px-[20px] py-[20px] flex flex-col gap-[16px]">
                    <div className="flex flex-col gap-[6px]">
                      <span className="text-[11px] font-semibold tracking-[-0.3px] text-[var(--text-disabled)] uppercase">
                        Theme
                      </span>
                      <div className="flex gap-[8px]">
                        {(["dark", "light", "system"] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`flex-1 py-[10px] rounded-[10px] text-center text-[13px] font-medium tracking-[-0.3px] transition-colors ${
                              theme === t
                                ? "bg-[var(--accent-green)]/20 text-[var(--accent-green)] border border-[var(--accent-green)]/40"
                                : "bg-[var(--bg-card-header)] text-[var(--text-subtle)] hover:text-[var(--text-primary-white)]"
                            }`}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
