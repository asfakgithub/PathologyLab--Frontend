<<<<<<< HEAD


import React, { useState } from 'react';
import "./model.css";

const initialState = {
    name: '',
    status: 'Pending',
    age: '',
    address: '',
    mobileNo: '',
    examinedBy: '',
    examinedDate: '',
        test: '6520b1f4e6a1c2b7d8e9f013',
    reportdate: '',
    result: [{
        medicalHistory: 'N/A',
        diagnosys: 'Height:XX,Weigth:XXX,BP:XXX,SUGAR LEVEL:XXXX',
        medicineAdvice: 'N/A',
        advice: 'N/A',
    }],
};

const steps = [
    'Basic Info',
    'Exam Details',
    'Test & Dates',
    'Medical Result',
    // 'Upload File',
];

function Model({ setOpenCreate, item }) {
    const [input, setInput] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const [step, setStep] = useState(0);

    const handleInputs = (event) => {
        const { name, value } = event.target;
        if (name.startsWith('result.')) {
            const key = name.split('.')[1];
            setInput((prev) => ({
                ...prev,
                result: [{ ...prev.result[0], [key]: value }],
            }));
        } else {
            setInput((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Step-wise validation
    const validateStep = () => {
        const newErrors = {};
        if (step === 0) {
            if (!input.name) newErrors.name = 'Name is required';
            if (!input.age || isNaN(input.age)) newErrors.age = 'Valid age is required';
            if (!input.address) newErrors.address = 'Address is required';
            if (!/^\d{10}$/.test(input.mobileNo)) newErrors.mobileNo = 'Valid 10-digit mobile number required';
        } else if (step === 1) {
            if (!input.examinedBy) newErrors.examinedBy = 'Examined By is required';
            if (!input.examinedDate) newErrors.examinedDate = 'Examined Date is required';
        } else if (step === 2) {
            if (!input.test) newErrors.test = 'Test is required';
            if (!input.reportdate) newErrors.reportdate = 'Report Date is required';
        } else if (step === 3) {
            if (!input.result[0].medicalHistory) newErrors.medicalHistory = 'Medical History is required';
            if (!input.result[0].diagnosys) newErrors.diagnosys = 'Diagnosys is required';
            if (!input.result[0].medicineAdvice) newErrors.medicineAdvice = 'Medicine Advice is required';
            if (!input.result[0].advice) newErrors.advice = 'Advice is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (validateStep()) setStep((prev) => prev + 1);
    };

    const handleBack = (e) => {
        e.preventDefault();
        setErrors({});
        setStep((prev) => prev - 1);
    };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!validateStep()) return;
            const payload = { ...input };
            // Remove file from payload if not needed
            try {
                const response = await fetch('http://localhost:8000/patient/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                if (response.ok) {
                    alert('Patient created successfully!');
                    setInput(initialState);
                    setFile(null);
                    setErrors({});
                    setStep(0);
                    setOpenCreate(false);
                } else {
                    const err = await response.json();
                    alert('Error: ' + (err.message || 'Failed to create patient.'));
                }
            } catch (error) {
                alert('Network error: ' + error.message);
            }
        };

    const handleClear = () => {
        setInput(initialState);
        setFile(null);
        setErrors({});
        setStep(0);
    };


        return (
            <div className='model'>
                <div className='model-card'>
                    <div className='model-titleBox'>
                        <div className='model-title'>{item ? 'Update Patient' : 'Create New'}</div>
                        <div className='x-btn' onClick={() => setOpenCreate((prev) => !prev)}>X</div>
                    </div>
                    <form className='model-body' onSubmit={step === steps.length - 1 ? handleSubmit : handleNext} encType='multipart/form-data'>
                        {/* Stepper */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                            {steps.map((label, idx) => (
                                <div key={label} style={{
                                    padding: '0 10px',
                                    fontWeight: step === idx ? 700 : 400,
                                    color: step === idx ? '#0cbbbb' : '#b2dfdf',
                                    borderBottom: step === idx ? '2.5px solid #0cbbbb' : '2.5px solid #e0e0e0',
                                    fontSize: 15,
                                    transition: 'all 0.2s',
                                    minWidth: 80,
                                    textAlign: 'center',
                                }}>{label}</div>
                            ))}
                        </div>

                        {/* Step 0: Basic Info */}
                        {step === 0 && (
                            <>
                                <div className='inputRowModel'>
                                    <div className='inputBox'>
                                        <div className='input-label'>Name</div>
                                        <input type='text' name='name' value={input.name} onChange={handleInputs} className='input-model' placeholder='Enter a name' />
                                        {errors.name && <div style={{ color: 'red', fontSize: 12 }}>{errors.name}</div>}
                                    </div>
                                    <div className='inputBox'>
                                        <div className='input-label'>Age</div>
                                        <input type='text' name='age' value={input.age} onChange={handleInputs} className='input-model' placeholder='Enter Age' />
                                        {errors.age && <div style={{ color: 'red', fontSize: 12 }}>{errors.age}</div>}
                                    </div>
                                </div>
                                <div className='inputRowModel'>
                                    <div className='inputBox'>
                                        <div className='input-label'>Address</div>
                                        <input type='text' name='address' value={input.address} onChange={handleInputs} className='input-model' placeholder='Enter Address' />
                                        {errors.address && <div style={{ color: 'red', fontSize: 12 }}>{errors.address}</div>}
                                    </div>
                                    <div className='inputBox'>
                                        <div className='input-label'>Mobile No</div>
                                        <input type='text' name='mobileNo' value={input.mobileNo} onChange={handleInputs} className='input-model' placeholder='Enter Mobile No' />
                                        {errors.mobileNo && <div style={{ color: 'red', fontSize: 12 }}>{errors.mobileNo}</div>}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 1: Exam Details */}
                        {step === 1 && (
                            <div className='inputRowModel'>
                                <div className='inputBox'>
                                    <div className='input-label'>Examined By</div>
                                    <input type='text' name='examinedBy' value={input.examinedBy} onChange={handleInputs} className='input-model' placeholder='Examined By' />
                                    {errors.examinedBy && <div style={{ color: 'red', fontSize: 12 }}>{errors.examinedBy}</div>}
                                </div>
                                <div className='inputBox'>
                                    <div className='input-label'>Examined Date</div>
                                    <input type='date' name='examinedDate' value={input.examinedDate} onChange={handleInputs} className='input-model' placeholder='Examined Date' />
                                    {errors.examinedDate && <div style={{ color: 'red', fontSize: 12 }}>{errors.examinedDate}</div>}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Test & Dates */}
                        {step === 2 && (
                            <div className='inputRowModel'>
                                <div className='inputBox'>
                                    <div className='input-label'>Test</div>
                                    <input type='text' name='test' value={input.test} onChange={handleInputs} className='input-model' placeholder='Test ID' />
                                    {errors.test && <div style={{ color: 'red', fontSize: 12 }}>{errors.test}</div>}
                                </div>
                                <div className='inputBox'>
                                    <div className='input-label'>Report Date</div>
                                    <input type='date' name='reportdate' value={input.reportdate} onChange={handleInputs} className='input-model' placeholder='Report Date' />
                                    {errors.reportdate && <div style={{ color: 'red', fontSize: 12 }}>{errors.reportdate}</div>}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Medical Result */}
                        {step === 3 && (
                            <>
                                <div className='inputRowModel'>
                                    <div className='inputBox'>
                                        <div className='input-label'>Medical History</div>
                                        <textarea name='result.medicalHistory' value={input.result[0].medicalHistory} onChange={handleInputs} className='input-model' placeholder='Medical History' />
                                        {errors.medicalHistory && <div style={{ color: 'red', fontSize: 12 }}>{errors.medicalHistory}</div>}
                                    </div>
                                    <div className='inputBox'>
                                        <div className='input-label'>Diagnosys</div>
                                        <textarea name='result.diagnosys' value={input.result[0].diagnosys} onChange={handleInputs} className='input-model' placeholder='Diagnosys' />
                                        {errors.diagnosys && <div style={{ color: 'red', fontSize: 12 }}>{errors.diagnosys}</div>}
                                    </div>
                                </div>
                                <div className='inputRowModel'>
                                    <div className='inputBox'>
                                        <div className='input-label'>Medicine Advice</div>
                                        <textarea name='result.medicineAdvice' value={input.result[0].medicineAdvice} onChange={handleInputs} className='input-model' placeholder='Medicine Advice' />
                                        {errors.medicineAdvice && <div style={{ color: 'red', fontSize: 12 }}>{errors.medicineAdvice}</div>}
                                    </div>
                                    <div className='inputBox'>
                                        <div className='input-label'>Advice</div>
                                        <textarea name='result.advice' value={input.result[0].advice} onChange={handleInputs} className='input-model' placeholder='Advice' />
                                        {errors.advice && <div style={{ color: 'red', fontSize: 12 }}>{errors.advice}</div>}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 4: File Upload */}
                        {/* {step === 4 && (
                            <div className='inputRowModel'>
                                <div className='inputBox'>
                                    <div className='input-label'>Upload File (optional)</div>
                                    <input type='file' name='file' onChange={handleFileChange} className='input-model' />
                                </div>
                            </div>
                        )} */}

                        <div className='btnDivModel'>
                            {step > 0 && <button className='submit-model' onClick={handleBack} type='button'>Back</button>}
                            {step < steps.length - 1 && <button className='submit-model' type='submit'>Next</button>}
                            {step === steps.length - 1 && <button className='submit-model' type='submit'>Submit</button>}
                            <div className='submit-model' onClick={handleClear}onDoubleClick={()=>setOpenCreate(false)} type='button'>Clear</div>
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default Model;
=======
import React, { useState, useEffect } from 'react';
import './model.css';
import axios from 'axios';

function Model({ setOpenCreate, item }) {
    const [input, setInput] = useState({
        name: item ? item.name : "",
        age: item ? item.age : "",
        address: item ? item.address : "",
        mobileNo: item ? item.mobileNo : "",
        examinedBy: item ? item.examinedBy : "",
        reportDate: item ? item.reportDate : "",
        test: item ? item.test : "",
        examinedDate: item ? item.examinedDate : ""
    });

    const dummyTestData = [
        { _id: 1, name: "Blood Test" },
        { _id: 2, name: "Urine Test" },
        { _id: 3, name: "Thyroid Test" },
    ];

    const [listOfTest, setListOfTest] = useState([]);

    useEffect(() => {
        handleSelectOption();
    }, []);

    const handleSelectOption = async () => {
        try {
            const response = await axios.get("http://localhost:8000/test/get");
            const dataOne = response.data.data?.length > 0 ? response.data.data : dummyTestData;

            setListOfTest(dataOne);

            setInput(prev => ({
                ...prev,
                test: item ? item.test : dataOne[0].name
            }));
        } catch (err) {
            console.log(err);
            // Fallback to dummy test list
            setListOfTest(dummyTestData);
            setInput(prev => ({
                ...prev,
                test: item ? item.test : dummyTestData[0].name
            }));
        }
    };

    const handleInputs = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const handleCreateNew = async () => {
        if (!item) {
            await axios.post("http://localhost:8000/patient/post", input)
                .then(resp => {
                    const dataOne = resp.data.data;
                    setListOfTest(Array.isArray(dataOne) ? dataOne : Object.values(dataOne));
                    window.location.reload();
                })
                .catch(err => {
                    alert("Please fill every Details");
                    console.log("err : ", err);
                });
        } else {
            await axios.put(`http://localhost:8000/patient/${item._id}`, input)
                .then(resp => {
                    console.log(resp);
                    window.location.reload();
                })
                .catch(err => {
                    alert("Something Went Wrong");
                    console.log(err);
                });
        }
    };

    return (
        <div className='model'>
            <div className='model-card'>
                <div className='model-titleBox'>
                    <div className='model-title'>{item ? "Update Patient" : "Create New"}</div>
                    <div className="x-btn" onClick={() => setOpenCreate(prev => !prev)}>X</div>
                </div>

                <div className='model-body'>
                    <div className='inputRowModel'>
                        <div className='inputBox'>
                            <div className='input-label'>Name</div>
                            <input
                                type='text'
                                name='name'
                                value={input.name}
                                onChange={handleInputs}
                                className='input-model'
                                placeholder='Enter a name'
                            />
                        </div>
                        <div className='inputBox'>
                            <div className='input-label'>Age</div>
                            <input
                                type='text'
                                name='age'
                                value={input.age}
                                onChange={handleInputs}
                                className='input-model'
                                placeholder='Enter Age'
                            />
                        </div>
                    </div>

                    <div className='inputRowModel'>
                        <div className='inputBox'>
                            <div className='input-label'>Address</div>
                            <input
                                type='text'
                                name='address'
                                value={input.address}
                                onChange={handleInputs}
                                className='input-model'
                                placeholder='Enter Address'
                            />
                        </div>
                        <div className='inputBox'>
                            <div className='input-label'>Mobile</div>
                            <input
                                type='text'
                                name='mobileNo'
                                value={input.mobileNo}
                                onChange={handleInputs}
                                className='input-model'
                                placeholder='Enter Mobile No'
                            />
                        </div>
                    </div>

                    <div className='inputRowModel'>
                        <div className='inputBox'>
                            <div className='input-label'>Examined By</div>
                            <input
                                type='text'
                                name='examinedBy'
                                value={input.examinedBy}
                                onChange={handleInputs}
                                className='input-model'
                                placeholder='Examined By'
                            />
                        </div>
                        <div className='inputBox'>
                            <div className='input-label'>Examined Date</div>
                            <input
                                type='date'
                                name='examinedDate'
                                value={input.examinedDate}
                                onChange={handleInputs}
                                className='input-model'
                                placeholder='Examined Date'
                            />
                        </div>
                    </div>

                    <div className='inputRowModel'>
                        <div className='inputBox'>
                            <div className='input-label'>Selected Test</div>
                            <select
                                className='input-model'
                                name='test'
                                value={input.test}
                                onChange={handleInputs}
                            >
                                {listOfTest.map((testItem) => (
                                    <option key={testItem._id} value={testItem._id}>
                                        {testItem.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='inputBox'>
                            <div className='input-label'>Report Date</div>
                            <input
                                type='date'
                                name='reportDate'
                                className='input-model'
                                onChange={handleInputs}
                                value={input.reportDate}
                                placeholder='Report Date'
                            />
                        </div>
                    </div>

                    <div className='btnDivModel'>
                        <div className='submit-model' onClick={handleCreateNew}>Submit</div>
                        <div className='submit-model' onClick={() => setInput({
                            name: "", age: "", address: "", mobileNo: "",
                            examinedBy: "", reportDate: "", test: listOfTest[0]?._id || "", examinedDate: ""
                        })}>
                            Clear
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Model;
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
