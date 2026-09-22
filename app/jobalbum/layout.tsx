import { AppNavigation } from "@/components/AppNavigation";

export default function JobAlbumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavigation app="jobAlbum" />
      {children}
    </>
  );
}
