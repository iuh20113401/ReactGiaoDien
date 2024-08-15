import { useEffect, useState } from "react";
function getLocaoStorageValue(key, initialValue) {
  const jsonValue = localStorage.getItem(key);
  if (jsonValue === "undefined" || !jsonValue) {
    return initialValue;
  }
  const item = JSON.parse(jsonValue);
  const date = new Date().getTime();
  if (item && item?.expire && item?.expire < date) {
    localStorage.removeItem(key);
    return initialValue;
  }
  return JSON.parse(jsonValue);
}
function useLocalStorage({ initialValue, key }) {
  const [value, setValue] = useState(function () {
    return getLocaoStorageValue(key, initialValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
}

export default useLocalStorage;
