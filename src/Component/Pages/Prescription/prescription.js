import React from 'react'
import "./prescription.css"
import imgLogo from "../../../assests/imgLogo.jpg"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const Prescription = () => {

  const downLoadPDF = () => {
    const input = document.getElementById("pdfDownload");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`name.pdf`);
    });
    // navigate('/');
  };

    return (
      <div className='prescription'>
        <div className='presdownload' id='pdfDownload'>
          <div className='header-logos'>
            <img src={imgLogo} className='presc-logo' />
            <div className='pathologyDesc'>
              <div className='namePathology'>Zoho Pathology</div>
              <div className='addressDetails'>Near Infosys, Hinjewadi Phase 2</div>
              <div className='mobNo'>+91-1234567891</div>
            </div>
          </div>
          <div className='patient-info'>
            <div className='patient-info-row'>
              <div className='info-details'>
                <div className='patient-name-attr'>Name :</div>
                <div className='patient-name-value'>{"Patient Name"}</div>
              </div>
              <div className='info-details-age'>
                <div className='patient-name-attr'>Age :</div>
                <div className='patient-name-value'>{"Patient Age"}</div>
              </div>
              <div className='info-details'>
                <div className='patient-name-attr'>Address :</div>
                <div className='patient-name-value'>{"Patient Address"}</div>
              </div>
            </div>

            <div className='patient-info-row'>
              <div className='info-details'>
                <div className='patient-name-attr'>Examined By :</div>
                <div className='patient-name-value'>{"Patient Examined By"}</div>
              </div>
              <div className='info-details-age'>
                <div className='patient-name-attr'>MobNo:</div>
                <div className='patient-name-value'> {"Patient MobNo"}</div>
              </div>
              <div className='info-details'>
                <div className='patient-name-attr'>Examined Date:</div>
                <div className='patient-name-value'>{"Patient Examined Date"}</div>
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
                  <tr className='finalPresTableRow'>
                    <td>{"test 1"}</td>
                    <td>{"89-100"}</td>
                    <td>{"Ml"}</td>
                    <td>{"95"}</td>
                  </tr>
                </tbody>
              </table>
              <div className='footer-prescription'>
                <div className='examinedBy'>
                  <div className='signature'>
                    <div>Examined By</div>
                    <div>Dr Bashir Ahmed</div>
                  </div>
                  <div className='signature'>
                    <div>Report Date</div>
                    <div>{"Report Date"}</div>
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