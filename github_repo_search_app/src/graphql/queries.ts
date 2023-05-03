import { gql } from "@apollo/client";

export const SEARCH_REPOSITORIES = gql`
  query searchRepositories($username: String!) {
    user(login: $username) {
        repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            ...on Repository{
                id
                name
                url
                viewerHasStarred
                stargazerCount
                forkCount
                description
                primaryLanguage {
                    name
                    color
                }
                createdAt
            }
          }
        }
      }
  }
`;

export const TOGGLE_STAR = gql`
  mutation toggleStar($id: ID!, $viewerHasStarred: Boolean!) {
    addStar(input: { starrableId: $id }) @include(if: $viewerHasStarred) {
      starrable {
        id
        viewerHasStarred
        stargazerCount
      }
    }
    removeStar(input: { starrableId: $id }) @skip(if: $viewerHasStarred) {
      starrable {
        id
        viewerHasStarred
        stargazerCount
      }
    }
  }
`;

export const SEARCH_USER = gql`
query SearchUsers($queryString: String!) {
    user(login: $queryString) {
        ... on User {
            login
            name
            avatarUrl
            url
        }
    }
} 
`;
