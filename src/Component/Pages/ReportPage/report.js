import React, { useEffect, useState } from 'react'
import "./report.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function Report() {
  const { id } = useParams()
  // console.log(id)
  const [patientDetails, setPatientDetails] = useState(null);
  const [testData, setTestData] = useState(null)

  useEffect(() => {
    fetchedOnLoading()
  }, []) // fix: add dependency array

  // console.log(patientDetails);
  // console.log(testData)

  const fetchedOnLoading = async () => {
    await axios.get(`http://localhost:8000/patient/${id}/testDetails`).then(response => {
      // console.log(response)
      const patData = response.data.patient;
      const testData = response.data.test;
      setPatientDetails(patData)
      setTestData(testData)
    }).then(err => {
      console.log(err)
    })
  }


  const [inputField, setInputField] = useState([{ "id": 0, "name": "", "range": "", "unit": "", "result": "" }])
  const onchangeInput = (event, index) => {
    const updateRow = inputField.map(row => {
      if (row.id == index) {
        return { ...row, [event.target.name]: event.target.value }
      }
      return row
    })
    setInputField(updateRow)
  }
  const addinputRows = () => {
    const newRow = {
      id: inputField.length + 1, "name": "", "range": "", "unit": "", "result": ""
    }
    setInputField([...inputField, newRow])
  }
  // console.log(inputField)

  const removeRows = () => {
    if (inputField.length > 1) {
      setInputField(inputField.slice(0, -1))
    }
  }

  const handleFinalSubmit = async () => {
    await axios.put(`http://localhost:8000/patient/${patientDetails?._id}`,
      {
        ...patientDetails, result: inputField, status: "Completed"
      }).then(resp => {
        console.log(resp)
      }).catch(err => {
        console.log(err)

      })
  }

  return (
    <div className='report-page'>
      <div className='reportDiv'>
        <div className='report-infos'>
          <div className='report-info'>Name : {patientDetails?.name}</div>
          <div className='report-info'>Examined By : {patientDetails?.examinedBy}</div>
        </div>
        <div className='report-inputBlock'>
          <div className='report-tests'>
            <div className='nameOfTest'>{testData?.name}</div>
          </div>
          {/* Subtest-aware input rows */}
          <div className='inputRows'>
            {testData?.subtests && testData.subtests.length > 0 ? (
              testData.subtests.map((sub, index) => (
                <div className='inputRow' key={sub._id || index}>
                  <div className="input-row-group">
                    <div className='input-test-name'>Subtest Name</div>
                    <input type='text' value={inputField[index]?.name || sub.name} name='name' onChange={(e) => { onchangeInput(e, index) }} className='input-field-tests' />
                  </div>
                  <div className="input-row-group">
                    <div className='input-test-name'>Normal Range</div>
                    <input type='text' value={inputField[index]?.range || sub.normalRange} name='range' onChange={(e) => { onchangeInput(e, index) }} className='input-field-tests' />
                  </div>
                  <div className="input-row-group">
                    <div className='input-test-name'>Unit</div>
                    <input type='text' value={inputField[index]?.unit || ''} name='unit' onChange={(e) => { onchangeInput(e, index) }} className='input-field-tests' />
                  </div>
                  <div className="input-row-group">
                    <div className='input-test-name'>Result</div>
                    <input type='text' value={inputField[index]?.result || ''} name='result' onChange={(e) => { onchangeInput(e, index) }} className='input-field-tests' />
                  </div>
                </div>
              ))
            ) : (
              inputField.map((item, index) => (
                <div className='inputRow' key={item.id}>
                  <div className="input-row-group">
                    <div className='input-test-name'>Test Name</div>
                    <input type='text' value={item.name} name='name' onChange={(e) => { onchangeInput(e, item.id) }} className='input-field-tests' />
                  </div>
                  <div className="input-row-group">
                    <div className='input-test-name'>Normal Range</div>
                    <input type='text' value={item.range} name='range' onChange={(e) => { onchangeInput(e, item.id) }} className='input-field-tests' />
                  </div>
                  <div className="input-row-group">
                    <div className='input-test-name'>Unit</div>
                    <input type='text' value={item.unit} name='unit' onChange={(e) => { onchangeInput(e, item.id) }} className='input-field-tests' />
                  </div>
                  <div className="input-row-group">
                    <div className='input-test-name'>Result</div>
                    <input type='text' value={item.result} name='result' onChange={(e) => { onchangeInput(e, item.id) }} className='input-field-tests' />
                  </div>
                </div>
              ))
            )}
            <div className='btn-grp-add-rem'>
              {/* Hide add/remove if subtests exist */}
              {!(testData?.subtests && testData.subtests.length > 0) && (
                <>
                  <div className='add-btn-row' onClick={addinputRows}>Add</div>
                  {inputField.length > 1 ? <div className='add-btn-row' onClick={removeRows}>Remove</div> : null}
                </>
              )}
              <Link to={`/prescription/${id}`} className='add-btn-row' onClick={handleFinalSubmit}>Report</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report