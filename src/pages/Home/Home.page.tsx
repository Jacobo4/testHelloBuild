// Core
import React, {useEffect, useState} from "react";
// Styles
import styles from './Home.module.css';
// Context
import {useFirebaseAuth} from "@context/AuthContext.tsx";
// API
import {gitHubGraphQLRequest} from "@api/gitHubGraphQL.ts";
// Components
import ReposTable from "@components/ReposTable/ReposTable.tsx";
import RepoCard, {Repository} from "@components/RepoCard/RepoCard.tsx";
import Loader from "@components/Loader/Loader.tsx";


const query = `{ 
        viewer{
            repositories(last:100, orderBy:{field:CREATED_AT,direction: ASC}){
                nodes{
                id,
                createdAt,
                name,
                url,
                pushedAt,
                isPrivate,
                languages(first:5) {
                    edges {
                    node {
                        id,
                        name,
                        color
                        }
                    }
                },
                collaborators {
                    totalCount
                },
                nameWithOwner,
                }
            }
        }
    }`;

/**
 * HomePage component
 * @constructor
 * @return JSX.Element
 * @category Pages
 */

const HomePage: React.FC = () => {

    const user = useFirebaseAuth();
    const [reposData, setReposData] = useState<Repository[]>([]);
    const [tab, setTab] = useState<string>('All');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Handles tab change
     * @param tabName - Name of the tab
     */
    const handleTabs = (tabName: string) => {
        setTab(tabName);
    }

    useEffect(() => {
        const fetchGitHubUser = async () => {
            //TODO: Add toasts
            const githubUserToken = localStorage.getItem("githubAccessToken") as string;
            // @ts-ignore
            setIsLoading(true);
            const data = await gitHubGraphQLRequest(query, githubUserToken);
            setIsLoading(false);
            // @ts-ignore
            setReposData(data.data.viewer.repositories.nodes);
        }
        if (user) void fetchGitHubUser();

    }, [user]);

    const repoCards: JSX.Element[] = reposData.map((repo: Repository, i) => {

        return <li key={i}>
            <RepoCard data={repo} toggleFavoriteCb={(isFav) => {

                const newList = [...reposData];
                const index: number = newList.findIndex((e) => repo.id === e.id);

                if (index === -1) return;
                newList[index]['isFav'] = isFav;
                setReposData(newList)
            }
            }/>
        </li>
    });


    return (user &&
        <div className={styles['HomePage']}>
            <figure className={`${styles['profile-card']} shadow-xl rounded-xl`}>
                <img className="w-24 h-24 rounded-full m-auto" src={`${user.photoURL as string}`}
                     alt="User profile image" width="384" height="512"/>
                <div className="text-center md:text-left">
                    <blockquote>
                        <p className="text-lg font-medium">
                            “Tailwind CSS is the only framework that I've seen scale
                            on large teams. It’s easy to customize, adapts to any design,
                            and the build size is tiny.”
                        </p>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-sky-500">
                            {user.displayName}
                        </div>
                        <div className="text-slate-700">
                            {user.email}
                        </div>
                    </figcaption>
                </div>
            </figure>

            <div className={styles['cards']}>
                <div className={styles['tabs']}>
                    <button className={`btn btn-secondary text-black ${tab === 'All' ? 'bg-third pointer-events-none' : 'bg-gray-200'}`}
                            onClick={() => handleTabs('All')}>All
                    </button>
                    <button className={`btn btn-secondary text-black ${tab === 'Fav' ? 'bg-third pointer-events-none' : 'bg-gray-200'}`}
                            onClick={() => handleTabs('Fav')}>Favorites
                    </button>
                </div>
                {isLoading ?
                    <Loader/>
                    : <ReposTable
                    data={reposData}
                    elements={repoCards}
                    options={{
                        filters: ['name', 'isPrivate'],
                        favTab: tab === 'Fav',
                        pageSize: 5,
                    }}/>}
            </div>

        </div>

    )
}

export default HomePage;
