import { useEffect, useState } from "react";
import { InputContainer } from "../../ui/Input";
import { HiFilter, HiSearch } from "react-icons/hi";
import { P2 } from "../../ui/Typography";
import styled from "styled-components";
import DanhSachDeTaiList from "./DangKyDeTaiList";
import useChangeListGrid from "../../hooks/useChangeListGrid";
import { DanhSachDeTaiGrid } from "./DanhSachDeTaiGrid";
const DeTaiContaienr = styled.div`
  width: 100%;
  padding: 0 1.6rem;
`;
const FilterToggle = styled.span`
  display: none;
  @media screen and (max-width: 768px) {
    & {
      display: flex;
      align-items: center;
      background-color: var(--color--secondary_3);
      width: 2rem;
      height: 3.2rem;
      cursor: pointer;
      z-index: 11;
    }
  }
`;
function DanhSachDeTaiContainer({ danhSachDeTai, onClick }) {
  const [searchDeTai, setSearchDeTai] = useState("");
  const [deTaiDaLoc, setdeTaiDaLoc] = useState(danhSachDeTai);
  const [list, changeListGrid] = useChangeListGrid();
  useEffect(() => {
    if (searchDeTai) {
      setdeTaiDaLoc(
        danhSachDeTai.filter((dt) =>
          dt.tenDeTai.toLowerCase().includes(searchDeTai.toLowerCase())
        )
      );
    } else {
      setdeTaiDaLoc(danhSachDeTai);
    }
  }, [searchDeTai, danhSachDeTai]);
  return (
    <>
      <DeTaiContaienr className="flex flexColumn g-8 ">
        <div className="flex flexCenter g-spaceBetween">
          <P2>{danhSachDeTai.length} Đề tài</P2>
          <div className="flex flexCenter g-8">
            <InputContainer>
              <InputContainer.Select
                value={list}
                onChange={(e) => changeListGrid(e.target.value)}
              >
                <option value="true">List</option>
                <option value="false">Grid</option>
              </InputContainer.Select>
            </InputContainer>
            <form onSubmit={(e) => e.preventDefault()}>
              <InputContainer full="none" type="inputGroup">
                <span>
                  <HiSearch />
                </span>
                <InputContainer.Input
                  type="text"
                  value={searchDeTai}
                  onChange={(e) => setSearchDeTai(e.target.value)}
                  placeholder="Nhập tên đề tài cần tìm"
                  id={"timKiem"}
                />
              </InputContainer>
            </form>
            <FilterToggle onClick={onClick}>
              <HiFilter />
            </FilterToggle>
          </div>
        </div>
        {list ? (
          <DanhSachDeTaiList danhSachDeTai={deTaiDaLoc} />
        ) : (
          <DanhSachDeTaiGrid danhSachDeTai={deTaiDaLoc} />
        )}
      </DeTaiContaienr>
    </>
  );
}

export default DanhSachDeTaiContainer;
