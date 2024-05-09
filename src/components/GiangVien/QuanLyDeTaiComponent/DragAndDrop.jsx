import styled from "styled-components";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { RiDragDropLine } from "react-icons/ri";

import { P2 } from "../../../ui/Typography";

const DragAndDropContainer = styled.div`
  border: 2px dashed
    ${({ dragging }) => (dragging ? "red" : "var(--color--secondary_5)")};
  padding: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: ${({ dragging }) => (dragging ? "red" : "black")};
  & > svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`;
const UploadFileContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
  & > ul {
    list-style: none;
  }
`;
export function DragAndDrop({ maDoAn, refetch }) {
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const [error, setError] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the file input when the area is clicked
  };

  const handleChange = (e) => {
    processFiles(e.target.files);
  };

  const processFiles = (filesFromSelection) => {
    const filesArray = Array.from(filesFromSelection);
    setFiles(filesArray);
    filesArray.forEach((file) => uploadFile(file));
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("maDoAn", maDoAn);
    const copy = { ...uploadProgress };
    copy[file.name] = { state: "pending", percentage: 0 };
    setUploadProgress(copy);
    try {
      const url =
        "http://localhost/server/api/sinhvien/detai.php?resource=themTaiLieu";
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.status === 409 ? data : "Mạng không ổn định");
      }
      copy[file.name] = { state: "done", percentage: 100 };
      setUploadProgress(copy);
      refetch();
    } catch (error) {
      copy[file.name] = { state: "failed", percentage: 0 };
      setUploadProgress(copy);
      toast.error(JSON.parse(error.message));
      setError(JSON.parse(error.message));
    }
  };

  return (
    <UploadFileContainer>
      <DragAndDropContainer
        dragging={dragging}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick} // Listen for click events on the drop area
      >
        <RiDragDropLine />
        Drag files here or click to upload
      </DragAndDropContainer>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
        multiple
      />
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} - {uploadProgress[file.name]?.percentage.toFixed(0)}%
            {error ? <P2>{error}</P2> : ""}
          </li>
        ))}
      </ul>
    </UploadFileContainer>
  );
}
