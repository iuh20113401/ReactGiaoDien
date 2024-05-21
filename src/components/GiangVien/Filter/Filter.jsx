import { useSearchParams } from "react-router-dom";
import { InputContainer } from "../../../ui/Input";

function Filter({ field, children }) {
  const [searchParam, setSearchParam] = useSearchParams();
  function TimKiem(field, value) {
    searchParam.set(field, value);
    setSearchParam(searchParam);
  }
  return (
    <InputContainer.Select
      size="block"
      onChange={(e) => TimKiem(field, e.target.value)}
    >
      {children}
    </InputContainer.Select>
  );
}

export default Filter;
