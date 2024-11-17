import S from './Comment.module.css';

import AddComment from '../component/AddComment';
import AddCommentProfile from '../component/AddCommentProfile';
import IconButton from '@/components/Button/IconButton';
import { func, object, array } from 'prop-types';
import { useCommentData } from '@/stores/comment';
import pb from '@/api/pb';

Comment.propTypes = {
  isActive: func,
  feed: object,
  commentList: array,
};

function Comment({ isActive, feed, commentList }) {
  const { commentData, updateCommentData, fetchCommentData, resetCommentData } =
    useCommentData();

  const handleClick = () => {
    isActive(false);
  };

  const handleComment = (e) => {
    const { name, value } = e.target;

    updateCommentData({ [name]: value });
  };

  const handleAddComment = async () => {
    const user = JSON.parse(localStorage.getItem('pocketbase_auth')).model.id;
    const feedId = feed.id;

    const data = {
      comment: commentData.comment,
      writer: user,
      feed: feedId,
    };

    await pb.collection('comments').create(data);

    resetCommentData();

    fetchCommentData(feedId);
  };

  return (
    <div className={S.Comment}>
      <div className={S.Comment__header}>
        <IconButton iconId="down" title="댓글 닫기" onClick={handleClick} />
        댓글
        <IconButton iconId="more" title="더보기" />
      </div>
      <section className={S.Comment__list}>
        {commentList && commentList.length > 0 ? (
          commentList.map((item, index) => (
            <AddCommentProfile
              key={index}
              comment={item}
              writer={item.expand.writer}
            />
          ))
        ) : (
          <p className={S.Comment__list__empty}>아직 댓글이 없습니다.</p>
        )}
      </section>
      <section>
        <AddComment
          value={commentData.comment}
          feed={feed}
          onChange={handleComment}
          onClick={handleAddComment}
        />
      </section>
    </div>
  );
}

export default Comment;
