import Link from 'next/link';
import type { UrlObject } from 'url';

type ResumeInfo = Readonly<{
  createdAt: Date;
  experience: string;
  numComments: number;
  numStars: number;
  role: string;
  title: string;
  user: string;
}>;

type Props = Readonly<{
  href: UrlObject | string;
  resumeInfo: ResumeInfo;
}>;

export default function BrowseListItem({ href, resumeInfo }: Props) {
  return (
    <Link href={href}>
      {resumeInfo.title}
      {resumeInfo.role}
      {resumeInfo.experience}
      {resumeInfo.numComments}
      {resumeInfo.numStars}
    </Link>
  );
}
