'use client';

import { ApolloProvider as Provider } from '@apollo/client/react';
import apolloClient from '@/lib/api/apollo/client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export default function ApolloProvider({ children }: ApolloProviderProps) {
  return <Provider client={apolloClient}>{children}</Provider>;
}