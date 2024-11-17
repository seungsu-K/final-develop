import S from '@/routes/myAppointment/component/MyPostList.module.css';
import { array } from 'prop-types';
import { NavLink } from 'react-router-dom';

MyPostList.propTypes = {
  list: array.isRequired,
};

function MyPostList({ list }) {
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

export default MyPostList;
