import { WhopApp } from "@whop/react/components";

export default function WhopDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WhopApp accentColor="blue" appearance="inherit">
      {children}
    </WhopApp>
  );
}
