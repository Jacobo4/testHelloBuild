// Styles
import styles from './RepoCard.module.css';
// Icons
import {BiSolidLockAlt, BiSolidLockOpenAlt} from "react-icons/bi";
import {AiOutlineStar, AiFillStar} from "react-icons/ai";
import {useEffect, useState} from "react";

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
    markAsFavoriteCb: (isFavorite: boolean) => void;
}


const RepoCard: React.FC<Props> = ({data, markAsFavoriteCb}) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        return;
    }, [isFavorite]);
    const markAsFavorite = () => {
        setIsFavorite(!isFavorite);
        markAsFavoriteCb(!isFavorite);
    }
    return (
        <div className={`${styles['RepoCard']} shadow-md rounded-md`}>
            <div className={styles['header']}>
                <div>
                    <a className={'text-xl'} href={data.url}>{data.name}</a>
                    {data.isPrivate
                        ? <span><BiSolidLockAlt/> Private</span>
                        : <span><BiSolidLockOpenAlt/> Public</span>
                    }
                </div>
                <div className={'text-2xl text-yellow-500 hover:cursor-pointer'} onClick={markAsFavorite}>
                    {isFavorite ? <AiFillStar/> : <AiOutlineStar/>}
                </div>

            </div>

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
