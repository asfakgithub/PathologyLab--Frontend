import React, { useEffect, useState } from 'react';
import './homeScreen.css';
import Footer from '../../Footer';
import Model from '../../Modal/model';
import axios from 'axios';
import LogoILabU from '../../Images/LogoILabU.png'

const HomeScreen = () => {
  const [listOfTest, setListOfTest] = useState([]);
  const [selectedDetailedTest, setSelectedDetailedTest] = useState(null);
  const [clickAddTest, setClickAddTest] = useState(false);
  const [showSubtestModal, setShowSubtestModal] = useState(false);
  const [subtestMode, setSubtestMode] = useState('add'); // 'add' or 'edit'
  const [subtestInput, setSubtestInput] = useState({
    name: '',
    description: '',
    price: '',
    normalRange: '',
    abnormalRange: '',
    _id: null
  });

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get('http://localhost:8000/Test/get');
        if (res.data.status === 'Success') {
          setListOfTest(res.data.data);
          setSelectedDetailedTest(res.data.data[0]);
        }
      } catch (err) {
        console.error('Error fetching tests:', err);
      }
    };

    fetchTests();
  }, []);

  // Helper to refresh tests
  const refreshTests = async () => {
    try {
      const res = await axios.get('http://localhost:8000/Test/get');
      if (res.data.status === 'Success') {
        setListOfTest(res.data.data);
        setSelectedDetailedTest(res.data.data[0]);
      }
    } catch (err) {
      console.error('Error fetching tests:', err);
    }
  };

  // Add Subtest
  const handleAddSubtest = async () => {
    if (!subtestInput.name || !subtestInput.description || !subtestInput.price) {
      alert('Please fill in all required subtest fields.');
      return;
    }
    try {
      await axios.post(`http://localhost:8000/Test/subtest/${selectedDetailedTest._id}`, subtestInput);
      setShowSubtestModal(false);
      setSubtestInput({ name: '', description: '', price: '', normalRange: '', abnormalRange: '', _id: null });
      refreshTests();
    } catch (err) {
      alert('Failed to add subtest.');
    }
  };

  // Edit Subtest
  const handleEditSubtest = (sub) => {
    setSubtestInput(sub);
    setSubtestMode('edit');
    setShowSubtestModal(true);
  };

  const handleUpdateSubtest = async () => {
    try {
      await axios.put(`http://localhost:8000/Test/subtest/${selectedDetailedTest._id}/${subtestInput._id}`, subtestInput);
      setShowSubtestModal(false);
      setSubtestInput({ name: '', description: '', price: '', normalRange: '', abnormalRange: '', _id: null });
      refreshTests();
    } catch (err) {
      alert('Failed to update subtest.');
    }
  };

  // Delete Subtest
  const handleDeleteSubtest = async (sub) => {
    if (!window.confirm('Delete this subtest?')) return;
    try {
      await axios.delete(`http://localhost:8000/Test/subtest/${selectedDetailedTest._id}/${sub._id}`);
      refreshTests();
    } catch (err) {
      alert('Failed to delete subtest.');
    }
  };

  // Modal input change
  const handleSubtestInputChange = (e) => {
    setSubtestInput({ ...subtestInput, [e.target.name]: e.target.value });
  };

  return (
    <div className="homeScreen">
      <section className="dashboardSummary">
  <div className="summaryCard total">
    <h3>Total Tests</h3>
    <p>{listOfTest.length}</p>
  </div>
  <div className="summaryCard completed">
    <h3>Completed</h3>
    <p>{listOfTest.length}</p>
  </div>
  <div className="summaryCard pending">
    <h3>Pending</h3>
    <p>{listOfTest.length}</p>
  </div>
  <div className="summaryCard patients">
    <h3>Patients</h3>
    <p>{listOfTest.length}</p>
  </div>
</section>

      <section className="testCardSection">
        <h2 className="sectionTitle">Available Lab Tests</h2>
        <div className="testCardGrid">
          {listOfTest.map((test, index) => (
            <div key={test._id || index} className="testCard" onClick={() => setSelectedDetailedTest(test)}>
              {/* here not sign is used if test image url is not there if we get Url then that Url should be shown */}
              {!test.imgLink && (
                <img
                  src={LogoILabU}
                  alt={`${test.name} preview`}
                  className="testCardImage"
                />
              )}
              <h3>{test.name}</h3>
              <p className="testCardDescription">{test.description}</p>
              <p><strong>Price:</strong> ₹{test.price}</p>
              <p><strong>Fasting:</strong> {test.fasting}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedDetailedTest && (
        <section className="testDetails">
          <h2>Details for {selectedDetailedTest.name}</h2>
          <p>{selectedDetailedTest.description}</p>
          <ul>
            <li><strong>Fasting:</strong> {selectedDetailedTest.fasting}</li>
            <li><strong>Normal Range:</strong> {selectedDetailedTest.normalRange}</li>
            <li><strong>Abnormal Range:</strong> {selectedDetailedTest.abnormalRange}</li>
            <li><strong>Price:</strong> ₹{selectedDetailedTest.price}</li>
          </ul>
          {/* Subtests Section */}
          <div className="subtestsSection">
            <h3>Subtests</h3>
            {selectedDetailedTest.subtests && selectedDetailedTest.subtests.length > 0 ? (
              <ul>
                {selectedDetailedTest.subtests.map((sub, idx) => (
                  <li key={sub._id || idx} className="subtestItem">
                    <strong>{sub.name}</strong>: {sub.description} | Price: ₹{sub.price} | Normal: {sub.normalRange} | Abnormal: {sub.abnormalRange}
                    <button onClick={() => handleEditSubtest(sub)} className="editSubtestBtn">Edit</button>
                    <button onClick={() => handleDeleteSubtest(sub)} className="deleteSubtestBtn">Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No subtests available.</p>
            )}
            <button onClick={() => { setShowSubtestModal(true); setSubtestMode('add'); setSubtestInput({ name: '', description: '', price: '', normalRange: '', abnormalRange: '', _id: null }); }} className="addSubtestBtn">Add Subtest</button>
          </div>
        </section>
      )}
      {/* Subtest Modal */}
      {showSubtestModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{subtestMode === 'add' ? 'Add Subtest' : 'Edit Subtest'}</h3>
            <input type="text" name="name" placeholder="Name" value={subtestInput.name} onChange={handleSubtestInputChange} />
            <input type="text" name="description" placeholder="Description" value={subtestInput.description} onChange={handleSubtestInputChange} />
            <input type="number" name="price" placeholder="Price" value={subtestInput.price} onChange={handleSubtestInputChange} />
            <input type="text" name="normalRange" placeholder="Normal Range" value={subtestInput.normalRange} onChange={handleSubtestInputChange} />
            <input type="text" name="abnormalRange" placeholder="Abnormal Range" value={subtestInput.abnormalRange} onChange={handleSubtestInputChange} />
            <button onClick={subtestMode === 'add' ? handleAddSubtest : handleUpdateSubtest}>
              {subtestMode === 'add' ? 'Add' : 'Update'}
            </button>
            <button onClick={() => setShowSubtestModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <section className="contactHomeScreen" id="contact">
        <h2>Contact Us</h2>
        <div className="contactForm">
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Name" />
          <input type="number" placeholder="Phone" />
          <textarea rows="4" placeholder="Your message..." />
          <button className="sendEmailButton">Send</button>
        </div>
      </section>

      <Footer />
      {clickAddTest && <Model setOpenCreate={setClickAddTest} />}
    </div>
  );
};

export default HomeScreen;
