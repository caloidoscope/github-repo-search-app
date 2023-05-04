import { SEARCH_REPOSITORIES, SEARCH_USER } from "@/graphql/queries";
import { Repository } from "@/graphql/types";
import { useLazyQuery } from "@apollo/client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface SearchBarProps {
  onSearchComplete: (repositories: Repository[] | [], username: string) => void,
  onSubmit: () => void,
  ssrUsername?: string
}

const SearchBar: React.FC<SearchBarProps>= ({ onSearchComplete, onSubmit, ssrUsername }) => {
  const [searchQuery, setSearchQuery] = useState(ssrUsername||"");
  const [searchUser, { loading: userLoading, error: userError, data: userData}] = 
    useLazyQuery(SEARCH_USER,{onCompleted: (data)=>{
      if (data) {
        const user = data.user;
        searchRepositories({variables: { username: user.login } })
    }}});
  const [searchRepositories, { loading: repoLoading, error: repoError}] = 
    useLazyQuery(SEARCH_REPOSITORIES,{onCompleted:(data)=>{onSearchComplete(data.user.repositories.nodes, userData.user.login)}});
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ssrUsername){
      window.location.href = `/search/${searchQuery}`
    } else {
      onSubmit();
      searchUser({variables: { queryString: searchQuery } });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  if (userLoading) return <p className="text-lg"><FontAwesomeIcon icon={faSpinner} spin className="mr-4"/>Searching users...</p>;
  if (repoLoading) return <p className="text-lg"><FontAwesomeIcon icon={faSpinner} spin className="mr-4"/>Search repositories...</p>;
  if (userError) return <p className="text-md"> Error: {userError.message}</p>;
  if (repoError) return <p className="text-md">Error: {repoError.message}</p>;

  
  return (
    <form onSubmit={(e) => {handleSubmit(e);}}>
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
