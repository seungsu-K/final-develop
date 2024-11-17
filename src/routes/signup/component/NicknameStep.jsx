import { useState } from 'react';
import Button from '@/components/Button/Button';
import InputWithDelete from '@/components/Input/InputWithDelete';
import { useSignupStore } from '@/stores/authStore';
import PropTypes from 'prop-types';
import S from './NicknameStep.module.css';
import toast from 'react-hot-toast';

NicknameStep.propTypes = {
  onNext: PropTypes.func.isRequired,
};

function NicknameStep({ onNext }) {
  const { setNickname } = useSignupStore();
  const [localNickname, setLocalNickname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localNickname.trim()) {
      toast.error('닉네임을 입력해주세요.');
      return;
    }

    try {
      setNickname(localNickname);

      toast.success('닉네임이 설정되었습니다.');
      onNext();
    } catch (error) {
      console.error('닉네임 설정 실패:', error);
      toast.error('닉네임 설정에 실패했습니다.');
    }
  };

  return (
    <div className={S.Component}>
      <form onSubmit={handleSubmit}>
        <div className={S.InputGroup}>
          <InputWithDelete
            value={localNickname}
            onChange={(e) => setLocalNickname(e.target.value)}
            className="paragraph-md"
            placeholder="닉네임"
          />
        </div>
        <Button type="submit" className={`${S.button} label-md`}>
          다음
        </Button>
      </form>
    </div>
  );
}

export default NicknameStep;
