import { AppNavigation } from "@/components/AppNavigation";

export default function ArmrestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavigation app="armrest" />
      {children}
    </>
  );
}
