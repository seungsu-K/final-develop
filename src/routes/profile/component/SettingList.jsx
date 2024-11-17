import S from '@/routes/profile/component/SettingList.module.css';
import IconButton from '@/components/Button/IconButton';
import { func, number, oneOfType, string } from 'prop-types';
import { useNavigate } from 'react-router-dom';

SettingList.propTypes = {
  text: string.isRequired,
  key: oneOfType([string, number]),

  onClick: func,
  iconColor: string,
};

function SettingList({ text, key, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (text === '탈퇴하기') {
      navigate('/main/profile/setting/deleteAccount');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <li className={S.component} key={key}>
      {text}
      <IconButton iconId={'right'} onClick={handleClick} />
    </li>
  );
}

export default SettingList;
