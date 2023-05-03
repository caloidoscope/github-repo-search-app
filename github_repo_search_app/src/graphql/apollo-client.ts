import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';

let apolloClient: ApolloClient<NormalizedCacheObject>;
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN

export const apolloClientStatic = () =>{
    return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
          authorization: `Bearer ${token}`,
      },
      fetchOptions: {
        timeout: 30000, // 30 seconds
      },
    })
  });
}
export function createApolloClient() {
  // return new ApolloClient({
  //   ssrMode: true,
  //   cache: new InMemoryCache(),
  //   link: new HttpLink({
  //   uri: 'https://api.github.com/graphql',
  //   headers: {
  //       authorization: `Bearer ${token}`,
  //   }
  // })
  // });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
}

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});
const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
});



export function getApolloClient() {
  return apolloClient;
}

export function initializeApollo(initialState:any=null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState:any=null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}