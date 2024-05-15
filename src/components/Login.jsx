import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { TokenContext } from "../../context/AppProvider";

function Login() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  // const { username, setUsername, userData, setUserData } = useContext(TokenContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth", {
        username: username,
        password: password,
      });

      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.userId);
      localStorage.getItem("token") && getUser();
      localStorage.getItem("token") && navigate("/");
      // setUserData({ ...userData, username: username });
      // localStorage.setItem("username", username);

      // navigate("/main");
    } catch (error) {
      console.error(error);
      setErr(error.response.data.messages[0]);
    }
  };

  const handleUsername = (e) => {
    //const { value } = event.target;
    setUsername(e.target.value);
    console.log(username);
  };
  const getUser = async () => {
    try {
      const tes = await axios.get("/api/test", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(tes.data.id);
      localStorage.setItem("username", tes.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="login">
        <div className="login_container">
          <div className="login_text">
            <h1>Sign in</h1>
          </div>
          <form action="submit" onSubmit={userLogin}>
            <div>
              <label htmlFor="user">Username</label>
              <input id="user" type="text" onChange={handleUsername} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="text" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">bas</button>
          </form>
          {err}
        </div>
      </div>
    </div>
  );
}

export default Login;
