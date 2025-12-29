import React, { useState } from "react";

const Contect = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  const handleClearform = () => {
    setFullName("");
    setEmail("");
    setMessage("");
  };

  const Valid = () => {
    let isValid = true;
    if (!/^[A-Za-z]+$/.test(fullName)) {
      isValid = false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoding(true);


    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/Random"
      );
      const data = {
        fullName,
        email,
        message
      };
      console.log(data);
    }
    catch (error) {
      console.log(error.message);
    } finally {
      setIsLoding(false);
    }
    handleClearform();
  }

  return (
    <>
      <div className="text-center">
        <h1>Contect us</h1>
        <div className="container">

          <form onReset={handleClearform} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName">FullName</label>
              <input type="text" name="fullName" id="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your name"
                className="text-pink-700" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" value={message} onChange={(event) => setMessage(event.target.value)}
                placeholder="enter your message"
                className="text-pink-500"></textarea>
            </div>
            <div>
              <button type="reset" className="btn btn-danger">clear form</button>
              <button type="submit" className="btn btn-dark">
                {
                  isLoding ? "Loding" : "Submit"
                }
              </button>
            </div>
          </form>
        </div>


      </div>
    </>
  );
};

export default Contect;