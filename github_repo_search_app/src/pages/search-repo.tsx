import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { Repository, SearchUser } from '@/graphql/types';
import { GetServerSideProps } from 'next';
import FilterBar from '@/components/FilterBar';

interface HomeProps {
  repositories?: Repository[];
}

const Home: React.FC<HomeProps> = ({ repositories: initialRepositories }) => {
    const [searchedUsername, setSearchedUsername] = useState<string>('');
    const [repositories, setRepositories] = useState<Repository[]>(initialRepositories || []);
    const [filterQuery, setFilterQuery] = useState<string>('');
    const handleOnSearch = (repositories: Repository[], username: string): void =>{
        setSearchedUsername(username)
        setRepositories(repositories)
    }

    const onFilter = (_filterQuery: string): void => {
        setFilterQuery(_filterQuery)
    }

    return (
        <div className="container mx-auto mt-4 px-4">
        <SearchBar onSearchComplete={handleOnSearch} onSubmit={()=>setRepositories([])}/>
        {repositories.length>0 && (
            <>
                <FilterBar onFilter={onFilter} />
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">{repositories.length} repositories for {searchedUsername}</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {repositories.filter(repo=>repo.name.includes(filterQuery)).map((repo) => (
                            <Card key={repo.id} repository={repo} />
                        ))}
                    </div>
                </div>
            </>
        )}
        </div>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return {
    props: {
      repositories: []
    }
  };
};
