import { Outlet } from 'react-router-dom';
import GlobalNav from '@/components/GlobalNav/GlobalNav';
import Header from '@/components/Header/Header';
import S from '@/routes/style.module.css';

export function Component() {
  return (
    <div className={S.Component}>
      <Header />
      <GlobalNav />
      <main className={S.Outlet}>
        <Outlet />
      </main>
    </div>
  );
}
