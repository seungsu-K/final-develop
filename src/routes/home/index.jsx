import S from '@/routes/home/style.module.css';

import MainPostList from '@/routes/home/component/MainPostList';
import PostButton from '@/components/Button/PostButton';
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Banner from './banner/Banner';
import postStore from '@/stores/postStore';
import CustomHelmet from '@/components/CustomHelmet/CustomHelmet';

export function Component() {
  const [subNavList] = useState([
    { path: '/main/home/new', text: '신규' },
    { path: '/main/home/recommend', text: '추천' },
    { path: '/main/home/interest', text: '관심' },
  ]);

  const { setFilter, fetchPosts, posts, error } = postStore();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const currentTab =
      subNavList.find((item) => item.path === currentPath)?.text || '신규';

    setFilter({ mainCategory: currentTab });
    fetchPosts();
  }, [location, setFilter, fetchPosts, subNavList]);

  return (
    <div className={S.component}>
      <CustomHelmet
        title="홈"
        description="유앤밋 홈페이지 입니다. 홈페이지를 통해 각종 행사와 관심 있는 모임에 참여할 수 있습니다"
        path="/home"
      />
      <aside>
        <div className={S.button__container}>
          <PostButton iconId={'calendarPlus'} path={'/main/home/new/post'} />
        </div>
      </aside>
      <MainPostList list={subNavList} />
      <Banner />
      {error && <p className={S.error}>{error}</p>}
      {posts.length === 0 && !error && (
        <p className={S.noPosts}>게시글이 없습니다.</p>
      )}
      <Outlet />
    </div>
  );
}
