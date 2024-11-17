import S from '@/routes/myAppointment/style.module.css';
import MyPost from '@/routes/myAppointment/component/MyPost';
import { Outlet } from 'react-router-dom';
import CustomHelmet from '@/components/CustomHelmet/CustomHelmet';

export function Component() {
  return (
    <div className={S.component}>
      <CustomHelmet
        title="내 모임"
        description="내가 참여한 모임 리스트입니다."
        path="/main/myAppointment"
      />
      <MyPost />
      <Outlet />
    </div>
  );
}
