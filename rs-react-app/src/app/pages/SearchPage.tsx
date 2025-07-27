import { Outlet, useLocation } from 'react-router-dom';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import Footer from '../components/Footer/Footer';

const SearchPage = () => {
  const location = useLocation();
  const isOutlet = location.pathname.includes('/pokemons/');

  return (
    <>
      {isOutlet ? (
        <div className="flex h-full min-h-screen">
          <div className="w-1/2">
            <SearchPanel />
          </div>
          <div className="w-1/2 bg-yellow-100 p-8 pt-10">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full min-h-screen">
          <SearchPanel />
        </div>
      )}
      <Footer />
    </>
  );
};

export default SearchPage;
