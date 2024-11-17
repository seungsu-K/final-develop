import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import S from '@/routes/community/component/BtnCreateFeed.module.css';
import { useNavigate } from 'react-router-dom';

function BtnCreateFeed() {
  const navigate = useNavigate();
  return (
    <div className={S.component}>
      <Button className="button-icon-fixed" onClick={() => navigate('create')}>
        <Icon id="write" width={28} height={28} color={'var(--white)'} />
      </Button>
    </div>
  );
}

export default BtnCreateFeed;
