import React, { useState, useRef } from "react";
import './Phone.css';

function PhoneVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value) || value.length > 1) {
      return;
    }

    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    // Move focus to the next input
    if (index < 5 && value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && otp[index] === "") {
      // Move focus to the previous input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }

    if (e.keyCode === 37 && index > 0) {
      // Move focus to the previous input
      inputRefs.current[index - 1].focus();
    }

    if (e.keyCode === 39 && index < 5) {
      // Move focus to the next input
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      const otpCopy = [...otp];
      for (let i = 0; i < 6; i++) {
        otpCopy[i] = pasteData[i];
      }
      setOtp(otpCopy);
    }
  };

  const handleSubmit = () => {
    const isFilled = otp.every(digit => digit !== '');
    if (isFilled) {
      const otpValue = otp.join("");
      // Here, you can verify the OTP with your backend server
      console.log(otpValue);
      alert('OTP successfully Verified');
    } else {
      alert('Please fill all the digits of the OTP');
    }
  };

  return (
    <div>
      {/* <button class="send-code">
        Send Verification Code
      </button> */}
      <div>
        <h2>Phone Verification </h2>
        <hr></hr>
        <p class="txt2">Enter the OTP you received on 89568-5XXXX</p>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(ref) => inputRefs.current.push(ref)}
            className="no-border"
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <p className="click-able">Change Number</p>
         <p className="click-able">Re-send OTP</p>
     </div>
     <button class="submit-verify" onClick={handleSubmit}>Verify Phone Number</button>
    </div>
  );
}


function App() {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerified(true);
    alert("Successfully OTP Send!")
  };

  return (
    <div>
      {!isVerified && (
        <button onClick={handleVerify}>Send OTP to your phone</button>
      )}
      {isVerified && <PhoneVerification />}
    </div>
  );
}

export default App;
