import { useEffect, useState } from "react";
import { Message } from "../02-useEffect/Message";

const localCache = {};

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isloading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);
  const setLoadingState = () => {
    setState({
      data: null,
      isloading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async () => {
    if (localCache[url]) {
      setState({
        data: localCache[url],
        isloading: false,
        hasError: false,
        error: null,
      });
      return;
    }

    setLoadingState();
    const resp = await fetch(url);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!resp.ok) {
      setState({
        data: null,
        isloading: false,
        hasError: true,
        // error: { code: resp.status, message: respStatusText },
        error: { code: resp.status },
      });
      return;
    }

    const data = await resp.json();
    setState({
      data: data,
      isloading: false,
      hasError: false,
      error: null,
    });
    // Manejo del Cache
    localCache[url] = data;
  };
  return {
    data: state.data,
    isloading: state.isloading,
    hasError: state.hasError,
  };
};
