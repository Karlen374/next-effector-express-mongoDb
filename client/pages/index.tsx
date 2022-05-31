import { useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import CarList from '../components/carList/carList';
import CarListHeader from '../components/carListHeader/carListHeader';
import { loadCars } from '../models/cars/cars';
import { ICar } from '../types/ICar';

export async function getStaticProps() {
  const res = await fetch('http://localhost:5000/api/cars');
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

interface IndexPage {
  data:ICar[]
}
const Index = ({ data }:IndexPage) => {
  useEffect(() => {
    loadCars(data);
  }, []);

  return (
    <>
      <Head>
        <title>Cars Page</title>
        <meta key="store Cars" content="Cars Page" />
      </Head>
      <MainLayout>
        <CarListHeader />
        <CarList />
      </MainLayout>
    </>

  );
};
export default Index;
