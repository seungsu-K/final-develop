import getPbImageURL from '@/api/getPbImageURL';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import S from '@/routes/chatList/component/Chat.module.css';

import { func, object } from 'prop-types';

Chat.propTypes = {
  onClick: func,
  post: object,
  chat: object,
};

function Chat({ onClick, post, chat }) {
  const message = chat?.messages[chat?.messages.length - 1];
  const sender = chat?.expand.user_id.filter(
    (item) => item.id === message.sender
  )[0];

  const date = new Date(`${message?.time}`);

  return (
    <div className={S.component} onClick={onClick}>
      {chat ? (
        <>
          <ProfileImage
            url={
              sender.avatar ? getPbImageURL(sender, 'avatar') : '/profile.png'
            }
            width={44}
            height={44}
          />
          <div className={S.chat__container}>
            <div className={S.chat__container__header}>
              <h3>{post.expand.appointment_id.title}</h3>
              <span>{date.toString().split(' ')[4]?.slice(0, 5)}</span>
            </div>
            <span className={S.chat__container__message}>
              {message.message}
            </span>
          </div>
        </>
      ) : (
        <>
          <ProfileImage url="/profile.png" width={44} height={44} />
          <div className={S.chat__container}>
            <div className={S.chat__container__header}>
              <h3>{post.expand.appointment_id.title}</h3>
            </div>
            <span className={S.chat__container__message}>
              채팅을 시작해보세요
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
