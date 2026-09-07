import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { profile, links } from "@/data/links";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <ThemeToggle />
      <main className="flex w-full max-w-sm flex-col items-center gap-8 rounded-3xl bg-white p-8 shadow-sm dark:bg-neutral-900">
        <Profile name={profile.name} bio={profile.bio} />
        <div className="flex w-full flex-col gap-3">
          {links.map((link) => (
            <LinkCard key={link.id} {...link} />
          ))}
        </div>
      </main>
    </div>
  );
}
