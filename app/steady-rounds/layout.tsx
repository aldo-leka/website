import { AppNavigation } from "@/components/AppNavigation";

export default function RoundsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavigation app="steadyRounds" />
      {children}
    </>
  );
}
