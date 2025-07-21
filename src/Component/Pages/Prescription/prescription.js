import React, { useEffect, useState } from 'react'
import "./prescription.css"
import LogoILabU from '../../Images/LogoILabU.png'

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Prescription = () => {
  const { id } = useParams()
  // console.log(id)

  const [patient, setPatientData] = useState(null)
  useEffect(() => {
    handleOnePageLoading()
  }, [])

  const handleOnePageLoading = async () => {
    await axios.get(`http://localhost:8000/patient/get/${id}`).then(response => {
      // console.log(response)
      const data = response.data.data
      setPatientData(data)
    }).catch(err => {
      console.log(err)
    })
  }
  console.log(patient)

  const downLoadPDF = () => {
    const input = document.getElementById("pdfDownload");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${patient?.name}.pdf`);
    });
    // navigate('/');
  };

  return (
    <div className='prescription'>
      <div className='presdownload' id='pdfDownload'>
        <div className='header-logos'>
          <img src={LogoILabU} className='presc-logo' />
          <div className='pathologyDesc'>
            <div className='namePathology'>I LAB YOU</div>
            <div className='addressDetails'>Tarbagan,Dhuliyan,Murshidabad,742202,WestBengal</div>
            <div className='mobNo'>+91-9609436103</div>
          </div>
        </div>
        <div className='patient-info'>
          <div className='patient-info-row'>
            <div className='info-details'>
              <div className='patient-name-attr'>Name :</div>
              <div className='patient-name-value'>{patient?.name}</div>
            </div>
            <div className='info-details-age'>
              <div className='patient-name-attr'>Age :</div>
              <div className='patient-name-value'>{patient?.age}</div>
            </div>
            <div className='info-details'>
              <div className='patient-name-attr'>Address :</div>
              <div className='patient-name-value'>{patient?.address}</div>
            </div>
          </div>

          <div className='patient-info-row'>
            <div className='info-details'>
              <div className='patient-name-attr'>Examined By :</div>
              <div className='patient-name-value'>{patient?.examinedBy}</div>
            </div>
            <div className='info-details-age'>
              <div className='patient-name-attr'>MobNo:</div>
              <div className='patient-name-value'> {patient?.mobileNo} </div>
            </div>
            <div className='info-details'>
              <div className='patient-name-attr'>Examined Date:</div>
              <div className='patient-name-value'>{patient?.examinedDate}</div>
            </div>
          </div>
        </div>

        <div className='result-section'>
          <div className='particular-test'>
            <table className='table'>
              <thead className='thead'>
                <tr>
                  <th></th>
                  <th>Normal Range</th>
                  <th>Unit</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {/* Show subtests if available */}
                {patient?.testData?.subtests && patient.testData.subtests.length > 0 ? (
                  patient.testData.subtests.map((sub, id) => (
                    <tr className='finalPresTableRow' key={sub._id || id}>
                      <td>{sub.name}</td>
                      <td>{sub.normalRange}</td>
                      <td>{sub.unit || ''}</td>
                      <td>{patient?.result?.[id]?.result || ''}</td>
                    </tr>
                  ))
                ) : (
                  patient?.result?.map((item, id) => (
                    <tr className='finalPresTableRow' key={id}>
                      <td>{item.name}</td>
                      <td>{item.range}</td>
                      <td>{item.unit}</td>
                      <td>{item.result}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className='footer-prescription'>
              <div className='examinedBy'>
                <div className='signature'>
                  <div>Tested By</div>
                  <div>Sohel Islam</div>
                </div>
                <div className='signature'>
                  <div>Report Date</div>
                  <div>{patient?.reportDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pdf-down-btn' onClick={downLoadPDF}>
        Download
      </div>
    </div>
  )
}

export default Prescription