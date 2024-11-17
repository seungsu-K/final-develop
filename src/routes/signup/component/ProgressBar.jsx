import PropTypes from 'prop-types';
import S from './ProgressBar.module.css';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={S.progressBar}>
      <div className={S.progressFill} style={{ width: `${progress}%` }}></div>
    </div>
  );
};
ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};
export default ProgressBar;
