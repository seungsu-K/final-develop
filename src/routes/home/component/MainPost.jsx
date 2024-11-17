import S from '@/routes/home/component/MainPost.module.css';

import { useEffect } from 'react';
import Post from '@/components/Post/Post';
import usePostStore from '@/stores/postStore';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { format, parseISO, addHours } from 'date-fns';
import { ko } from 'date-fns/locale';

export function Component() {
  const { posts, fetchPosts, isLoading } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={S.component}>
      {posts.map((post) => {
        let formattedDate = '날짜 없음';
        try {
          if (post.date) {
            const utcDate =
              typeof post.date === 'string'
                ? parseISO(post.date)
                : new Date(post.date);
            const kstDate = addHours(utcDate, 9); // UTC to KST
            let dateString = format(kstDate, 'yyyy.MM.dd.');

            if (post.time) {
              const [hours, minutes] = post.time.split(':');
              kstDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
              dateString += ' ' + format(kstDate, 'a HH:mm', { locale: ko });
            }

            formattedDate = dateString;
          }
        } catch (error) {
          console.error('날짜 포맷팅 오류:', error);
        }

        const currentMemberCount = post.currentMemberCount || '0';
        const totalMemberCount = post.memberCount || '0';

        return (
          <Post
            key={post.id}
            title={post.title}
            date={formattedDate}
            place={post.location}
            member={`${currentMemberCount} / ${totalMemberCount}`}
            category={post.category}
            id={post.id}
            writer={post.expand?.writer || 'Unknown'}
          />
        );
      })}
    </div>
  );
}
