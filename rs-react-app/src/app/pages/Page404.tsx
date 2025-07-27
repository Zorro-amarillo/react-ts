import page404 from '../../assets/page404.png';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <>
      <img src={page404} alt="" className="mb-5 max-w-[500px]" />
      <Link to="/">Back to Main Page</Link>
    </>
  );
};

export default Page404;
