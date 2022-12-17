import { useState, useEffect } from "react";

// useFetch servirá para hacer peticiones HTTP (fetch) a donde necesitemos
// recibe por params la url a la que se le hará la petición y opciones
export default function useFetch(url, options) {
  //Para saber si está haciendo la petición o si ya terminó de hacerla
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // el await fetch es el que hace la petición al url. options especifica el tipo de petición, etc. Si está vacío es GET
        const res = await fetch(url, options);
        const json = await res.json();
        setLoading(false);
        setResult(json);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [options, url]); //Cuando se actualice options o url se va a volver a ejecutar el useEffect

  return { loading, result, error };
}
