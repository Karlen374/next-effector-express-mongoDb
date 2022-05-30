import React from 'react';
import AppHeader from '../components/appHeader/appHeader';

interface MainLayoutProps {
  children: React.ReactNode
}
const MainLayout = ({ children }:MainLayoutProps) => {
  return (
    <div className="App">
      <AppHeader />
      { children }
    </div>

  );
};
export default MainLayout;
