import Button from '@/components/Button/Button';
import S from '@/routes/notFound/style.module.css';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <main className={S.Component}>
      <img src="/logo.svg" alt="유앤밋" />
      <section className={S.error__text}>
        <h2 className="heading-lg">404 Not Found</h2>
        <h3 className="heading-md">해당 페이지를 찾을 수 없습니다.</h3>
        <div className={clsx(S.paragraph, 'paragraph-sm')}>
          <p>찾으려는 페이지의 주소가 잘못 입력되었거나,</p>
          <p>주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.</p>
          <p>입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.</p>
        </div>
      </section>
      <Button
        className="button-main"
        onClick={() => navigate('/main', { replace: true })}
      >
        홈으로 이동하기
      </Button>
    </main>
  );
}

export default NotFound;
