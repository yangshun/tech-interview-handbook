type JobTitleData = Record<
  string,
  Readonly<{
    label: string;
    ranking: number;
  }>
>;

export const JobTitleLabels: JobTitleData = {
  'ai-engineer': { label: 'Artificial Intelligence (AI) Engineer', ranking: 5 },
  'algorithms-engineer': { label: 'Algorithms Engineer', ranking: 0 },
  'android-engineer': { label: 'Android Software Engineer', ranking: 8 },
  'applications-engineer': { label: 'Applications Engineer', ranking: 0 },
  'back-end-engineer': { label: 'Back End Engineer', ranking: 9 },
  'business-analyst': { label: 'Business Analyst', ranking: 0 },
  'business-engineer': { label: 'Business Engineer', ranking: 5 },
  'capacity-engineer': { label: 'Capacity Engineer', ranking: 0 },
  'customer-engineer': { label: 'Customer Engineer', ranking: 0 },
  'data-analyst': { label: 'Data Analyst', ranking: 0 },
  'data-engineer': { label: 'Data Engineer', ranking: 0 },
  'data-scientist': { label: 'Data Scientist', ranking: 5 },
  'devops-engineer': { label: 'DevOps Engineer', ranking: 0 },
  'engineering-director': { label: 'Engineering Director', ranking: 0 },
  'engineering-manager': { label: 'Engineering Manager', ranking: 0 },
  'enterprise-engineer': { label: 'Enterprise Engineer', ranking: 0 },
  'forward-deployed-engineer': {
    label: 'Forward Deployed Engineer (FDE)',
    ranking: 0,
  },
  'front-end-engineer': { label: 'Front End Engineer', ranking: 9 },
  'full-stack-engineer': { label: 'Full Stack Engineer', ranking: 9 },
  'gameplay-engineer': { label: 'Gameplay Engineer', ranking: 0 },
  'hardware-engineer': { label: 'Hardware Engineer', ranking: 0 },
  'infrastructure-engineer': { label: 'Infrastructure Engineer', ranking: 0 },
  'ios-engineer': { label: 'iOS Software Engineer', ranking: 0 },
  'machine-learning-engineer': {
    label: 'Machine Learning (ML) Engineer',
    ranking: 5,
  },
  'machine-learning-researcher': {
    label: 'Machine Learning (ML) Researcher',
    ranking: 0,
  },
  'mobile-engineer': {
    label: 'Mobile Software Engineer (iOS + Android)',
    ranking: 8,
  },
  'networks-engineer': { label: 'Networks Engineer', ranking: 0 },
  'partner-engineer': { label: 'Partner Engineer', ranking: 0 },
  'product-engineer': { label: 'Product Engineer', ranking: 7 },
  'product-manager': { label: 'Product Manager', ranking: 0 },
  'production-engineer': { label: 'Production Engineer', ranking: 8 },
  'project-manager': { label: 'Project Manager', ranking: 0 },
  'release-engineer': { label: 'Release Engineer', ranking: 0 },
  'research-engineer': { label: 'Research Engineer', ranking: 6 },
  'research-scientist': { label: 'Research Scientist', ranking: 7 },
  'rotational-engineer': { label: 'Rotational Engineer', ranking: 0 },
  'sales-engineer': { label: 'Sales Engineer', ranking: 0 },
  'security-engineer': { label: 'Security Engineer', ranking: 7 },
  'site-reliability-engineer': {
    label: 'Site Reliability Engineer (SRE)',
    ranking: 8,
  },
  'software-engineer': { label: 'Software Engineer', ranking: 10 },
  'solutions-architect': { label: 'Solutions Architect', ranking: 0 },
  'solutions-engineer': { label: 'Solutions Engineer', ranking: 0 },
  'systems-analyst': { label: 'Systems Analyst', ranking: 0 },
  'systems-engineer': { label: 'Systems Engineer', ranking: 0 },
  'tech-ops-engineer': { label: 'Tech Ops Engineer', ranking: 0 },
  'technical-program-manager': {
    label: 'Technical Program Manager',
    ranking: 0,
  },
  'test-engineer': { label: 'QA/Test Engineer (SDET)', ranking: 6 },
  'ux-engineer': { label: 'User Experience (UX) Engineer', ranking: 0 },
};

export type JobTitleType = keyof typeof JobTitleLabels;

export function getLabelForJobTitleType(jobTitle: JobTitleType): string {
  return JobTitleLabels[jobTitle]?.label ?? '';
}
