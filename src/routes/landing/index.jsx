import Button from '@/components/Button/Button';
import S from '@/routes/landing/style.module.css';
import { useNavigate } from 'react-router-dom';
import LandingLogo from './component/LandingLogo';
import SignupLink from './component/SignupLink';
import CustomHelmet from '@/components/CustomHelmet/CustomHelmet';

function Landing() {
  const navigate = useNavigate();
  return (
    <div className={S.Component}>
      <CustomHelmet
        title="간편한 만남, 건강한 즐거움"
        description="부담 없이 간편하게 모일 수 있는 운동 모임을 찾아보세요. 다양한 운동의 기회와 새로운 운동 친구들을 만나볼 수 있어요. 지금 시작해 보세요."
        path="/landing"
      />
      <LandingLogo />
      <Button
        className={`${S.button} label-md`}
        onClick={() => navigate('Login')}
      >
        시작하기
      </Button>
      <SignupLink onClick={() => navigate('landing/SignUp')} />
    </div>
  );
}

export default Landing;
