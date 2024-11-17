import PropTypes from 'prop-types';
import S from './style.module.css';
import Icon from '../Icon/Icon';

const ChoiceInput = ({ memberCount, date, time, location, onChange }) => {
  return (
    <div className={S.panel}>
      <div className={S.row}>
        <div className={S.label}>
          <Icon id="people" />
          인원
        </div>
        <input
          type="number"
          name="memberCount"
          value={memberCount}
          onChange={onChange}
          min="1"
          className={S.input}
        />
      </div>

      <div className={S.row}>
        <div className={S.label}>
          <Icon id="calendar"></Icon>날짜
        </div>
        <input
          type="date"
          name="date"
          value={date}
          onChange={onChange}
          className={S.input}
        />
      </div>

      <div className={S.row}>
        <div className={S.label}>
          <Icon id="time"></Icon>시간
        </div>
        <input
          type="time"
          name="time"
          value={time}
          onChange={onChange}
          className={S.input}
        />
      </div>

      <div className={S.row}>
        <div className={S.label}>
          <Icon id="map"></Icon>장소
        </div>
        <input
          type="text"
          name="location"
          value={location}
          onChange={onChange}
          className={S.input}
          placeholder="장소를 입력해주세요"
        />
      </div>
    </div>
  );
};

ChoiceInput.propTypes = {
  memberCount: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ChoiceInput;
