import S from '@/components/HeaderForDetails/HeaderForDetails.module.css';
import { array, string, node, number } from 'prop-types';
import IconButton from '../Button/IconButton';

HeaderForDetails.propTypes = {
  text: string,
  leftIcon: array.isRequired,
  rightIcon: array,
  children: node,
  width: number,
  height: number,
};

function HeaderForDetails({
  text,
  leftIcon,
  rightIcon,
  children,
  width = 18,
  height = 18,
}) {
  return (
    <header className={S.component}>
      <div className={S.icons__left}>
        <ul className={S.icons__container}>
          {leftIcon?.map((item, index) => (
            <li key={index}>
              <IconButton
                iconId={item.iconId}
                title={item.title}
                path={item.path}
                onClick={item.onClick}
                width={18}
                height={18}
              />
            </li>
          ))}
        </ul>
        {children ? (
          <IconButton
            iconId="home"
            title="home"
            path="/main"
            width={width}
            height={height}
          />
        ) : null}
      </div>
      {text && <h2>{text}</h2>}
      {children ? (
        <div>{children}</div>
      ) : (
        <ul className={S.icons__container}>
          {rightIcon?.map((item, index) => (
            <li key={index}>
              <IconButton
                iconId={item.iconId}
                title={item.title}
                path={item.path}
                width={width}
                height={height}
              />
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default HeaderForDetails;
