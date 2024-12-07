import { useEffect, useState } from 'react'
import './App.css'
import { Page } from 'konsta/react'
import AppNavbar from './components/AppNavbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import PrintView from './pages/PrintView'
import AppFabBtn from './components/AppFabBtn'
import {App as Application} from "@capacitor/app"
import About from './pages/About'
import PrivPolicy from './pages/PrivPolicy'
import AppDailog from './components/AppDailog'

function App() {
  /** triggerCheckbox change: requied to keep track in changes of state of checkbox */
  const [triggerCheckbox, settriggerCheckbox] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    Application.addListener("backButton",(state)=>{
      if (state.canGoBack) {
        window.history.back();
      }else{
        setIsOpened(true)
      }
    })
  }, [])
  

  return (
    <Page className='h-screen'>

      <BrowserRouter 
      // basename='/shopping-calculator/'
      >
        <AppNavbar triggerCheckbox={triggerCheckbox} />
        <AppFabBtn />

        <Routes>
          <Route path='/' element={<Homepage
            triggerCheckbox={triggerCheckbox}
            settriggerCheckbox={settriggerCheckbox} />}
          />
          <Route path='/printPage' element={<PrintView />} />
          <Route path='/about' element={<About />} />
          <Route path='/privacy' element={<PrivPolicy />} />
        </Routes>
        {/* back to exit dialog */}
        <AppDailog title='Exit' OnOk={()=>{Application.exitApp()}} OnCancel={()=>{}} content={"Are you sure to exit?"} isOpened={isOpened} setIsOpened={setIsOpened}/>

      </BrowserRouter>
    </Page>
  )
}

export default App