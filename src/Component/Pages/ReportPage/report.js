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
  }

  return (
    <div className='report-page'>
      <div className='reportDiv'>
        <div className='report-infos'>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;