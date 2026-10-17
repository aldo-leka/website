import { AppNavigation } from "@/components/AppNavigation";

export default function NightShowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavigation app="nightShow" />
      {children}
    </>
  );
}
