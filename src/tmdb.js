// Chave da api tmdb
const API_KEY = '';

//Link da api tmdb
const API_BASE = 'https://api.themoviedb.org/3';


/*
    Modelos de organização
    
    Filmes originais Netflix
   [Em alta (Top Rated)
    Recomendados
    Comédia
    Ação
    Terror
    Romance
    Documentários etc

*/

// Função auxiliar para pegar as requisições de um arquivo externo para
// no caso seria a nossa API

const basicFetch = async (endpoint) => {
        const req = await fetch(`${API_BASE}${endpoint}`);
        const json = await req.json();
        return json;
}

// Async = comando para executar a requisição depois que o pedido for entregue e não imediatamente
// Await = comando para aguardar a requisição ser enviada


//Exportando as informações do site da api 
export default {
    getHomeList : async () =>{
       return [
           {
               slug: 'originals',
               title : "Originais do Netflix",
               items : await basicFetch(`/discover/tv/?with_network=213&language=pt-BR&api_key=${API_KEY}`)
           },
           {
               slug: 'trending',
               title : "Recomendados para Você",
               items : await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
           },
           {
               slug: 'toprated',
               title : "Em Alta",
               items : await basicFetch(`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
           },
           {
               slug: 'action',
               title : "Ação",
               items : await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
           },
           {
               slug: 'comedy',
               title : "Comédia",
               items : await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
           },
           {
               slug: 'horror',
               title : "Terror",
               items : await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
           },
           {
               slug: 'romance',
               title : "Romance",
               items : await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
           },            
           {
               slug: 'documentary',
               title : "Documentários",
               items : await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ]
    },

    //Função para pegar mais informações especificas dos filmes para alinha junto com os filmes em destaque de
    // Ex: Gênero, nota, temporadas etc etc

    getMovieInfo: async (movieId, type) => {
        let info = {};
        if(movieId) {
            switch(type) {
                case 'movie': 
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                case 'tv': 
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                default: 
                    info = null; 
                break;
            }
        }

        return info;
    }
}
