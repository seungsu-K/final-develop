import S from '@/routes/community/component/Feed.module.css';

import BtnThumsup from '@/routes/community/component/BtnThumsup';
import FeedProfile from '@/routes/community/component/FeedProfile';
import KebabMenu from '@/components/KebabMenu/KebabMenu';
import BtnComment from './BtnComment';
import { useState, useRef } from 'react';
import { animate } from 'motion';
import { object, array, string, shape } from 'prop-types';
import Comment from '../Comment/Comment';
import getPbImageURL from '@/api/getPbImageURL';

function Feed({
  imgSrc,
  content,
  feed,
  comments,
  createdAt,
  category,
  writer,
}) {
  const [commentActive, setcommentActive] = useState(false);

  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const handleCommentClick = () => {
    if (commentActive) {
      setcommentActive(false);
    }

    if (!commentActive) {
      setcommentActive(true);
      handleDropUp();
    }
  };

  const commentRef = useRef(null);

  const handleDropUp = () => {
    const { current: element } = commentRef;

    animate(
      element,
      {
        transform: ['translateY(50vh)', 'translateY(0)'],
        position: 'fixed',
        bottom: '0',
      },
      { duration: 0.5 }
    );
  };

  const count = comments ? comments.length : 0;

  const postWriterAvatar = getPbImageURL(writer, 'avatar');
  const postWriterAvatarURL =
    writer.avatar === '' ? '/profile.png' : postWriterAvatar;

  const feedWriter = writer?.id;
  const feedId = feed?.id;

  return (
    <>
      <article className={S.Feed}>
        <section className={S.feedHeader}>
          <FeedProfile
            nickName={writer?.nickname || 'Unknown'}
            createdAt={createdAt}
            url={postWriterAvatarURL}
          />
          <KebabMenu
            category={category}
            categoryText="게시물"
            writer={feedWriter}
            feedId={feedId}
          />
        </section>
        <section className={S.feedMainDesc}>
          <span>{content}</span>
        </section>
        {imgSrc && !imageLoadError && (
          <section className={S.feedMainImg}>
            <img src={imgSrc} alt="" onError={handleImageError} />
          </section>
        )}
        <section className={S.BtnCount}>
          <BtnThumsup />
          <BtnComment onClick={handleCommentClick} count={count} />
        </section>
      </article>

      <div ref={commentRef}>
        {commentActive && (
          <Comment
            isActive={setcommentActive}
            feed={feed}
            commentList={comments}
          />
        )}
      </div>
    </>
  );
}

Feed.propTypes = {
  imgSrc: string,
  userId: string,
  content: string.isRequired,
  createdAt: string.isRequired,
  category: string.isRequired,
  writer: shape({
    nickname: string,
    avatar: string,
  }),
  user: object,
  feed: object,
  comments: array,
};
export default Feed;
