import { useState } from "react";

function useChangeListGrid() {
  const [list, setList] = useState(false);
  const changeListGrid = (value) => {
    setList(value === "true" ? true : false);
  };
  return [list, changeListGrid];
}

export default useChangeListGrid;
