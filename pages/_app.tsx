import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import '../styles/globals.css';

const authLink = setContext((_, { headers }) => {
  return {
  headers: {
      ...headers, 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
    }
  }
});

const httpLink = createHttpLink({
 uri: 'https://skiolabs.hasura.app/v1/graphql',
});

const client = new ApolloClient({
 link: authLink.concat(httpLink),
 cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
