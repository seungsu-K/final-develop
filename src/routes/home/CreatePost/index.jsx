import S from '@/routes/home/CreatePost/CreatePost.module.css';

import PostInput from '@/components/PostInput/PostInput';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import ChoiceInput from '@/components/ChoiceInput/ChoiceInput';
import HeaderForDetails from '@/components/HeaderForDetails/HeaderForDetails';
import { useNavigate } from 'react-router-dom';
import { usePostData } from '@/stores/form';
import pb from '@/api/pb';
import IconButton from '@/components/Button/IconButton';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import TextArea from '@/components/TextArea/TextArea';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useState } from 'react';
import clsx from 'clsx';

export function Component() {
  const navigate = useNavigate();

  const {
    postData,
    imageData,
    updatePostData,
    resetPostData,
    updateImageData,
    resetImageData,
  } = usePostData();

  // postData store에 데이터 추가
  const handlePostData = (e) => {
    const { name, value } = e.target;

    updatePostData({ [name]: value });
  };

  // 이미지 데이터를 store에 추가

  const handleImageName = (e) => {
    let image = [];

    for (let file of e.target.files) {
      image = [...image, file];
    }

    updateImageData(image);
  };

  // 파일명 랜더링을 위한 데이터
  const fileName = imageData.map((data) => data.name);

  const [isLoading, setIsLoading] = useState();

  // 완료 버튼 클릭 시
  const handleSubmit = async (e) => {
    e.preventDefault();

    // formData에 전송할 데이터 입력
    const formData = new FormData();

    const auth = JSON.parse(localStorage.getItem('pocketbase_auth')).model;
    formData.append('writer', auth.id);

    const dataCollection = Object.entries(postData);
    dataCollection.forEach((data) => formData.append(data[0], data[1]));

    imageData.forEach((data) => formData.append('image', data));

    // 서버로 데이터 전송
    setIsLoading(true);

    await pb
      .collection('appointments')
      .create(formData)
      .then(() => {
        resetPostData();
        resetImageData();
      });

    const resultList = await pb.collection('appointments').getList(1, 1, {
      filter: `writer = "${auth.id}"`,
      sort: '-created',
    });

    const joinData = {
      user_id: resultList.items[0].writer,
      appointment_id: resultList.items[0].id,
    };

    await pb.collection('join').create(joinData);

    setIsLoading(false);

    // 생성된 모임 상세 페이지로 이동
    navigate(`/main/post/${resultList.items[0].id}`);
  };

  // 작성자 외 모든 데이터 값 입력 시 버튼 활성화
  const collectedData = Object.entries(postData).filter(
    ([key]) => key != 'writer'
  );

  const isValid = collectedData.every((item) => Boolean(item[1]));

  const handleClickLeft = () => {
    resetPostData();
    resetImageData();
    navigate(-1);
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <HeaderForDetails
        text="모임 생성하기"
        leftIcon={[
          { iconId: 'left', onClick: handleClickLeft, title: '뒤로가기' },
        ]}
      />
      <div className={S.component}>
        <form>
          <label>
            <PostInput
              placeholder="제목을 입력해주세요"
              name="title"
              value={postData.title}
              onChange={handlePostData}
            />
          </label>

          <div className={S.textarea}>
            <TextArea
              placeholder="내용을 입력해주세요"
              name="description"
              id="description"
              value={postData.description}
              onChange={handlePostData}
            />
          </div>

          <div className={S.category}>
            {'카테고리를 선택해주세요'}
            {postData.category && (
              <span className={S.category__content}>{postData.category}</span>
            )}
            <IconButton iconId="right" path="/main/home/new/post/category" />
          </div>

          <div className={S.image__upload}>
            <ImageUpload onChange={handleImageName} imageData={fileName}>
              <Icon id="camera" />
              사진추가 <p>(선택)</p>
            </ImageUpload>
          </div>

          <label>
            <ChoiceInput
              memberCount={postData.memberCount}
              date={postData.date}
              time={postData.time}
              location={postData.location}
              onChange={handlePostData}
            />
          </label>
          <Button
            className={clsx(S.button, 'button-main')}
            type="button"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            완료
          </Button>
        </form>
      </div>
    </>
  );
}
