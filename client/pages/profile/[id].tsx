import { useEffect } from 'react';
import { loadCars } from 'src/models/cars/cars';
import { ICar } from 'src/types/ICar';
import UserProfile from 'src/components/userProfile/userProfile';
import MainLayout from 'src/layouts/MainLayout';
import { IUser } from 'src/types/IUser';

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:5000/auth/users/${params.id}`);
  const user = await res.json();
  const result = await fetch('http://localhost:5000/api/cars');
  const cars = await result.json();
  return {
    props: {
      user,
      cars,
    },
  };
}

interface IUSerProfilePage {
  user:IUser;
  cars: ICar[];
}

const UserProfilePage = ({ user, cars }:IUSerProfilePage) => {
  useEffect(() => {
    loadCars(cars);
  }, []);
  return (
    <MainLayout>
      <UserProfile user={user} />
    </MainLayout>
  );
};
export default UserProfilePage;
