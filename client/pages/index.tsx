import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useStore } from 'effector-react';
import CarListHeader from 'src/components/carListHeader/carListHeader';
import CarList from 'src/components/carList/carList';
import MainLayout from 'src/layouts/MainLayout';
import { loadCars } from 'src/models/cars/cars';
import { $viewedCars } from 'src/models/viewedCars/viewedCars';
import { ICar } from 'src/types/ICar';

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
  const viewedCars = useStore($viewedCars);
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    setShouldRender(true);
    loadCars(data);
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <Head>
        <title>Cars Page</title>
        <meta key="store Cars" content="Cars Page" />
      </Head>
      <MainLayout>
        <CarListHeader />
        <CarList cars={viewedCars} />
      </MainLayout>
    </>
  );
};
export default Index;
