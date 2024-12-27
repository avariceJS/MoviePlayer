import { BrowserRouter } from 'react-router-dom'
import Body from '../widgets/Body/body'
import Footer from '../widgets/Footer/footer'
import Header from '../widgets/Header/header'


/**
 * Main application component.
 * It wraps the application with BrowserRouter and renders Header, Body, and Footer.
 */
export default function App() {
  return (
   
      <BrowserRouter>
      <Header/>
      <Body/>
      <Footer/>
      </BrowserRouter>
    
  )
}
