import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePokemonService from '../../services/usePokemonService/usePokemonService';
import BackToMainButton from '../BackToMainButton/BackToMainButton';
import Loader from '../Loader/Loader';
import type { IPokemon } from '../../../types/types';
import { useNavigate } from 'react-router-dom';

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const { getPokemon } = usePokemonService();
  const navigate = useNavigate();

  const [pokemonData, setPokemonData] = useState<IPokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentPokemon = async () => {
      if (!pokemonName) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const data = await getPokemon(pokemonName);
        if (!data) {
          throw new Error('Pokemon not found');
        }
        setPokemonData(data);
      } catch (err) {
        console.error(`PokemonDetails useEffect error: ${err}`);
        setPokemonData(null);
        navigate('/page404', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentPokemon();
  }, [getPokemon, pokemonName, navigate]);

  if (!pokemonName) {
    return (
      <p className="text-red-500 text-center mt-10">Invalid Pokemon name</p>
    );
  }

  if (isLoading) {
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
      {isLoading ? (
        <div className="mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <h3 className="text-gray-900 mt-10">{`${pokemonName[0].toUpperCase()}${pokemonName?.slice(1)}`}</h3>
          <img
            src={pokemonData.sprites.front_default}
            alt="Pokemon Image"
            className="mx-auto"
          />
          <p className="text-gray-500">{`Height: ${pokemonData.height}`}</p>
          <p className="text-gray-500">{`Weight: ${pokemonData.weight}`}</p>
        </>
      )}
    </>
  );
};

export default PokemonDetails;
