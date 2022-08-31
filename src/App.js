import React, { useState, useEffect } from "react";
import "./App.css";
import Tmdb from "./Tmdb.js";
import Header from "./components/Header";
import FeaturedMovie from "./components/FeaturedMovie/";
import MovieRow from "./components/MovieRow";

export default () => {
  const [movieList, setMovieList] = useState([]); //cria array de filmes vazia
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      console.log(list);

      let originals = list.filter((i) => i.slug === "original");
      console.log(originals);

      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );

      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}
      <div className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </div>

      <footer>
        Feito por João <br />
        Direitos por Netflix <br />
        Dados pego do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img
            href="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif"
            alt="carregando"
          />
        </div>
      )}
    </div>
  );
};

// mensageria
//micro servicos
//inertia, css tail e monolito
