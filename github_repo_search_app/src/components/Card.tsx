import { Repository } from '@/graphql/types';
import { faCalendar, faSpinner, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';
import { ADD_STAR, REMOVE_STAR } from '@/graphql/mutations';
import { getApolloClient } from '@/graphql/apollo-client';

interface CardProps {
  repository: Repository;
}

const Card: React.FC<CardProps> = ({ repository }) => {
  const client = getApolloClient();
  const [addStar, {loading: isAddStarLoading}] = useMutation(ADD_STAR);
  const [removeStar, {loading: isRemoveStarLoading}] = useMutation(REMOVE_STAR);

  const handleStarClick = async (): Promise<void> => {
    const repositoryId = repository.id
    if (repository.viewerHasStarred) {
      await removeStar({ client, variables: { repositoryId } });
    } else {
      await addStar({ client, variables: { repositoryId } });
    }
  };

  return (
    <div className="rounded-md shadow-md p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <a href={repository.url} target="_blank" rel="noopener noreferrer"><h3 className="text-lg font-medium">{repository.name}</h3></a>
        {!isAddStarLoading && !isRemoveStarLoading ? (
          <button onClick={handleStarClick} className="focus:outline-none">
          {repository.viewerHasStarred ? (
            <FontAwesomeIcon icon={solidStar} style={{color: "#ffd43b",}}/>
          ) : (
            <FontAwesomeIcon icon={regularStar}  />
          )}
        </button>
        ) : (
          <FontAwesomeIcon icon={faSpinner} spin />
        )}
        
      </div>
      <p className="h-full">{repository.description}</p>
      <div className="mt-4 flex items-center bottom-0">
        <FontAwesomeIcon icon={faCalendar} className="mr-4"/>
        <p className="text-sm">{new Date(repository.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Card;