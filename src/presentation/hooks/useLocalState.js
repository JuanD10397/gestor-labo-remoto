import { useState, useEffect } from "react";

// Funciona como useState pero almacena estados y toma estados del LOCALSTORAGE

// Para usarlo (en cualquier otro componente) coloco:
// const [jwt, setJwt] = useLocalState("", "jwt");

// el primer parámetro es el valor del state y el segundo es el nombre que tendrá en el localstorage

function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { useLocalState };
