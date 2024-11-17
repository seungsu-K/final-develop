import ProfileImage from '@/components/ProfileImage/ProfileImage';
import S from '@/routes/community/component/FeedProfile.module.css';
import TimeAgo from '@/routes/community/component/TimeAgo';
import PropTypes from 'prop-types';

function FeedProfile({ nickName, createdAt, url }) {
  return (
    <div className={S.component}>
      <ProfileImage url={url} width={30} height={30} />
      <div className={S.nickName}>
        <h2>{nickName}</h2>
        <TimeAgo time={createdAt} />
      </div>
    </div>
  );
}

FeedProfile.propTypes = {
  nickName: PropTypes.string.isRequired,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  url: PropTypes.string.isRequired,
};

export default FeedProfile;
