import React, { useState, useEffect } from 'react';
import { getItem } from './async-storage';

export default useFetchStore = (key, setStateFunction) => {
  const [data, setData] = useState(null);
  const [pendding, setPendding] = useState(true);

  useEffect(() => {
    async function fetchStore() {
      const data = await getItem(key);
      setData(data);
      setPendding(false);
    }

    fetchStore();
  });
  //   console.log(data, pendding);
  setStateFunction({ data, pendding });
  //   return { data, pendding };
};
