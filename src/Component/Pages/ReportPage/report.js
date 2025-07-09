import React, { useState } from 'react'
import "./report.css"
import { Link, useParams } from 'react-router-dom'

function Report() {
  const {id} = useParams()
  console.log(id)
  const [inputField, setInputField] = useState([{"id":1, "name": "", "range": "", "unit": "", "result": "" }])
  const onchangeInput=(event, index) => {
    const updateRow = inputField.map(row => {
      if(row.id==index) {
        return {...row,[event.target.name]:event.target.value}
      }
      return row
    })
    setInputField(updateRow)
  }
  const addinputRows = () => {
    const newRow = {
      id:inputField.length+1, "name": "", "range": "", "unit": "", "result": "" 
    }
    setInputField([...inputField, newRow])
  }
  console.log(inputField)

  const removeRows = () => {
    if(inputField.length > 1){
      setInputField(inputField.slice(0, -1))
    }
  }

  return (
    <div className='report-page'>
      <div className='reportDiv'>
        <div className='report-infos'>
          <div className='report-info'>Name : Rahul</div>
          <div className='report-info'>Examined By : Sanjeev Kumar</div>
        </div>
        <div className='report-inputBlock'>
          <div className='report-tests'>
            <div className='nameOfTest'>Urine Glucode Test</div>
          </div>
          <div className='inputRows'>
            {
              inputField.map((item, index) => {
                return (
                  <div className='inputRow'>
                    <div className="input-row-group">
                      <div className='input-test-name'>Test Name</div>
                      <input type='text' value={item.name} name='name' onChange={(e) =>{onchangeInput(e, item.id)}} className='input-field-tests' />
                    </div>
                    <div className="input-row-group">
                      <div className='input-test-name'>Normal Range</div>
                      <input type='text' value={item.range} name='range' onChange={(e) =>{onchangeInput(e, item.id)}} className='input-field-tests' />
                    </div>
                    <div className="input-row-group">
                      <div className='input-test-name'>Unit</div>
                      <input type='text' value={item.unit} name='unit' onChange={(e) =>{onchangeInput(e, item.id)}} className='input-field-tests' />
                    </div>
                    <div className="input-row-group">
                      <div className='input-test-name'>Result</div>
                      <input type='text' value={item.result} name='result' onChange={(e) =>{onchangeInput(e, item.id)}} className='input-field-tests' />
                    </div>
                  </div>
                )
              })
            }

            <div className='btn-grp-add-rem'>
              <div className='add-btn-row' onClick={addinputRows}>Add</div>
              {
                inputField.length>1? <div className='add-btn-row' onClick={removeRows}>Remove</div>:null
              }
              <Link to={`/prescription/${id}`} className='add-btn-row'>Report</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report