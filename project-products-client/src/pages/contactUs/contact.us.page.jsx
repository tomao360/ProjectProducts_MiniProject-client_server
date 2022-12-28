import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { addUserMessageToDb } from "../../services/services";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

export const ContactUs = (props) => {
  const [userMessage, setUserMessage] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    UserMessage: "",
  });
  const [charactersLeft, setCharactersLeft] = useState(300);

  const handleAddMessage = async () => {
    let json = userMessage;
    if (!userMessage.FirstName) {
      toast.error(" Error! You must enter first name!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (!userMessage.LastName) {
      toast.error(" Error! You must enter last name!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (!userMessage.Email) {
      toast.error(" Error! You must enter email!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (!userMessage.UserMessage) {
      toast.error(" Error! You must enter a message!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success(" The message accepted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    await addUserMessageToDb(json);
    setUserMessage({});
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
  };

  return (
    <div className="student-inputs ">
      <ToastContainer />
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          First Name
        </span>
        <input
          className="form-control"
          type="text"
          placeholder="First Name"
          aria-label="default input example"
          onChange={(o) => {
            setUserMessage({ ...userMessage, FirstName: o.target.value });
          }}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Last Name
        </span>
        <input
          className="form-control"
          type="text"
          placeholder="Last Name"
          aria-label="default input example"
          onChange={(o) => {
            setUserMessage({ ...userMessage, LastName: o.target.value });
          }}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Email
        </span>
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          aria-label="default input example"
          onChange={(o) => {
            setUserMessage({ ...userMessage, Email: o.target.value });
          }}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Message
        </span>
        <input
          className="form-control"
          type="text"
          placeholder="Message"
          aria-label="default input example"
          onChange={(o) => {
            setUserMessage({ ...userMessage, UserMessage: o.target.value });
            setCharactersLeft(300 - o.target.value.length);
          }}
          onKeyDown={(o) => {
            if (o.target.value.length >= 300) {
              o.preventDefault();
            }
          }}
          maxLength={300}
        />
        <div>Characters left: {charactersLeft}</div>
      </div>
      <button className="btn btn-secondary" onClick={handleAddMessage}>
        Send Message
      </button>
    </div>
  );
};
