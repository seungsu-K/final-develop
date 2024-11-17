import { useState } from 'react';
import S from './Tooltip.module.css';
import PropTypes from 'prop-types';

function Tooltip({ text, children, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={S.tooltipWrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className={`${S.tooltip} ${S[position]}`}>{text}</div>}
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

export default Tooltip;
