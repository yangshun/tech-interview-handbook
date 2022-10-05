import Head from 'next/head';
import { useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { Button, Select, TextInput } from '@tih/ui';

const TITLE_PLACEHOLDER =
  'e.g. Applying for Company XYZ, please help me to review!';
const ADDITIONAL_INFO_PLACEHOLDER = `e.g. I’m applying for company XYZ. I have been resume-rejected by N companies that I have applied for. Please help me to review so company XYZ gives me an interview!`;
const MAX_FILE_SIZE_LIMIT = 10485760;

export default function SubmitResumeForm() {
  const roleItems = [
    {
      label: 'Frontend Engineer',
      value: 'Frontend Engineer',
    },
    {
      label: 'Full-Stack Engineer',
      value: 'Full-Stack Engineer',
    },
    {
      label: 'Backend Engineer',
      value: 'Backend Engineer',
    },
  ];

  const experienceItems = [
    {
      label: 'Fresh Graduate (0 - 1 years)',
      value: 'Fresh Graduate (0 - 1 years)',
    },
    {
      label: 'Mid',
      value: 'Mid',
    },
    {
      label: 'Senior',
      value: 'Senior',
    },
  ];

  const locationItems = [
    {
      label: 'United States',
      value: 'United States',
    },
    {
      label: 'Singapore',
      value: 'Singapore',
    },
    {
      label: 'India',
      value: 'India',
    },
  ];

  const [title, setTitle] = useState('');
  const [role, setRole] = useState(roleItems[0].label);
  const [experience, setExperience] = useState(experienceItems[0].label);
  const [location, setLocation] = useState(locationItems[0].label);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file == null) {
      return;
    }
    if (file.type !== 'application/pdf' || file.size > MAX_FILE_SIZE_LIMIT) {
      return;
    }
    setResumeFile(file);
  };

  return (
    <>
      <Head>
        <title>Upload a resume</title>
      </Head>
      <main className="flex-1 overflow-y-auto">
        <section
          aria-labelledby="primary-heading"
          className="flex h-full min-w-0 flex-1 flex-col lg:order-last">
          <div className="mx-20 space-y-4 py-8">
            <form>
              <h1 className="mb-4 text-2xl font-bold">Upload a resume</h1>
              <div className="mb-4">
                <TextInput
                  id="title"
                  label="Title"
                  name="title"
                  placeholder={TITLE_PLACEHOLDER}
                  value={title}
                  onChange={setTitle}
                />
              </div>
              <div className="mb-4">
                <Select
                  label="Role"
                  name="role"
                  options={roleItems}
                  value={role}
                  onChange={setRole}
                />
              </div>
              <div className="mb-4">
                <Select
                  label="Experience Level"
                  name="experience"
                  options={experienceItems}
                  value={experience}
                  onChange={setExperience}
                />
              </div>
              <div className="mb-4">
                <Select
                  label="Location"
                  name="experience"
                  options={locationItems}
                  value={location}
                  onChange={setLocation}
                />
              </div>
              <p className="text-sm font-medium text-slate-700">
                Upload resume (PDF format)
              </p>
              <div className="mb-4 mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <div className="flex gap-2">
                    <PaperClipIcon className="m-auto h-8 w-8 text-gray-600" />
                    {resumeFile && <p>{resumeFile.name}</p>}
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      htmlFor="file-upload">
                      <span>Upload a file</span>
                      <input
                        className="sr-only"
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        onChange={onUploadFile}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                </div>
              </div>

              <p className="mb-2 text-sm font-medium text-slate-700">
                Additional Information
              </p>
              <textarea
                className="w-full rounded-md placeholder:text-slate-400"
                name="additonal_information"
                placeholder={ADDITIONAL_INFO_PLACEHOLDER}
              />
              <Button
                addonPosition="start"
                display="inline"
                label="Click Me"
                size="md"
                type="submit"
                variant="primary"
              />
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
