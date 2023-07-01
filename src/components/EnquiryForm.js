import React, {useState} from 'react';

function enquiryForm(props) {
    const handleClick = () => {
        const symbolValue = document.getElementById("symbol").value;
        const uppercaseSymbol = symbolValue.toUpperCase();
        props.setSymbol(uppercaseSymbol);
    };
    return (
      <div>
        <h1>Get Symbol</h1>
          <input type="text" id="symbol" />
          <button onClick = { () => handleClick()}>Submit</button>
      </div>
    );
  }

export default enquiryForm;