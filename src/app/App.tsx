// Navigate
import { BrowserRouter } from 'react-router-dom'

// Widgets
import Body from '@/widgets/Body'
import Footer from '@/widgets/Footer'
import Header from '@/widgets/Header'

/**
 * Main application component.
 * It wraps the application with BrowserRouter and renders Header, Body, and Footer.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Body />
      <Footer />
    </BrowserRouter>
  )
}
