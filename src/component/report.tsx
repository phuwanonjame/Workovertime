import React from "react";

function Report({ reportdata, onClose }: any) {
  console.log(reportdata);

  return (
    <div
      className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen"
      lang="th"
    >
      <div className="w-2/5 max-md:w-4/5  rounded-md bg-slate-100 shadow-md">
        <div className="p-5 bg-blue-600  rounded-t-md text-whiteded-t-md flex justify-between">
          <span className="text-xl text-white flex justify-center ">
            {reportdata.DocumentID}
          </span>
          <span className="text-xl text-white cursor-pointer" onClick={onClose}>
            X
          </span>
        </div>
        <div className=" bg-white p-2 max-md:text-sm rounded-b-md">
          <div className="flex justify-between max-md:grid max-md:grid-cols-2 max-md:gap-5 p-5">
            <span>วันที่ออกเอกสาร: {reportdata.startDate}</span>
            <span>สถานที่: {reportdata.location}</span>
            <span>ชื่อกะงาน: {reportdata.shiftName}</span>
           
           
          </div>
          <div className="p-5">
            <p>หมายเหตุ: {reportdata.note}</p>
            </div>
          <div className="flex justify-evenly items-center p-5">
            <p>เริ่มเวลา: {reportdata.startTime}</p>
            <p>สิ้นสุด: {reportdata.endTime}</p>
            <p>เวลารวม: {reportdata.TimeOT} ชั่วโมง</p>

          </div>
          <div className="p-5">
            <span>จำนวนเงินค่าทำงานล่วงเวลา: <span className="text-red-500">{reportdata.PriceOT}</span> บาท</span>
          </div>
    
          </div>
        </div>
      </div>

  );
}

export default Report;
