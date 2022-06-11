import { useEffect } from 'react';
import UserList from '../components/userList/userList';
import MainLayout from '../layouts/MainLayout';
import { getUsers } from '../models/users/user';

export interface AdminPanelProps {
  _id:string;
  userName:string;
  email:string;
  roles: object;
}
export interface AdminPanelPage {
  data:AdminPanelProps[]
}
const AdminPanel = () => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <MainLayout>
      <UserList />
    </MainLayout>
  );
};

export default AdminPanel;
