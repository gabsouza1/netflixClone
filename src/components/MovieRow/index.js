import React, { useState } from 'react';
//Importando o estilo do arquivo movieRow.css
import './MovieRow.css';
//Importando os botões do material-ui
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

//função para receber os dados tmdb e exporta-los para a app.js
export default ({title, items}) => {

    const [scrollX, setScrollX] = useState(-400);

    //Função para fazer o botão esquerdo funcionar
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0;
        }
        setScrollX(x);
    }

    //Função para fazer o botão direito funcionar
    const handleRightArrow = () =>{
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if(window.innerWidth - listW > x)
        {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    // Ajustando os botões para ficarem do tamanho do box size das imagens quando estiverem em 100%
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                marginLeft: scrollX,
                width: items.results.length * 150
                }}>
                
                    {items.results.length > 0 && items.results.map((item, key) =>(
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    )
}    