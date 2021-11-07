import React from 'react'
import Head from 'next/head'
import styles from '@styles/Home.module.css'
import IOChart from '@components/charts/IOChart'
import OrdersChart from '@components/charts/OrdersChart'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tinybird Test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main >
        <h1> Charts </h1>
        <IOChart />
        <OrdersChart />
      </main>
    </div>
  )
}

export default Home