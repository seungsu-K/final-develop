import pb from '@/api/pb';
import IconButton from '@/components/Button/IconButton';
import S from '@/routes/chatList/component/SendMessage.module.css';
import { useMessageData } from '@/stores/chat';
import { useParams } from 'react-router-dom';

function SendMessage() {
  const { postId } = useParams();
  const userId = JSON.parse(localStorage.getItem('pocketbase_auth')).model.id;
  const {
    chatData,
    userData,
    messages,
    message,
    updateMessage,
    resetMessage,
    fetchChatData,
  } = useMessageData();

  const handleMessage = (e) => {
    const { value } = e.target;

    updateMessage(value);
  };

  const handleClick = async () => {
    const messageData = {
      message: message,
      sender: userId,
      time: new Date(),
    };

    const data = {
      messages: [...messages, messageData],
      user_id: [...userData, userId],
      post_id: postId,
    };

    if (messages.length > 0) {
      await pb.collection('messages').update(chatData.id, data);
    } else {
      await pb.collection('messages').create(data);
    }

    resetMessage();

    fetchChatData(postId);
  };

  return (
    <div className={S.component}>
      <IconButton title="더보기" iconId="plus" width={20} height={20} />
      <div className={S.input__container}>
        <input
          value={message}
          type="text"
          name="message"
          id="message"
          placeholder="메세지 보내기"
          onChange={handleMessage}
        />
        <IconButton title="이모지" iconId="smile" width={20} height={20} />
      </div>
      <IconButton
        title="메세지 보내기"
        iconId="send"
        width={18}
        height={18}
        onClick={handleClick}
      />
    </div>
  );
}

export default SendMessage;
