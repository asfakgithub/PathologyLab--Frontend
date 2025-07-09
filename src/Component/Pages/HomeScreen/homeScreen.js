import React, { useEffect, useState } from 'react';
import "./homeScreen.css";
import labPic1 from "../../../assests/labPic1.jpg"
import data from "./data.json"
import Footer from "../../Footer/index"
import Model from '../../Modal/model';
import axios from "axios"

const HomeScreen = () => {
  const [listOfTest, setListOfTest] = useState([]);
  const [activeIndexNav, setActiveIndexNav] = useState([])
  const [selectedDetailedTest, setSelectedDetailedTest] = useState(null)
  const [clickAddTest, setClickAddTest] = useState(false)


  useEffect(() => {
    fetchedDataLoading();
    // setSelectedDetailedTest(listOfTest[0])
    console.log(selectedDetailedTest)
  }, [])

  const fetchedDataLoading = async () => {
    await axios.get("http://localhost:8000/test/get").then(resposne => {
      const dataOne = resposne.data.data
      console.log(dataOne)
      setListOfTest(dataOne)
      setSelectedDetailedTest(dataOne[0])
    }).catch(err => {
      console.log(err)
    })
  }

  console.log(selectedDetailedTest)

  const handleClickNavLink = (index) => {
    setActiveIndexNav(index)
    setSelectedDetailedTest(listOfTest[index])
  }
  // console.log(activeIndexNav)
  const handleClosepopup = (val) => {
    setClickAddTest(val)
  }
  return (
    <div className='homeScreen'>
      <div className='introHomeScreen'>
        <div className='imgHomeScreen'>
          <div className='imgDiv'>
            <img src={labPic1} alt='labPic' className='labLogoHomeScreen' />
          </div>
          <div className='introPart'>
            <div className='titleMini'>Enterprise Limited</div>
            <div className='titleMajor'>Pathology Management System</div>
            <div className='description1'>
              The foundation for successful modern laboratories is a comprehensive lab operations management plan. This enables building and effectively executing an operating philosophy, leading to consistently meeting your scientific and business goals. Finding the partner who best helps your organization develop and execute this plan -from current operations to future strategies-will enable you to achieve this success.
            </div>
            <div className='description2'>
              Our asset management programs bring over 40 years of experience in day-to-day lab operations. We can guide you on the journey to advance lab performance and elevate scientific productivity. Using a proven set of methodologies, products, and services with a focus on continuous innovation, together we can simplify, optimize, and transform your lab
            </div>
            <div className='topBtnsDiv'>
              <div className='btns-div' onClick={() => setClickAddTest(true)}>
                Create
              </div>
              <div className='btns-div'>
                <a style={{ textDecoration: "none" }} href='#contact'>Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='testHomeScreen'>
        <div className='leftPartTest'>
          <p className='totalTest'>{listOfTest.length} Test Available</p>
          <div className='testNameDiv'>
            {
              listOfTest?.map((item, index) => {
                return <div
                  onClick={() => { handleClickNavLink(index) }}
                  className={`testNameTitle 
                  ${activeIndexNav === index ? "activeNavLink" : null}`}
                >
                  {item.name}
                </div>
              })
            }
          </div>
        </div>
        <div className='rightPartTest'>
          <div className='topRightPart'>
            {selectedDetailedTest?.name}
          </div>
          <div className='bottomRightPart'>
            <div className='topBottomRightPart'>
              {selectedDetailedTest?.description}
            </div>
            <div className='bottomBottomRightPart'>
              <div className='bBrightPartLeftSide'>
                <div className='detailsBlock'>
                  {"Fasting"} : <span className='spanColrChange'>{selectedDetailedTest?.fasting}</span>
                </div>
                <div className='detailsBlock'>
                  {"Abnormal Range"} : <span className='spanColrChange'>{selectedDetailedTest?.abnormalRange}</span>
                </div>
                <div className='detailsBlock'>
                  {"Normal Range"} : <span className='spanColrChange'>{selectedDetailedTest?.normalRange}</span>
                </div>
                <div className='detailsBlock'>
                  {"Price"} : <span className='spanColrChange'>{selectedDetailedTest?.price}</span>
                </div>
              </div>
              <div className='bBrightPartRightSide'>
                <img src={selectedDetailedTest?.imgLink} alt='pic' className='bBrightImage' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='contactHomeScreen'>
        <div className='contactFormTitle' id='contact'>Contact Form</div>
        <div className='contactForm'>
          <div className='inputFields'>
            <input type='email' className='inputFieldsBox' placeholder='Enter your Email Id' />
            <input type='text' className='inputFieldsBox' placeholder='Enter your name' />
            <input type='number' className='inputFieldsBox' placeholder='Enter your Mobile No' />
            <textarea type='textbox' className='inputTextAreaMessage' placeholder='Type your message here...' rows={10} />

          </div>
          <div className='sendEmailButton'>Send</div>
        </div>
      </div>
      <Footer />
      {
        clickAddTest && <Model setOpenCreate={handleClosepopup} />
      }
    </div>
  )
}

export default HomeScreen