import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { TableState, setFilter } from '@/app/store/chargersReducer';
import { StationData } from '@/app/types/charger';
import { DELAY } from '@/app/constants/genericConstants';
import { debounce } from '@/app/utils/debounce';
import { getUpdatedQueryParams, objectToQueryParams } from '@/app/utils/helper';

import './Input.css';

interface Props {
  filterName: keyof TableState['filters'];
  placeHolder?: string;
  searchData?: StationData[] | null;
}

export const Input: React.FC<Props> = ({
  filterName,
  placeHolder,
  searchData,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  // Updating filter based on the selected suggestion
  const updateFilter = () => {
    //set query params in url
    const params = objectToQueryParams({
      [filterName]: inputValue,
    });
    const { query } = router;
    const updatedParams = getUpdatedQueryParams(query, params);
    router.push({
      query: updatedParams,
    });

    dispatch(setFilter({ filterName: filterName, value: inputValue }));
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      updateFilter();
    }
  };

  const handleBlur = () => {
    updateFilter();
  };

  const handleSuggestions = () => {
    if (searchData) {
      if (inputValue) {
        const filteredSuggestions: string[] = searchData
          .filter(item =>
            item.name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map(item => item.name);
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }
  };

  const debouncedSuggestions = debounce(handleSuggestions, DELAY);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    debouncedSuggestions();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSuggestions([]);
    setInputValue(suggestion);
    dispatch(setFilter({ filterName, value: suggestion }));
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeHolder}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        aria-label="search input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
