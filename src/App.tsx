import { useEffect, useState } from "react";
import "./App.css";

import SignUp from "./components/SignUp";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import { user } from "./model/user";
import { getLoggedInUser } from "./network/not_api";
import { BrowserRouter } from "react-router-dom";
import { Route, Router, Routes } from "react-router";
import NotePages from "./pages/NotePages";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  const [loggedInUser, setloggedInUser] = useState<user | null>(null);
  const [SignUpBox, setSignUpBox] = useState<Boolean>(false);
  const [loginBox, setloginBox] = useState<Boolean>(false);

  useEffect(() => {
    async function fetchedLoggedInUser() {
      try {
        const user = await getLoggedInUser();
        setloggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchedLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="w-full bg-white">
        <div className="w-[1000px] max-w-full mx-auto">
          <div>
            <NavBar
              loggedInUser={loggedInUser}
              onSignUpClicked={() => {
                setSignUpBox(true);
                setloginBox(false);
              }}
              onLoginClicked={() => {
                setloginBox(true);
                setSignUpBox(false);
              }}
              onLogoutSuccesful={() => {
                setloggedInUser(null);
              }}
            />
          </div>
          <div>
            <Routes>
              <Route
                path="/"
                element={<NotePages loggedInUser={loggedInUser} />}
              />
              <Route path="/privacy" element={<PrivacyPage />} />

              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
          <div>
            <div>
              {SignUpBox && (
                <SignUp
                  setSignUpBox={setSignUpBox}
                  onSignUpSuccesful={() => {}}
                />
              )}
            </div>
            <div>
              {loginBox && (
                <Login
                  setloginBox={setloginBox}
                  onLoginSuccesful={(user) => {
                    setloggedInUser(user);
                    setloginBox(false);
                  }}
                />
              )}
            </div>
          </div>
          {/* <div className="mx-auto pb-10">
            <Footer />
          </div> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
