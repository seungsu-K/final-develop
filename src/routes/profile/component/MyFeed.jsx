import { useState, useEffect } from 'react';
import S from '@/routes/profile/component/MyFeed.module.css';
import FeedCard from '@/routes/profile/component/FeedCard';
import pb from '@/api/pb';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import getPbImageURL from '@/api/getPbImageURL';

export function Component() {
  const [userFeeds, setUserFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserFeeds = async () => {
      try {
        setIsLoading(true);
        const currentUser = JSON.parse(localStorage.getItem('pocketbase_auth'))
          ?.model.id;

        if (!currentUser) {
          throw new Error('로그인된 사용자를 찾을 수 없습니다.');
        }
        const feeds = await pb.collection('feeds').getFullList();
        const writer = feeds.filter((myFeed) => myFeed.writer === currentUser);

        setUserFeeds(
          writer.map((item) => ({
            id: item.id,
            content: item.content,
            writer: item.writer,
            imageUrl:
              item.image.length === 0
                ? '/logo.webp'
                : getPbImageURL(item, 'image'),
            date: new Date(item.created).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error('피드 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserFeeds();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={S.component}>
      {userFeeds.length > 0 ? (
        userFeeds.map((feed) => (
          <FeedCard
            key={feed.id}
            content={feed.content}
            imageUrl={feed.imageUrl}
            date={feed.date}
            writer={feed.writer}
          />
        ))
      ) : (
        <p className={S.message}>No posts found.</p>
      )}
    </div>
  );
}
