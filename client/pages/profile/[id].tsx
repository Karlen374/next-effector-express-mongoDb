import UserProfile from '../../components/userProfile/userProfile';
import MainLayout from '../../layouts/MainLayout';
import { IUser } from '../../types/IUser';

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:5000/auth/users/${params.id}`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}
interface IUSerProfilePage {
  user:IUser;
}
const UserProfilePage = ({ user }:IUSerProfilePage) => {
  return (
    <MainLayout>
      <UserProfile user={user} />
    </MainLayout>
  );
};
export default UserProfilePage;
