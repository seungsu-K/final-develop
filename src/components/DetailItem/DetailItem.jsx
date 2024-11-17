import { string } from 'prop-types';
import S from './style.module.css';

function DetailItem({ label, value }) {
  return (
    <div className={S.detailItem}>
      <span className={S.label}>{label}</span>
      <span className={S.value}>{value}</span>
    </div>
  );
}

DetailItem.propTypes = {
  label: string.isRequired,
  value: string.isRequired,
};

export default DetailItem;
