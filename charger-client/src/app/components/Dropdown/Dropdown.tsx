import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { TableState, setFilter } from '@/app/store/chargersReducer';
import { getUpdatedQueryParams, objectToQueryParams } from '@/app/utils/helper';

import './Dropdown.css';
import { Button } from '../Button/Button';

interface Props {
  options: string[];
  filterName: keyof TableState['filters'];
}

const Dropdown: React.FC<Props> = ({ options, filterName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(new Set<string>());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleSelect = (option: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(option)) {
      newSelected.delete(option);
    } else {
      newSelected.add(option);
    }
    setSelected(newSelected);
  };

  const clearSelections = () => {
    setSelected(new Set());
  };

  const saveSelections = () => {
    const selectedValuesString = Array.from(selected).join(',');

    // set the url query params
    const params = objectToQueryParams({
      [filterName]: selectedValuesString,
    });
    const { query } = router;
    const updatedParams = getUpdatedQueryParams(query, params);
    router.push({
      query: updatedParams,
    });

    dispatch(
      setFilter({ filterName: filterName, value: selectedValuesString })
    );
    setIsOpen(false);
  };

  useEffect(() => {
    // hook to attach mousedown event to close dropdown when clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown" aria-label="dropdown" ref={dropdownRef}>
      <div className="dropdown-select" onClick={toggleDropdown}>
        <span>
          {!selected.size ? 'Select' : ` ${Array.from(selected).join(' ,')}`}
        </span>
        <span>
          <i className={`arrow ${isOpen ? 'up' : 'down'} `}></i>
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            {options.map((option, index) => (
              <li key={index} aria-label={option}>
                <label>
                  <input
                    type="checkbox"
                    checked={selected.has(option)}
                    onChange={() => toggleSelect(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <div className="dropdown-menu-actions">
            <Button
              btnLabel="Clear all"
              onClick={clearSelections}
              disabled={selected.size === 0}
              customClass="dropdown-clear"
              ariaLabel="Clear all"
            />
            <Button
              btnLabel="Save"
              onClick={saveSelections}
              disabled={selected.size === 0}
              customClass="dropdown-save"
              ariaLabel="Save"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
