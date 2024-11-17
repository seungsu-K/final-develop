import S from '@/routes/home/component/MainPostList.module.css';

import { array } from 'prop-types';
import { NavLink } from 'react-router-dom';

MainPostList.propTypes = {
  list: array.isRequired,
};

function MainPostList({ list }) {
  return (
    <ul className={S.component}>
      {list.map(({ path, text, end }) => (
        <li key={path}>
          <NavLink
            to={path}
            end={end}
            className={({ isActive }) => (isActive ? S.active : undefined)}
          >
            {text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default MainPostList;
