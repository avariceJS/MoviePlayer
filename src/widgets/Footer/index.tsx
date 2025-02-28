/**
 * Footer component displaying the footer section of the website.
 *
 * @returns A footer element containing copyright information, navigation links,
 *          and social media icons.
 */
const Footer = () => {
  return (
    <footer className="bg-header text-gray-400 py-3 mt-10">
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-sm">
            © {new Date().getFullYear()} FilmHaven. All rights reserved.
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Contact Us
            </a>
          </nav>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
