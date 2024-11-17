import InputWithDelete from '@/components/Input/InputWithDelete';
import S from '@/components/Input/style.module.css';
import Tooltip from '@/components/Tooltip/Tooltip';
import { useLoginForm } from '@/stores/authStore';
import { string, func, bool } from 'prop-types';

EmailInput.propTypes = {
  type: string,
  value: string,
  onChange: func,
  required: bool,
};

function EmailInput({ type, value, onChange, required }) {
  const isEmailValid = useLoginForm((state) => state.isEmailValid);

  return (
    <div>
      <Tooltip text="이메일 입력" position="bottom">
        <InputWithDelete
          type={type}
          value={value}
          onChange={onChange}
          className={`paragraph-md ${value && !isEmailValid ? S.error : ''}`}
          placeholder="이메일"
          error={value !== '' && !isEmailValid}
          hasInput={value !== '' && isEmailValid}
          ariaLabel="이메일 입력"
          required={required}
        />
      </Tooltip>
    </div>
  );
}

export default EmailInput;
