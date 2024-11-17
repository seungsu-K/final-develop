import S from '@/components/LoadingSpinner/LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <div className={S.component}>
      <h2>loading...</h2>
      <div className={S.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;
