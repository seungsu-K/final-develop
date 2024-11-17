import S from '@/routes/profile/EditInterest/EditInterest.module.css';
import Button from '@/components/Button/Button';
import Checkbox from '@/components/Button/Checkbox';
import HeaderForDetails from '@/components/HeaderForDetails/HeaderForDetails';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/stores/users';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const INTEREST = [
  '필라테스',
  '헬스',
  '수영',
  '탁구',
  '배드민턴',
  '테니스',
  '농구',
  '축구',
  '요가',
  '발레',
  '클라이밍',
  '러닝',
  '기타',
];

export function Component() {
  const nav = useNavigate();
  const { userData, updateProfile } = useUserProfile();
  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    if (userData.interest) {
      setSelectedInterests(userData.interest);
    }
  }, [userData.interest]);

  const handleInterestToggle = (interest, isChecked) => {
    setSelectedInterests((prev) =>
      isChecked ? [...prev, interest] : prev.filter((item) => item !== interest)
    );
  };

  const handleSave = async () => {
    try {
      await updateProfile(userData.id, { interest: selectedInterests });
      toast.success('관심 운동 종목이 저장되었습니다.');
      nav(-1);
    } catch (error) {
      console.error('Failed to save interests:', error);
      toast.error('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div className={S.component}>
      <HeaderForDetails
        text="관심 운동 선택"
        leftIcon={[{ iconId: 'left', path: '-1', title: '뒤로가기' }]}
      />
      <div className={S.contents}>
        <h2 className={S.headline}>관심 있는 운동 종목을 선택해주세요.</h2>
        <ul>
          {INTEREST.map((item, index) => (
            <li key={index}>
              <Checkbox
                text={item}
                checked={selectedInterests.includes(item)}
                onChange={handleInterestToggle}
              />
            </li>
          ))}
        </ul>
      </div>

      <Button className="button-main" onClick={handleSave}>
        저장하기
      </Button>
    </div>
  );
}
