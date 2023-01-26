import { useState, useEffect, useCallback } from "react";

export default function useApiService(apiService, options = {
  defaultValues: null,
  variables: [],
}) {
  const {
    defaultValues = null,
    variables = [],
  } = options;
  const [data, setData] = useState(defaultValues);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const cb = useCallback((...vars) => {
    setLoading(true);
    setErrors(null);
    return apiService(...vars)
      .then(res => {
        setData(res.data);
        return res;
      })
      .catch(e => {
        setErrors(e)
        setData(defaultValues);
      })
      .finally(() => setLoading(false));
  }, [apiService]);

  useEffect(() => {
    cb(...variables);
  }, []);

  return {
    data,
    loading,
    errors,
    refetch: cb
  };
};