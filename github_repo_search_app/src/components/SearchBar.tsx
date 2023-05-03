import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Repository, SearchUser } from "@/graphql/types";
import { SEARCH_REPOSITORIES, SEARCH_USER } from "@/graphql/queries";
import { getApolloClient } from "@/graphql/apollo-client";
import { setContext } from '@apollo/client/link/context';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next/types";

interface SearchBarProps {
  onSearchComplete: (repositories: Repository[] | [], username: string) => void,
  onSubmit: () => void
}

const SearchBar: React.FC<SearchBarProps>= ({ onSearchComplete, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUser, { loading: userLoading, error: userError, data: userData}] = 
    useLazyQuery(SEARCH_USER,{ssr: true, onCompleted: (data)=>{
      if (data) {
        const user = data.user;
        searchRepositories({variables: { username: user.login } })
    }}});
  const [searchRepositories, { loading: repoLoading, error: repoError}] = 
    useLazyQuery(SEARCH_REPOSITORIES,{ssr: true, onCompleted:(data)=>{onSearchComplete(data.user.repositories.nodes, userData.user.login)}});
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchUser({variables: { queryString: searchQuery } });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  if (userLoading) return <p className="text-lg"><FontAwesomeIcon icon={faSpinner} spin className="mr-4"/>Searching users...</p>;
  if (repoLoading) return <p className="text-lg"><FontAwesomeIcon icon={faSpinner} spin className="mr-4"/>Search repositories...</p>;
  if (userError) return <p className="text-md"> Error: {userError.message}</p>;
  if (repoError) return <p className="text-md">Error: {repoError.message}</p>;

  
  return (
    <form onSubmit={(e) => {handleSubmit(e); onSubmit();}}>
      <input
        className="border text-sm rounded-lg block w-full p-2.5"
        type="text"
        placeholder="Search for a GitHub user"
        value={searchQuery}
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
};


export default SearchBar;
