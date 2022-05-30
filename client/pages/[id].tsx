import Head from 'next/head';
import CarInfo from '../components/carInfo/carInfo';
import MainLayout from '../layouts/MainLayout';
import { ICar } from '../types/ICar';

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:5000/api/cars/${params.id}`);
  const car = await res.json();
  return {
    props: {
      car,
    },
  };
}

interface CarIdPage {
  car:ICar;
}
const carId = ({ car }:CarIdPage) => {
  return (
    <>
      <Head>
        <title>Car Info Page</title>
        <meta key="store Cars" content="Car Info Page" />
      </Head>
      <MainLayout>
        <CarInfo car={car} />
      </MainLayout>
    </>

  );
};
export default carId;
