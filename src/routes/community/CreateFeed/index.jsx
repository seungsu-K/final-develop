import S from '@/routes/community/CreateFeed/CreateFeed.module.css';

import pb from '@/api/pb';
import Button from '@/components/Button/Button';
import HeaderForDetails from '@/components/HeaderForDetails/HeaderForDetails';
import Icon from '@/components/Icon/Icon';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import TextArea from '@/components/TextArea/TextArea';
import { useFeedData } from '@/stores/form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import clsx from 'clsx';

export function Component() {
  const navigate = useNavigate();

  const {
    feedData,
    imageData,
    updateFeedData,
    resetFeedData,
    updateImageData,
    resetImageData,
  } = useFeedData();

  const handleFeedData = (e) => {
    const { name, value } = e.target;

    updateFeedData({ [name]: value });
  };

  const handleImageName = (e) => {
    let image = [];

    for (let file of e.target.files) {
      image = [...image, file];
    }

    updateImageData(image);
  };

  const fileName = imageData.map((data) => data.name);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const dataCollection = Object.entries(feedData);
    const auth = JSON.parse(localStorage.getItem('pocketbase_auth')).model;
    formData.append('writer', auth.id);
    dataCollection.forEach((data) => formData.append(data[0], data[1]));
    imageData.forEach((data) => formData.append('image', data));

    setIsLoading(true);
    await pb
      .collection('feeds')
      .create(formData)
      .then(() => {
        resetFeedData();
        resetImageData();

        setIsLoading(false);
      });

    navigate('/main/community');
  };

  const collectedData = Object.entries(feedData).filter(
    ([key]) => key != 'writer'
  );

  const isValid = collectedData.every((item) => Boolean(item[1]));

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <HeaderForDetails
        text="피드 생성"
        leftIcon={[{ iconId: 'left', path: '-1', title: '뒤로가기' }]}
      />
      <form className={S.component}>
        <div className={S.textarea}>
          <TextArea
            value={feedData.content}
            name="content"
            id="content"
            placeholder="내용을 입력해주세요"
            maxLength={1000}
            onChange={handleFeedData}
          />
        </div>

        <div className={S.image__upload}>
          <ImageUpload onChange={handleImageName} imageData={fileName}>
            <Icon id="camera" />
            사진추가 <p>(선택)</p>
          </ImageUpload>
        </div>

        <Button
          path="community"
          title="피드 게시하기"
          type="button"
          className={clsx(S.button, 'button-main')}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          완료
        </Button>
      </form>
    </>
  );
}
