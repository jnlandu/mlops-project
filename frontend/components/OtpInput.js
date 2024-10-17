import React, { useEffect, useState } from 'react';

const OTPInput = ({ length, value, onChange}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

    // Effect to update OTP state when the value prop changes significantly
    useEffect(() => {
        if (value && value.length <= length && value !== otp.join('')) {
        setOtp([...value.padEnd(length, "")].slice(0, length));
        }
    }, [value, length]);

  const handleChange = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    onChange(newOtp.join(""));

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  return (
    <div  className='d-flex  gap-3 justify-content-center mb-3'> 
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          value={otp[index]}
          maxLength="1"
          style={{ width: '40px', textAlign: 'center' }}
          onChange={e => handleChange(e.target, index)}
          onFocus={e => e.target.select()}
        />
      ))}
    </div>
  );
};

export default OTPInput;
