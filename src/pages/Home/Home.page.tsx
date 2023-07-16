// Core
import React, {useEffect, useState} from "react";
// Styles
import styles from './Home.module.css';
// Context
import {useFirebaseAuth} from "@context/AuthContext.tsx";
// Components
import ReposTable from "@components/ReposTable/ReposTable.tsx";
import RepoCard, {Repository} from "@components/RepoCard/RepoCard.tsx";


/**
 * Function to make a GitHub GraphQL API request
 * @param query GraphQL query
 * @param token GitHub access token
 */
async function gitHubGraphQLRequest(query: string, token: string): Promise<unknown> {
    try {
        const url = 'https://api.github.com/graphql';
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query}),
        };

        const response = await fetch(url, options);
        const data: unknown = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

const query = `{ 
        viewer{
            repositories(last:5, orderBy:{field:CREATED_AT,direction: ASC}){
                nodes{
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


const HomePage: React.FC = () => {

    const user = useFirebaseAuth();
    const [reposData, setReposData] = useState<Repository[]>([]);


    console.log(user)


    useEffect(() => {
        const fetchGitHubUser = async () => {
            //TODO: Add toasts
            const githubUserToken = localStorage.getItem("githubAccessToken") as string;
            const data = await gitHubGraphQLRequest(query, githubUserToken);
            setReposData(data.data.viewer.repositories.nodes);
        }
        if (user) void fetchGitHubUser();

    }, [user]);

    console.log(reposData);

    const repoCards: JSX.Element[] = reposData.map((repo: Repository, i) => {
        return <li key={i}>
            <RepoCard data={repo} markAsFavoriteCb={(isFav) => {
                const newRepos = reposData;
                newRepos[i]['isFav'] = isFav;
                setReposData(newRepos);
            }}/>
        </li>
    })


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
                <ReposTable data={reposData} elements={repoCards} options={{
                    filters: ['name', 'isPrivate'],
                    favTab: true,
                }}/>
            </div>

        </div>

    )
}

export default HomePage;
