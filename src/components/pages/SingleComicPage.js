import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';

import './singleComicPage.scss';


const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        upDateComic();
    }, [comicId])


    const upDateComic = () => {
        clearError();
        
        getComic(comicId)
            .then(onComicLoaded)
    }

    

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/>: null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, prices, thumbnail, description, pageCount, language} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                {/* <p className="single-comic__descr">Language: {language}</p> */}
                <div className="single-comic__price">{prices}$</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;