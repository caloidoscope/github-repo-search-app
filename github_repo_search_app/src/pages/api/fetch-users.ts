// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { apolloClientStatic, createApolloClient, getApolloClient } from '@/graphql/apollo-client';
import { SEARCH_USER } from '@/graphql/queries';
import { SearchUser } from '@/graphql/types';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const { data } = await apolloClientStatic().query({
          query: SEARCH_USER,
          variables: { queryString: req.query.username }
        });
        res.status(200).json(data)

      } catch (error) {
        // Handle the error
        console.log(error)
        res.status(500).json(error)
      } finally {
        res.end()
      }
}
