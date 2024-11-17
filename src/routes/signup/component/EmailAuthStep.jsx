import Button from '@/components/Button/Button';
import InputWithDelete from '@/components/Input/InputWithDelete';
import { useSignupStore } from '@/stores/authStore';
import PropTypes from 'prop-types';
import S from './EmailAuthStep.module.css';
import pb from '@/api/pb.js';
import toast from 'react-hot-toast';

EmailAuthStep.propTypes = {
  onNext: PropTypes.func.isRequired,
};

function EmailAuthStep({ onNext }) {
  const { email, verificationCode, setVerificationCode } = useSignupStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await pb.collection('emailcode').getList(1, 1, {
        filter: `email="${email}"`,
        sort: '-created',
      });

      if (response.items.length === 0) {
        throw new Error('인증코드가 존재하지 않습니다.');
      }

      const recentCodeRecord = response.items[0];

      if (recentCodeRecord.code === verificationCode) {
        toast.success('이메일 인증이 완료되었습니다.');
        onNext();
      } else {
        toast.error('인증코드가 올바르지 않거나 만료되었습니다.');
      }
    } catch (error) {
      console.error('인증코드 검증 실패:', error);
      toast.error('인증코드 검증에 실패했습니다.');
    }
  };

  return (
    <div className={S.Component}>
      <form onSubmit={handleSubmit}>
        <div className={S.InputGroup}>
          <InputWithDelete
            onChange={(e) => setVerificationCode(e.target.value)}
            className="paragraph-md"
            placeholder="인증코드"
          />
        </div>
        <Button type="submit" className={`${S.button} label-md`}>
          다음
        </Button>
      </form>
    </div>
  );
}

export default EmailAuthStep;
