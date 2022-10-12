import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { Button, CheckboxInput, Select, TextArea, TextInput } from '@tih/ui';

import {
  EXPERIENCE,
  LOCATION,
  ROLES,
} from '~/components/resumes/browse/resumeConstants';

import { RESUME_STORAGE_KEY } from '~/constants/file-storage-keys';
import { trpc } from '~/utils/trpc';

const FILE_SIZE_LIMIT_MB = 3;
const FILE_SIZE_LIMIT_BYTES = FILE_SIZE_LIMIT_MB * 1000000;

const TITLE_PLACEHOLDER =
  'e.g. Applying for Company XYZ, please help me to review!';
const ADDITIONAL_INFO_PLACEHOLDER = `e.g. I’m applying for company XYZ. I have been resume-rejected by N companies that I have applied for. Please help me to review so company XYZ gives me an interview!`;
const FILE_UPLOAD_ERROR = `Please upload a PDF file that is less than ${FILE_SIZE_LIMIT_MB}MB.`;

type IFormInput = {
  additionalInfo?: string;
  experience: string;
  file: File;
  isChecked: boolean;
  location: string;
  role: string;
  title: string;
};

export default function SubmitResumeForm() {
  const resumeCreateMutation = trpc.useMutation('resumes.resume.user.create');
  const router = useRouter();

  const [resumeFile, setResumeFile] = useState<File | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFileUploadError, setInvalidFileUploadError] = useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      isChecked: false,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (resumeFile == null) {
      console.error('Resume file is empty');
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('key', RESUME_STORAGE_KEY);
    formData.append('file', resumeFile);

    const res = await axios.post('/api/file-storage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const { url } = res.data;

    resumeCreateMutation.mutate(
      {
        additionalInfo: data.additionalInfo,
        experience: data.experience,
        location: data.location,
        role: data.role,
        title: data.title,
        url,
      },
      {
        onError: (error) => {
          console.error(error);
        },
        onSettled: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          router.push('/resumes');
        },
      },
    );
  };

  const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file == null) {
      return;
    }
    if (file.type !== 'application/pdf' || file.size > FILE_SIZE_LIMIT_BYTES) {
      setInvalidFileUploadError(FILE_UPLOAD_ERROR);
      return;
    }
    setInvalidFileUploadError('');
    setResumeFile(file);
  };

  const onClickReset = () => {
    reset();
    setResumeFile(null);
  };

  const fileUploadError = useMemo(() => {
    if (invalidFileUploadError != null) {
      return invalidFileUploadError;
    }
    if (errors?.file != null) {
      return 'Resume cannot be empty!';
    }
  }, [errors?.file, invalidFileUploadError]);

  return (
    <>
      <Head>
        <title>Upload a Resume</title>
      </Head>
      <main className="h-[calc(100vh-4rem)] flex-1 overflow-y-scroll">
        <section
          aria-labelledby="primary-heading"
          className="flex h-full min-w-0 flex-1 flex-col lg:order-last">
          <div className="mx-20 space-y-4 py-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="mb-4 text-2xl font-bold">Upload a resume</h1>
              <div className="mb-4">
                <TextInput
                  {...register('title', { required: true })}
                  disabled={isLoading}
                  label="Title"
                  placeholder={TITLE_PLACEHOLDER}
                  required={true}
                  onChange={(val) => setValue('title', val)}
                />
              </div>
              <div className="mb-4">
                <Select
                  {...register('role', { required: true })}
                  disabled={isLoading}
                  label="Role"
                  options={ROLES}
                  required={true}
                  onChange={(val) => setValue('role', val)}
                />
              </div>
              <div className="mb-4">
                <Select
                  {...register('experience', { required: true })}
                  disabled={isLoading}
                  label="Experience Level"
                  options={EXPERIENCE}
                  required={true}
                  onChange={(val) => setValue('experience', val)}
                />
              </div>
              <div className="mb-4">
                <Select
                  {...register('location', { required: true })}
                  disabled={isLoading}
                  label="Location"
                  name="location"
                  options={LOCATION}
                  required={true}
                  onChange={(val) => setValue('location', val)}
                />
              </div>
              <p className="text-sm font-medium text-slate-700">
                Upload resume (PDF format)
                <span aria-hidden="true" className="text-danger-500">
                  {' '}
                  *
                </span>
              </p>
              <div className="mb-4">
                <div
                  className={clsx(
                    fileUploadError ? 'border-danger-600' : 'border-gray-300',
                    'mt-2 flex justify-center rounded-md border-2 border-dashed  px-6 pt-5 pb-6',
                  )}>
                  <div className="space-y-1 text-center">
                    <div className="flex gap-2">
                      <PaperClipIcon className="m-auto h-8 w-8 text-gray-600" />
                      {resumeFile && <p>{resumeFile.name}</p>}
                    </div>
                    <div className="flex justify-center text-sm">
                      <label
                        className="rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
                        htmlFor="file-upload">
                        <p className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                          Upload a file
                        </p>
                        <input
                          {...register('file', { required: true })}
                          accept="application/pdf"
                          className="sr-only"
                          disabled={isLoading}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={onUploadFile}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF up to {FILE_SIZE_LIMIT_MB}MB
                    </p>
                  </div>
                </div>
                {fileUploadError && (
                  <p className="text-danger-600 text-sm">{fileUploadError}</p>
                )}
              </div>
              <div className="mb-8">
                <TextArea
                  {...register('additionalInfo')}
                  disabled={isLoading}
                  label="Additional Information"
                  placeholder={ADDITIONAL_INFO_PLACEHOLDER}
                  onChange={(val) => setValue('additionalInfo', val)}
                />
              </div>
              <div className="mb-4 text-left text-sm text-slate-700">
                <h2 className="mb-2 text-xl font-medium">
                  Submission Guidelines
                </h2>
                <p>
                  Before you submit, please review and acknolwedge our
                  <span className="font-bold"> submission guidelines </span>
                  stated below.
                </p>
                <p>
                  <span className="text-lg font-bold">• </span>
                  Ensure that you do not divulge any of your
                  <span className="font-bold"> personal particulars</span>.
                </p>
                <p>
                  <span className="text-lg font-bold">• </span>
                  Ensure that you do not divulge any
                  <span className="font-bold">
                    {' '}
                    company's proprietary and confidential information
                  </span>
                  .
                </p>
                <p>
                  <span className="text-lg font-bold">• </span>
                  Proof-read your resumes to look for grammatical/spelling
                  errors.
                </p>
              </div>
              <CheckboxInput
                {...register('isChecked', { required: true })}
                disabled={isLoading}
                label="I have read and will follow the guidelines stated."
                onChange={(val) => setValue('isChecked', val)}
              />
              <div className="mt-4 flex justify-end gap-4">
                <Button
                  addonPosition="start"
                  disabled={isLoading}
                  display="inline"
                  label="Clear"
                  size="md"
                  variant="tertiary"
                  onClick={onClickReset}
                />
                <Button
                  addonPosition="start"
                  disabled={isLoading}
                  display="inline"
                  isLoading={isLoading}
                  label="Submit"
                  size="md"
                  type="submit"
                  variant="primary"
                />
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
