import { startOfMonth } from 'date-fns';
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Button } from '~/ui';

import type { Month } from '~/components/shared/MonthYearPicker';
import MonthYearPicker from '~/components/shared/MonthYearPicker';

import useLocationOptions from '~/utils/questions/useLocationOptions';
import useCompanyOptions from '~/utils/shared/useCompanyOptions';
import useJobTitleOptions from '~/utils/shared/useJobTitleOptions';

import CompanyTypeahead from '../typeahead/CompanyTypeahead';
import LocationTypeahead from '../typeahead/LocationTypeahead';
import RoleTypeahead from '../typeahead/RoleTypeahead';

import type { Location } from '~/types/questions';

export type CreateQuestionEncounterData = {
  cityId?: string;
  company: string;
  countryId: string;
  role: string;
  seenAt: Date;
  stateId?: string;
};

export type CreateQuestionEncounterFormProps = {
  onCancel: () => void;
  onSubmit: (data: CreateQuestionEncounterData) => Promise<void>;
};

export default function CreateQuestionEncounterForm({
  onCancel,
  onSubmit,
}: CreateQuestionEncounterFormProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfMonth(new Date()),
  );

  const { data: allCompanyOptions } = useCompanyOptions('');
  const { data: allLocationOptions } = useLocationOptions('');
  const allRoleOptions = useJobTitleOptions('');

  if (submitted) {
    return (
      <div className="font-md flex items-center gap-1 rounded-full border bg-slate-50 py-1 pl-2 pr-3 text-sm text-slate-500">
        <CheckIcon className="h-5 w-5" />
        <p>Thank you for your response</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="text-md text-slate-600">
        I saw this question {step <= 1 ? 'at' : step === 2 ? 'for' : 'on'}
      </p>
      {step === 0 && (
        <div>
          <CompanyTypeahead
            isLabelHidden={true}
            placeholder="Company"
            suggestedCount={3}
            suggestedOptions={allCompanyOptions}
            onSelect={({ value: company }) => {
              setSelectedCompany(company);
            }}
            onSuggestionClick={({ value: company }) => {
              setSelectedCompany(company);
              setStep(step + 1);
            }}
          />
        </div>
      )}
      {step === 1 && (
        <div>
          <LocationTypeahead
            isLabelHidden={true}
            placeholder="Location"
            suggestedCount={3}
            suggestedOptions={allLocationOptions}
            onSelect={(location) => {
              setSelectedLocation(location);
            }}
            onSuggestionClick={(location) => {
              setSelectedLocation(location);
              setStep(step + 1);
            }}
          />
        </div>
      )}
      {step === 2 && (
        <div>
          <RoleTypeahead
            isLabelHidden={true}
            placeholder="Role"
            suggestedCount={3}
            suggestedOptions={allRoleOptions}
            onSelect={({ value: role }) => {
              setSelectedRole(role);
            }}
            onSuggestionClick={({ value: role }) => {
              setSelectedRole(role);
              setStep(step + 1);
            }}
          />
        </div>
      )}
      {step === 3 && (
        <MonthYearPicker
          className="space-x-2"
          // TODO: Add label and hide label on Select instead.
          monthLabel=""
          value={{
            month: ((selectedDate?.getMonth() ?? 0) + 1) as Month,
            year: selectedDate?.getFullYear() as number,
          }}
          // TODO: Add label and hide label on Select instead.
          yearLabel=""
          onChange={(value) => {
            setSelectedDate(
              new Date(Date.UTC(value.year!, value.month! - 1, 1, 0, 0, 0, 0)),
            );
          }}
        />
      )}
      {step < 3 && (
        <Button
          disabled={
            (step === 0 && selectedCompany === null) ||
            (step === 1 && selectedLocation === null) ||
            (step === 2 && selectedRole === null)
          }
          label="Next"
          size="sm"
          variant="primary"
          onClick={() => {
            setStep(step + 1);
          }}
        />
      )}
      {step === 3 && (
        <Button
          isLoading={loading}
          label="Submit"
          size="sm"
          variant="primary"
          onClick={async () => {
            if (
              selectedCompany &&
              selectedLocation &&
              selectedRole &&
              selectedDate
            ) {
              const { cityId, stateId, countryId } = selectedLocation;
              setLoading(true);
              try {
                await onSubmit({
                  cityId,
                  company: selectedCompany,
                  countryId,
                  role: selectedRole,
                  seenAt: selectedDate,
                  stateId,
                });
                setSubmitted(true);
              } finally {
                setLoading(false);
              }
            }
          }}
        />
      )}
      <Button
        label="Cancel"
        size="sm"
        variant="tertiary"
        onClick={(event) => {
          event.preventDefault();
          onCancel();
        }}
      />
    </div>
  );
}
