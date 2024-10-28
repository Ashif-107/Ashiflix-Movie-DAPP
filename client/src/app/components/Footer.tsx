import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">ASHIFLIX</h1>
            <p className="text-gray-400">© 2024 Ashif-107. All rights reserved.</p>
          </div>
          <ul className="flex space-x-6 mb-4">
            <li>
              <a href="/about" className="hover:text-gray-400">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
            </li>
          </ul>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-400">
            Built with 💙 using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
