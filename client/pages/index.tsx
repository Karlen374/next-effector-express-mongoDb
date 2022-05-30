import { useEffect } from 'react';
import Head from 'next/head';
// import { useStore } from 'effector-react';
import MainLayout from '../layouts/MainLayout';
import CarList from '../components/carList/carList';
import CarListHeader from '../components/carListHeader/carListHeader';
import { loadCars } from '../models/cars/cars';
import { ICar } from '../types/ICar';

export async function getStaticProps() {
  const res = await fetch('http://localhost:5000/api/cars');
  const cars = await res.json();
  return {
    props: {
      cars,
    },
  };
}

interface IndexPage {
  cars:ICar[]
}
const Index = ({ cars }:IndexPage) => {
  useEffect(() => {
    loadCars(cars);
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
