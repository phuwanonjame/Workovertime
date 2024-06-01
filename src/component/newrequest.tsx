import axios from "axios";
import React, { useEffect, useState } from "react";

interface DataRow {
  DocumentID: string;
  startDate: string;
  location: string;
  shiftName: string;
  startTime: string;
  endTime: string;
  TimeOT: number;
  PriceOT: number;
  note: string;
  ID_user?: number;
  Status: number;
}

function Newrequest({ onClose, data2, countdc }: any) {
  console.log("จำนวนเอกสารที่ส่งมา", countdc);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateDocumentNumber = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `MSC-${year}${month}${day}${countdc + 1}`;
  };

  const [data, setData] = useState<DataRow[]>([]);
  const [newData, setNewData] = useState<DataRow>({
    DocumentID: "",
    startDate: "",
    location: "",
    shiftName: "",
    startTime: "",
    endTime: "",
    TimeOT: 0,
    PriceOT: 0,
    note: "",
    Status: 1,
  });

  const handleNewDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DataRow
  ) => {
    setNewData({ ...newData, [field]: e.target.value });
  };

  const addDataRow = () => {
    const { startDate, location, shiftName, startTime, endTime, note } = newData;

    if (!startDate || !location || !shiftName || !startTime || !endTime || !note) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }

    const startDateTime = new Date(startDate);
    const dayOfWeek = startDateTime.getDay();
    console.log("วันที่:", dayOfWeek);

    const startTimeDate = new Date(`1970-01-01T${startTime}:00`);
    const endTimeDate = new Date(`1970-01-01T${endTime}:00`);
    const TimeOT = (endTimeDate.getTime() - startTimeDate.getTime()) / (1000 * 60 * 60);
    const hourlyRate = (18000 / 30) / 8;
    console.log(hourlyRate);

    let otMultiplier = 1;

    
    if (dayOfWeek >= 1 && dayOfWeek <= 5) { 
        if (startTimeDate.getHours() >= 18) {
            otMultiplier = 1;
        }
    } else if (dayOfWeek === 0 || dayOfWeek === 6) { 
        otMultiplier = 1;
        if (startTimeDate.getHours() >= 18) {
            otMultiplier = 3;
        }
    }

    const PriceOT = hourlyRate * TimeOT * otMultiplier;
    console.log(PriceOT);

    if (TimeOT > 0) {
        setData([
            ...data,
            { ...newData, TimeOT, PriceOT, ID_user: data2[0]?.ID_user, DocumentID: generateDocumentNumber(), Status: 1 },
        ]);
        setNewData({
            DocumentID: "",
            startDate: "",
            location: "",
            shiftName: "",
            startTime: "",
            endTime: "",
            TimeOT: 0,
            PriceOT: 0,
            note: "",
            Status: 1,
        });
    } else {
        alert("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น");
    }
};


  function addworkOT() {
    console.table(newData);

    axios
      .post("https://serverworkot.onrender.com/request", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("ส่งข้อมูลสำเร็จ");
          setNewData({
            DocumentID: "",
            startDate: "",
            location: "",
            shiftName: "",
            startTime: "",
            endTime: "",
            TimeOT: 0,
            PriceOT: 0,
            note: "",
            Status: 1,
          });
        } else {
          console.log("ไม่สามารถส่งข้อมูลได้");
        }
      })
      .catch((error) => {
        console.error(error, "ไม่สามารถส่งข้อมูลได้");
      });
  }

  const deleteDataRow = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen" lang="th">
      <div className="w-4/5 h-4/5 max-md:w-full max-md:h-full rounded-md">
        <div className="p-5">
          <div className="p-5 bg-blue-600 ro32 rounded-md text-whiteded-t-md flex justify-between">
            <span className="text-xl text-white">New-ขอค่าปฏิบัติงานล่วงเวลา</span>
            <span className="text-xl text-white cursor-pointer" onClick={onClose}>
              X
            </span>
          </div>
          <div className="bg-slate-100 p-2 rounded-b-md shadow-md">
            <div className="bg-slate-300 shadow-md p-5 max-md:text-sm">
              <div className="flex  max-md:flex-col max-md:items-baseline   items-center">
                <span>เลขที่เอกสาร:</span>
                <input
                  className="ml-2 rounded-md focus:outline-none p-1 text-center"
                  type="text"
                  value={generateDocumentNumber()}
                  readOnly
                />
                <span className="ml-2 max-md:mt-2">วันที่เอกสาร:</span>
                <input
                  className="ml-2 rounded-md focus:outline-none p-1 text-center"
                  type="date"
                  value={formatDate(new Date())}
                  readOnly
                />
              </div>
              <div className="mt-5 max-md:flex-col max-md:items-baseline  flex  items-center">
                <span>รหัสพนักงาน:</span>
                {data2.length > 0 ? (
                  <input
                    className="ml-2 rounded-md  focus:outline-none p-1 text-center"
                    type="text"
                    value={`${data2[0].ID_user}`}
                    readOnly
                  />
                ) : null}
                {data2.length > 0 ? (
                  <input
                    className="ml-2 rounded-md max-md:mt-2 focus:outline-none p-1 text-center"
                    type="text"
                    value={`${data2[0].Firstname} ${data2[0].Lastname}`}
                    readOnly
                  />
                ) : null}
              </div>
              <div className="mt-5 flex items-center">
                <span className="w-20">หน่วยงาน:</span>
                {data2.length > 0 ? (
                  <input
                    className="ml-2 rounded-md focus:outline-none p-1 w-72 text-center"
                    type="text"
                    value={data2[0].Department.Dname}
                    readOnly
                  />
                ) : null}
              </div>
              <div className="mt-5 flex items-center">
                <span className="w-20">ตำแหน่ง:</span>
                {data2.length > 0 ? (
                  <input
                    className="ml-2 rounded-md focus:outline-none p-1 text-center"
                    type="text"
                    value={data2[0].Department.position}
                    readOnly
                  />
                ) : null}
              </div>
              <div className="mt-5 flex items-center">
                <span className="w-20">รายละเอียด:</span>
                <textarea className="ml-2 rounded-md focus:outline-none p-1 w-3/5"></textarea>
              </div>
            </div>
            <div className="mt-5 h-72 overflow-auto">
              <table className="w-full text-center border">
                <thead className="border max-md:text-sm border-black bg-blue-800 text-white">
                  <tr>
                    <th>วันที่</th>
                    <th>เวลาเริ่มต้น</th>
                    <th>เวลาสิ้นสุด</th>
                    <th>สถานที่</th>
                    <th>ชื่อกะงาน</th>
                    <th>หมายเหตุ</th>
                    <th>การกระทำ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td className="border-r border-black p-2">{row.startDate}</td>
                      <td className="border-r border-black">{row.startTime}</td>
                      <td className="border-r border-black">{row.endTime}</td>
                      <td className="border-r border-black">{row.location}</td>
                      <td className="border-r border-black">{row.shiftName}</td>
                      <td className="border-r border-black">{row.note}</td>
                      <td className="border-r border-black">
                        <button onClick={() => deleteDataRow(index)}>ลบ</button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="border-r border-black p-2">
                      <input
                        type="date"
                        className="rounded-md focus:outline-none text-center p-1"
                        value={newData.startDate}
                        onChange={(e) => handleNewDataChange(e, "startDate")}
                      />
                    </td>
                    <td className="border-r border-black">
                      <input
                        type="time"
                        className="rounded-md focus:outline-none text-center p-1"
                        value={newData.startTime}
                        onChange={(e) => handleNewDataChange(e, "startTime")}
                      />
                    </td>

                    <td className="border-r border-black">
                      <input
                        type="time"
                        className="rounded-md focus:outline-none text-center p-1"
                        value={newData.endTime}
                        onChange={(e) => handleNewDataChange(e, "endTime")}
                      />
                    </td>
                    <td className="border-r border-black">
                      <input
                        type="text"
                        className="rounded-md focus:outline-none text-center p-1"
                        value={newData.location}
                        onChange={(e) => handleNewDataChange(e, "location")}
                      />
                    </td>
                    <td className="border-r border-black">
                      <input
                        type="text"
                        className="rounded-md focus:outline-none text-center p-1"
                        value={newData.shiftName}
                        onChange={(e) => handleNewDataChange(e, "shiftName")}
                      />
                    </td>
                    <td className="border-r border-black">
                      <input
                        type="text"
                        className="rounded-md focus:outline-none text-center p-1"
                        value={newData.note}
                        onChange={(e) => handleNewDataChange(e, "note")}
                      />
                    </td>
                    <td className="cursor-pointer border-r border-black max-md:p-5 max-md:bg-blue-700" onClick={addDataRow}>
                      เพิ่ม
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <button
                className="p-2 bg-blue-600 w-32 rounded-md text-white hover:opacity-50"
                onClick={() => addworkOT()}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newrequest;
