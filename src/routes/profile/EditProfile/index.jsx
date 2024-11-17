import S from '@/routes/profile/EditProfile/EditProfile.module.css';

import ProfileImage from '@/components/ProfileImage/ProfileImage';
import InputWithDelete from '@/components/Input/InputWithDelete';
import Button from '@/components/Button/Button';
import TextArea from '@/components/TextArea/TextArea';
import IconButton from '@/components/Button/IconButton';
import HeaderForDetails from '@/components/HeaderForDetails/HeaderForDetails';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import Icon from '@/components/Icon/Icon';
import Tooltip from '@/components/Tooltip/Tooltip';
import { useKebabMenuStore } from '@/stores/kebabStore';
import { useUserProfile } from '@/stores/users';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CustomHelmet from '@/components/CustomHelmet/CustomHelmet';

export function Component() {
  const {
    userData,
    setNickname,
    setIntroduction,
    fetchUserProfile,
    updateProfile,
    tempInterest,
    resetTempInterest,
    setTempAvatar,
    updateAvatar,
    tempAvatar,
  } = useUserProfile();

  const { fetchUser, currentUser } = useKebabMenuStore();
  const nav = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (currentUser) {
      fetchUserProfile(currentUser);
    }
  }, [fetchUserProfile, currentUser]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTempAvatar(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      if (tempAvatar) {
        await updateAvatar(currentUser, tempAvatar);
      }

      await updateProfile(currentUser, {
        nickname: userData.nickname,
        introduction: userData.introduction,
        interest: tempInterest || userData.interest,
      });

      resetTempInterest();
      nav(-1);
      toast.success('저장이 완료되었습니다.');
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div className={S.component}>
      <CustomHelmet
        title="프로필 수정"
        description="프로필 사진, 이름, 관심 운동 종목, 소개글을 수정할 수 있는 페이지입니다."
        path="/main/profile/edit"
      />

      <HeaderForDetails
        text="프로필 수정"
        leftIcon={[
          { iconId: 'left', path: '/main/profile', title: '뒤로가기' },
        ]}
        rightIcon={[
          { iconId: 'setting', path: '/main/profile/setting', title: '설정' },
        ]}
      />

      <section className={S.profile}>
        <ProfileImage
          url={
            tempAvatar ? URL.createObjectURL(tempAvatar) : userData.avatarUrl
          }
          nickname={userData.nickname}
        />
        <div className={S.profile__upload}>
          <Tooltip text="프로필 수정하기" position="right">
            <ImageUpload
              className={S.upload__label}
              onChange={handleImageChange}
            >
              <Icon id="pencil" width={10} height={10} />
            </ImageUpload>
          </Tooltip>
        </div>
      </section>

      <form action="/">
        <label>
          <h3>이름</h3>
          <InputWithDelete
            placeholder="닉네임"
            name="nickName"
            value={userData.nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>

        <section className={S.interest__container}>
          <h3>관심 운동 종목</h3>
          <IconButton iconId="right" path="interest" />
        </section>

        <section className={S.aboutMe}>
          <h3>소개글</h3>
          <TextArea
            placeholder="Text"
            id="aboutMe"
            name="aboutMe"
            maxLength={180}
            className={S.textarea}
            classNameCount={S.textarea__span}
            showTextLength={true}
            value={userData.introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </section>
      </form>
      <Button className="button-main" onClick={handleSave}>
        저장하기
      </Button>
    </div>
  );
}
