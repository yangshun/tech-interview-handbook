import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import type { FieldValues, UseFormRegister } from 'react-hook-form';

export const useFormRegister = <TFieldValues extends FieldValues>(
  register: UseFormRegister<TFieldValues>,
) => {
  const formRegister = useCallback(
    (...args: Parameters<typeof register>) => {
      const { onChange, ...rest } = register(...args);
      return {
        ...rest,
        onChange: (value: string, event: ChangeEvent<unknown>) => {
          onChange(event);
        },
      };
    },
    [register],
  );
  return formRegister;
};

export const useSelectRegister = <TFieldValues extends FieldValues>(
  register: UseFormRegister<TFieldValues>,
) => {
  const formRegister = useCallback(
    (...args: Parameters<typeof register>) => {
      const { onChange, ...rest } = register(...args);
      return {
        ...rest,
        onChange: (value: string) => {
          onChange({
            target: {
              value,
            },
          });
        },
      };
    },
    [register],
  );
  return formRegister;
};
