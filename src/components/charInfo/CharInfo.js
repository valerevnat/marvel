import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    
    const[char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        upDateChar();
    }, [props.charId])


    const upDateChar = () => {
        clearError();
        const {charId} = props;
        if (!charId) {
            return;
        }
        
        getCharacter(charId)
            .then(onCharLoaded)
    }

    

    const onCharLoaded = (char) => {
        setChar(char);
        console.log(char);
    }


    const skeleton =  char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/>: null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics: {
                comics.length ? null : 'not found'
            } </div>
            <ul className="char__comics-list" onClick={e => {
                console.log(e.target.outerText);
            } }>
                {
                    comics.map((item, i) => { // i -номер по порядку
                        if(i > 9) {return;}
                        
                        return (
                            <li href='#' key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
                
                
            </ul>
        </>
    )
}

export default CharInfo;