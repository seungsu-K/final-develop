import Button from '@/components/Button/Button';
import PasswordInput from '@/routes/login/component/PasswordInput';
import { useSignupStore } from '@/stores/authStore';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import S from './PasswordStep.module.css';

PasswordStep.propTypes = {
  onNext: PropTypes.func.isRequired,
};

function PasswordStep({ onNext }) {
  const {
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    isPasswordMatching,
    isNextEnabled,
  } = useSignupStore();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordMatching({ password, passwordConfirm })) {
      onNext();
    } else {
      toast.error('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className={S.Component}>
      <form className={S.PasswordStepForm} onSubmit={handleSubmit}>
        <div className={S.InputGroup}>
          <PasswordInput
            showPassword={true}
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            ariaLabel="비밀번호 입력"
            isValid={password.length >= 8}
          />
          <PasswordInput
            showPassword={true}
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            placeholder="비밀번호를 확인"
            ariaLabel="비밀번호 확인 입력"
            isValid={isPasswordMatching({ password, passwordConfirm })}
          />
        </div>
        <Button
          type="submit"
          disabled={!isNextEnabled({ password, passwordConfirm })}
          className={`${S.button} label-md`}
        >
          다음
        </Button>
      </form>
    </div>
  );
}

export default PasswordStep;
