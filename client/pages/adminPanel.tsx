import { useEffect } from 'react';
import UserList from 'src/components/userList/userList';
import MainLayout from 'src/layouts/MainLayout';
import { getUsers } from 'src/models/users/users';

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
