import React, { useState, useEffect } from "react";
import "./App.css";
import Tmdb from "./Tmdb.js";
import Header from './components/Header'

export default () => {
  const [movieList, setMovieList] = useState([]); //cria array de filmes vazia
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)
  
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

  return <div className="page">
    <Header black={blackHeader} />
  </div>;
};

// mensageria
//micro servicos
//inertia, css tail e monolito
