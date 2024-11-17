import { string } from 'prop-types';
import { Helmet } from 'react-helmet-async';

CustomHelmet.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  path: string.isRequired,
};

function CustomHelmet({ title, description, path }) {
  return (
    <Helmet>
      <title>{`유앤밋 | ${title}`}</title>
      <meta name="description" content={description} />
      <meta property="author" content="유앤밋" />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:title" content={`유앤밋 | ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://harumong.netlify.app${path}`} />
      <meta
        property="og:image"
        content="https://uandmeet.netlify.app/logo.svg"
      />
    </Helmet>
  );
}

export default CustomHelmet;
