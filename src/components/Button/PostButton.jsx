import S from '@/components/Button/PostButton.module.css';

import IconButton from './IconButton';
import { string } from 'prop-types';

PostButton.propTypes = {
  iconId: string.isRequired,
  path: string,
};

function PostButton({ iconId, path }) {
  return (
    <div className={S.PostButton}>
      <IconButton
        path={path}
        iconId={iconId}
        iconColor={'var(--white)'}
        width={28}
        height={28}
      />
    </div>
  );
}

export default PostButton;
