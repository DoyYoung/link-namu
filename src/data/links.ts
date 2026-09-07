export type LinkItem = {
  id: string;
  label: string;
  url: string;
};

export const profile = {
  name: "김도영",
  bio: "",
};

export const links: LinkItem[] = [
  { id: "cal", label: "cal", url: "/cal.html" },
  { id: "link-2", label: "링크 2", url: "#" },
  { id: "link-3", label: "링크 3", url: "#" },
];
