import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Reviews from './components/Reviews';
import Trailer from './components/Trailer';

import styled from "@emotion/styled";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: black;
  color:white;
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [singleMovie, setSingleMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovies()
  }, []);

  const getMovies = async() => {
    try{
      const response = await axios.get("http://localhost:8080/api/v1/movies");

      setMovies(response.data);
    } catch(err) {
      setError(err);
    }
  };

  const getMovieDetails = async(movieId) => {
    try {
      const response =  await axios.get(`http://localhost:8080/api/v1/movies/${movieId}`);
      const movie = response?.data;

      setSingleMovie(movie);
      const currentReviews = movie?.reviewIds;
      
      setReviews(currentReviews);
    } catch(err) {
      setError(err);
    }
  }
  
  if(error) {
    return <div> Sorry Something Went Wrong. Try Refresh the Page</div>
  }

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies}/>}></Route>
            <Route path="/trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/reviews/:movieId" element ={<Reviews getMovieDetails = {getMovieDetails} movie={singleMovie} reviews={reviews} setReviews = {setReviews} />} />
        </Route>
      </Routes>
    </AppContainer>
  )
};

export default App;
