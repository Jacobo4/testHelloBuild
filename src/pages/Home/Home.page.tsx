// Core
import React from "react";

// Styles
import styles from './Home.module.css';

// Context
import {useFirebaseAuth} from "@context/AuthContext.tsx";
import Search from "@components/search.tsx";


const dommiUsers = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    email: "john@example.com"
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 30,
    email: "jane@example.com"
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 35,
    email: "michael@example.com"
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 28,
    email: "emily@example.com"
  },
  {
    id: 5,
    name: "Robert Brown",
    age: 32,
    email: "robert@example.com"
  },
  {
    id: 6,
    name: "Sophia Wilson",
    age: 27,
    email: "sophia@example.com"
  },
  {
    id: 7,
    name: "Daniel Taylor",
    age: 31,
    email: "daniel@example.com"
  },
  {
    id: 8,
    name: "Olivia Martinez",
    age: 29,
    email: "olivia@example.com"
  },
  {
    id: 9,
    name: "Matthew Anderson",
    age: 33,
    email: "matthew@example.com"
  },
  {
    id: 10,
    name: "Ava Lopez",
    age: 26,
    email: "ava@example.com"
  }
];
const HomePage: React.FC = () => {

    const user = useFirebaseAuth();
    console.log(user)

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

            <div>
                <Search data={dommiUsers}/>
            </div>

        </div>

    )
}

export default HomePage;
