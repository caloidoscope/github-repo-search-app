import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useApollo } from '@/graphql/apollo-client'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
          }}
          >
          <Component {...pageProps} />
        </MantineProvider>
      </ApolloProvider>
  </>
}
