import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { BiSearchAlt } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import bi from "../../../assets/images/bi_cloud-check.png";
import img from "../../../assets/images/img.png";
import axios from "axios";
import Modal from "../modal";
import Modal2 from "../modal2";

export default function Head() {
  const [txt, setTxt] = useState("");
  const [tg1, setTg1] = useState(false);
  const [ap, setAp] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal2 = () => {
    setModalIsOpen2(true);
  };

  const closeModal2 = () => {
    setModalIsOpen2(false);
  };

  useEffect(() => {
    axios
      .get("https://0001.uz/books")
      .then((response) => { // Access the response data
        const res = response.data;
        setAp(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleChange = () => {};

  const fetchCover = async (bookCover) => {
    try {
      const response = await axios.get(bookCover);
      return <p>response.data</p>;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(
        `https://0001.uz/books/:${bookId}`
      );
      console.log(response.data); // Assuming your server returns some data upon successful deletion
      // Handle success, update state, or perform any other necessary actions
    } catch (error) {
      console.error("Error deleting book:", error);
      // Handle error
    }
  };

  return (
    <div className={styles.hd}>
      <div className={styles.bk}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1115"
          height="1024"
          viewBox="0 0 1115 1024"
          fill="none"
        >
          <path
            d="M0 0H1072.5L1103.2 37.9667C1118.42 56.7948 1117.96 83.8246 1102.12 102.13L304 1024H0V0Z"
            fill="#333333"
          />
        </svg>
      </div>
      {/* head */}
      <div className={styles.admin}>
        <div className={styles.container}>
          <div className={styles.first}>
            <img src={bi} />
            <p className={styles.prg}>
              <span>Books</span> List
            </p>
            <form
              onSubmit={handleChange}
              style={tg1 ? { background: "#fff" } : {}}
            >
              <BiSearchAlt
                className={styles.sv1}
                onClick={() => {
                  setTg1(!tg1);
                }}
                style={tg1 ? { color: "#151515" } : { color: "#fff" }}
              />
              {tg1 ? (
                <input
                  type="text"
                  placeholder="Enter book name ... "
                  value={txt}
                  onChange={(e) => {
                    setTxt(e.target.value);
                  }}
                  className={styles.inp}
                />
              ) : (
                <p className={styles.prg2}>Search for any training you want </p>
              )}
              <AiOutlineCloseCircle
                className={styles.sv2}
                onClick={() => {
                  setTg1(!tg1);
                }}
                style={
                  tg1
                    ? { color: "#151515", display: "flex" }
                    : { display: "none" }
                }
              />
            </form>
          </div>
          <div className={styles.second}>
            <div className={styles.bl}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={styles.svicon}
              >
                <path
                  d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                  stroke="#151515"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <button className={styles.bt}></button>
            </div>
            <div className={styles.avatar}>
              <div className={styles.shbl}>
                <img src={img} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end of head */}
      {/* Natija */}
      <div className={styles.natija}>
        <div className={styles.container}>
          <div className={styles.tsk}>
            <div className={styles.fr}>
              <p className={styles.up}>
                You've got <span>{ap.length} book</span>
              </p>
              <p className={styles.ps}>Your task today</p>
            </div>
            <div className={styles.btns}>
              <input type="text" placeholder="Enter your name" />
              <button onClick={openModal}>+ Create a book</button>
              <Modal isOpen={modalIsOpen} closeModal={closeModal} />
            </div>
          </div>
        </div>
        <div className={styles.container}>
          {ap.map((r) => (
            <div className={styles.cardchng} key={r.id?r.id:r.isbn}>
              <div className={styles.card}>
                <p className={styles.ttl}>{r.title}</p>
                <p className={styles.cvr}>{r.cover}</p>
                <div className={styles.fl}>
                  <p className={styles.auth}>
                    {r.author}:{r.published}
                  </p>
                  <p className={styles.pg}>{r.pages} pages</p>
                </div>
              </div>
              <div className={styles.chngbtn}>
                <button
                  className={styles.del}
                  onClick={() => {
                    deleteBook(r.id ? r.id : r.isbn);
                  }}
                >
                  <FiTrash2 />
                </button>
                <button className={styles.chng} onClick={openModal2}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    className={styles.svgga}
                  >
                    <path
                      d="M14.6667 12L14 12.7294C13.6464 13.1161 13.1668 13.3333 12.6668 13.3333C12.1668 13.3333 11.6873 13.1161 11.3337 12.7294C10.9796 12.3434 10.5001 12.1267 10.0002 12.1267C9.50033 12.1267 9.02084 12.3434 8.66673 12.7294M2.66675 13.3333H3.78311C4.10923 13.3333 4.27229 13.3333 4.42574 13.2965C4.56179 13.2638 4.69185 13.21 4.81115 13.1369C4.9457 13.0544 5.061 12.9391 5.2916 12.7085L13.6668 4.33334C14.219 3.78106 14.219 2.88563 13.6668 2.33334C13.1145 1.78106 12.219 1.78106 11.6668 2.33334L3.29159 10.7085C3.06099 10.9391 2.94568 11.0544 2.86323 11.189C2.79012 11.3083 2.73625 11.4383 2.70359 11.5744C2.66675 11.7278 2.66675 11.8909 2.66675 12.217V13.3333Z"
                      stroke="#FEFEFE"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <Modal2 isOpen={modalIsOpen2} closeModal={closeModal2} index={r.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End of Natija */}
    </div>
  );
}
