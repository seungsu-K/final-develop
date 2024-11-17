import S from '@/routes/profile/PostList/PostList.module.css';

import { array } from 'prop-types';
import { NavLink } from 'react-router-dom';

PostList.propTypes = {
  list: array.isRequired,
};

function PostList({ list }) {
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

export default PostList;
