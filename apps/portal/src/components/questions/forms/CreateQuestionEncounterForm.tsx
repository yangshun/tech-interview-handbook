import { startOfMonth } from 'date-fns';
import { useState } from 'react';
import { Button } from '@tih/ui';

import CompaniesTypeahead from '~/components/shared/CompaniesTypeahead';
import type { Month } from '~/components/shared/MonthYearPicker';
import MonthYearPicker from '~/components/shared/MonthYearPicker';

import LocationTypeahead from '../typeahead/LocationTypeahead';
import RoleTypeahead from '../typeahead/RoleTypeahead';

export type CreateQuestionEncounterData = {
  company: string;
  location: string;
  role: string;
  seenAt: Date;
};

export type CreateQuestionEncounterFormProps = {
  onCancel: () => void;
  onSubmit: (data: CreateQuestionEncounterData) => void;
};

export default function CreateQuestionEncounterForm({
  onCancel,
  onSubmit,
}: CreateQuestionEncounterFormProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfMonth(new Date()),
  );

  return (
    <div>
      <Button
        label="Cancel"
        variant="tertiary"
        onClick={(event) => {
          event.preventDefault();
          onCancel();
        }}
      />
      <div className="flex items-center gap-2">
        <p className="font-md text-xl text-slate-600">I saw this question at</p>
        <div>
          <CompaniesTypeahead
            isLabelHidden={true}
            onSelect={({ value: company }) => {
              setSelectedCompany(company);
            }}
          />
        </div>
        <div>
          <LocationTypeahead
            isLabelHidden={true}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onQueryChange={() => {}}
            onSelect={({ value: location }) => {
              setSelectedLocation(location);
            }}
          />
        </div>
        <p className="font-md text-xl text-slate-600">for</p>
        <div>
          <RoleTypeahead
            isLabelHidden={true}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onQueryChange={() => {}}
            onSelect={({ value: role }) => {
              setSelectedRole(role);
            }}
          />
        </div>
        <p className="font-md text-xl text-slate-600">for</p>
        <MonthYearPicker
          value={{
            month: ((selectedDate?.getMonth() ?? 0) + 1) as Month,
            year: selectedDate?.getFullYear() as number,
          }}
          onChange={(value) => {
            setSelectedDate(
              startOfMonth(new Date(value.year, value.month - 1)),
            );
          }}
        />
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
              onSubmit({
                company: selectedCompany,
                location: selectedLocation,
                role: selectedRole,
                seenAt: selectedDate,
              });
            }
          }}
        />
      </div>
    </div>
  );
}
