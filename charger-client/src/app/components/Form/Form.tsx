/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ChargerFormValues, StationData } from '@/app/types/charger';

import './Form.css';
import SelectBox from '../Select/Select';
import { Button } from '../Button/Button';

interface Props {
  stationOptions: string[];
  chargerStatusOptions: string[];
  connectorStatusOptions: string[];
  connectorStandardOptions: string[];
  onSubmit: (data: ChargerFormValues) => void;
  initialValues?: ChargerFormValues | null;
  handleChargerDelete: (
    e: React.MouseEvent<HTMLDivElement>,
    chargerData: ChargerFormValues
  ) => void;
}
export const ChargerForm: React.FC<Props> = ({
  stationOptions,
  chargerStatusOptions,
  connectorStatusOptions,
  connectorStandardOptions,
  onSubmit,
  initialValues,
  handleChargerDelete,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
    setValue,
  } = useForm({
    defaultValues: initialValues || {
      stationId: '',
      status: '',
      connectors: [{ status: '', standard: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'connectors',
  });
  const { t } = useTranslation();
  React.useEffect(() => {
    // hook to set station id from initial values if available
    if (initialValues?.stationName && Array.isArray(stationOptions)) {
      const foundOption = (stationOptions as unknown as StationData[]).find(
        option => initialValues.stationName === option.name
      );
      if (foundOption) {
        setValue('stationId', foundOption.id);
      }
    }
  }, [initialValues, setValue, stationOptions]);

  return (
    <div className="form-container">
      <div className="header">{t('Add/Edit Charger Details')}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="" {...register('stationId')}>
          <label aria-label="Station Name">{t('Station Name')}</label>
          <Controller
            name="stationId"
            control={control}
            render={({ field }) => (
              <SelectBox
                options={stationOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select a station"
              />
            )}
          />
        </div>

        <div className="" {...register('status')}>
          <label aria-label="Charger Status Name">{t('Charger Status')}</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SelectBox
                options={chargerStatusOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select an option"
              />
            )}
          />
        </div>

        <div {...register('connectors')} className="connectors">
          <label>Connectors</label>
          {fields.map((field, index) => (
            <div key={field.id} className="connector-wrapper">
              <Controller
                name={`connectors[${index}].status`}
                control={control}
                render={({ field }) => (
                  <SelectBox
                    options={connectorStatusOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select"
                  />
                )}
              />
              <Controller
                name={`connectors[${index}].standard`}
                control={control}
                render={({ field }) => (
                  <SelectBox
                    options={connectorStandardOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select"
                  />
                )}
              />
              <Button
                type="button"
                onClick={() => remove(index)}
                btnLabel="Remove Connector"
                customClass="remove-btn"
                dataTestId="remove-connector"
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ status: '', standard: '' })}
            btnLabel=" Add Connector"
            customClass="add-connector"
            dataTestId="add-connector"
          />
        </div>

        <div className="button-wrapper">
          <Button btnLabel="Submit" disabled={!isValid} />
          {initialValues && (
            <Button
              btnLabel="Delete Charger"
              disabled={!initialValues}
              onClick={e => handleChargerDelete(e, initialValues)}
              customClass="remove-btn"
              dataTestId="delete-charger"
            />
          )}
        </div>
      </form>
    </div>
  );
};
