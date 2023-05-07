import React, { useState, useRef } from "react";

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
    const otpValue = otp.join("");
    // Here, you can verify the OTP with your backend server
    console.log(otpValue);
  };

  return (
    <div>
      <button onClick={() => alert("Verification code sent!")}>
        Send Verification Code
      </button>
      <div>
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
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Verify</button>
    </div>
  );
}

function App() {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerified(true);
  };

  return (
    <div>
      {!isVerified && (
        <button onClick={handleVerify}>Click here to verify your phone</button>
      )}
      {isVerified && <PhoneVerification />}
    </div>
  );
}

export default App;
