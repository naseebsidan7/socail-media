import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import LoginPage from './screens/loginpage/LoginPage'
import HomePage from "./screens/homePage/HomePage"
import ProfilePage from "./screens/profilePage/ProfilePage"
 
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
              <CssBaseline/> 
              <Routes>
                  <Route path="/" element={isAuth? <Navigate to='/home' replace /> : <LoginPage/>}/>
                  <Route path="/home" element={isAuth? <HomePage/> : <Navigate to='/' />} />
                  <Route path="/profile/:userId" element={isAuth? <ProfilePage/> : <Navigate to='/' />} />
              </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  )
}

export default App
