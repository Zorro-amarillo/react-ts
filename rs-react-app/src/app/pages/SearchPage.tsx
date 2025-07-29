import { Outlet } from 'react-router-dom';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const SearchPage = () => {
  const { pokemonName } = useParams();
  const isOutlet = pokemonName ? true : false;

  return (
    <div className="flex flex-col min-h-screen" data-testid="search-page">
      <div className="flex flex-1">
        <div className={`${isOutlet ? 'w-1/2' : 'w-full'}`}>
          <SearchPanel />
        </div>

        {isOutlet ? (
          <div className="w-1/2 bg-yellow-100 p-8">
            <Outlet />
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
