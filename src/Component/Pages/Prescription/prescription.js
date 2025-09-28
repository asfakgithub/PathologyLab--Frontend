<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import "./prescription.css";
import imgLogo from "../../../assests/imgLogo.jpg";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';

const Prescription = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; 
    fetch(`http://localhost:8000/patient/get/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          setPatient(res.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);
=======
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
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587

  const downLoadPDF = () => {
    const input = document.getElementById("pdfDownload");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
<<<<<<< HEAD
      pdf.save(`${patient?.name || 'prescription'}.pdf`);
    });
  };

  if (loading) {
    return <div className='prescription'><div>Loading...</div></div>;
  }

=======
      pdf.save(`${patient?.name}.pdf`);
    });
    // navigate('/');
  };

>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
  return (
    <div className='prescription'>
      <div className='presdownload' id='pdfDownload'>
        <div className='header-logos'>
<<<<<<< HEAD
          <img src={imgLogo} className='presc-logo' alt="Logo" />
          <div className='PrescriptionDesc'>
            <div className='namePrescription'>Sohel's Prescription</div>
            <div className='addressDetails'>Near Infosys, Hinjewadi Phase 2</div>
            <div className='mobNo'>+91-1234567891</div>
=======
          <img src={LogoILabU} className='presc-logo' />
          <div className='pathologyDesc'>
            <div className='namePathology'>I LAB YOU</div>
            <div className='addressDetails'>Tarbagan,Dhuliyan,Murshidabad,742202,WestBengal</div>
            <div className='mobNo'>+91-9609436103</div>
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
          </div>
        </div>
        <div className='patient-info'>
          <div className='patient-info-row'>
            <div className='info-details'>
              <div className='patient-name-attr'>Name :</div>
<<<<<<< HEAD
              <div className='patient-name-value'>{patient?.name || ''}</div>
            </div>
            <div className='info-details-age'>
              <div className='patient-name-attr'>Age :</div>
              <div className='patient-name-value'>{patient?.age || ''}</div>
            </div>
            <div className='info-details'>
              <div className='patient-name-attr'>Address :</div>
              <div className='patient-name-value'>{patient?.address || ''}</div>
=======
              <div className='patient-name-value'>{patient?.name}</div>
            </div>
            <div className='info-details-age'>
              <div className='patient-name-attr'>Age :</div>
              <div className='patient-name-value'>{patient?.age}</div>
            </div>
            <div className='info-details'>
              <div className='patient-name-attr'>Address :</div>
              <div className='patient-name-value'>{patient?.address}</div>
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
            </div>
          </div>

          <div className='patient-info-row'>
            <div className='info-details'>
              <div className='patient-name-attr'>Examined By :</div>
<<<<<<< HEAD
              <div className='patient-name-value'>{patient?.examinedBy || ''}</div>
            </div>
            <div className='info-details-age'>
              <div className='patient-name-attr'>MobNo:</div>
              <div className='patient-name-value'>{patient?.mobileNo || ''}</div>
            </div>
            <div className='info-details'>
              <div className='patient-name-attr'>Examined Date:</div>
              <div className='patient-name-value'>{patient?.examinedDate || ''}</div>
=======
              <div className='patient-name-value'>{patient?.examinedBy}</div>
            </div>
            <div className='info-details-age'>
              <div className='patient-name-attr'>MobNo:</div>
              <div className='patient-name-value'> {patient?.mobileNo} </div>
            </div>
            <div className='info-details'>
              <div className='patient-name-attr'>Examined Date:</div>
              <div className='patient-name-value'>{patient?.examinedDate}</div>
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
            </div>
          </div>
        </div>

        <div className='result-section'>
<<<<<<< HEAD
          <div className='pres-section-group'>
             <div className='pres-section'>
              <div className='section-title'>Initial Complain</div>
              <hr className='section-divider' />
              <div className='section-content'>{patient?.result?.[0]?.initialComplain || ''}</div>
            </div>
            <div className='pres-section'>
              <div className='section-title'>Medical History</div>
              <hr className='section-divider' />
              <div className='section-content'>{patient?.result?.[0]?.medicalHistory || ''}</div>
            </div>
            <div className='pres-section'>
              <div className='section-title'>Diagnosys</div>
              <hr className='section-divider' />
                            <div className='section-content'>{"BP:- 100/80 "}</div>
                            <div className='section-content'>{"Diabetics:- 300 "}</div>
                            <div className='section-content'>{"SP02:- 90 "}</div>

              <div className='section-content'>{patient?.result?.[0]?.diagnosys || ''}</div>
      
            </div>
            <div className='pres-section'>
              <div className='section-title'>Medicine Prescribed</div>
              <hr className='section-divider' />
               <div className='section-content'>{"Tab:- Paracitamol 1000mg 1/day before Dinner "}</div>
                            <div className='section-content'>{"Tab:- Viagra 1000mg 1/day before seys "}</div>
                            <div className='section-content'>{"Syrup :- Japani oil 10ml 2wise a day"}</div>
              <div className='section-content'>{patient?.result?.[0]?.medicineAdvice || ''}</div>
            </div>
            <div className='pres-section'>
              <div className='section-title'>Advice</div>
              <hr className='section-divider' />
              <div className='section-content'>{patient?.result?.[0]?.advice || ''}</div>
            </div>
          </div>
          <div className='footer-prescription'>
            <div className='examinedBy'>
              <div className='signature'>
                <div>Examined By</div>
                <div>{patient?.examinedBy || ''}</div>
              </div>
              <div className='signature'>
                <div>Next Visit:-</div>
                <div>{patient?.reportdate || ''}</div>
=======
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
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pdf-down-btn' onClick={downLoadPDF}>
        Download
      </div>
    </div>
<<<<<<< HEAD
  );
}

export default Prescription;
=======
  )
}

export default Prescription
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
