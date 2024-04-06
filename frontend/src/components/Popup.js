import React, { useState, useEffect, useRef } from 'react';

function Popup(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const popupRef = useRef();

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setButtonPopup(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (props.showLoginSuccess) {
      setButtonPopup(true);
      setTimeout(() => {
        props.redirectToDashboard(); // Call the provided callback function for redirection
      }, 1000); // Redirect after 1 second
    }
  }, [props.showLoginSuccess, props.redirectToHome]);

  return buttonPopup ? (
    <div className="popup" ref={popupRef}>
      <div className="popup-inner">
        <h3>Login Successful!</h3>
        {props.children}
      </div>
    </div>
  ) : null;
}

export default Popup;
