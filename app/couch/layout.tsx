import { AppNavigation } from "@/components/AppNavigation";

export default function CouchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavigation app="couch" />
      {children}
    </>
  );
}
