// widgets
import { Header } from '@/widgets/Header/ui/Header'
import Footer from '@/widgets/Footer'
import Body from '@/widgets/Body'

// navigate
import { BrowserRouter } from 'react-router-dom'

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
