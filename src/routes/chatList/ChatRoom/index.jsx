import S from '@/routes/chatList/ChatRoom/ChatRoom.module.css';
import HeaderForDetails from '@/components/HeaderForDetails/HeaderForDetails';
import SendMessage from '../component/SendMessage';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMessageData } from '@/stores/chat';
import { useParams } from 'react-router-dom';
import { usePostData } from '@/stores/form';
import pb from '@/api/pb';

export function Component() {
  const { postId } = useParams();
  const userId = JSON.parse(localStorage.getItem('pocketbase_auth')).model.id;

  const [isLoading, setIsLoading] = useState(false);

  const { chatData, fetchChatData, fetchChatRealTime } = useMessageData();
  const { postData, fetchPost } = usePostData();

  useEffect(() => {
    setIsLoading(true);
    fetchChatData(postId);
    fetchPost(postId);

    pb.collection('messages').subscribe(`${chatData?.id}`, function (e) {
      fetchChatRealTime(e.record);
    });

    setIsLoading(false);

    return () => {
      pb.collection('messages').unsubscribe(`${chatData?.id}`);
    };
  }, [fetchChatData, postId, fetchPost, fetchChatRealTime, chatData?.id]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <HeaderForDetails
        leftIcon={[{ iconId: 'left', title: '뒤로가기', path: '-1' }]}
        text={postData.title}
        rightIcon={[{ iconId: 'more', title: '더보기' }]}
      />
      <main className={S.component}>
        <h2 className="sr-only">메시지 내용</h2>
        {chatData?.id ? (
          <div className={S.chatRoom__container}>
            <div className={S.chatRoom__guide}>
              <span>
                메세지를 주고 받을 때는 커뮤니티 가이드라인을 준수하고 서로
                존중해주세요. 불쾌한 언행으로 신고가 누적된 사용자는 유앤밋
                서비스 사용에 제한이 있을 수 있습니다.
              </span>
            </div>
            {chatData?.messages?.map((item, index) =>
              item.sender === userId ? (
                <div
                  key={index}
                  className={`${S.message__container} ${S.message__container__user}`}
                >
                  <span className={`${S.message__user} ${S.message}`}>
                    {item.message}
                  </span>
                </div>
              ) : (
                <div key={index} className={S.message__container}>
                  <span className={`${S.message__others} ${S.message}`}>
                    {item.message}
                  </span>
                </div>
              )
            )}
          </div>
        ) : (
          <div className={S.guide}>채팅을 시작해보세요.</div>
        )}
      </main>
      <SendMessage />
    </>
  );
}
