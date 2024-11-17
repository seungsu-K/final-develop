import Button from '@/components/Button/Button';
import HeaderForDetails from '@/components/HeaderForDetails/HeaderForDetails';
import S from '@/routes/login/style.module.css';
import { useLoginForm } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import SignupLink from '../landing/component/SignupLink';
import EmailInput from './component/EmailInput';
import PasswordInput from './component/PasswordInput';
import pb from '@/api/pb.js';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';
import CustomHelmet from '@/components/CustomHelmet/CustomHelmet';

export function Component() {
  const navigate = useNavigate();
  const { email, password, setEmail, setPassword, isFormValid, clearForm } =
    useLoginForm();

  const { setUser, setToken } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        const authData = await pb
          .collection('users')
          .authWithPassword(email, password);

        setUser(authData.record);
        setToken(authData.token);

        clearForm();
        navigate('/main');
        toast.success('유앤밋에 방문하신 것을 환영합니다🤗');
      } catch {
        toast.error('로그인이 실패되었습니다. 다시 시도하세요.');
      }
    } else {
      toast.error('이메일 또는 비밀번호를 입력해주세요.');
    }
  };

  return (
    <div>
      <CustomHelmet
        title="로그인"
        description="회원 로그인을 위한 페이지입니다."
        path="/login"
      />

      <HeaderForDetails
        leftIcon={[{ iconId: 'left', path: '/', title: '뒤로가기' }]}
      />
      <h2 className={`${S.LoginTitle} label-lg`}>로그인</h2>
      <form className={S.LoginForm} onSubmit={handleSubmit} noValidate>
        <div className={S.InputGroup}>
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className={`${S.button} label-md`}
          disabled={!isFormValid()}
          type="submit"
        >
          로그인
        </Button>
      </form>
      <SignupLink
        onClick={() => navigate('/Landing/SignUp')}
        aria-label="회원가입 페이지로 이동"
      />
    </div>
  );
}
