import { useState } from 'react'
import './App.css'
import { Page } from 'konsta/react'
import AppNavbar from './components/AppNavbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import PrintView from './pages/PrintView'
import AppFabBtn from './components/AppFabBtn'

function App() {
  /** triggerCheckbox change: requied to keep track in changes of state of checkbox */
  const [triggerCheckbox, settriggerCheckbox] = useState(false);

  return (
    <Page className='h-screen'>

      <BrowserRouter basename='/shopping-calculator/'>
        <AppNavbar triggerCheckbox={triggerCheckbox} />
        <AppFabBtn />

        <Routes>
          <Route path='/' element={<Homepage
            triggerCheckbox={triggerCheckbox}
            settriggerCheckbox={settriggerCheckbox} />}
          />
          <Route path='/printPage' element={<PrintView />} />
        </Routes>

      </BrowserRouter>
    </Page>
  )
}

export default App