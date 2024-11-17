import S from '@/components/Confirm/Confirm.module.css';
import Button from '../Button/Button';
import { string, func } from 'prop-types';
import clsx from 'clsx';

Confirm.propTypes = {
  text: string,
  onClick: func,
  onCancel: func,
};

function Confirm({ text, onClick, onCancel }) {
  return (
    <div className={S.component}>
      <span>{text}</span>
      <div className={S.button__container}>
        <Button
          className={clsx(S.button__cancel, 'button-small')}
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          className={clsx(S.button__confirm, 'button-small')}
          onClick={onClick}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

export default Confirm;
