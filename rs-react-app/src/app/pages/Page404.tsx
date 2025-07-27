import page404 from '../../assets/page404.png';
import BackToMainButton from '../components/BackToMainButton/BackToMainButton';

const Page404 = () => {
  return (
    <main className="p-8 flex-grow flex-col flex items-center justify-center">
      <img src={page404} alt="" className="mb-5 max-w-[500px] mx-auto" />
      <BackToMainButton text="Back to Main Page" />
    </main>
  );
};

export default Page404;
