import {
  formatDistanceToNow,
  parseISO,
  format,
  differenceInDays,
  isValid,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import PropTypes from 'prop-types';

function TimeAgo({ time }) {
  if (!time) {
    return <span style={{ color: 'var(--content-secondary)' }}>날짜 없음</span>;
  }

  let date;
  try {
    date = typeof time === 'string' ? parseISO(time) : new Date(time);
    if (!isValid(date)) {
      throw new Error('Invalid date');
    }
  } catch {
    console.error('Invalid date format:', time);
    return <span style={{ color: 'var(--content-secondary)' }}>날짜 오류</span>;
  }

  const now = new Date();
  const diffInDays = differenceInDays(now, date);

  let timeString;

  if (diffInDays < 1) {
    timeString = formatDistanceToNow(date, { addSuffix: true, locale: ko });
  } else if (diffInDays < 7) {
    timeString = `${diffInDays}일 전`;
  } else {
    timeString = format(date, 'yyyy.MM.dd', { locale: ko });
  }

  return (
    <span style={{ color: 'var(--content-secondary)' }}>{timeString}</span>
  );
}

TimeAgo.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
};

export default TimeAgo;
