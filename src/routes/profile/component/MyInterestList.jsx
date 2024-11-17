import S from '@/routes/profile/component/MyInterestList.module.css';

import { array } from 'prop-types';

MyInterestList.propTypes = {
  list: array.isRequired,
};

function MyInterestList({ list }) {
  return (
    <ul className={S.component}>
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default MyInterestList;
