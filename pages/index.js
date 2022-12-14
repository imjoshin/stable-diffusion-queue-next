import React from 'react';
import Head from 'next/head'
import { QueriesProvider } from '../contexts/useQueries';
import { App } from '../components/App';

export default function Home() {
  return (
    <React.StrictMode>
      <Head>
        <title>Stable Diffusion Queue</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueriesProvider>
        <App />
      </QueriesProvider>
    </React.StrictMode>
  )
}
