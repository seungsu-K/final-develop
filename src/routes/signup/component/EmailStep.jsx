import { useState } from 'react';
import Button from '@/components/Button/Button';
import EmailInput from '@/routes/login/component/EmailInput';
import { useSignupStore } from '@/stores/authStore';
import PropTypes from 'prop-types';
import S from './EmailStep.module.css';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import pb from '@/api/pb';

EmailStep.propTypes = {
  onNext: PropTypes.func.isRequired,
};

function EmailStep({ onNext }) {
  const { email, setEmail, setVerificationCode } = useSignupStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const existingUsers = await pb.collection('users').getFullList({
        filter: `email = "${email}"`,
      });

      if (existingUsers.length > 0) {
        toast.error('이미 사용 중인 이메일입니다.');
        setIsSubmitting(false);
        return;
      }

      const verificationCode = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
      setVerificationCode(verificationCode);

      await pb.collection('emailcode').create({
        email,
        code: verificationCode,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      });

      await emailjs.send(
        'service_d5zdioj',
        'template_lytf70a',
        { email, verificationCode },
        'qJ_Qj8NKcIo9gXPmo'
      );

      toast.success('인증코드를 이메일로 발송했습니다.');
      onNext();
    } catch (error) {
      console.error('인증코드 발송 실패:', error);
      toast.error('인증코드 발송에 실패했습니다. 다시 시도해 주세요.');
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled =
    !isValidEmail(email) || email.trim() === '' || isSubmitting;

  return (
    <div className={S.formWrapper}>
      <form className={S.EmailStepForm} onSubmit={handleSubmit}>
        <EmailInput
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일"
          required
        />
        <Button
          disabled={isButtonDisabled}
          type="submit"
          className={`${
            isButtonDisabled ? S.disabledButton : S.button
          } label-md`}
        >
          {isSubmitting ? '전송중...' : '다음'}
        </Button>
      </form>
    </div>
  );
}

export default EmailStep;
