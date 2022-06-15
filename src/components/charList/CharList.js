import React, {useState, useEffect, useRef} from 'react';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';


const CharList = (props) => {

    const [list, setList] = useState([]);
    const [newItemLoding, setLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setEnded] = useState(false);

    const {getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, []) 
    
    const onRequest = async (offset) => {
        const res = await getAllCharacters(offset);
        
        let ended = false;
        if(res.length < 9) {
            ended = true;
        }
        setList(list => [...list, ...res]);
        setOffset(offset => offset + 9);
        setEnded(ended);
            
    }

    const itemRefs = useRef([]);

    const focusItem = (i) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[i].classList.add('char__item_selected');
    }


    const elements = list ? list.map((item, i) => {
        const {name, description, thumbnail, id} = item;
        const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
        const imgStyle = imgNotFound === thumbnail ? {objectPosition: '0'} : {objectFit: 'cover'};
        return (
            <li 
                className='char__item'
                key={id} 
                onClick={() => {
                    props.onCharSelected(id);
                    focusItem(i);
                }}
                ref={el => itemRefs.current[i] = el}
            >
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div className="char__name">{name}</div>
            </li>
        )    
    }) : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {elements}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoding}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}



export default CharList;