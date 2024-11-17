import S from '@/components/Button/RadioBox.module.css';
import { array, string, func } from 'prop-types';

RadioBox.propTypes = {
  list: array,
  name: string,
  onChange: func,
  defaultChecked: string,
};

function RadioBox({ list, name, defaultChecked, onChange }) {
  return (
    <div className={S.component}>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <input
              className={S.input}
              type="radio"
              id={item}
              name={name}
              value={item}
              onChange={onChange}
              defaultChecked={defaultChecked === item ? true : false}
            />
            <label htmlFor={item}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RadioBox;
