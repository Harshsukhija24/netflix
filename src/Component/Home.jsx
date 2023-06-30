import React, { useEffect, useState } from 'react';
import "./Home.scss";
import axios from 'axios';
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apikey = "cc99b574dc6d08a10faca52e22687bcd";
const popular = "popular";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const topRated = "top_rated";
const url = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({ img }) => {
  return (
    <img className='card' src={img} alt='cover' />
  );
};

const Row = ({ title, arr = [] }) => {
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div>
        {
          arr.map((item, index) => (
            <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
          ))
        }
      </div>
    </div>
  );
};

const Home = () => {
  const [upcomingmovie, setUpcomingmovie] = useState([]);
  const [popularmovie, setPopularmovie] = useState([]);
  const [topRatedmovie, setTopratedmovie] = useState([]);
  const [nowPlayingmovie, setNowplayingmovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { results: popularResults } } = await axios.get(`${url}/${popular}?api_key=${apikey}`);
        setPopularmovie(popularResults);

        const { data: { results: upcomingResults } } = await axios.get(`${url}/${upcoming}?api_key=${apikey}`);
        setUpcomingmovie(upcomingResults);

        const { data: { results: topRatedResults } } = await axios.get(`${url}/${topRated}?api_key=${apikey}`);
        setTopratedmovie(topRatedResults);

        const { data: { results: nowPlayingResults } } = await axios.get(`${url}/${nowPlaying}?api_key=${apikey}`);
        setNowplayingmovie(nowPlayingResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage: popularmovie[0] ? `url(${`${imgUrl}/${popularmovie[0].poster_path}`})` : "none"
      }}>
        {popularmovie.length > 0 && (
          <>
            <h1>{popularmovie[0].original_title}</h1>
            <p>{popularmovie[0].overview}</p>
          </>
        )}

        <div>
          <button>Play <BiPlay /></button>
          <button>My List <AiOutlinePlus /></button>
        </div>
      </div>

      <Row title={"Popular"} arr={popularmovie} />
      <Row title={"Upcoming"} arr={upcomingmovie} />
      <Row title={"Top Rated"} arr={topRatedmovie} />
      <Row title={"Now Playing"} arr={nowPlayingmovie} />
    </section>
  );
};

export default Home;
