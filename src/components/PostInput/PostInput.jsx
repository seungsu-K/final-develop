import S from '@/components/PostInput/style.module.css';

import { string, func, bool } from 'prop-types';

const PostInput = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
  name,
}) => {
  return (
    <div className={S.inputWrapper}>
      <input
        className={S.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
      />
    </div>
  );
};

PostInput.propTypes = {
  value: string,
  onChange: func,
  placeholder: string,
  type: string,
  disabled: bool,
  name: string,
};

export default PostInput;
