import HeaderForDetails from '@/components/HeaderForDetails/HeaderForDetails';
import { useSignupStore } from '@/stores/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailStep from './component/EmailStep';
import PasswordStep from './component/PasswordStep';
import EmailAuthStep from './component/EmailAuthStep';
import ProgressBar from './component/ProgressBar';
import SignUpLogo from './component/SignUpLogo';
import TermsStep from './component/TermsStep';
import NicknameStep from './component/NicknameStep';
import CustomHelmet from '@/components/CustomHelmet/CustomHelmet';

export function Component() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const signupState = useSignupStore();

  const totalSteps = 5;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));

  const handleSubmit = () => {
    console.log('회원가입 완료:', signupState);
    navigate('/login');
  };

  return (
    <div>
      <CustomHelmet
        title="회원가입"
        description="새로운 계정을 만들기 위한 페이지입니다."
        path="/main/signup"
      />

      <HeaderForDetails
        leftIcon={[{ iconId: 'left', path: '/', title: '뒤로가기' }]}
      />
      <ProgressBar currentStep={step} totalSteps={totalSteps} />
      <SignUpLogo />
      <div>
        {step === 1 && <EmailStep onNext={nextStep} />}
        {step === 2 && <EmailAuthStep onNext={nextStep} />}
        {step === 3 && <NicknameStep onNext={nextStep} />}
        {step === 4 && <PasswordStep onNext={nextStep} />}
        {step === 5 && <TermsStep onSubmit={handleSubmit} />}
      </div>
    </div>
  );
}
