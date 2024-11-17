import S from '@/components/PostDetail/style.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';
import { string, number } from 'prop-types';
import DetailItem from '@/components/DetailItem/DetailItem';
import PostManager from '@/components/PostManager/PostManager';
import HeaderForDetails from '../HeaderForDetails/HeaderForDetails';

PostDetail.propTypes = {
  title: string,
  sportType: string,
  location: string,
  datetime: string,
  pop: string,
  description: string,
  member: number,
};

const testData = {
  title: '제목입니다',
  sportType: '러닝',
  location: '종합운동장',
  datetime: '2024년 9월 1일',
  pop: '1',
  description: '설명입니다.',
};

function PostDetail() {
  const navigate = useNavigate();

  const { title, sportType, location, datetime, pop, description } = testData;

  return (
    <article className={S.component}>
      <HeaderForDetails
        leftIcon={[{ iconId: 'left', path: '-1', title: '뒤로가기' }]}
        rightIcon={[
          { iconId: 'home', path: '/main', title: 'home' },
          { iconId: 'more', path: '/', title: 'more' },
        ]}
      />
      <img className={S.img_main} src="/running.png" alt="이미지없음" />

      <div className={S.main}>
        <p className={S.main_title}>{title}</p>
        <div className={S.main_detail}>
          <DetailItem label="종목" value={sportType} />
          <DetailItem label="장소" value={location} />
          <DetailItem label="일시" value={datetime} />
          <DetailItem label="인원" value={pop} />
        </div>
      </div>

      <div className={S.sub}>
        <p className={S.sub_title}>내용</p>
        <div className={S.sub_description}>{description}</div>
      </div>

      <div className={S.attend}>
        <div className={S.attend_member}>
          <span className={S.attend_member_pop}>
            참여멤버 {pop}명
            <span className={S.attend_member_pop_max}> / 4명 </span>{' '}
          </span>
          <div className={S.attend_member_info}>
            <PostManager
              nickName="사용자"
              pop={pop}
              imageWidth={44}
              imageHeight={44}
            />
          </div>
        </div>
      </div>

      <div className={S.attend_button}>
        <Button
          className={S.button}
          height="2.8rem"
          onClick={() => navigate('join')}
        >
          참여하기
        </Button>
      </div>
    </article>
  );
}

export default PostDetail;
