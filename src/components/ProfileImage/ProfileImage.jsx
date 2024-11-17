import S from '@/components/ProfileImage/ProfileImage.module.css';

import { string, number } from 'prop-types';

ProfileImage.propTypes = {
  url: string.isRequired,
  nickName: string,
  width: number,
  height: number,
};

function ProfileImage({ url, nickName, width = 68, height = 68 }) {
  return (
    <img
      className={S.component}
      src={url}
      alt={`${nickName}의 프로필`}
      width={width}
      height={height}
    />
  );
}

export default ProfileImage;
