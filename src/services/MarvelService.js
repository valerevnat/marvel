import {useHttp} from '../hooks/http.hook';

// Название компонента меняем с MarvelService на useMarvelService

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp(); // импортируем все, что есть в кастомном хуке
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // данные знач запрещено менять (те, что с нижним плдчеркианием)
    const _apiKey = 'apikey=c5c55a839f5e4271e771256c3da7415f';
    const _baseOffsetChar = 210; // Базовый отступ при запросе getAllCharacters

    
    //Вместо getResource используем request

    // getResource = async(url) => {
    //     let res = await fetch(url);
    //     if(!res.ok) {
    //         throw new Error(`code error: ${res.status}`)
    //     }
    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _baseOffsetChar) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
        
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffsetChar) => {
        
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        // console.log(res.data.results.map(_transformComics));
        return res.data.results.map(_transformComics)
        
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    // console.log(res.data.results.map(_transformComics));

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 200)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            prices: comics.prices[0].price,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description ? `${comics.description.slice(0, 200)}...` : 'There is no description for this comic',
            pageCount: comics.pageCount ? comics.pageCount : 'no data',
            // language: comics.textObjects.language

        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic};
}

export default useMarvelService;