import Card from '@/components/Card';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import { createApolloClient } from '@/graphql/apollo-client';
import { SEARCH_REPOSITORIES, SEARCH_USER } from '@/graphql/queries';
import { Repository, User } from '@/graphql/types';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

interface HomeProps {
  repositories?: Repository[],
  user?: User,
  error?: string
}

const EMPTY_METHOD= () => {}

const Home: React.FC<HomeProps> = ({ repositories, user, error }) => {
    const [filterQuery, setFilterQuery] = useState('');
    if (typeof repositories === "undefined" || typeof user === "undefined" || error)
        return <><p>{error}</p></>
    return <div className="container mx-auto mt-4 px-4">
        <SearchBar onSearchComplete={EMPTY_METHOD} onSubmit={EMPTY_METHOD} ssrUsername={user.login}/>
        {repositories.length>0 && (
            <>
                <FilterBar onFilter={setFilterQuery} />
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">{repositories.length} repositories for {user.login}</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {repositories.filter(repo=>repo.name.includes(filterQuery)).map((repo) => (
                            <Card key={repo.id} repository={repo} />
                        ))}
                    </div>
                </div>
            </>
        )}
        </div>;
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
    const { query } = context;
    const apolloClient = createApolloClient();
    const username = typeof query.user === "string" ? query.user : "";
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
       
    const res = await fetch(`http://localhost:3001/test`)
    const data = await res.json()
    console.log(data)
  
    try {
        const { data: user } = await apolloClient.query({
            query: SEARCH_USER,
            variables: { queryString: username },
        });
    
        if (user) {
            const { data: repoData } = await apolloClient.query({
                query: SEARCH_REPOSITORIES,
                variables: { username: user.user.login },
            });
            const repositories = repoData?.user?.repositories?.nodes || [];
            return {
                props: { repositories, user: user.user },
            };
        }
    
        return { props: {} };
    } catch (error) {
        return { props: {error: JSON.stringify(error)} };
    }
};
