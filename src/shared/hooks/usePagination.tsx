import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const usePagination = () => {
  const { page, pokemonName } = useParams();
  const currentPage = +(page ?? 1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const changePage = (page: number) => {
    if (pokemonName) {
      navigate(`/${page}/${pokemonName}`);
    } else {
      navigate(`/${page}`);
    }
  };

  return { currentPage, changePage, totalPages, setTotalPages };
};

export default usePagination;
