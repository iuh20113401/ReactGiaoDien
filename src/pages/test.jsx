import React, { useRef } from "react";
import "./test.css";

function TestHTML(content) {
  const contentRef = useRef();

  // const handleExportWord = async () => {
  //   const content = contentRef.current.innerHTML;
  //   const docx = htmlDocx.asBlob(content); // Convert HTML to DOCX
  //   saveAs(docx, "document.docx"); // Save as DOCX file
  // };
  function Export2Doc(element, filename = "") {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";

    var html = preHtml + contentRef.current.innerHTML + postHtml;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    filename = filename ? filename + ".doc" : "document.doc";

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  return (
    <div>
      <button onClick={Export2Doc}>Xuất ra Word</button>
      <div
        class="docx-wrapper"
        style={{
          padding: "30px",
          paddingBottom: "0px",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
        ref={contentRef}
      >
        <section
          class="docx"
          style={{
            padding: "30pt",
            width: "595.3pt",
            minHeight: "841.9pt",
            color: "black",
          }}
        >
          <header>
            <p
              class="docx_header"
              style={{
                margin: "0pt",
                minHeight: "1em",
                textAlign: "right",
                marginBottom: "0pt",
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  fontFamily: "Time new roman",
                  color: "rgb(174, 170, 170)",
                }}
              >
                MẪU 02 – GVPB - ABET
              </span>
            </p>
          </header>
          <article>
            <p></p>
            <table
              style={{
                width: "513.05pt",
                tableLayout: "auto",
                verticalAlign: "top",
              }}
            >
              <tr>
                <td
                  style={{
                    verticalAlign: "top",
                    width: "249.8pt",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginBottom: "0pt",
                      lineHeight: 1,
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginBottom: "0pt",
                      lineHeight: 1,
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      KHOA CÔNG NGHỆ THÔNG TIN
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginBottom: "0pt",
                      lineHeight: 1,
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      BỘ MÔN HỆ THỐNG THÔNG TIN
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",

                      marginBottom: "0pt",
                      lineHeight: "1",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    ></span>
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      <span class="docx-tab-stop"> </span>
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    verticalAlign: "top",
                    width: "263.25pt",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",

                      marginBottom: "0pt",
                      lineHeight: 1,
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",

                      marginBottom: "0pt",
                      lineHeight: 1,
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Độc lập - Tự do - Hạnh phúc
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",

                      marginBottom: "0pt",
                      lineHeight: 1,
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    ></span>
                  </p>
                </td>
              </tr>
            </table>
            <p
              style={{
                marginBottom: "0pt",
                lineHeight: "1",
                marginLeft: "5.4pt",
                textAlign: "center",
                width: "513.05pt",
              }}
            >
              <span
                style={{
                  fontFamily: "Time new roman",
                  fontWeight: "bold",
                  color: "rgb(0, 0, 0)",
                  minHeight: "14pt",
                  fontSize: "14pt",
                }}
              >
                PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP
              </span>
            </p>
            <p
              style={{
                margin: "0pt",
                minHeight: "1em",
                marginTop: "12pt",
                lineHeight: "1.3",
                marginLeft: "5.75pt",
              }}
            >
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Họ tên người đánh giá:{" "}
              </span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Ths Trần Thị Kim Chi
              </span>
            </p>
            <p
              style={{
                margin: "0pt",
                minHeight: "1em",
                marginTop: "0",
                marginBottom: "12pt",
                lineHeight: "1.3",
                marginLeft: "5.75pt",
              }}
            >
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Vai trò của người đánh giá: GIẢNG VIÊN PHẢN BIỆN
              </span>
            </p>
            <p
              style={{
                marginBottom: "0pt",
                lineHeight: "1.3",
                marginLeft: "5.75pt",
              }}
            ></p>
            <p
              style={{
                margin: "0pt",
                minHeight: "1em",
                marginBottom: "0pt",
                lineHeight: "1.3",
                marginLeft: "5.75pt",
              }}
            >
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Tên đề tài:
              </span>
              <span> </span>
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "13pt",
                  fontSize: "13pt",
                }}
              >
                {content.tenDeTai}
              </span>
            </p>
            <p
              style={{
                margin: "0pt",
                minHeight: "1em",
                marginBottom: "0pt",
                lineHeight: "1.3",
                marginLeft: "5.75pt",
              }}
            >
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Họ tên sinh viên 1:{" "}
              </span>
              <span id="_Hlk135679721"></span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                {content.tenSinhVien}
              </span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Mã số sinh viên:
              </span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              ></span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                {content.maSinhVien}
              </span>
            </p>
            <p
              style={{
                margin: "0pt",
                minHeight: "1em",
                marginBottom: "0pt",
                lineHeight: "1.3",
                marginLeft: "5.75pt",
              }}
            >
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Họ tên sinh viên 2:{" "}
              </span>
              <span id="_Hlk135679748"></span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Nguyễn Nam Anh{" "}
              </span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Mã số sinh viên:
              </span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              ></span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                19518511
              </span>
            </p>
            <p
              style={{
                margin: "0pt",
                minHeight: "1em",
                marginBottom: "0pt",
                lineHeight: "1",
                marginLeft: "5.4pt",
              }}
            >
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "7pt",
                  fontSize: "7pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "7pt",
                  fontSize: "7pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "7pt",
                  fontSize: "7pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "7pt",
                  fontSize: "7pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "7pt",
                  fontSize: "7pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "7pt",
                  fontSize: "7pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "7pt",
                  fontSize: "7pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "7pt",
                  fontSize: "7pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
            </p>
            <table
              class="first-row first-col no-vband docx_tablegrid"
              style={{
                border: " 1px solid black",
                borderCollapse: "collapse",
                width: "513.05pt",
              }}
            >
              <colgroup>
                <col style={{ border: " 1px solid black", width: " 30.3pt" }} />
                <col style={{ border: " 1px solid black", width: "213.3pt" }} />
                <col style={{ border: " 1px solid black", width: "77.95pt" }} />
                <col style={{ border: " 1px solid black", width: "78pt" }} />
                <col style={{ border: " 1px solid black", width: "95.95pt" }} />
              </colgroup>
              <tr>
                <td
                  rowspan="2"
                  style={{
                    border: " 1px solid black",
                    width: "30.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textIndent: "-3.2pt",
                      textAign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      STT
                    </span>
                  </p>
                </td>
                <td
                  rowspan="2"
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "213.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      LO
                    </span>
                  </p>
                </td>
                <td
                  colspan="2"
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "155.95pt",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Kết quả
                    </span>
                  </p>
                </td>
                <td
                  rowspan="1"
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Ghi Chú
                    </span>
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                      fontFamily: "Time new roman",
                      fontWeight: "bold",
                      color: "rgb(0, 0, 0)",
                      fontSize: "12pt",
                    }}
                  >
                    Sinh viên 1
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                      fontFamily: "Time new roman",
                      fontWeight: "bold",
                      color: "rgb(0, 0, 0)",
                      fontSize: "12pt",
                    }}
                  >
                    Sinh viên 2
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  ></p>
                </td>
              </tr>
              {/*note LO1*/}
              <tr style={{ height: "34.05pt" }}>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "30.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      1
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "500.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "justify",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Xác định được yêu cầu của khóa luận cần thực hiện
                    </span>
                  </p>
                </td>
                {/*note LO1 sinh vien 1*/}
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      {content.lo1}
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      D
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    {content.ghiChu1}
                  </p>
                </td>
              </tr>
              {/*note LO2*/}
              <tr style={{ height: "34.05pt" }}>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "30.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      2
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "213.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "justify",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Phân tích yêu cầu (hiện trạng, nghiệp vụ) và mô hình hóa
                      được yêu cầu của đề tài.
                    </span>
                  </p>
                </td>
                {/*note LO2 sinh vien 1 */}
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      {content.lo2}
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      C
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    {content.ghiChu2}
                  </p>
                </td>
              </tr>
              {/*note LO3*/}
              <tr style={{ height: "34.05pt" }}>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "30.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      3
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "213.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "justify",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Thiết kế một hệ thống thông tin/đưa ra giải pháp đáp ứng
                      được yêu cầu của đề tài
                    </span>
                  </p>
                </td>
                {/*note LO3 sinh vien 1 */}
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      {content.lo3}
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      C
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    {content.ghiChu3}
                  </p>
                </td>
              </tr>
              {/*note LO4*/}
              <tr style={{ height: "34.05pt" }}>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "30.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      4
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "213.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "justify",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Hiện thực hóa hệ thống thông tin theo thiết kế đã đưa
                      ra/Hiện thực giải pháp đã đưa ra
                    </span>
                  </p>
                </td>
                {/*note LO4 sinh vien 1 */}
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      {content.lo4}
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      C
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    {content.ghiChu4}
                  </p>
                </td>
              </tr>
              {/*note LO5*/}
              <tr style={{ height: "34.05pt" }}>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "30.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      5
                    </span>
                  </p>
                </td>
                {/*note LO5*/}
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "213.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "justify",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Viết được báo cáo khóa luận tốt nghiệp.
                    </span>
                  </p>
                </td>
                {/*note LO5 sinh vien 1 */}
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      {content.lo5}
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      C
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    {content.ghiChu5}
                  </p>
                </td>
              </tr>{" "}
              {/*note LO6*/}
              <tr style={{ height: "34.05pt" }}>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "30.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      6
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "213.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "justify",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Trình bày được các kiến thưc nền tảng liên quan đến đề tài
                      khóa luận
                    </span>
                  </p>
                </td>
                {/*note LO6 sinh vien 1 */}

                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      {content.lo6}
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      C
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    {content.ghiChu6}
                  </p>
                </td>
              </tr>
              {/*note LO7*/}
              <tr style={{ height: "34.05pt" }}>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "30.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      7
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "213.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "justify",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Đánh giá việc hiện thực khóa luận đáp ứng yêu cầu đề tài
                      khóa luận
                    </span>
                  </p>
                </td>
                {/*note LO7 sinh vien 1 */}
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      {content.lo7}
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      C
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    {content.ghiChu7}
                  </p>
                </td>
              </tr>
              {/*note LO8*/}
              <tr style={{ height: "34.05pt" }}>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "30.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      8
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "213.3pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "justify",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Bảo vệ (defend) kết quả khóa luận trước giảng viên phản
                      biện
                    </span>
                  </p>
                </td>
                {/*note LO8 sinh vien 1 */}

                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      {content.lo8}
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      C
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    {content.ghiChu8}
                  </p>
                </td>
              </tr>
              <tr style={{ height: "34.05pt" }}>
                <td
                  colspan="2"
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "243.6pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      KẾT QUẢ
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "77.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}></span>
                    </span>
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Đạt
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}></span>
                    </span>
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Không đạt
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "78pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}></span>
                    </span>
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Đạt
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      <span style={{ fontFamily: "Wingdings" }}></span>
                    </span>
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Không đạt
                    </span>
                  </p>
                </td>
                <td
                  style={{
                    borderTop: "0.5pt solid black",
                    borderLeft: "0.5pt solid black",
                    borderBottom: "0.5pt solid black",
                    borderRight: "0.5pt solid black",
                    paddingTop: "0pt",
                    paddingLeft: "5.4pt",
                    paddingBottom: "0pt",
                    paddingRight: "5.4pt",
                    width: "95.95pt",
                    verticalAlign: "middle",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "2pt",
                      marginBottom: "2pt",
                      textAlign: "center",
                    }}
                  ></p>
                </td>
              </tr>
            </table>
            <p
              style={{
                margin: "0pt",
                minHeight: "1em",
                marginBottom: "0pt",
                lineHeight: "1",
                marginLeft: "5.65pt",
              }}
            >
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                &nbsp;
              </span>
              <span
                style={{
                  fontFamily: " var(--docx-majorHAnsi-font)",
                  color: "rgb(0, 0, 0)",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                <span class="docx-tab-stop"> </span>&nbsp;
              </span>
            </p>
            <p
              style={{
                margin: "0pt",
                minHeight: "1em",
                marginTop: "3pt",
                marginBottom: "3pt",
              }}
            >
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                Nhận xét khác:{" "}
              </span>
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
            </p>
            <p
              style={{
                margin: "0pt",
                minHeight: "1em",
                marginTop: "3pt",
                marginBottom: "3pt",
              }}
            >
              <span
                style={{
                  fontFamily: "Time new roman",
                  minHeight: "12pt",
                  fontSize: "12pt",
                }}
              >
                <span class="docx-tab-stop"> </span>
              </span>
            </p>
            <table
              class="first-row last-row first-col last-col"
              style={{
                width: "477pt",
                tableLayout: "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <colgroup>
                <col style={{ width: "252pt" }} />
                <col style={{ width: "225pt" }} />
              </colgroup>
              <tr style={{ textAign: "center" }}>
                <td
                  style={{
                    width: "252pt",
                    backgroundColor: "inherit",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginLeft: "18pt",
                      textAign: "justify",
                    }}
                  ></p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginLeft: "18pt",
                      textAign: "justify",
                    }}
                  ></p>
                </td>
                <td
                  style={{
                    width: "225pt",
                    backgroundColor: "inherit",
                  }}
                >
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "3pt",
                      marginBottom: "3pt",
                      lineHeight: "1",
                      textAign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: " var(--docx-majorHAnsi-font)",
                        fontStyle: "italic",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      TP. HCM, ngày 24 tháng 5 năm 2023
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "3pt",
                      marginBottom: "3pt",
                      lineHeight: "1",
                      marginLeft: "18pt",
                      textAign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Người đánh giá
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "3pt",
                      marginBottom: "3pt",
                      lineHeight: "1",
                      marginLeft: "18pt",
                      textAign: "center",
                    }}
                  >
                    <span
                      sstyle={{
                        fontFamily: " var(--docx-majorHAnsi-font)",
                        fontStyle: "italic",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      (Ký và ghi rõ họ tên)
                    </span>
                  </p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "6pt",
                    }}
                  ></p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "6pt",
                    }}
                  ></p>
                  <p
                    style={{
                      margin: "0pt",
                      minHeight: "1em",
                      marginTop: "6pt",
                      textAign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Time new roman",
                        fontWeight: "bold",
                        color: "rgb(0, 0, 0)",
                        minHeight: "12pt",
                        fontSize: "12pt",
                      }}
                    >
                      Ths Trần Thị Kim Chi
                    </span>
                  </p>
                </td>
              </tr>
            </table>
            <p></p>
          </article>
        </section>
      </div>
    </div>
  );
}
export default TestHTML;
