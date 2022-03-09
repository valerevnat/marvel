import React, {useState, useEffect, useRef} from 'react';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';


const CharList = (props) => {

    const [list, setList] = useState([]);
    const [newItemLoding, setLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setEnded] = useState(false);
    // state = {
    //     list: [],
    //     newItemLoding: false, // для деактивации кнопки загрузки доп персонажей
    //     offset: 210,
    //     charEnded: false,
    // }

    const {getAllCharacters} = useMarvelService();
    // marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []) // пустой [] моделирует componentDidMount
    // componentDidMount() {        
    //     this.onRequest(); 
    // }

    const onRequest = async (offset) => {
        // setLoading(false);
        const res = await getAllCharacters(offset);
        
        let ended = false;
        if(res.length < 9) {
            ended = true;
        }
        setList(list => [...list, ...res]);
        setOffset(offset => offset + 9);
        setEnded(ended);
        // await this.setState(({list, offset}) => ({
        //     list: [...list, ...res],
        //     newItemLoding: false, 
        //     offset: offset + 9,
        //     charEnded: ended
        // }));
            
    }

    const itemRefs = useRef([]);

    // const setRef = (ref) => {
    //     this.itemRefs.push(ref)
    // }


    const focusItem = (i) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[i].classList.add('char__item_selected');
    }

    const elements = list ? list.map((item, i) => {
        const {name, description, thumbnail, id} = item;
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
                <img src={thumbnail} alt={name}/>
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
    // render() {
    //     const {list, newItemLoding, offset, charEnded} = this.state;

    //     //char__item_selected - класс активности
    //     const elements = list ? list.map((item, i) => {
    //         const {name, description, thumbnail, id} = item;
    //         return (
    //             <li 
    //                 className='char__item'
    //                 key={id} 
    //                 onClick={() => {
    //                     this.props.onCharSelected(id);
    //                     this.focusItem(i);
    //                 }}
    //                 ref={this.setRef}
    //             >
    //                 <img src={thumbnail} alt={name}/>
    //                 <div className="char__name">{name}</div>
    //             </li>
    //         )    
    //     }) : null;

    //     return (
    //         <div className="char__list">
    //             <ul className="char__grid">
    //                 {elements}
    //             </ul>
    //             <button 
    //                 className="button button__main button__long"
    //                 disabled={newItemLoding}
    //                 style={{'display': charEnded ? 'none' : 'block'}}
    //                 onClick={() => this.onRequest(offset)}>
    //                 <div className="inner">load more</div>
    //             </button>
    //         </div>
    //     );
    // }


export default CharList;

