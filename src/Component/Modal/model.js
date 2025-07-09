import React, { useState, useEffect } from 'react'
import "./model.css"
import axios from 'axios'

function Model({ setOpenCreate, item }) {
    const [input, setInput] = useState({ "name": "", "age": "", "address": "", "mobileNo": "", "examinedBy": "", "reportDate": "", "test": "", "examinedDate": "" })
    const [listOfTest, setListOfTest] = useState([])

    useEffect(() => {
        handleSelectOption()
    }, [])

    const handleSelectOption = async () => {
        await axios.get("http://localhost:8000/test/get").then(resposne => {
            const dataOne = resposne.data.data
            // console.log(dataOne)
            setListOfTest(dataOne)

        }).catch(err => {
            console.log(err)
        })
    }
    const handleInputs = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    // console.log(input)

    const handleCreateNew = async () => {
        await axios.post("http://localhost:8000/patient/post", input)
            .then(resp => {
                const dataOne = resp.data.data;
                console.log("Data : ", dataOne);
                // setListOfTest(dataOne);
                setListOfTest(Array.isArray(dataOne) ? dataOne : Object.values(dataOne));
                window.location.reload()
            })
            .catch(err => {
                console.log("err : ", err);
            });
    };

    return (
        <div className='model'>
            <div className='model-card'>
                <div className='model-titleBox'>
                    <div className='model-title'>{item ? "Update Patient" : "Create New"}</div>
                    <div className="x-btn" onClick={() => { setOpenCreate(prev => !prev) }}>X</div>
                </div>
                <div className='model-body'>
                    <div className='inputRowModel'>
                        <div className='inputBox'>
                            <div className='input-label'>Name</div>
                            <input type='text' name='name' value={input.name} onChange={(e) => { handleInputs(e) }} className='input-model' placeholder='Enter a name' />
                        </div>
                        <div className='inputBox'>
                            <div className='input-label'>Age</div>
                            <input type='text' name='age' value={input.age} onChange={(e) => { handleInputs(e) }} className='input-model' placeholder='Enter  Age' />
                        </div>
                    </div>

                    <div className='inputRowModel'>
                        <div className='inputBox'>
                            <div className='input-label'>Address</div>
                            <input type='text' name='address' value={input.address} onChange={(e) => { handleInputs(e) }} className='input-model' placeholder='Enter Address' />
                        </div>
                        <div className='inputBox'>
                            <div className='input-label'>Mobile</div>
                            {/* <input type='text' name='mobile' value={input.mobile} onChange={(e) => { handleInputs(e) }} className='input-model' placeholder='Enter Mobile No' /> */}
                            <input type='text' name='mobileNo' value={input.mobileNo} onChange={(e) => { handleInputs(e) }} className='input-model' placeholder='Enter Mobile No' />
                        </div>
                    </div>

                    <div className='inputRowModel'>
                        <div className='inputBox'>
                            <div className='input-label'>Examined By</div>
                            <input type='text' name='examinedBy' value={input.examinedBy} onChange={(e) => { handleInputs(e) }} className='input-model' placeholder='Examined By' />
                        </div>
                        <div className='inputBox'>
                            <div className='input-label'>Examined Date</div>
                            <input type='date' name='examinedDate' value={input.examinedDate} onChange={(e) => { handleInputs(e) }} className='input-model' placeholder='Examined Date' />
                        </div>
                    </div>

                    <div className='inputRowModel'>
                        <div className='inputBox'>
                            <div className='input-label'>Selected Test</div>
                            <select className='input-model' name='test' onChange={(e) => { handleInputs(e) }}>
                                {
                                    listOfTest?.map((item, index) => {
                                        return (
                                            <option value={`${item._id}`}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='inputBox'>
                            <div className='input-label'>Report Date</div>
                            <input type='date' name='reportDate' className='input-model'
                                onChange={(e) => { handleInputs(e) }} value={input.reportDate} placeholder='Report Date' />
                            {/* <input
                                type='date'
                                name='reportDate'  // Changed to match state key
                                value={input.reportDate}
                                onChange={handleInputs}
                                className='input-model'
                                placeholder='Examined Date'
                            /> */}
                        </div>
                    </div>

                    <div className='btnDivModel'>
                        <div className='submit-model' onClick={handleCreateNew}>Submit</div>
                        <div className='submit-model'>Clear</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model