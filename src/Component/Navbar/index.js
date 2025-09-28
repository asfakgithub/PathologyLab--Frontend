import React, { useEffect, useRef, useState } from 'react'
<<<<<<< HEAD
import "./index.css"
import imgLogo from '../../assests/imgLogo.jpg'
import Model from '../Modal/model'
import { Link } from 'react-router-dom'

function Navbar() {

  const [openCreate, setOpenCreate] = useState(false)
  const [clickAddTest, setClickAddTest] = useState(false)
  const [input, setInput] = useState({ "name": "", "description": "", "price": "", "imgLink": "", "fasting": "", "abnormalRange": "", "normalRange": "" })
  const ref = useRef()

  useEffect(() => {  // LECTURE 10
    const checkIfClickedOutSide = (e) => {
=======
import './index.css'
import LogoILabU from '../../Component/Images/LogoILabU.png'
import Model from '../Modal/model'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
  const [openCreate, setOpenCreate] = useState(false)
  const [clickAddTest, setClickAddTest] = useState(false)
  const [input, setInput] = useState({
    name: '',
    description: '',
    price: '',
    imgLink: '',
    fasting: '',
    abnormalRange: '',
    normalRange: ''
  })
  const [subtests, setSubtests] = useState([])
  const [subtestInput, setSubtestInput] = useState({
    name: '',
    description: '',
    price: '',
    normalRange: '',
    abnormalRange: ''
  })

  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
      if (clickAddTest && ref.current && !ref.current.contains(e.target)) {
        setClickAddTest(false)
      }
    }
<<<<<<< HEAD
    document.addEventListener("mousedown", checkIfClickedOutSide);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutSide)
=======
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
    }
  }, [clickAddTest])

  const handleInputs = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }
<<<<<<< HEAD
  console.log(input)

  return (
    <div className='navbar'>
      <Link to={"/"} className='leftSideNavbar'>
        <img src={imgLogo} className='imgLogoNavbar' alt='logo' />
      </Link>
      <div className='rightSideNavbar'>
        <div className='linksRightSideNavbar' onClick={() => { setOpenCreate(prev => !prev) }}>
          Create New
        </div>
        <Link to={"/status"} className='linksRightSideNavbar'>
          Report
        </Link>
        {/* <div className='linksRightSideNavbar'>
          <div className='navLinkAddtest' onClick={() => { setClickAddTest(prev => !prev) }}>
            Add Test
          </div>
          {clickAddTest &&
            <div className='addtest-modal' ref={ref}>
              <div className='input-addtest-modal'>
                <div className='inputAddtestLabel'>Name</div>
                <input type='text' name="name" value={input.name} onChange={(e) => { handleInputs(e) }} className='modal-input-fid' />
              </div>
              <div className='input-addtest-modal'>
                <div className='inputAddtestLabel'>Description</div>
                <input type='text' name="description" value={input.description} onChange={(e) => { handleInputs(e) }} className='modal-input-fid' />
              </div>
              <div className='input-addtest-modal'>
                <div className='inputAddtestLabel'>Price</div>
                <input type='text' name="price" value={input.price} onChange={(e) => { handleInputs(e) }} className='modal-input-fid' />
              </div>
              <div className='input-addtest-modal'>
                <div className='inputAddtestLabel'>Image Link</div>
                <input type='text' name="imgLink" value={input.imgLink} onChange={(e) => { handleInputs(e) }} className='modal-input-fid' />
              </div>
              <div className='input-addtest-modal'>
                <div className='inputAddtestLabel'>Fasting</div>
                <input type='text' name="fasting" value={input.fasting} onChange={(e) => { handleInputs(e) }} className='modal-input-fid' />
              </div>
              <div className='input-addtest-modal'>
                <div className='inputAddtestLabel'>Normal Range</div>
                <input type='text' name="normalRange" value={input.normalRange} onChange={(e) => { handleInputs(e) }} className='modal-input-fid' />
              </div>
              <div className='input-addtest-modal'>
                <div className='inputAddtestLabel'>Abnormal Range</div>
                <input type='text' name="abnormalRange" value={input.abnormalRange} onChange={(e) => { handleInputs(e) }} className='modal-input-fid' />
              </div>
              <div className='create-addtest'>Create</div>
            </div>
          }
        </div> */}
      </div>
      {
        openCreate && <Model setOpenCreate={setOpenCreate} />
      }
=======

  const handleSubtestInput = (event) => {
    setSubtestInput({ ...subtestInput, [event.target.name]: event.target.value })
  }

  const addSubtest = () => {
    if (!subtestInput.name || !subtestInput.description || !subtestInput.price) {
      alert('Please fill in all required subtest fields.')
      return
    }
    setSubtests([...subtests, subtestInput])
    setSubtestInput({ name: '', description: '', price: '', normalRange: '', abnormalRange: '' })
  }

  const removeSubtest = (idx) => {
    setSubtests(subtests.filter((_, i) => i !== idx))
  }

  const onClickCreate = async () => {
    const requiredFields = ['name', 'description', 'price']
    for (let field of requiredFields) {
      if (!input[field]) {
        alert(`Please fill in the ${field} field.`)
        return
      }
    }
    if (isNaN(input.price)) {
      alert('Price should be a valid number.')
      return
    }
    try {
      await axios.post('http://localhost:8000/test/post', { ...input, subtests })
      window.location.reload()
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className='navbar'>
      <Link to='/' className='leftSideNavbar'>
        <img src={LogoILabU} className='imgLogoNavbar' alt='logo' />
      </Link>
      <div className='rightSideNavbar'>
        <div
          className='linksRightSideNavbar'
          onClick={() => setOpenCreate((prev) => !prev)}
        >
          Create New
        </div>
        <Link to='/status' className='linksRightSideNavbar'>
          Report
        </Link>
        <div className='linksRightSideNavbar'>
          <div className='navLinkAddtest' onClick={() => setClickAddTest(true)}>
            Add Test
          </div>
        </div>
      </div>

      {/* Add Test Modal */}
      {clickAddTest && (
        <div className='overlay'>
          <div className='addtest-modal-centered' ref={ref}>
            <h2 className='modal-heading'>Add New Test</h2>
            {/* Test fields */}
            {[
              'name',
              'description',
              'price',
              'imgLink',
              'fasting',
              'normalRange',
              'abnormalRange'
            ].map((field) => (
              <div key={field} className='input-addtest-modal'>
                <label htmlFor={field} className='inputAddtestLabel'>
                  {field
                    .charAt(0)
                    .toUpperCase()
                    .concat(field.slice(1).replace(/([A-Z])/g, ' $1'))}
                </label>
                <input
                  type={field === 'price' ? 'number' : 'text'}
                  id={field}
                  name={field}
                  value={input[field]}
                  onChange={handleInputs}
                  className='modal-input-fid'
                  required
                />
              </div>
            ))}
            {/* Subtests section */}
            <div className='subtests-modal-section'>
              <h3>Add Subtests</h3>
              <div className='input-addtest-modal'>
                <input type='text' name='name' placeholder='Subtest Name' value={subtestInput.name} onChange={handleSubtestInput} className='modal-input-fid' />
                <input type='text' name='description' placeholder='Description' value={subtestInput.description} onChange={handleSubtestInput} className='modal-input-fid' />
                <input type='number' name='price' placeholder='Price' value={subtestInput.price} onChange={handleSubtestInput} className='modal-input-fid' />
                <input type='text' name='normalRange' placeholder='Normal Range' value={subtestInput.normalRange} onChange={handleSubtestInput} className='modal-input-fid' />
                <input type='text' name='abnormalRange' placeholder='Abnormal Range' value={subtestInput.abnormalRange} onChange={handleSubtestInput} className='modal-input-fid' />
                <button type='button' onClick={addSubtest} className='addSubtestBtn'>Add Subtest</button>
              </div>
              <ul>
                {subtests.map((sub, idx) => (
                  <li key={idx}>
                    <strong>{sub.name}</strong>: {sub.description} | Price: ₹{sub.price} | Normal: {sub.normalRange} | Abnormal: {sub.abnormalRange}
                    <button type='button' onClick={() => removeSubtest(idx)} className='deleteSubtestBtn'>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
            <button className='create-addtest-btn' onClick={onClickCreate}>
              Create
            </button>
          </div>
        </div>
      )}

      {openCreate && <Model setOpenCreate={setOpenCreate} />}
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
    </div>
  )
}

<<<<<<< HEAD
export default Navbar
=======
export default Navbar
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
