import loader from '../../public/images/loader.gif';

const Loader = () => {
  return (
    <div className="w-full flex justify-center">
      <img src={loader.src} alt="Loading" className="w-auto max-w-64 max-h-64 mx-auto" />
    </div>
  );
};

export default Loader;
