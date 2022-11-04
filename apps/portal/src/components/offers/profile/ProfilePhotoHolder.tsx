type ProfilePhotoHolderProps = Readonly<{
  size?: 'lg' | 'sm' | 'xs';
}>;

export default function ProfilePhotoHolder({
  size = 'lg',
}: ProfilePhotoHolderProps) {
  const sizeMap = { lg: '16', sm: '12', xs: '10' };
  return (
    <span
      className={`inline-block h-${sizeMap[size]} w-${sizeMap[size]} overflow-hidden rounded-full bg-slate-100`}>
      <svg
        className="h-full w-full text-slate-300"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
}
