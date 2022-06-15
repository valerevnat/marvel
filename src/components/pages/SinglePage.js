import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMassage/ErrorMassage';
import AppBanner from "../appBanner/AppBanner";

// Компонент отвечает за логику "однотипных страниц" страниц (SingleComic и SingleChar)
// принимает компоненты, которые просто что-то рендерят 

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams(); // получение id из url-пути
    const [data, setData] = useState(null);
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;                                             

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;