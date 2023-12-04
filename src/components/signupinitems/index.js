import React, { useState } from "react";
import styles from "./index.module.scss";
import gl from "../../assets/images/gl.png";
import fc from "../../assets/images/fc.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpInItems() {
  const [tg, setTg] = useState(true);
  const [forch, setForch] = useState({
    ism: "",
    fism: "",
    email: "",
  });
  const [states, setStates] = useState({
    username: "",
    email: "",
    fism: "",
    pass: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const postApi = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth",
        states
      );
      console.log("after APImcall");

      if (response.data.success) {
        navigate("home")
      }

      // Handle the response data as needed
    } catch (error) {
      console.error("Error making POST request:", error);
      // Handle the error
    }
  };
  
  return (
    <div className={styles.sgn}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1115"
        height="1024"
        viewBox="0 0 1115 1024"
        fill="none"
        className={styles.sv}
      >
        <path
          d="M0 0H1072.5L1103.2 37.9667C1118.42 56.7948 1117.96 83.8246 1102.12 102.13L304 1024H0V0Z"
          fill="#333333"
        />
      </svg>
      <div className={styles.al}>
        <div className={styles.boxsign}>
          {tg ? (
            <div className={styles.signup}>
              <p className={styles.tl}>Sign in</p>
              <div className={styles.thrgoogle}>
                <button>
                  <img src={gl} /> Continue with Google
                </button>
                <button>
                  <img src={fc} /> Continue with Facebook
                </button>
                <div className={styles.divider}>
                  <hr />
                  <p>OR</p>
                  <hr />
                </div>
              </div>
              <div className={styles.formpart}>
                <form onSubmit={postApi}>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    value={states.username}
                    onChange={(e) =>
                      setStates({ ...states, username: e.target.value })
                    }
                    placeholder="Enter your name"
                    required
                  />
                  <label htmlFor="email">Your email</label>
                  <input
                    type="email"
                    id="email"
                    value={states.email}
                    onChange={(e) =>
                      setStates({ ...states, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    required
                  />
                  <label htmlFor="username">Your username</label>
                  <input
                    type="text"
                    id="username"
                    value={states.fism}
                    onChange={(e) =>
                      setStates({ ...states, fism: e.target.value })
                    }
                    placeholder="Enter your username"
                    required
                  />
                  <label htmlFor="password">Your password</label>
                  <input
                    type="password"
                    id="password"
                    value={states.pass}
                    onChange={(e) =>
                      setStates({ ...states, pass: e.target.value })
                    }
                    placeholder="Enter your password"
                    required
                  />
                  <input type="submit" className={styles.sbmt} />
                </form>
              </div>
            </div>
          ) : (
            <div className={styles.signup}>
              <p className={styles.tl}>Sign up</p>
              <div className={styles.thrgoogle}>
                <button>
                  <img src={gl} /> Continue with Google
                </button>
                <button>
                  <img src={fc} /> Continue with Facebook
                </button>
                <div className={styles.divider}>
                  <hr />
                  <p>OR</p>
                  <hr />
                </div>
              </div>
              <div className={styles.formpart}>
                <form onSubmit={''}>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    value={forch.ism}
                    onChange={(e) =>
                      setForch({ ...forch, ism: e.target.value })
                    }
                    placeholder="Enter your name"
                    required
                  />

                  <label htmlFor="email">Your email</label>
                  <input
                    type="email"
                    id="email"
                    value={forch.email}
                    onChange={(e) =>
                      setForch({ ...forch, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    required
                  />

                  <label htmlFor="soname">Your username</label>
                  <input
                    type="text"
                    id="soname"
                    value={forch.fism}
                    onChange={(e) =>
                      setForch({ ...forch, fism: e.target.value })
                    }
                    placeholder="Enter your username"
                    required
                  />

                  <input type="submit" className={styles.sbmt} />
                </form>
              </div>
            </div>
          )}
          <div className={styles.changable}>
            <p>Already signed up? </p>
            {tg ? (
              <button
                onClick={() => {
                  setTg(!tg);
                }}
              >
                Go to sign up.
              </button>
            ) : (
              <button
                onClick={() => {
                  setTg(!tg);
                }}
              >
                Go to sign in.
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
