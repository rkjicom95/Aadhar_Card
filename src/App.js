import React, { useState } from "react";
import "./App.css";
import BhartLogo from "./images/bharLogo.png";
import User from "./images/user.jpeg";
import QRCode from "./images/QRCode.png";
import AdharRed from "./images/adharRed.png";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { TbWorldWww } from "react-icons/tb";
import Transliterate from "./components/Transliterate";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    address: "",
    locality: "",
    pincode: "",
    state: "",
    gender: "",
    // contact: "",
  });

  const [uid, setUid] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate Aadhar Number
    generateAadharNumber();

    // Generate UID
    const generatedUid = generateUid();
    setUid(generatedUid);
    setSubmitted(true);
    // Additional logic to save form data and UID to backend database can be added here
  };

  // const handleBack = () => {
  //   setSubmitted(false); // Set submitted to false to show the form again
  // };
  const generateAadharNumber = () => {
    // Dummy Aadhar number generation logic (can be replaced with a more robust solution)
    let aadharNumber = "";
    const characters = "0123456789";
    const length = 12;
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      aadharNumber += characters.charAt(index);
    }
    setAadharNumber(aadharNumber);
  };

  const generateUid = () => {
    // Dummy UID generation logic (can be replaced with a more robust solution)
    let uid = "";
    const characters = "0123456789";
    const length = 16;
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      uid += characters.charAt(index);
    }
    return uid;
  };

  return (
    <div className="App">
      {!submitted && <h1>Aadhar Card Registration</h1>}{" "}
      {!submitted && (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Father's Name:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="पुरुष/MALE">पुरुष/MALE</option>
            <option value="महिला/FEMALE">महिला/FEMALE</option>
          </select>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label>District:</label>
          <input
            type="text"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            required
          />

          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
          {/* <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          /> */}
          <button type="submit">Submit</button>
        </form>
      )}
      {submitted && (
        <>
          <div>
            <h2> Front Side Aadhar Card</h2>
            <div className="aadhar-front-card">
              <div className="content">
                <img src={BhartLogo} alt="Bhart Logo" />
                <div className="text">
                  <h2>भारत सरकार</h2>
                  <h3>Government Of India</h3>
                </div>
              </div>
              <div className="aadhar-front-details">
                <img src={User} alt="" />
                <div className="user-data">
                  <h4>
                    {formData.name && <Transliterate text={formData.name} />}
                  </h4>
                  <h4>{formData.name}</h4>
                  <h4>जन्म तिथि/DOB: {formData.dob}</h4>
                  <h4>{formData.gender}</h4>
                </div>
              </div>
              <div className="front-vid-qr">
                <div className="front-vid-qr-text">
                  <h2>{aadharNumber}</h2>
                  <h4>VID : {uid}</h4>
                </div>
                <img src={QRCode} alt="" />
              </div>
              <div
                style={{
                  width: "100%",
                  border: "0.5px solid red",
                }}
              />
              <h1>
                मेरी <span style={{ color: "red" }}>आधार,</span> मेरी पहचान
              </h1>
            </div>
          </div>
          {/* //////////////// */}
          <div>
            <h2>Back Side Aadhar Card</h2>
            <div className="aadhar-front-card">
              <div className="content">
                <img src={AdharRed} alt="Bhart Logo" />
                <div className="text">
                  <h2>भारतीय विशिष्ट पहचान प्राधिकरण</h2>
                  <h3>Unique Identification Authority Of India</h3>
                </div>
              </div>
              <div className="back-side">
                <div className="back-side-para">
                  <p>
                    <span>पता: </span>
                    <br />
                    S/O: <Transliterate text={formData.fatherName} />,{" "}
                    <Transliterate text={formData.address} />,{" "}
                    <Transliterate text={formData.locality} />,{" "}
                    <Transliterate text={formData.state} /> - {formData.pincode}
                  </p>
                  <p>
                    <span>Address: </span>
                    <br />
                    S/O: {formData.fatherName}, {formData.address},
                    {formData.locality}, {formData.state} - {formData.pincode}
                  </p>
                </div>
                <img src={QRCode} alt="" />
              </div>
              <div className="back-vid-qr-text">
                <h2>{aadharNumber}</h2>
                <h4>VID : {uid}</h4>
              </div>
              <div
                style={{
                  width: "100%",
                  border: "0.5px solid red",
                }}
              />
              <div className="back-icon">
                <div className="back-icon-text">
                  <FaPhoneVolume size={12} color="#000" />
                  <h6>1975</h6>
                </div>
                <div className="back-icon-text">
                  <TfiEmail size={12} color="#000" />
                  <h6>help@uidai.gov.in</h6>
                </div>
                <div className="back-icon-text">
                  <TbWorldWww size={12} color="#000" />
                  <h6>www.uidai.gov.in</h6>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
