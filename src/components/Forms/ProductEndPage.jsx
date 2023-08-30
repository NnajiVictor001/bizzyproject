import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputCheckboxCustom from 'components/InputFields/InputCheckboxCustom';
import { looksGoodProductKindActions } from 'helpers/looksGoodProductKindActions';
import { productBrandingSliceActions } from 'store/product-branding';
import { productBatchesSliceActions } from 'store/product-batches';
import { CircularProgress } from '@mui/material';
import { apiCall } from 'helpers/api-config';
import { useBookCreation } from 'hooks/bookCreation';
import ProductEndPageForm from './ProductEndPageForm';
import styles from '../../pages/admin/StaffPageForm.module.scss';

function ProductEndPage() {
  const accessToken = localStorage.getItem('token');
  const { form, form__container, form__bottom, loading } = styles;

  const { pagesPayload, editBookMutation } = useBookCreation();
  const editBookId = useSelector((state) => state.createdBook.editBookId);
  const selectedPage = useSelector((state) => state.productBranding.selectedPage);
  const defaultPalette = useSelector((state) => state.productBranding.defaultPalette);
  const selectedPallete = useSelector((state) => state.productBranding.selectedPallete);
  const baseColorsData = useSelector((state) => state.productBranding.baseColorsData);
  const selectedBaseColor = useSelector((state) => state.productBranding.selectedBaseColor);
  const selectedStyle = useSelector((state) => state.productBranding.selectedStyle);
  const selectedFont = useSelector((state) => state.productBranding.selectedFont);
  const selectedTotalPages = useSelector((state) => state.productBatches.selectedTotalPages);
  const customPageId = useSelector((state) => state.productCustomPages.customPageId);

  const dispatch = useDispatch();

  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedPage && selectedPage.ingredients) {
      setIngredients(selectedPage.ingredients);
    }
  }, [selectedPage]);

  const handleUpdatePage = async () => {
    const data = pagesPayload();
    return await editBookMutation.mutateAsync({
      bookId: editBookId,
      data
    });
  };

  const looksGoodInputHandler = async () => {
    const selectedTotalPagesLength = selectedTotalPages.length;
    const currentIndex = selectedTotalPages.findIndex((item) => item.id === selectedPage.id);

    if (currentIndex + 1 < selectedTotalPagesLength) {
      setIsLoading(true);
      const selectedPageData = selectedTotalPages[currentIndex + 1];
      const updatedIngredients = selectedPageData.ingredients.map((ingre_item) => {
        const tempColorArray =
          ingre_item?.variables && ingre_item?.variables.color ? ingre_item?.variables.color : [];
        let temp = ingre_item.ingredient_data;
        if (ingre_item.ingredient_data) {
          tempColorArray?.map((item) => {
            const colorkeyData = item.replace('color__', 'color_key__');
            temp = {
              ...temp,
              [item]: defaultPalette[ingre_item.ingredient_data[colorkeyData]]
            };
            return null;
          });
        }

        let filtered = temp;
        if (temp && temp.hasOwnProperty('margin')) {
          const { _margin, ...filteredTemp } = temp;
          filtered = filteredTemp;
        }
        return {
          page_ingredient: ingre_item.id,
          ingredient_data: filtered
        };
      });

      const data = {
        global_vars: {
          color_palette: {
            background_color1: selectedPallete.backgroundColors[0].value,
            background_color2: selectedPallete.backgroundColors[1].value,
            background_color3: selectedPallete.backgroundColors[2].value,
            background_color4: selectedPallete.backgroundColors[3].value,
            base_color1: baseColorsData[0].value,
            base_color2: baseColorsData[1].value,
            base_color3: baseColorsData[2].value,
            base_color4: baseColorsData[3].value,
            color1: selectedPallete.mainColors[0].value,
            color2: selectedPallete.mainColors[1].value,
            color3: selectedPallete.mainColors[2].value,
            color4: selectedPallete.mainColors[3].value,
            color5: selectedPallete.mainColors[4].value
          },
          base_color: selectedBaseColor.value,
          headline_style: selectedStyle.name,
          font: selectedFont.id
        },
        page_ingredients: updatedIngredients
      };

      const response = await apiCall(
        'post',
        `/book-generator/pages/${selectedPageData.page}/render-image/`,
        accessToken,
        data
      );
      if (response.status !== 200) throw new Error('Something went wrong.. Please try again');

      const updateResponse = await handleUpdatePage();
      if (updateResponse.status !== 200) {
        setIsLoading(false);
        throw new Error('Something went wrong.. Please try again');
      }

      const newImage = response.data.image;

      const updatedSelectedTotalPages = selectedTotalPages.map((page_item) => {
        if (page_item.id === selectedPageData.id) {
          return { ...page_item, src: `data:image/png;base64,${newImage}` };
        }
        return page_item;
      });
      const selectedItem = updatedSelectedTotalPages.filter(
        (item) => item.id === selectedPageData.id
      )[0];
      dispatch(productBatchesSliceActions.setSelectPages(updatedSelectedTotalPages));
      dispatch(
        productBrandingSliceActions.selectPage({
          ...selectedItem,
          isUpdate: false
        })
      );
      setIsLoading(false);
    } else {
      const nextProductKindItemId = { id: 2 };
      looksGoodProductKindActions(nextProductKindItemId);
    }
  };

  return (
    <div className={form}>
      {isLoading ? (
        <div className={loading}>
          <CircularProgress isLoading={isLoading} />
        </div>
      ) : (
        <div>
          <div className={form__container}>
            {selectedPage.page === customPageId ? (
              <h2>You can edit About me pages in &quot;Add Custom Pages&quot; Section.</h2>
            ) : (
              ingredients.map((item) => <ProductEndPageForm selectedData={item} key={item.id} />)
            )}
          </div>
          <div className={form__bottom}>
            <InputCheckboxCustom
              id="endthepage"
              checked
              onChange={looksGoodInputHandler}
              label="Looks Good! NEXT PAGE"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductEndPage;
