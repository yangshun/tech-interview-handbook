import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FileRejection } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import {
  Button,
  CheckboxInput,
  Dialog,
  Select,
  TextArea,
  TextInput,
} from '@tih/ui';

import type { FilterOption } from '~/components/resumes/browse/resumeConstants';
import {
  EXPERIENCE,
  LOCATION,
  ROLE,
} from '~/components/resumes/browse/resumeConstants';
import SubmissionGuidelines from '~/components/resumes/submit-form/SubmissionGuidelines';

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

type SelectorType = 'experience' | 'location' | 'role';
type SelectorOptions = {
  key: SelectorType;
  label: string;
  options: Array<FilterOption>;
};

const selectors: Array<SelectorOptions> = [
  { key: 'role', label: 'Role', options: ROLE },
  { key: 'experience', label: 'Experience Level', options: EXPERIENCE },
  { key: 'location', label: 'Location', options: LOCATION },
];

type InitFormDetails = {
  additionalInfo?: string;
  experience: string;
  location: string;
  resumeId: string;
  role: string;
  title: string;
  url: string;
};

type Props = Readonly<{
  initFormDetails?: InitFormDetails | null;
  onClose: () => void;
}>;

export default function SubmitResumeForm({
  initFormDetails,
  onClose = () => undefined,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFileUploadError, setInvalidFileUploadError] = useState<
    string | null
  >(null);
  const [isDialogShown, setIsDialogShown] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();
  const resumeUpsertMutation = trpc.useMutation('resumes.resume.user.upsert');
  const isNewForm = initFormDetails == null;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<IFormInput>({
    defaultValues: {
      isChecked: false,
      ...initFormDetails,
    },
  });

  const resumeFile = watch('file');

  const onFileDrop = useCallback(
    (acceptedFiles: Array<File>, fileRejections: Array<FileRejection>) => {
      if (fileRejections.length === 0) {
        setInvalidFileUploadError('');
        setValue('file', acceptedFiles[0], {
          shouldDirty: true,
        });
      } else {
        setInvalidFileUploadError(FILE_UPLOAD_ERROR);
      }
    },
    [setValue],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: FILE_SIZE_LIMIT_BYTES,
    noClick: isLoading,
    noDrag: isLoading,
    onDrop: onFileDrop,
  });

  const fetchFilePdf = useCallback(async () => {
    const fileUrl = initFormDetails?.url;

    if (fileUrl == null) {
      return;
    }

    const data = await axios
      .get(fileUrl, {
        responseType: 'blob',
      })
      .then((res) => res.data);

    const keyAndFileName = fileUrl.substring(fileUrl.indexOf('resumes'));
    const fileName = keyAndFileName.substring(keyAndFileName.indexOf('-') + 1);

    const file = new File([data], fileName);
    setValue('file', file, {
      shouldDirty: false,
    });
  }, [initFormDetails?.url, setValue]);

  // Route user to sign in if not logged in
  useEffect(() => {
    if (status !== 'loading') {
      if (session?.user?.id == null) {
        router.push('/api/auth/signin');
      }
    }
  }, [router, session, status]);

  // Fetch initial file PDF for edit form
  useEffect(() => {
    fetchFilePdf();
  }, [fetchFilePdf]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    let fileUrl = initFormDetails?.url ?? '';

    // Only update file in fs when it changes
    if (dirtyFields.file) {
      const formData = new FormData();
      formData.append('key', RESUME_STORAGE_KEY);
      formData.append('file', resumeFile);

      const res = await axios.post('/api/file-storage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fileUrl = res.data.url;
    }

    resumeUpsertMutation.mutate(
      {
        additionalInfo: data.additionalInfo,
        experience: data.experience,
        id: initFormDetails?.resumeId,
        location: data.location,
        role: data.role,
        title: data.title,
        url: fileUrl,
      },
      {
        onError(error) {
          console.error(error);
        },
        onSettled() {
          setIsLoading(false);
        },
        onSuccess() {
          if (isNewForm) {
            router.push('/resumes/browse');
          } else {
            onClose();
          }
        },
      },
    );
  };

  const onClickClear = () => {
    if (isDirty) {
      setIsDialogShown(true);
    } else {
      onClose();
    }
  };

  const onClickResetDialog = () => {
    onClose();
    setIsDialogShown(false);
    reset();
    setInvalidFileUploadError(null);
  };

  const onClickDownload = async (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    // Prevent click event from propagating up to dropzone
    event.stopPropagation();

    const url = window.URL.createObjectURL(resumeFile);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', resumeFile.name);
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link and object URL
    link.remove();
    URL.revokeObjectURL(url);
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
          {/* Reset Dialog component */}
          <Dialog
            isShown={isDialogShown}
            primaryButton={
              <Button
                display="block"
                label="OK"
                variant="primary"
                onClick={onClickResetDialog}
              />
            }
            secondaryButton={
              <Button
                display="block"
                label="Cancel"
                variant="tertiary"
                onClick={() => setIsDialogShown(false)}
              />
            }
            title={
              isNewForm
                ? 'Are you sure you want to clear?'
                : 'Are you sure you want to leave?'
            }
            onClose={() => setIsDialogShown(false)}>
            Note that your current input will not be saved!
          </Dialog>
          <div className="mx-20 space-y-4 py-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="mb-4 text-2xl font-bold">Upload a resume</h1>
              {/*  Title Section */}
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
              {/*  Selectors */}
              {selectors.map((item) => (
                <div key={item.key} className="mb-4">
                  <Select
                    {...register(item.key, { required: true })}
                    disabled={isLoading}
                    label={item.label}
                    options={item.options}
                    required={true}
                    onChange={(val) => setValue(item.key, val)}
                  />
                </div>
              ))}
              {/*  Upload Resume Section */}
              <p className="text-sm font-medium text-slate-700">
                Upload resume (PDF format)
                <span aria-hidden="true" className="text-danger-500">
                  {' '}
                  *
                </span>
              </p>
              {/*  Upload Resume Box */}
              <div className="mb-4">
                <div
                  {...getRootProps()}
                  className={clsx(
                    fileUploadError ? 'border-danger-600' : 'border-gray-300',
                    'mt-2 flex justify-center rounded-md border-2  border-dashed px-6 pt-5 pb-6',
                  )}>
                  <div className="space-y-1 text-center">
                    <div className="flex gap-2">
                      {resumeFile == null ? (
                        <PaperClipIcon className="m-auto h-8 w-8 text-gray-600" />
                      ) : (
                        <div className="flex gap-2">
                          <p
                            className="cursor-pointer underline underline-offset-1 hover:text-indigo-600"
                            onClick={onClickDownload}>
                            {resumeFile.name}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center text-sm">
                      <label
                        className="rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
                        htmlFor="file-upload">
                        <div className="flex gap-1 ">
                          <p className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-400">
                            {resumeFile == null
                              ? 'Upload a file'
                              : 'Replace file'}
                          </p>
                          <span className="text-gray-500">
                            or drag and drop
                          </span>
                        </div>
                        <input
                          {...register('file', { required: true })}
                          {...getInputProps()}
                          accept="application/pdf"
                          className="sr-only"
                          disabled={isLoading}
                          id="file-upload"
                          name="file-upload"
                          type="file"
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
              {/*  Additional Info Section */}
              <div className="mb-8">
                <TextArea
                  {...register('additionalInfo')}
                  disabled={isLoading}
                  label="Additional Information"
                  placeholder={ADDITIONAL_INFO_PLACEHOLDER}
                  onChange={(val) => setValue('additionalInfo', val)}
                />
              </div>
              {/*  Submission Guidelines */}
              <SubmissionGuidelines />
              <CheckboxInput
                {...register('isChecked', { required: true })}
                disabled={isLoading}
                label="I have read and will follow the guidelines stated."
                onChange={(val) => setValue('isChecked', val)}
              />
              {/*  Clear and Submit Buttons */}
              <div className="mt-4 flex justify-end gap-4">
                <Button
                  addonPosition="start"
                  disabled={isLoading}
                  label={isNewForm ? 'Clear' : 'Cancel'}
                  variant="tertiary"
                  onClick={onClickClear}
                />
                <Button
                  addonPosition="start"
                  disabled={isLoading}
                  isLoading={isLoading}
                  label="Submit"
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
