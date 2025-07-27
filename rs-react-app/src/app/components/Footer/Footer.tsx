import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-orange-100 w-full px-8 py-4">
      <p className="text-gray-500">Developed by zorro-amarillo</p>
      <Link to="/about">About zorro-amarillo</Link>
    </footer>
  );
};

export default Footer;
