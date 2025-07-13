import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./status.css"
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import Modal from "../../Modal/model"
import axios from 'axios';
import noDataImage from "../../../assests/nodatafound.jpg"
// import report from '../ReportPage/report';

const Status = () => {
  // const pendingData = [ 
  //   {
  //     "id": "1",
  //     "name": "Asfak",
  //     "drName": "Nur Alam",
  //     "presDate": "17-06-2025",
  //   },
  //   {
  //     "id": "2",
  //     "name": "Ayan",
  //     "drName": "Tauqeer Ahmed",
  //     "presDate": "20-06-2025",
  //   },
  // ]

  // const completeData = [
  //   {
  //     "id": "1",
  //     "name": "Taseen",
  //     "drName": "Nur Alam",
  //     "presDate": "4-05-2025",
  //   },
  //   {
  //     "id": "2",
  //     "name": "Saba",
  //     "drName": "Tauqeer Ahmed",
  //     "presDate": "10-03-2025",
  //   },
  // ]
  const [activeBar, setActiveBar] = useState("Pending")
  const [data, setData] = useState([])
  const [clickUpdate, setClickUpdate] = useState(false)
  const [clickedPatient, setClickedPatient] = useState(null)

  useEffect(() => {
    fetchPatient()
  }, [activeBar])

  const fetchPatient = async () => {
    await axios.get(`http://localhost:8000/patient/getStatus/${activeBar}`).then(res => {
      setData(res.data.data)
      // console.log(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const updateIconClick = (item) => {
    setClickUpdate(true)
    setClickedPatient(item)
  }

  const deletePatient = async (id) => {
    await axios.delete(`http://localhost:8000/patient/${id}`).then(resp => {
      console.log(resp)
      window.location.reload()
    }).then(err => {
      console.log(err)
    })
  }

  return (
    <div className='statusPage'>
      <div className='statusPageWorkDiv'>
        <div className='statusBar'>
          <div className={`statusTitle ${activeBar === "Pending" ? "activeBarStatus" : null}`}
            onClick={() => { setActiveBar("Pending") }}
          >
            Pending
          </div>
          <div className={`statusTitle ${activeBar === "Completed" ? "activeBarStatus" : null}`}
            onClick={() => { setActiveBar("Completed") }}
          >
            Complete
          </div>
        </div>

        <div className='statusList'>
          {
            data && data.map((item, index) => {
              return (
                <div className='statusRowList'>
                  <div className='statusName'>
                    {item.name}
                  </div>
                  <div className='statusDrDetails'>
                    <div className='statusDrName'>{item?.examinedBy}</div>
                    <div className='statusDrName'>{item?.reportDate}</div>
                  </div>
                  <div className='statusBtns'>
                    {
                      activeBar === "Pending" ? <div className="icons" style={{ backgroundColor: "yellowgreen" }} onClick={() => { updateIconClick(item) }}><UpdateIcon /></div> : null
                    }
                    {
                      activeBar === "Pending" ? <div className="icons" style={{ backgroundColor: "red" }} onClick={() => deletePatient(item._id)}><DeleteIcon /></div> : null
                    }

                    <Link to={activeBar==="Completed"?`/prescription/${item._id}` : `/report/${item._id}`} className='icons'>
                      <DescriptionIcon />
                    </Link>
                  </div>
                </div>
              )
            })
          }
          {
            data.length === 0 && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }} >
              <img width={350} src={noDataImage} />
            </div>
          }
        </div>
      </div>
      {
        clickUpdate && <Modal item={clickedPatient} setOpenCreate={setClickUpdate} />
      }
    </div>
  )
}

export default Status