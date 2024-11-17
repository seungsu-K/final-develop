import InputWithDelete from '@/components/Input/InputWithDelete';
import Tooltip from '@/components/Tooltip/Tooltip';
import PropTypes from 'prop-types';

function PasswordInput({
  showPassword = false,
  value,
  onChange,
  placeholder = '비밀번호',
  ariaLabel = '비밀번호 입력',
  isValid = true,
}) {
  return (
    <div>
      <Tooltip text="비밀번호 입력" position="bottom">
        <InputWithDelete
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="paragraph-md"
          placeholder={placeholder}
          error={value !== '' && !isValid}
          hasInput={value !== ''}
          ariaLabel={ariaLabel}
        />
      </Tooltip>
    </div>
  );
}

PasswordInput.propTypes = {
  showPassword: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  isValid: PropTypes.bool,
};

export default PasswordInput;
