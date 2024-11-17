import { useState } from 'react';
import S from '@/routes/community/component/BtnCount.module.css';
import IconButton from '@/components/Button/IconButton';

function BtnThumsup() {
  const [countThumsUp, setCountThumsUp] = useState(0);

  const handleThumsUp = () => {
    setCountThumsUp((prevCount) => prevCount + 1);
    console.log(countThumsUp);
  };
  return (
    <div className={S.component}>
      <IconButton
        title="좋아요"
        iconId="thumbs-up"
        width={16}
        height={16}
        iconColor="var(--content-secondary)"
        onClick={handleThumsUp}
      />
      <span>{countThumsUp}</span>
    </div>
  );
}

export default BtnThumsup;
