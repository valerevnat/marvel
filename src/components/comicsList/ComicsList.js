import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);

    const {getAllComics} = useMarvelService();

    useEffect(() => {
        onRequestComics();
    }, [])

    const onRequestComics = async(offset) => {
        const res = await getAllComics(offset);

        let ended = false;
        if(res.length < 8) {
            ended = true;
        }
        setComics(comics => [...comics, ...res]);
        setOffset(offset => offset + 8);
    }


    const elements = comics ? comics.map(item => {
        const {id, title, prices, thumbnail} = item;
        // console.log(id);
        // console.log(title);
        // console.log(prices);
        // console.log(thumbnail);
        return (
            <li key={id} className="comics__item">
                <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{prices}$</div>
                </Link>
            </li>
        )
    }) : null;


    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {elements}
            </ul>
            <button 
                className="button button__main button__long"
                onClick={() => onRequestComics(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;