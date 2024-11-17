import PropTypes from 'prop-types';
import S from './TermsItem.module.css';
import Icon from '@/components/Icon/Icon';

TermsItem.propTypes = {
  text: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  showArrow: PropTypes.bool,
  isAllAgree: PropTypes.bool,
};

function TermsItem({
  text,
  isChecked = false,
  onChange,
  showArrow = false,
  isAllAgree = false,
}) {
  return (
    <div
      className={`${S.termItem} ${isAllAgree ? 'label-md' : 'label-sm'} ${
        isAllAgree ? S.allAgree : ''
      }`}
    >
      <label className={S.termLabel}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className={S.hiddenCheckbox}
        />
        <div className={`${S.checkbox} ${isChecked ? S.checked : ''}`}>
          <Icon id="checkbox" />
        </div>
        <span className={S.termText}>{text}</span>
      </label>
      {showArrow && <Icon id="right" />}
    </div>
  );
}

export default TermsItem;
