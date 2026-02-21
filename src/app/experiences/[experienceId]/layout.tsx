import { WhopApp } from "@whop/react/components";

export default function WhopExperienceLayout({
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
