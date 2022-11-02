import { startOfMonth } from 'date-fns';
import { useState } from 'react';
import { Button } from '@tih/ui';

import type { Month } from '~/components/shared/MonthYearPicker';
import MonthYearPicker from '~/components/shared/MonthYearPicker';

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
  onSubmit: (data: CreateQuestionEncounterData) => void;
};

export default function CreateQuestionEncounterForm({
  onCancel,
  onSubmit,
}: CreateQuestionEncounterFormProps) {
  const [step, setStep] = useState(0);

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfMonth(new Date()),
  );

  return (
    <div className="flex items-center gap-2">
      <p className="font-md text-md text-slate-600">
        I saw this question {step <= 1 ? 'at' : step === 2 ? 'for' : 'on'}
      </p>
      {step === 0 && (
        <div>
          <CompanyTypeahead
            isLabelHidden={true}
            placeholder="Company"
            // TODO: Fix suggestions and set count back to 3
            suggestedCount={0}
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
            suggestedCount={0}
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
            suggestedCount={0}
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
              startOfMonth(new Date(value.year!, value.month! - 1)),
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
          variant="primary"
          onClick={() => {
            setStep(step + 1);
          }}
        />
      )}
      {step === 3 && (
        <Button
          label="Submit"
          variant="primary"
          onClick={() => {
            if (
              selectedCompany &&
              selectedLocation &&
              selectedRole &&
              selectedDate
            ) {
              const { cityId, stateId, countryId } = selectedLocation;
              onSubmit({
                cityId,
                company: selectedCompany,
                countryId,
                role: selectedRole,
                seenAt: selectedDate,
                stateId,
              });
            }
          }}
        />
      )}
      <Button
        label="Cancel"
        variant="tertiary"
        onClick={(event) => {
          event.preventDefault();
          onCancel();
        }}
      />
    </div>
  );
}
