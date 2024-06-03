import React, { useEffect, useState } from "react";
import Newrequest from "./newrequest";
import axios from "axios";
import Report from "./report";
import { useLocation } from "react-router-dom";

interface OTData {
  DocumentID: string;
  startDate: string;
  startTime: string;
  endTime: string;
  location: string;
  shiftName: string;
  note: string;
  Status: number;
}

function Home({ data }: { data: any }) {
  const location = useLocation();
  const [Statusdata, setStatus] = useState(1);
  const { userData } = location.state || {};
  const [opennew, setOpennew] = useState(false);
  const [openreport, setOpenreport] = useState(false);
  const [dataOT, setDataOT] = useState<OTData[]>([]);
  const [selectedOT, setSelectedOT] = useState<OTData | null>(null);
  const [countdocument, setCountdocument] = useState(0);

  console.log(userData?.[0]?.ID_user);

  const toggleReport = () => {
    setOpenreport(!openreport);
  };

  const toggleNewRequest = () => {
    setOpennew(!opennew);
  };

  useEffect(() => {
    if (userData?.length > 0) {
      axios
        .get("https://serverworkot.onrender.com/loadworkOT", {
          params: { ID_user: userData[0].ID_user },
        })
        .then((response) => {
          console.log("Data loaded successfully:", response.data);
          setDataOT(response.data.users);
          setCountdocument(response.data.count);
          console.log("จำนวนเอกสาร", countdocument);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        });
    }
  }, [userData]);

  return (
    <div className="w-screen h-[865px] bg-slate-100 flex justify-center items-center">
      <div className="p-5 w-full h-full max-h-[865px]">
        <div className="bg-white p-2 h-full flex flex-col justify-between max-md:justify-center max-md:items-center">
          <div className="text-2xl">
            <p>ระบบขอค่าปฎิบัติงานล่วงเวลา OT</p>
          </div>
          <div className="mt-5 flex justify-evenly max-md:hidden">
            <div>
              <span>วันที่เริ่มต้น</span>
              <input
                type="date"
                className="ml-5 p-2 w-50 rounded-md bg-sky-200 focus:outline-none"
              />
            </div>
            <div>
              <span>วันที่สิ้นสุด</span>
              <input
                type="date"
                className="ml-5 p-2 w-50 rounded-md bg-sky-200 focus:outline-none"
              />
            </div>
          </div>
          <div className="">
            <div className="flex flex-row max-md:grid max-md:grid-cols-2 max-md:justify-center max-md:items-center max-md:w-full max-md:mt-5  gap-10 mt-2">
              <div
                className="cursor-pointer hover:opacity-50 shadow-md p-2  max-md:text-center max-md:p-1 max-md:rounded-md max-md:text-black"
                onClick={toggleNewRequest}
              >
                <i className="fa-solid fa-plus"></i>
                <span className="p-2">เพิ่มข้อมูลใหม่</span>
              </div>
              <div className="cursor-pointer hover:opacity-50  max-md:text-center max-md:text-black max-md:p-1 max-md:rounded-md  p-2 rounded-md  shadow-md " style={{ backgroundColor: Statusdata === 1 ? "#0C56F5" : "", color: Statusdata===1?"#FFFFFF":"" }}>
                <i className="fa-solid fa-file-export text-green-400 "  ></i>
                <span className="p-2" onClick={() => setStatus(1)}>
                  ขออนุมัติ
                </span>
              </div>
              <div className="cursor-pointer hover:opacity-50 max-md:text-black max-md:text-center max-md:p-1 max-md:rounded-md  p-2 rounded-md shadow-md " style={{ backgroundColor: Statusdata === 0 ? "#0C56F5" : "" ,color: Statusdata===0?"#FFFFFF":"" }}>
                <i className="fa-solid fa-ban text-red-400 "></i>
                <span className="p-2" onClick={() => setStatus(0)}>
                  ยกเลิกขออนุมัติ
                </span>
              </div>
              <div className="cursor-pointer hover:opacity-50 max-md:text-black max-md:text-center max-md:p-1 max-md:rounded-md  p-2 rounded-md shadow-md " style={{ backgroundColor: Statusdata === 2 ? "#0C56F5":"" ,color: Statusdata===2?"#FFFFFF":""}}>
                <i className="fa-solid fa-trash text-indigo-700 max-md:text-red-600"></i>
                <span className="p-2" onClick={() => setStatus(2)}>
                  ลบ
                </span>
              </div>
            </div>
          </div>

          {dataOT.length > 0 && (
            <div className="w-full flex-grow flex justify-center bg-neutral-100 rounded-md mt-5">
              <div className="w-full">
                <table className="w-full max-md:text-sm">
                  <thead className="border  border-black bg-blue-800 text-white">
                    <tr>
                      <th>เลขที่เอกสาร</th>
                      <th>วันที่</th>
                      <th className="max-md:hidden">เวลาเริ่มต้น</th>
                      <th className="max-md:hidden">เวลาสิ้นสุด</th>
                      <th>สถานที่</th>
                      <th className="max-md:hidden">ชื่อกะงาน</th>
                      <th className="max-md:hidden">หมายเหตุ</th>
                      <th>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOT
                      .filter((row) => row.Status === Statusdata)
                      .map((row, index) => (
                        <tr
                          key={index}
                          className="text-center hover:cursor-pointer hover:bg-slate-300"
                          onClick={() => {
                            setSelectedOT(row);
                            setOpenreport(true);
                          }}
                        >
                          <td className="border-r border-l max-md:pb-1 border-b border-black p-2">
                            {row.DocumentID}
                          </td>
                          <td className="border-r border-b max-md:p-0 border-black p-2">
                            {row.startDate}
                          </td>
                          <td className="border-r border-b max-md:hidden max-md:p-0 border-black p-2">
                            {row.startTime}
                          </td>
                          <td className="border-r border-b max-md:hidden border-black p-2">
                            {row.endTime}
                          </td>
                          <td className="border-r border-b max-md:p-0 border-black p-2">
                            {row.location}
                          </td>
                          <td className="border-r border-b max-md:hidden max-md:p-0 border-black p-2">
                            {row.shiftName}
                          </td>
                          <td className="border-r max-md:hidden border-b max-md:p-0 border-black p-2">
                            {row.note}
                          </td>
                          <td
                            className="border-r border-b max-md:p-0 border-black p-2"
                            style={{
                              color:
                                row.Status === 1
                                  ? "green"
                                  : row.Status === 0
                                  ? "red"
                                  : row.Status === 2
                                  ? "blue"
                                  : "",
                            }}
                          >
                            {row.Status === 1
                              ? "รออนุมัติ"
                              : row.Status === 0
                              ? "ยกเลิก"
                              : row.Status === 2
                              ? "สำเร็จ"
                              : ""}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {dataOT.length === 0 && (
            <div className="w-full flex-grow flex justify-center items-center bg-neutral-100 rounded-md mt-5">
              <div className="p-5 flex flex-col justify-center items-center ">
                <img
                  src="https://cdn-icons-png.freepik.com/512/7466/7466073.png"
                  width={300}
                  alt="No data"
                />
                <span className="text-2xl">ไม่พบข้อมูล</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {opennew && (
        <Newrequest
          data2={data}
          countdc={countdocument}
          onClose={toggleNewRequest}
        />
      )}
      {openreport && (
        <Report reportdata={selectedOT} onClose={toggleReport} />
      )}
    </div>
  );
}

export default Home;
