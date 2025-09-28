import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./status.css"
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import Modal from "../../Modal/model"
// import report from '../ReportPage/report';

const Status = () => {
  const [activeBar, setActiveBar] = useState("Pending")
  const [allPatients, setAllPatients] = useState([])
  const [data, setData] = useState([])
  const [clickUpdate, setClickUpdate] = useState(false)
  const [clickedPatient, setClickedPatient] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/patient/getAllPatients")
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          setAllPatients(res.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (activeBar === "Pending") {
      setData(allPatients.filter(p => p.status === "Pending"));
    } else {
      setData(allPatients.filter(p => p.status === "Completed"));
    }
  }, [activeBar, allPatients]);

  const updateIconClick = (item) => {
    // Navigate to report page for update (fetches patient by id)
    navigate(`/report/${item._id}`);
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
        {/* SEARCH BAR */}
        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1.5em 0 1em 0' }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '0.6em 1em',
              borderRadius: '0.5em',
              border: '1.5px solid #0cbbbb',
              fontSize: '1em',
              outline: 'none',
              minWidth: '220px',
              background: '#f8fefe',
              color: '#222',
              boxShadow: '0 1px 4px #b2dfdf33',
              transition: 'border 0.2s, box-shadow 0.2s',
            }}
          />
        </div> */}

        <div className='statusList'>
          {
            data && data.map((item, index) => {
              return (
                <div className='statusRowList' key={item._id}>
                  <div className='statusName'>
                    {item.name}
                  </div>
                  <div className='statusDrDetails'>
                    <div className='statusDrName'>{item.examinedBy}</div>
                    <div className='statusDrName'>{item.reportdate}</div>
                  </div>
                  <div className='statusBtns'>
                    {
                      activeBar === "Pending" ? <div className="icons" style={{ backgroundColor: "yellowgreen" }} onClick={() => { updateIconClick(item) }}><UpdateIcon /></div> : null
                    }
                    {
                      activeBar === "Pending" ? <div className="icons" style={{ backgroundColor: "red" }}><DeleteIcon /></div> : null
                    }
                    <Link to={`/report/${item._id}`} className='icons'>
                      <DescriptionIcon />
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
  {/* Removed unused Modal logic */}
    </div>
  )
}

export default Status