import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import HomeScreen from './Component/Pages/HomeScreen/homeScreen';
import Status from './Component/Pages/StatusPage/status';
import Report from './Component/Pages/ReportPage/report';
import Prescription from './Component/Pages/Prescription/prescription';
// import axios from "axios"

function App() {
  // axios.get("http://localhost:8000/test/get").then(resposne => {
  //   console.log(resposne)
  // }).catch(err => {
  //   console.log(err)
  // })

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path='/status' element={<Status />} />
          <Route path='/report/:id' element={<Report />} />
          <Route path="/prescription/:id" element={<Prescription />} />
        </Routes>
    </div>
  );
}

export default App;
