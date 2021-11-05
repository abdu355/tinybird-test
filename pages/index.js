import React, {
  Suspense,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect
} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import IOChart from '../components/charts/IOChart'
import useTinybird from '../hooks/useTinybird'
import bytesToSize from '../utils/bytesToSize'


const Home = () => {
  const {
    data,
    stats,
    isLoading,
    isError } = useTinybird({
      pipe: 'fin_data_by_tag.json',
      token: process.env.NEXT_PUBLIC_TINYBIRD_KEY,
      page_size: '100'
    })
  console.log(stats)
  if (isError) return <div>failed to load</div>
  if (!data || isLoading) return <div>loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>MyFin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main >
        <h1> Charts </h1>
        <p>{stats.rows_read} rows of size {bytesToSize(stats.bytes_read)} fetched in {stats.elapsed} seconds. </p>
        <IOChart data={data} />
      </main>
    </div>
  )
}

export default Home