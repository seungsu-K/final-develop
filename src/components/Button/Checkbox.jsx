import S from '@/components/Button/Checkbox.module.css';
import { string, bool, func } from 'prop-types';

Checkbox.propTypes = {
  text: string.isRequired,
  checked: bool,
  onChange: func,
};

function Checkbox({ text, checked, onChange }) {
  const handleInterestFilter = (e) => {
    onChange(text, e.target.checked);
  };

  return (
    <div className={S.component}>
      <input
        type="checkbox"
        id={text}
        name="interest"
        value={text}
        checked={checked}
        onChange={handleInterestFilter}
      />
      <label htmlFor={text}>{text}</label>
    </div>
  );
}

export default Checkbox;
