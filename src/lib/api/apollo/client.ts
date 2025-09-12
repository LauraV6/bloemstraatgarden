import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';


const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
  fetch: typeof window !== 'undefined' ? window.fetch.bind(window) : undefined,
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }: any) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }: GraphQLError) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`,
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    console.error('Operation:', operation.operationName);
    console.error('Variables:', operation.variables);
  }
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;