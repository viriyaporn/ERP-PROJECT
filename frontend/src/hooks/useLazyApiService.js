import { useState } from "react";

/**
 * @param {Promise} apiService 
 * @returns {[(...vars) => any, any, {loading: boolean}]}
 */
export default function useLazyApiService(apiService, options = { defaultValues: null }) {
  const { defaultValues = null } = options;

  const [data, setData] = useState(defaultValues);
  // const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);


  const cb = (...vars) => {
    setLoading(true);
    // setErrors(null);
    return apiService(...vars)
      .then(res => {
        setData(res.data ?? res);
        return res;
      })
      // .catch(e => {
      //   setErrors(e)
      //   setData(null);
      // })
      .finally(() => setLoading(false));
  }

  return [cb, data, { loading, /* errors */ }];
};