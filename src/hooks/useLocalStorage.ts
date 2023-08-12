import { useState } from 'react';

// Custom hook to store data in local storage
const useLocalStorage = (key : string, initialValue : string | number) => {
  // Get stored value or initial value
  const storedValue = localStorage.getItem(key);
  const initial = storedValue !== null ? JSON.parse(storedValue) : initialValue;

  // Create state variable
  const [value, setValue] = useState(initial);

  // Update stored value and state variable
  const updateValue = (newValue : string | number) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  // Return value and update function
  return [value, updateValue];
}

export default useLocalStorage;