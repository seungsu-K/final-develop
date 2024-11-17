import { string, func, node, oneOf, bool } from 'prop-types';
import S from './Button.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

function Button({
  path,
  className,
  title,
  type = 'button',
  onClick,
  children,
  disabled = false,
}) {
  return (
    <div className={S.Button}>
      {path ? (
        <NavLink
          to={path}
          className={clsx(S.Button, className)}
          title={title}
          onClick={onClick}
          tabIndex={0}
        >
          {children}
        </NavLink>
      ) : (
        <button
          className={clsx(S.Button, className)}
          type={type}
          title={title}
          onClick={onClick}
          disabled={disabled}
          tabIndex={0}
        >
          {children}
        </button>
      )}
    </div>
  );
}

Button.propTypes = {
  path: string,
  className: string,
  title: string,
  type: oneOf(['button', 'submit', 'reset']),
  onClick: func,
  children: node,
  disabled: bool,
};

export default Button;
