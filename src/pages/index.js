import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';
import SearchInput from '../components/SearchInput/SearchInput';
import CountriesTable from "../components/CountriesTable/CountriesTable";

export default function Home({countries}) {
  // console.log(countries);
  return <Layout>
    <div className={styles.counts}>
      Found {countries.length} countries

      <SearchInput placeholder="Filter by name, Region or Subregion"/>

      <CountriesTable countries={countries}/>
    </div>
  </Layout>;
}

export const getStaticProps = async () =>{
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  return  {
    props:{
      countries,
    }
  }
  // console.log('hi');
  // fetch('src/assets/data/data.json')
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.log(error));
  // return {props:{countries:[]}}
  
}