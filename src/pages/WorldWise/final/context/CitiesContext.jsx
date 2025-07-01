import { createContext, useEffect, useState } from 'react';

const CititesContext = createContext();

const BASE_URL = 'http://localhost:9000';

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCitites() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCitites();
  }, []);

  return (
    <CititesContext.Provider value={{ cities, isLoading }}>
      {' '}
      {children}
    </CititesContext.Provider>
  );
}

export { CitiesProvider };
