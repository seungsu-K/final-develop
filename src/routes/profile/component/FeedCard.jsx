import S from '@/routes/profile/component/FeedCard.module.css';
import KebabMenu from '@/components/KebabMenu/KebabMenu';
import { string } from 'prop-types';

FeedCard.propTypes = {
  content: string.isRequired,
  imageUrl: string,
  date: string.isRequired,
  writer: string,
  feedId: string,
};

function FeedCard({ content, imageUrl, date, writer, feedId }) {
  console.log('롸이터 : ', writer);
  console.log('피드아이디 : ', feedId);

  return (
    <article className={S.component}>
      <h2 className="sr-only">{`${date} 게시글`}</h2>
      {imageUrl && <img src={imageUrl} alt={`${date} 게시글의 이미지`} />}
      <div className={S.content__container}>
        <div className={S.content__container__sub}>
          <span className={S.content}>{content}</span>
          <KebabMenu
            category="feeds"
            categoryText="게시물"
            writer={writer}
            feedId={feedId}
          />
        </div>
        <span className={S.content__date}>{date}</span>
      </div>
    </article>
  );
}

export default FeedCard;
