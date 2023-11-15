import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";

import { Box } from '@mui/material'
// import { DataGrid } from '@mui/x-data-grid'

interface Attendance {
    _id: string;
    date: string;
    check_in: string;
    check_out: string;
    status: string;
  }

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'check_in', headerName: 'Check_IN', width: 130 },
  {
      field: 'check_out',
      headerName: 'Check_Out',
      width: 90,
  },
  {
      field: 'status',
      headerName: 'Status',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,

  },
];

function Attandenceform() {

  const params = useParams()
  const [list, setList] = useState([])
  const [id,setId]=useState("")
  const [isChenkingOut,setCheckOut]=useState(false)
  let [loading, setLoading] = useState(true);

  const LoadData = async () => {
      const res = await axios.get(`/loginUserAttendance/${localStorage.getItem("userID")}`, {

          headers: {
              "Content-Type": "application/json"
          }
      })
     
      if (res.status === 201) {
          await setList(res.data.attendanceList)
          setTimeout(() => {
              setLoading(false)
          }, 3000)
      } else {
          console.log("error")
      }
  }


  useEffect(() => {
      LoadData()
  }, [])


  const UpdateCheckout = (id: string) => {
    console.log('updating id', id);
    setId(id);
    setCheckOut(true);
  };


  console.log(
    'my list',
    list.length > 0 ? list.map((cur) => cur._id) : 'null'
  );

  let data: Attendance[] = list.map((cur) => cur);


  return (
    <>
        <Box style={{ height: 400, width: '80%', margin: 'auto' }}>

{!isChenkingOut ? <>
    {/* <Attendenceform attendanceHeading={"Attendance Form"} />
    <Attendence /> */}

    <table>
        <tr style={{ justifyContent: "space-between" }}>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Check_in</th>
            <th>Check_out</th>
            <th>Status</th>

        </tr>
        {list.map((cur, i) => {
            // console.log(cur._id)
           return (
                <tr key={i}>
                    <td>{localStorage.getItem("userName")}</td>
                     <td>{cur.date}</td>
                    <td>{cur.check_in}</td>
                    <td>{cur.check_out}
                    <button className='btn btn-primary ml-2' onClick={() => UpdateCheckout(cur._id)}>UPDATE</button>
                    </td>
                    <td>{cur.status}</td> 


                </tr>
            )
        })

        }


    </table>
    </> :

<>
<div>
{/* <Attendenceform attendanceHeading={"Mark Check_out time"} /> */}
{/* <UpdateCheckoutTime id={id}/> */}
    
</div>
</>}
</Box>
    </>
  )
}

export default Attandenceform
