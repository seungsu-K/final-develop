import S from '@/routes/community/component/AddComment.module.css';
import IconButton from '@/components/Button/IconButton';
import { string, func, object } from 'prop-types';

AddComment.propTypes = {
  value: string,
  onChange: func,
  feed: object,
  onClick: func,
};

function AddComment({ value, onChange, onClick }) {
  return (
    <div className={S.component}>
      <div className={S.input__container}>
        <input
          value={value}
          type="text"
          name="comment"
          id="message"
          placeholder="댓글을 작성해 주세요"
          onChange={onChange}
        />
        <IconButton title="이모지" iconId="smile" width={20} height={20} />
      </div>
      <IconButton
        title="댓글 추가하기"
        iconId="send"
        width={18}
        height={18}
        onClick={onClick}
      />
    </div>
  );
}

export default AddComment;
