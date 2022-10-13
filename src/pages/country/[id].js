import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
  const country = await res.json();
  return country;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
        country[0].borders ? country[0].borders?.map((border) => getCountry(border)) : []
    );
    

    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  console.log(borders);
  // console.log(Object.keys(country[0].name?.nativeName)[0], country[0].name?.nativeName);
  // console.log(country[0].name?.nativeName[Object.keys(country[0].name?.nativeName)[0]].official);
  // console.log(country[0]?.gini[Object.keys(country[0]?.gini)[0]]);
  return (
    <Layout title={country[0].name.common}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_Panel}>
            <img src={country[0].flags.svg}></img>
            <h1 className={styles.overview_name}>{country[0].name.common}</h1>
            <div className={styles.overview_region}>{country[0].region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country[0].population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country[0].area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country[0].capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Subregion</div>
              <div className={styles.details_panel_value}>
                {country[0].subregion}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {/* {Object.values(country[0].languages).map((lang) => (<span key={lang}>{lang}</span>))} */}
                {Object.values(country[0].languages).map((lang, index, arr) =>
                  arr.length - 1 !== index ? lang + ", " : lang
                )}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currency</div>
              <div className={styles.details_panel_value}>
                {Object.values(country[0].currencies)[0].name}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {
                  country[0].name?.nativeName[
                    Object.keys(country[0].name?.nativeName)[0]
                  ].official
                }
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>
                {country[0]?.gini[Object.keys(country[0]?.gini)[0]]} %
              </div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders.map((it, index) => (
                  <div
                    className={styles.details_panel_borders_country}
                    key={index}
                  >
                    <img src={it[0]?.flags.svg} alt={name}></img>
                    <div className={styles.details_panel_borders_country_name}>
                      {it[0]?.name.common}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${params.id}`);
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
