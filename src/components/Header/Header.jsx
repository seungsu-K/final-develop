import S from '@/components/Header/style.module.css';

import Icon from '@/components/Icon/Icon';
import IconButton from '@/components/Button/IconButton';
import { useLocation } from 'react-router-dom';
import { useHeader } from '@/stores/route';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [header] = useHeader((s) => [s.header]);

  return (
    <header>
      {header.map(
        (item, index) =>
          item.path === currentPath && (
            <div key={index} className={S.component}>
              <h1>{item.text ? item.text : <Icon id="Logo_s" width={52} />}</h1>
              <ul className={S.icons__container}>
                {item.iconList?.map((iconList, index) => (
                  <li key={index}>
                    <IconButton
                      iconId={iconList.iconId}
                      title={iconList.title}
                      path={iconList.path}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
    </header>
  );
}
export default Header;
