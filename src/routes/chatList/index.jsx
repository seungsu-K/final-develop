import S from '@/routes/chatList/style.module.css';

import Chat from './component/Chat';
import { useNavigate } from 'react-router-dom';
import HeaderForDetails from '@/components/HeaderForDetails/HeaderForDetails';
import { useJoin } from '@/stores/join';
import { useEffect } from 'react';
import { useMessageData } from '@/stores/chat';
import { useState } from 'react';

export function Component() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('pocketbase_auth')).model.id;

  const { joinData, fetchJoinDataByUser } = useJoin();
  const { chatList, fetchChatDataByFilter } = useMessageData();
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    fetchJoinDataByUser(userId);
    const filter = joinData
      .map((item) => `post_id = "${item.appointment_id}"`)
      .join(' || ');

    setFilter(filter);
  }, [fetchJoinDataByUser, userId, joinData]);

  useEffect(() => {
    fetchChatDataByFilter(filter);
  }, [fetchChatDataByFilter, filter]);

  return (
    <>
      <HeaderForDetails
        leftIcon={[{ iconId: 'left', title: '뒤로 가기', path: '/main' }]}
        text="모임 채팅"
      />
      <main className={S.component}>
        <ul>
          {joinData.map((item, index) => (
            <li key={index}>
              <Chat
                post={item}
                chat={
                  chatList.filter(
                    (chat) => chat.post_id === item.appointment_id
                  )[0]
                }
                onClick={() =>
                  navigate(`/main/post/${item.appointment_id}/chat`)
                }
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
