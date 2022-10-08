import { useForm } from 'react-hook-form';
import { Button, Select } from '@tih/ui';

import NavBar from '~/components/questions/NavBar';

export type LandingQueryData = {
  date: string;
  location: string;
  questionType: string;
};
export default function LandingPage() {
  const { register, handleSubmit } = useForm<LandingQueryData>();

  const onSubmit = (data: LandingQueryData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <main className="flex flex-1 flex-col items-stretch overflow-y-auto bg-white">
      <div className="pb-4">
        <NavBar></NavBar>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3">
        <h1 className="text-primary-600 px-4 text-center text-4xl font-bold">
          Tech Interview Question Bank
        </h1>
        <p className="mx-auto max-w-lg py-6 px-4 text-center text-xl text-black sm:max-w-3xl">
          Get to know the latest SWE interview questions asked by top companies
        </p>

        <form
          className="mx-auto mt-6 flex max-w-lg items-baseline gap-3 px-4 text-center text-xl text-black sm:max-w-3xl"
          onSubmit={handleSubmit(onSubmit)}>
          <p>Find</p>
          <div className=" space-x-2">
            <Select
              //   {...register('questionType')}
              isLabelHidden={true}
              label="Type"
              options={[
                {
                  label: 'Coding',
                  value: 'coding',
                },
                {
                  label: 'Behavioral',
                  value: 'behavioral',
                },
                {
                  label: 'System Design',
                  value: 'system design',
                },
              ]}
              value="coding"
            />
          </div>
          <p>questions from</p>
          <Select
            //   {...register('company')}
            isLabelHidden={true}
            label="Company"
            options={[
              {
                label: 'Google',
                value: 'google',
              },
              {
                label: 'Meta',
                value: 'meta',
              },
              {
                label: 'Amazon',
                value: 'amazon',
              },
            ]}
            value="google"
          />
          <p>in</p>
          <Select
            //   {...register('location')}
            isLabelHidden={true}
            label="Select a category"
            options={[
              {
                label: 'Singapore',
                value: 'singapore',
              },
              {
                label: 'California',
                value: 'california',
              },
              {
                label: 'Menlo Park',
                value: 'menlo park',
              },
            ]}
            value="singapore"
          />
          <Button
            label="Go"
            variant="primary"
            onClick={handleSubmit(onSubmit)}></Button>
        </form>
        <div>
          <p className="py-20 text-center">CAROUSELL PLACEHOLDER</p>
        </div>
      </div>
    </main>
  );
}
