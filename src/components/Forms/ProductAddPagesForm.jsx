import React, { useState } from 'react';

import InputCheckboxCustom from 'components/InputFields/InputCheckboxCustom';
import InputCheckboxImage from 'components/InputFields/InputCheckboxImage';
import aboutMeImg from 'img/about_me.png';
import tipsPageImg from 'img/tips_page.png';
import journalPageImg from 'img/journal_page.png';
import AboutMeModal from 'components/Modals/AboutMeModal';
import TipsPageModal from 'components/Modals/TipsPageModal';
import JournalPageModal from 'components/Modals/JournalPageModal';
import { CircularProgress } from '@mui/material';

import { looksGoodProductKindActions } from 'helpers/looksGoodProductKindActions';
import { useDispatch, useSelector } from 'react-redux';
import { productBatchesSliceActions } from 'store/product-batches';
import { productCustomPagesSliceActions } from 'store/product-custom-pages';
import { apiCall } from 'helpers/api-config';
import { convertFileToBase64 } from 'helpers/image';
import { useBookCreation } from 'hooks/bookCreation';
import styles from './ProductAddPagesForm.module.scss';

function ProductAddPagesForm() {
  const { form, form__bottom, form__upper_con, loading } = styles;

  const { editBookMutation, editAboutMePages } = useBookCreation();

  const dispatch = useDispatch();
  const [tipsPage, setTipsPage] = useState(false);
  const [journalPage, setJournalPage] = useState(false);
  const [isOpenAboutMeModal, setIsOpenAboutMeModal] = useState(false);
  const [isOpenTipsPageModal, setIsOpenTipsPageModal] = useState(false);
  const [isOpenJournalPageModal, setIsOpenJournalPageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = localStorage.getItem('token');

  const selectedTotalPages = useSelector((state) => state.productBatches.selectedTotalPages);
  const productCustomPages = useSelector((state) => state.productCustomPages);

  const aboutMeInputHandler = (_evt) => {
    setIsOpenAboutMeModal(true);
  };

  const tipsPageInputHandler = (_evt) => {
    setIsOpenTipsPageModal(true);
  };

  const journalPageInputHandler = (_evt) => {
    setIsOpenJournalPageModal(true);
  };

  // const addFooterInputHandler = (evt) => {
  //   setAddFooter(evt.target.checked);
  // };

  // const addPageNumbersInputHandler = (evt) => {
  //   setAddPageNumbers(evt.target.checked);
  // };

  const looksGoodInputHandler = async () => {
    await editAboutMePages();
    const nextProductKindItemId = { id: 3 };
    looksGoodProductKindActions(nextProductKindItemId);
  };

  const handleAboutMeModal = async (data) => {
    setIsLoading(true);
    const pageIds = productCustomPages.pages.map((x) => x.page);
    const updatePages = selectedTotalPages.filter((x) => !pageIds.includes(x.page));

    const media__photo =
      data.media__photo && data.media__photo instanceof Blob
        ? await convertFileToBase64(data.media__photo)
        : data.media__photo;
    const media__logo =
      data.media__logo && data.media__logo instanceof Blob
        ? await convertFileToBase64(data.media__logo)
        : data.media__logo;

    const ingredients = data.ingredients.map((x) => ({
      ...x,
      ingredient_data: {
        text__headline_a1: data.text__headline_a1,
        text__headline_a3: data.text__headline_a3,
        text__blurp_nolimit_a2: data.text__blurp_nolimit_a2,
        color__headline_a1: data.color__headline_a1,
        color__headline_a3: data.color__headline_a3,
        ...(media__photo && { media__photo }),
        ...(media__logo && { media__logo })
      }
    }));

    const pageIngredients = ingredients.map((x) => ({
      page_ingredient: x.id,
      ingredient_data: x.ingredient_data
    }));
    const res = await apiCall(
      'post',
      `/book-generator/pages/${data.page}/render-image/`,
      accessToken,
      { page_ingredients: pageIngredients }
    );

    const updatedSchema = {
      id: 0,
      order: updatePages.length + 1,
      page: data.page,
      ingredients,
      src: `data:image/png;base64,${res.data.image}`
    };
    const updated = [...updatePages, updatedSchema];
    setIsLoading(false);
    dispatch(productBatchesSliceActions.setSelectPages(updated));
    dispatch(productCustomPagesSliceActions.setAboutMeCheckbox(true));
  };

  const handleTipsPageModal = (data) => {
    console.log('return data of Tips Page modal=>', data);
    setTipsPage(true);
  };

  const handleJournalPageModal = (data) => {
    console.log('return data of Journal Page modal=>', data);
    setJournalPage(true);
  };

  // const footerValInputHandler = (evt) => {
  //   setFooterVal(evt.target.value);
  // };

  return (
    <div className={form}>
      {isLoading || editBookMutation.isLoading ? (
        <div className={loading}>
          <CircularProgress isLoading={isLoading || editBookMutation.isLoading} />
        </div>
      ) : (
        <div>
          <div className={form__upper_con}>
            <InputCheckboxImage
              id="aboutme"
              checked={productCustomPages.aboutMeCheckbox}
              onChange={aboutMeInputHandler}
              label="About Me"
              attachedImage={aboutMeImg}
            />
            <InputCheckboxImage
              id="tipspage"
              checked={tipsPage}
              onChange={tipsPageInputHandler}
              label="Tips Page"
              attachedImage={tipsPageImg}
            />
            <InputCheckboxImage
              id="journalpage"
              checked={journalPage}
              onChange={journalPageInputHandler}
              label="Journal Page"
              attachedImage={journalPageImg}
            />
          </div>
          {/* <div className={form__check}>
        <InputCheckbox
          id="addfooter"
          checked={addFooter}
          onChange={addFooterInputHandler}
          label="Add a Footer"
        />
        {addFooter && (
          <div className={form__check__add_footer}>
            <Input
              type="text"
              id={"addfootertext"}
              value={footerVal}
              onChange={footerValInputHandler}
              placeholder={"Footer Text"}
              disabled={!addFooter}
            />
          </div>
        )}
      </div>
      <div className={form__check}>
        <InputCheckbox
          id="addpagenumbers"
          checked={addPageNumbers}
          onChange={addPageNumbersInputHandler}
          label="Add Page Numbers"
        />
      </div> */}
          <div className={form__bottom}>
            <InputCheckboxCustom
              id="addcustompages"
              checked
              onChange={looksGoodInputHandler}
              label="Looks Good! NEXT"
            />
          </div>
          {isOpenAboutMeModal && (
            <AboutMeModal
              setIsOpenAboutMeModal={setIsOpenAboutMeModal}
              callback={handleAboutMeModal}
            />
          )}
          {isOpenTipsPageModal && (
            <TipsPageModal
              setIsOpenTipsPageModal={setIsOpenTipsPageModal}
              callback={handleTipsPageModal}
            />
          )}
          {isOpenJournalPageModal && (
            <JournalPageModal
              setIsOpenJournalPageModal={setIsOpenJournalPageModal}
              callback={handleJournalPageModal}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ProductAddPagesForm;
