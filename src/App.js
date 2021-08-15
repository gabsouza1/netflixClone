//Importando react
import React, { useEffect, useState } from 'react';
//Importando a api do arquivo tmdb
import tmdb from './tmdb';
//Importando a funcionalidade movieRow
import MovieRow from './components/MovieRow'
//Importando o app.css
import './App.css';
//Importando a featured do arquivo featuredMovie
import FeaturedMovie from './components/FeaturedMovie';
//Importando o header
import Header from './components/Header'


export default() => {

  //Salvando a lista de filmes que foi puxada pela loadAll e devolve-la a pagina
  const [movieList, setMovieList] = useState([]);
  //Setando os filmes que apareceram na tela em destaque
  const [featuredData, setFeaturedData] = useState([null]);

  const [blackHeader, setBlackHeader] = useState(false);

//Assim que a página for recarregada, a funcionalidade useEffect já será executada
  useEffect(() => {
    const loadAll = async () => {
      
      //Pegando a lista total
      let list = await tmdb.getHomeList()
      setMovieList(list);

      // Pegando o filme em destaque originais netflix
      let originals = list.filter(filter=> filter.slug === 'originals');
      //Dentre os originais da netflix, pegar um filme/serie aleatório
      let randomMovie = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      //Escolhendo o filme aleatoriamente
      let chosen = originals[0].items.results[randomMovie];
      //Retornando o filme selecionado com as informações adicionais
      let chosenInformation = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInformation);
    }

    loadAll();
  }, []);

  //Função para adicionar cor preta ao cabeçalho quando scrolarmos a página
  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 15) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />
      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }
       <section className="lists">
         {movieList.map((item, key) =>(
           <MovieRow key={key} title={item.title} items={item.items}/>
         ))}
       </section>
         <footer>
           Feito por Saerfezil 😎 <br />
           Todos os direitos de imagens para Netflix<br />
           Api retirada do site themoviedb.org<br />
           Espelho do projeto retirado da video aula do canal Bonieky Lacerda<br />
         </footer>

          {movieList.length <= 0 && 
         <div className="loading">
              <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"/>
         </div>
          }
    </div>
  );
}