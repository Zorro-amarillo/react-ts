import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetPokemonQuery } from '@/shared/api/pokemonApiSlice';
import { btnPrimaryStyle } from '@/shared/constants';
import { BackToMainButton, Loader } from '@components';

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const navigate = useNavigate();

  const result = useGetPokemonQuery(pokemonName);
  const { data: pokemonData, isLoading, isFetching, isError, refetch } = result;

  useEffect(() => {
    if (isError) {
      console.error('PokemonDetails useEffect error');
      navigate('/page404', { replace: true });
    }
  }, [isError, navigate]);

  if (!pokemonName) {
    return <p className="text-red-500 text-center mt-10">Invalid Pokemon name</p>;
  }

  if (isLoading || isFetching) {
    return (
      <div className="mt-10">
        <Loader />
      </div>
    );
  }

  if (!pokemonData) {
    return null;
  }

  return (
    <>
      <BackToMainButton text="Close Card" />
      <h3 className="text-gray-900 mt-10">{`${pokemonName[0].toUpperCase()}${pokemonName?.slice(1)}`}</h3>
      <img src={pokemonData.sprites.front_default} alt="Pokemon Image" className="mx-auto" />
      <p className="text-gray-500">{`Height: ${pokemonData.height}`}</p>
      <p className="text-gray-500">{`Weight: ${pokemonData.weight}`}</p>
      <button
        className={`${btnPrimaryStyle} mt-8`}
        onClick={() => {
          refetch();
          console.info(`Cache for ${pokemonName} is cleared`);
        }}
      >
        Clear Pokemon Cache
      </button>
    </>
  );
};

export default PokemonDetails;
