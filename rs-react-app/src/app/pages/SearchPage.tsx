import { Outlet } from 'react-router-dom';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import { useParams } from 'react-router-dom';

const SearchPage = () => {
  const { pokemonName } = useParams();
  const isOutlet = pokemonName ? true : false;

  return (
    <div className="flex h-screen w-full">
      <div className={`${isOutlet ? 'w-1/2' : 'w-full'} overflow-y-auto`}>
        <SearchPanel />
      </div>

      {isOutlet ? (
        <div className="w-1/2 bg-yellow-100 p-8">
          <Outlet />
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;
