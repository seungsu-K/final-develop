import ProfileImage from '@/components/ProfileImage/ProfileImage';
import S from '@/routes/community/component/AddCommentProfile.module.css';
import TimeAgo from '@/routes/community/component/TimeAgo';
import { object } from 'prop-types';

function AddCommentProfile({ writer, comment }) {
  return (
    <div className={S.component}>
      <ProfileImage url="/profile.png" width={44} height={44} />
      <div className={S.AddCommentProfile}>
        <div className={S.AddCommentProfile__nickName}>
          <h3>{writer.nickname}</h3>
          <TimeAgo time={comment.created} className={S.TimeAgo} />
        </div>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}

AddCommentProfile.propTypes = {
  writer: object,
  comment: object,
};

export default AddCommentProfile;
