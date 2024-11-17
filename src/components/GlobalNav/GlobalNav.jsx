import S from './style.module.css';

import { NavLink } from 'react-router-dom';
import { useNavList } from '@/stores/route';
import Icon from '@/components/Icon/Icon';

function GlobalNav() {
  const [navList] = useNavList((s) => [s.navList]);

  return (
    <nav className={`${S.component} ${S.navigation}`}>
      <h2 className="sr-only">하단 메뉴</h2>
      <ul>
        {navList.map(({ path, text, icon, iconFull }) => (
          <li key={path}>
            <NavLink to={path}>
              {({ isActive }) =>
                isActive ? (
                  <Icon id={iconFull} text={text}></Icon>
                ) : (
                  <Icon id={icon} text={text} />
                )
              }
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default GlobalNav;
