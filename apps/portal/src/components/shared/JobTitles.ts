export const JobTitleLabels = {
  'ai-ml-engineer': 'AI/ML Engineer',
  'algorithms-engineer': 'Algorithms Engineer',
  'android-engineer': 'Android Software Engineer',
  'applications-engineer': 'Applications Engineer',
  'back-end-engineer': 'Back End Engineer',
  'business-engineer': 'Business Engineer',
  'data-engineer': 'Data Engineer',
  'devops-engineer': 'DevOps Engineer',
  'enterprise-engineer': 'Enterprise Engineer',
  'front-end-engineer': 'Front End Engineer',
  'hardware-engineer': 'Hardware Engineer',
  'ios-engineer': 'iOS Software Engineer',
  'mobile-engineer': 'Mobile Software Engineer (iOS + Android)',
  'networks-engineer': 'Networks Engineer',
  'partner-engineer': 'Partner Engineer',
  'production-engineer': 'Production Engineer',
  'research-engineer': 'Research Engineer',
  'sales-engineer': 'Sales Engineer',
  'security-engineer': 'Security Engineer',
  'site-reliability-engineer': 'Site Reliability Engineer (SRE)',
  'software-engineer': 'Software Engineer',
  'systems-engineer': 'Systems Engineer',
  'test-engineer': 'QA/Test Engineer (SDET)',
};

export type JobTitleType = keyof typeof JobTitleLabels;

export function getLabelForJobTitleType(jobTitle: JobTitleType): string {
  return JobTitleLabels[jobTitle];
}
