// Core
import React, {useState} from "react";
// Styles
import styles from './RepoCard.module.css';
// Icons
import {BiSolidLockAlt, BiSolidLockOpenAlt} from "react-icons/bi";
import {AiOutlineStar, AiFillStar} from "react-icons/ai";
interface Language {
    node: {
        name: string;
        color: string;
    }
}

interface Languages {
    edges: Language[]
}

export interface Repository {
    id: string;
    createdAt: string;
    name: string;
    url: string;
    pushedAt: string;
    isPrivate: boolean;
    languages: Languages;
    nameWithOwner: string;
    isFav?: boolean;
}


interface Props {
    data: Repository;
    toggleFavoriteCb: (isFavorite: boolean) => void;
}

/**
 * RepoCard component
 * @param data Repository data
 * @param toggleFavoriteCb Callback function to toggle favorite status and do high level operations
 * @constructor
 * @return JSX.Element
 * @category Components
 */
const RepoCard: React.FC<Props> = ({data, toggleFavoriteCb}) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(data.isFav !== undefined && data.isFav);

    /**
     * Toggle favorite status
     */
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        toggleFavoriteCb(!isFavorite);
    }
    return (
        <div className={`${styles['RepoCard']} shadow-md rounded-md`}>
            <div className={styles['header']}>
                <div>
                    <a className={'text-xl'} href={data.url}>{data.name}</a>

                </div>
                <div className={'text-2xl text-yellow-500 hover:cursor-pointer'} onClick={toggleFavorite}>
                    {isFavorite ? <AiFillStar/> : <AiOutlineStar/>}
                </div>

            </div>

            <div className={styles['description']}>
                {data.isPrivate
                        ? <><BiSolidLockAlt/> Private</>
                        : <><BiSolidLockOpenAlt/> Public</>
                    }
            </div>

            <hr/>

            <div className={styles['languages']}>
                {data.languages.edges.map((language,i) => {
                   return <span key={i} className={'rounded text-white text-xs p-1'} style={{backgroundColor: language.node.color}}>{language.node.name}</span>
                })}
            </div>
            <h4 className={'text-xs'}>Last updated: {new Date(data.pushedAt).toLocaleDateString()}</h4>
        </div>
    )


}

export default RepoCard;
