import S from '@/routes/profile/component/profileCard.module.css';

import ProfileImage from '@/components/ProfileImage/ProfileImage';
import MyInterestList from '@/routes/profile/component/MyInterestList';
import { string } from 'prop-types';
import { useUserProfile } from '@/stores/users';

ProfileCard.propTypes = {
  nickName: string.isRequired,
  description: string,
};

function ProfileCard({
  nickName = '유앤밋',
  description = '소개글을 작성 해주세요',
}) {
  const { userData } = useUserProfile();
  const interestList = userData.interest;

  return (
    <div className={S.component}>
      <ProfileImage url={userData.avatarUrl} nickName={userData.nickname} />
      <h2>{nickName}</h2>
      <span>{description}</span>
      <MyInterestList list={interestList} />
    </div>
  );
}
export default ProfileCard;
