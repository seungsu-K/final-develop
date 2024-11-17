import Icon from '@/components/Icon/Icon';
import S from './SignUpLogo.module.css';

function signUpTitle() {
  return (
    <div>
      <h1 className={S.SignUpTitle} aria-label="유앤밋">
        <Icon id="Logo_s" width={52} height={19.07} />
      </h1>
    </div>
  );
}

export default signUpTitle;
