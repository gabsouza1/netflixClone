import React from 'react';
import './FeaturedMovie.css';

export default ({item}) => {
    //Função para pegar o ano da serie
    let firstDate = new Date(item.first_air_date);

    //Função para pegar dados de generos da série dentro do objeto
    let genres = [];
    for (let i in item.genres){
        genres.push(item.genres[i].name);
    }

    // Codigo para limitar o tamanho do texto da descrição porem meu react não tava pegando a variavel text, resolvi deixar inteiro mesmo
    // let text = item.overview;
    // if(text.length > 200){
    //     text = text.substring(0, 200)  + '...';
    //  }

    return(
        //Configuração para importar as imagens das séries/filme
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    {/*Configuração para puxar o nome do filme/serie */}
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        {/*Puxando a nota do filme/serie */}
                        <div className="featured--points">{item.vote_average} pontos</div>
                        {/*Puxando a informação do ano de estreia do filme/serie */}
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        {/*Número de temporadas da series/filmes com tratamento para caso ela tenha apenas uma temporada, 
                        não aparecer a palavra temporadas */}
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    {/*Puxando as descrições dos filmes/series */}
                    <div className="featured--description">{item.overview}</div> 
                    <div className="featured--buttons">
                        {/*Botôes */}
                        <a href={`/watch/${item.id}`} className="featured--watch">► Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--wishlist">+ Minha Lista</a>
                    </div>
                        {/* Puxando as informações de gêneros dos filmes/series */}
                    <div className="featured--genres"><strong>Gêneros: {genres.join(', ')}</strong></div>
                </div>
            </div>
        </section>
    );
}