import S from '@/routes/postDetails/postDetails.module.css';

import Button from '@/components/Button/Button';
import DetailItem from '@/components/DetailItem/DetailItem';
import PostManager from '@/components/PostManager/PostManager';
import HeaderForDetails from '@/components/HeaderForDetails/HeaderForDetails';
import { useParams } from 'react-router-dom';
import PostDetailImage from './component/PostDetailsImage';
import { usePostData } from '@/stores/form';
import { useEffect } from 'react';
import { useJoin } from '@/stores/join';
import { useUsers } from '@/stores/users';
import { Link } from 'react-router-dom';
import pb from '@/api/pb';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import KebabMenu from '@/components/KebabMenu/KebabMenu';
import CustomHelmet from '@/components/CustomHelmet/CustomHelmet';

export function Component() {
  const { postId } = useParams();

  const { postData, isLoading, fetchPost, resetPostData } = usePostData();
  const { joinData, fetchJoinData, updateJoinData } = useJoin();
  const { users, fetchUsers } = useUsers();

  const auth = JSON.parse(localStorage.getItem('pocketbase_auth'));
  const user = auth.model.id;

  useEffect(() => {
    fetchPost(postId);
    fetchJoinData(postId);

    return () => {
      resetPostData();
    };
  }, [fetchPost, fetchJoinData, postId, resetPostData]);

  const members = joinData.map((item) => item.user_id);
  const filter = members.map((item) => `id = "${item}"`).join(' || ');

  useEffect(() => {
    fetchUsers(filter);
  }, [fetchUsers, filter]);

  const handleClick = async () => {
    const data = {
      user_id: user,
      appointment_id: postData.id,
    };

    try {
      await pb.collection('join').create(data);

      updateJoinData(data);
      toast.success('해당 모임글에 참여하였습니다. 멤버들과 채팅을 나눠보세요');
    } catch {
      toast.error('채팅에 참여할 수 없습니다');
    }
  };

  const routeToChat = `/main/post/${postData.id}/chat`;

  const date = `${postData.date.slice(0, 10)} ${postData.time}`;

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <CustomHelmet
        title={`모임글 | ${postData.title}`}
        description={`${postData.title}모임글의 관련 정보를 확인할 수 있는 상세페이지 입니다.`}
        path={`/main/post/${postData.id}`}
      />
      <HeaderForDetails
        leftIcon={[
          { iconId: 'left', path: '-1', title: '뒤로가기' }, // TODO:
        ]}
        rightIcon={[{ iconId: 'home', path: '/main', title: 'home' }]}
        width={20}
        height={20}
      >
        <KebabMenu category="appointments" categoryText="모임" />
      </HeaderForDetails>
      <article className={S.component}>
        {postData.image && postData.image.length > 0 && <PostDetailImage />}
        <div className={S.main}>
          <h2 className={S.main_title}>{postData.title}</h2>
          <div className={S.main_detail}>
            <DetailItem label="종목" value={postData.category} />
            <DetailItem label="장소" value={postData.location} />
            <DetailItem label="일시" value={date} />
            <DetailItem label="인원" value={postData.memberCount} />
          </div>
        </div>

        <div className={S.sub}>
          <h3 className={S.sub_title}>내용</h3>
          <div className={S.sub_description}>{postData.description}</div>
        </div>

        <div className={S.attend}>
          <span className={S.attend_member_pop}>
            참여멤버 {members.length}명
            <span className={S.attend_member_pop_max}>
              / {postData.memberCount}명
            </span>
          </span>
          <PostManager members={users} imageWidth={44} imageHeight={44} />
        </div>

        <div className={S.attend_button}>
          {members.includes(user) ? (
            <Link to={routeToChat} className={S.button}>
              채팅하기
            </Link>
          ) : (
            <Button className={S.button} onClick={handleClick}>
              참여하기
            </Button>
          )}
        </div>
      </article>
    </>
  );
}
