import React, { useState } from "react";
import ReactModal from "react-modal";
import { GoXCircle } from "react-icons/go";
import axios from "axios";

export default function Modal(props) {
  const [theme, setTheme] = useState({
    title: "",
    author: "",
    cover: "",
    publish: "",
    pages: "",
  });
  const httpUrl = "https://0001.uz/books";
  const handleSubmit = () => {
    axios
      .post(httpUrl, theme)
      .then((res) => {
        alert("Book created successfully");
        // Close the modal or perform any other actions after a successful submission
        {props.closeModal();}
      })
      .catch((error) => {
        alert("Error occurred! Please check the console for details.");
        console.error(error);
      });
  };

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "28vw",
      display: "flex",
      padding: "1.5vw 1.5vw",
      flexDirection: "column",
      alignItems: "center",
      gap: "1vw",
      borderRadius: "12px",
      background: "#fff",
      boxShadow: "0px 4px 32px 0px rgba(51, 51, 51, 0.04)",
    },
  };
  const head = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  };
  const ttl = {
    color: "#151515",
    fontFamily: "sans-serif",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
  };
  const icon = {
    width: "1.5vw",
    height: "1.5vw",
    flexShrink: "0",
    cursor: "pointer",
  };
  const grp = {
    display: "flex",
    flexDirection: "column",
    gap: "1vw",
    width: "100%",
  };
  const p = {
    color: "#151515",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "sans-serif",
    fontSize: "1.1vw",
    fontStyle: "normal",
    paddingTop: "0.3vw",
    fonWeight: "500",
    lineHeight: "120%" /* 16.8px */,
  };
  const input = {
    display: "flex",
    marginTop: "0.3vw",
    height: "2.7vw",
    padding: "1.2vw 1.2vw",
    alignItems: "center",
    gap: "1vw",
    alignSelf: "stretch",
    borderRadius: "6px",
    border: "1px solid #EBEBEB",
    background: "#FEFEFE",
    width: "100%",
    color: "#151515",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "sans-serif",
    fontSize: "16px",
    fontstyle: "normal",
    fontWeight: "400",
    lineHeight: "120%" /* 19.2px */,
  };
  const grpbtn = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  };
  const btn = {
    display: "flex",
    padding: "10px 20px",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 0 0",
    background: "none",
    borderRadius: "4px",
    border: "1px solid #6200EE",
    color: "#6200EE",
    lineHeight: "normal",
    fontFamily: "sans-serif",
    fontSize: "16px",
    fontstyle: "normal",
    fontWeight: "500",
    cursor: "pointer",
  };
  return (
    <ReactModal isOpen={props.isOpen} onRequestClose={props.closeModal} style={modalStyle}>
      <div style={head}>
        <p style={ttl}> Create a book</p>
        <GoXCircle style={icon} onClick={props.closeModal} />
      </div>
      <div style={grp}>
        <div>
          <p style={p}>Title</p>
          <input
            value={theme.title}
            onChange={(e) => setTheme({ ...theme, title: e.target.value })}
            style={input}
            type="text"
            placeholder="Enter your title"
            required
          />
        </div>
        <div>
          <p style={p}>Author</p>
          <input
            value={theme.author}
            onChange={(e) => setTheme({ ...theme, author: e.target.value })}
            type="text"
            style={input}
            placeholder="Enter your author"
            required
          />
        </div>
        <div>
          <p style={p}>Cover</p>
          <input
            value={theme.cover}
            onChange={(e) => setTheme({ ...theme, cover: e.target.value })}
            type="text"
            style={input}
            placeholder="Enter your cover"
            required
          />
        </div>
        <div style={p}>
          <p>Published</p>
          <input
            value={theme.publish}
            onChange={(e) => setTheme({ ...theme, publish: e.target.value })}
            style={input}
            type="text"
            placeholder="Enter your published"
            required
          />
        </div>
        <div>
          <p style={p}>Pages</p>
          <input
            value={theme.pages}
            onChange={(e) => setTheme({ ...theme, pages: e.target.value })}
            style={input}
            type="text"
            placeholder="Enter your pages"
            required
          />
        </div>
      </div>
      <div style={grpbtn}>
        <button style={btn} onClick={props.closeModal}>
          Close
        </button>
        <button style={btn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </ReactModal>
  );
}
