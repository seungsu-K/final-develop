import S from '@/components/KebabMenu/style.module.css';
import IconButton from '@/components/Button/IconButton';
import Button from '@/components/Button/Button';
import Confirm from '@/components/Confirm/Confirm';

import { useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { oneOf, bool, string } from 'prop-types';
import clsx from 'clsx';
import { useKebabMenuStore } from '@/stores/kebabStore';

KebabMenu.propTypes = {
  category: oneOf(['appointments', 'feeds']).isRequired,
  categoryText: oneOf(['모임', '게시물']).isRequired,
  chat: bool,
  writer: string,
  feedId: string,
};

function KebabMenu({ category, categoryText, chat = false, writer, feedId }) {
  const { postId } = useParams();
  const nav = useNavigate();
  const {
    isOptionOpen,
    currentUser,
    postWriter,
    setPostWriter,
    showConfirm,
    confirmText,
    fetchUser,
    fetchPostWriter,
    handleOpenMenu,
    handleCloseMenu,
    handleDeleteClick,
    handleReportClick,
    handleLeaveChatClick,
    handleConfirm,
    handleCancel,
  } = useKebabMenuStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (category === 'appointments') {
      fetchPostWriter(category, postId);
    } else if (category === 'feeds') {
      setPostWriter(writer);
    }
  }, [fetchPostWriter, category, postId, writer, setPostWriter]);

  const isAuthor = currentUser === postWriter;

  return (
    <div className={clsx(S.component, 'button-icon')}>
      <IconButton
        title="옵션 선택"
        iconId="more"
        width={20}
        height={20}
        onClick={handleOpenMenu}
      />
      {isOptionOpen && (
        <div className={S.option}>
          <div className={S.option__content}>
            {chat ? (
              <div className={clsx(S.option__wrapper)}>
                <Button
                  className={clsx(S.option__button, S.option__buttonRed)}
                  onClick={() => handleLeaveChatClick(isAuthor)}
                >
                  채팅방 나가기
                </Button>
                <Button
                  className={clsx(S.option__button, S.option__buttonCancel)}
                  onClick={handleCloseMenu}
                >
                  취소
                </Button>
              </div>
            ) : isAuthor ? (
              <div className={clsx(S.option__wrapper)}>
                <NavLink
                  to={postId ? '/main/new/post' : '/main/community/create'}
                  className={clsx(S.option__button)}
                >
                  수정하기
                </NavLink>
                <Button
                  className={clsx(S.option__button, S.option__buttonRed)}
                  onClick={() =>
                    handleDeleteClick(category, postId, categoryText)
                  }
                >
                  삭제하기
                </Button>
                <Button
                  className={clsx(S.option__button, S.option__buttonCancel)}
                  onClick={handleCloseMenu}
                >
                  취소
                </Button>
              </div>
            ) : (
              <div className={clsx(S.option__wrapper)}>
                <Button
                  className={clsx(S.option__button, S.option__buttonRed)}
                  onClick={() => handleReportClick(categoryText)}
                >
                  신고하기
                </Button>
                <Button
                  className={clsx(S.option__button, S.option__buttonCancel)}
                  onClick={handleCloseMenu}
                >
                  취소
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {showConfirm && (
        <article>
          <Confirm
            text={confirmText}
            onClick={() =>
              handleConfirm(category, postId, feedId, nav, isAuthor)
            }
            onCancel={handleCancel}
          />
        </article>
      )}
    </div>
  );
}

export default KebabMenu;
