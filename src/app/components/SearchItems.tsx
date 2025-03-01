import React, { useState, useEffect, useCallback } from 'react';
import Autosuggest from 'react-autosuggest';
import { setSelectedItem } from '../store/searchslice';
import { useDispatch, useSelector } from 'react-redux';


interface AutocompleteSearchProps {
  Items: string[];
  placeholder?: string;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ Items, placeholder = 'Type to search...' }) => {
  const [value, setValue] = useState<string>(''); 
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const selectedTerm = useSelector((state: { search: { selectedItem: string } }) => state.search.selectedTerm); // Get selected term from redux
  const dispatch = useDispatch();

  const getSuggestions = useCallback((inputValue: string): string[] => {
    const regex = new RegExp(inputValue.trim(), 'i'); 
    return Items.filter((item: string) => regex.test(item)); 
  }, [Items]);

  const onSuggestionsFetchRequested = ({ value }: { value: string }): void => {
    setSuggestions(getSuggestions(value)); 
  };

  const onSuggestionsClearRequested = (): void => {
    setSuggestions([]); 
  };

  const onChange = (event: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }): void => {
    setSuggestions(getSuggestions(newValue)); 
    setValue(newValue); 
  };


  const onSuggestionSelected = (event: React.FormEvent<any>, { suggestion }: any) => {
    dispatch(setSelectedItem(suggestion)); 
  };

  const getSuggestionValue = (suggestion: string): string => suggestion;

  const renderSuggestion = (suggestion: string): JSX.Element => <div>{suggestion}</div>;

  const inputProps = {
    placeholder,
    value,
    onChange
  };

  const theme = {
    container: 'autocomplete-container',
    suggestionsContainer: 'suggestions-container',
    suggestion: 'suggestion',
    suggestionHighlighted: 'suggestion-highlighted',
    input: 'autocomplete-input'
  };

  useEffect(() => {
    setSuggestions(getSuggestions(value));
    dispatch(setSelectedItem(value)); 
  }, [value, getSuggestions,dispatch]);

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      onSuggestionSelected={onSuggestionSelected}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={theme}
    />
  );
};

export default AutocompleteSearch;
