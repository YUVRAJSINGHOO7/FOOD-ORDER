import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  // a little helper utility function that wraps this general http request sending logic.
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error( // built-in error constructor function that's provided by the browser
      resData.message || "Something went Wrong, Failed to send request."
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false); // state for managing loading => update UI
  const [error, setError] = useState(); // state for managing errors

  function clearData() {
    setData(initialData);
  }
  
  const sendRequest = useCallback(async function sendRequest(data) {
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, {...config, body:data});
      setData(resData);
    } catch (error) {
      setError(error.message || "Something went Wrong!");
    }
    setIsLoading(false);
  }, [url, config])

  useEffect(() => {
    if(config && (config.method === 'GET' || !config.method) || !config){
        sendRequest();
    }
  }, [sendRequest, config])

  // the idea behind this custom hook is now that we can, of course, return an object here
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
