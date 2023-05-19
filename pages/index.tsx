import Head from 'next/head';
import { useQuery } from '@apollo/client';

import QUERY_COUNTRIES from './queryCountries.graphql';

import styles from '../styles/Home.module.css';

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_COUNTRIES);

  // check for errors
  if (error) {
    return <p>:( an error happened</p>;
  }

  // if all good return data
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid Cases by Postcode</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Covid Cases by Postcode</h1>
      <p>Last processed date: {data?.dbt_prod_nsw_covid_tests_results_latest[0].processed_at_date}. Last update from NSW Government: {data?.dbt_prod_nsw_covid_tests_results_latest[0].notification_date}</p>
      {/* let the user know we are fetching the countries */}
      {loading && <p>loading...</p>}
      <div>
        {data?.dbt_prod_nsw_covid_tests_results_latest?.map((item) => (
          <div key='{item.postcode}_{item.notification_date}'>
            On {item.notification_date}, {item.confirmed_cases_count} case(s) were notified in postcode {item.postcode}.
          </div>
        ))}
      </div>
    </div>
  );
}
