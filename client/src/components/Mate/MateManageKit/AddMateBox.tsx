import styled from '@emotion/styled';
import { MateBox, lineStyles } from './common';
import { flex, transition } from '@/styles/tokens';
import { FormEvent, useState } from 'react';
import { useAuth, useInput, useTransition } from '@/hooks';
import PlusIcon from '@/assets/svg/plus-circle.svg';
import { TYPO } from '@/styles/typo';
import { COLORS } from '@/styles/colors';
import { css } from '@emotion/react';
import { TextInput } from '@/components/Field';
import { motion } from 'framer-motion';
import { SquareButton } from '@/components/Buttons';
import Modal from '@/components/Modal';
import LoadingScreen from './LoadingScreen';

type FormData = {
  name: string;
  sId: string;
};

interface Props {
  saveMateList: (name: string, sId: string) => Promise<boolean>;
  isErr: boolean;
}

const ANIMATION_STYLES = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    scaleY: 1,
  },
};

const AddMateBox = ({ saveMateList, isErr }: Props) => {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { values, handleChange, handleClear } = useInput<FormData>({
    name: '',
    sId: '',
  });
  const { isMount, isTransition, handleOpen, handleClose } = useTransition();
  const { authInfo } = useAuth();

  const modalConfig = {
    title: '메이트 등록에 실패하였습니다.',
    message: '이미 등록되었거나, 유효하지 않은 정보입니다.',
    handleClose,
    onClick: handleClose,
  };

  const handleToggle = () => {
    setToggleOpen((prev) => !prev);
  };

  const clearInput = () => {
    handleClear();
    setToggleOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.name === '' || values.sId === '') return;
    if (values.name === authInfo.name && values.sId === authInfo.sId) {
      handleOpen();
      return;
    }

    setLoading(true);
    const res = await saveMateList(values.name, values.sId);
    setLoading(false);
    if (res) clearInput();
    else handleOpen();
  };

  return (
    <Container>
      <MateBox onClick={handleToggle} css={lineStyles.bottom}>
        <PlusIcon />
        <PlusContent>메이트 추가하기</PlusContent>
      </MateBox>
      {toggleOpen && (
        <InputForm
          onSubmit={handleSubmit}
          initial={ANIMATION_STYLES.hidden}
          animate={
            toggleOpen ? ANIMATION_STYLES.visible : ANIMATION_STYLES.hidden
          }
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <InputWrapper>
            <InputCaption>
              <span css={textStyles.caption}>이름</span>
              <span css={textStyles.noti}>
                메이트는 숭실대학교 학생만 가능합니다.
              </span>
            </InputCaption>
            <TextInput
              placeholder="홍길동"
              value={values.name}
              name="name"
              onChange={handleChange}
              warning={isErr}
            />
          </InputWrapper>
          <InputWrapper>
            <InputCaption>
              <span css={textStyles.caption}>학번</span>
            </InputCaption>
            <TextInput
              placeholder="20230000"
              value={values.sId}
              name="sId"
              onChange={handleChange}
              warning={isErr}
            />
          </InputWrapper>
          <SquareButton
            title="메이트 등록하기"
            theme="primary"
            disabled={values.name === '' || values.sId === ''}
            css={buttonStyle}
          />
        </InputForm>
      )}
      {isMount && (
        <Modal
          {...modalConfig}
          modalType="confirm"
          isTransition={isTransition}
        />
      )}
      {loading && <LoadingScreen />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 0)};
`;

const PlusContent = styled.span`
  ${TYPO.caption.Reg};
  color: ${COLORS.grey3};
`;

const InputForm = styled(motion.form)`
  width: 100%;
  ${flex('column', 'start', 'center', 2.6)};
  padding: 2.7rem 3rem 4.1rem 3rem;
  transform-origin: top;
  overflow: hidden;
`;

const InputWrapper = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 1.5)};
`;

const InputCaption = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 0.5)};
`;

const textStyles = {
  caption: css`
    ${TYPO.title3.Md};
    color: ${COLORS.grey0};
  `,
  noti: css`
    ${TYPO.text2.Reg};
    color: ${COLORS.primary};
  `,
};

const buttonStyle = css`
  margin-top: 1.9rem;
  ${transition('0.3s')};
`;

export default AddMateBox;
