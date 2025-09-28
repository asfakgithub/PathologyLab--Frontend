import React, { useEffect, useRef, useState } from 'react'
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
      if (clickAddTest && ref.current && !ref.current.contains(e.target)) {
        setClickAddTest(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutSide);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutSide)
    }
  }, [clickAddTest])

  const handleInputs = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }
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
    </div>
  )
}

export default Navbar