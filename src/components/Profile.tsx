type ProfileProps = {
  name: string;
  bio?: string;
  photoUrl?: string;
};

export default function Profile({ name, bio, photoUrl }: ProfileProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 h-24 w-24 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500 dark:text-neutral-400">
            프로필 사진
          </div>
        )}
      </div>
      <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">{name}</h1>
      {bio ? (
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{bio}</p>
      ) : null}
    </div>
  );
}
