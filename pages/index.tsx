import Head from 'next/head';
import { useQuery } from '@apollo/client';

import QUERY_COUNTRIES from './queryCountries.graphql';

import styles from '../styles/Home.module.css';

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_COUNTRIES);

  // check for errors
  if (error) {
    return <p>Uh oh! An error happened!</p>;
  }

  // if all good return data
  return (
    <div className={styles.container}>
      <Head>
        <title>🦠 covidnearme.com</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>🦠 Covid Cases by Postcode</h1>
      <p>Disclaimer: This site uses the latest official COVID-19 data provided by NSW Health. It's built and maintained by Sanjay and is not affiliated with the NSW government. If you have any questions, feedback, or ideas, you can email me at sanjayio@outlook.com. </p>
      {/* let the user know we are fetching the countries */}
      {loading && <p>loading...</p>}
      {data && <p><b>Last processed date: {data?.dbt_prod_nsw_covid_tests_results_latest[0].processed_at_date}. Last update from NSW Government: {data?.dbt_prod_nsw_covid_tests_results_latest[0].notification_date}</b></p>}
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
