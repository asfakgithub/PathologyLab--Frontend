<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import "./report.css";
import { Link, useParams } from 'react-router-dom';

function Report() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [result, setResult] = useState({
    medicalHistory: '',
    diagnosys: '',
    medicineAdvice: '',
    advice: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/patient/get/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          setPatient(res.data);
          setStatus(res.data.status || 'Pending');
          if (res.data.result && res.data.result.length > 0) {
            setResult({
              medicalHistory: res.data.result[0].medicalHistory || '',
              diagnosys: res.data.result[0].diagnosys || '',
              medicineAdvice: res.data.result[0].medicineAdvice || '',
              advice: res.data.result[0].advice || ''
            });
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setResult({ ...result, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    setSaving(true);
    fetch(`http://localhost:8000/patient/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        result: [result]
      })
    })
      .then(res => res.json())
      .then(() => setSaving(false))
      .catch(() => setSaving(false));
  };

  if (loading) {
    return <div className='report-page'><div>Loading...</div></div>;
=======
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
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
  }

  return (
    <div className='report-page'>
      <div className='reportDiv'>
        <div className='report-infos'>
<<<<<<< HEAD
          <div className='report-info'>Name : {patient?.name || ''}</div>
          <div className='report-info'>Examined By : {patient?.examinedBy || ''}</div>
        </div>
        <div className='report-inputBlock'>
          <div className='report-tests'>
            <div className='nameOfTest'>Test: {patient?.test || ''}</div>
            <div style={{marginLeft:'auto'}}>
              <label>Status: </label>
              <select value={status} onChange={handleStatusChange} style={{padding:'4px 8px', borderRadius:'4px', border:'1px solid #ccc'}}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className='inputRows'>
            <div className="report-section-group">
              <div className="report-section">
                <div className="section-title">Medical History</div>
                <hr className="section-divider" />
                <textarea value={result.medicalHistory} name="medicalHistory" onChange={handleChange} className="section-textarea" rows={2} placeholder="Enter medical history..." />
              </div>
              <div className="report-section">
                <div className="section-title">Diagnosys</div>
                <hr className="section-divider" />
                <textarea value={result.diagnosys} name="diagnosys" onChange={handleChange} className="section-textarea" rows={2} placeholder="Enter diagnosys..." />
              </div>
              <div className="report-section">
                <div className="section-title">Medicine Advice</div>
                <hr className="section-divider" />
                <textarea value={result.medicineAdvice} name="medicineAdvice" onChange={handleChange} className="section-textarea" rows={2} placeholder="Enter medicine advice..." />
              </div>
              <div className="report-section">
                <div className="section-title">Advice</div>
                <hr className="section-divider" />
                <textarea value={result.advice} name="advice" onChange={handleChange} className="section-textarea" rows={2} placeholder="Enter advice..." />
              </div>
            </div>
            <div className='btn-grp-add-rem'>
              <button className='add-btn-row' onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              <Link to={`/prescription/${id}`} className='add-btn-row'>Report</Link>
=======
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
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
            </div>
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  );
}

export default Report;
=======
  )
}

export default Report
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
