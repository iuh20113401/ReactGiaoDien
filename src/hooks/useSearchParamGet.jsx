import { useSearchParams } from "react-router-dom";

function useSearchParamGet(field) {
  const [searchParam] = useSearchParams();
  const ketqua = searchParam.get(field);
  return ketqua;
}

export default useSearchParamGet;
