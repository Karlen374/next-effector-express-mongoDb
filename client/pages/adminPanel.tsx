import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import UserList from '../components/userList/userList';
import MainLayout from '../layouts/MainLayout';
import { $userData } from '../models/Authorization/authorization';

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
  const [data, setData] = useState<AdminPanelProps[]>([]);

  const userData = useStore($userData);
  const loadUsers = async () => {
    const res = await fetch('http://localhost:5000/auth/users', {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.token}`,
      },
    });
    const users = await res.json();
    setData(users);
  };
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <MainLayout>
      <UserList data={data} />
    </MainLayout>
  );
};

export default AdminPanel;
