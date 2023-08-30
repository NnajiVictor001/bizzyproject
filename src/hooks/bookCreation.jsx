import { createdBookSliceActions } from 'store/created-book';
import { productBatchesSliceActions } from 'store/product-batches';
import { productCustomPagesSliceActions } from 'store/product-custom-pages';
import { productTypeSliceActions } from 'store/product-type';
import { productBrandingSliceActions } from 'store/product-branding';
import { saleNichesTopicsSliceActions } from 'store/sale-niche-topic';
import { useDispatch, useSelector } from 'react-redux';
import ApiService from 'helpers/api';
import { randomItem } from 'helpers/utils';
import { useMutation } from 'react-query';
import { convertColorsToPallete } from 'helpers/pallete';
import { baseMediaEndpoint } from 'helpers/api-config';
import { convertBase64ToFile } from 'helpers/image';
import { useState } from 'react';
import { typeList } from 'constants/typeList';
import { useAlert } from 'hooks/alert';
import { useRenderImage } from './renderImage';

export const useBookCreation = () => {
  const entityId = localStorage.getItem('entityId');

  const dispatch = useDispatch();
  const { addAlert } = useAlert();
  const { renderImage } = useRenderImage();

  const [isLoading, setIsLoading] = useState(false);

  const selectedBatches = useSelector((state) => state.productBatches.selectedBatches);
  const selectedStyle = useSelector((state) => state.productBranding.selectedStyle);
  const selectedProductType = useSelector((state) => state.productType.selectedProductType);
  const selectedPallete = useSelector((state) => state.productBranding.selectedPallete);
  const systemPalettes = useSelector((state) => state.productBranding.systemPalettes);
  const baseColorsData = useSelector((state) => state.productBranding.baseColorsData);
  const selectedBaseColor = useSelector((state) => state.productBranding.selectedBaseColor);
  const selectedFont = useSelector((state) => state.productBranding.selectedFont);
  const selectedTotalPages = useSelector((state) => state.productBatches.selectedTotalPages);
  const productName = useSelector((state) => state.productBranding.productName);
  const productSubTitle = useSelector((state) => state.productBranding.productSubTitle);
  const stylesData = useSelector((state) => state.productBranding.stylesData);
  const productTypes = useSelector((state) => state.productType.productTypes);
  const selectedCover = useSelector((state) => state.productBranding.selectedCover);
  const editBookId = useSelector((state) => state.createdBook.editBookId);
  const productCustomPages = useSelector((state) => state.productCustomPages);

  const defaultBookValues = async () => {
    const [userPalettesResponse, palettesResponse, fontsResponse, coversResponse, mockupsResponse] =
      await Promise.all([
        ApiService.get('/bizzy/user-color-palettes/'),
        ApiService.get('/bizzy/color-palettes/'),
        ApiService.get('/bizzy/fonts/'),
        ApiService.get('/book-generator/pages/?type=cover'),
        ApiService.get('/book-generator/book-mockups/')
      ]);
    if (
      userPalettesResponse.status !== 200 ||
      palettesResponse.status !== 200 ||
      fontsResponse.status !== 200 ||
      coversResponse.status !== 200 ||
      mockupsResponse.status !== 200
    ) {
      throw new Error('Something went wrong.. Please try again');
    }

    // Get All Pages from Batches
    const selectedPages = selectedBatches
      .map((batch) => batch.pages.map((item) => item.page))
      .reduce((pre, cur) => pre.concat(cur));

    // Get Palette Data
    const paletteResults = palettesResponse.data.results?.sort(
      (a, b) => b.is_default - a.is_default
    );
    const userPaletteResults = userPalettesResponse.data.results;
    const mergedPaletteResults = [
      ...(userPaletteResults?.[0] ? [userPaletteResults[0]] : []),
      ...paletteResults,
      ...userPaletteResults?.slice(1)
    ];

    const defaultPalette = mergedPaletteResults?.[0];
    const palette = convertColorsToPallete(defaultPalette);
    const palettes = mergedPaletteResults.map((item) => convertColorsToPallete(item));
    dispatch(productBrandingSliceActions.setSystemPalettes(paletteResults));
    dispatch(productBrandingSliceActions.setSelectedPaletteArr(mergedPaletteResults));
    dispatch(productBrandingSliceActions.setDefaultPalette(defaultPalette));
    dispatch(productBrandingSliceActions.setBaseColorsData(palette.baseColors));
    dispatch(productBrandingSliceActions.selectColorPallete(palette));
    dispatch(productBrandingSliceActions.setPalleteData(palettes));
    dispatch(
      productBrandingSliceActions.selectBaseColor({
        id: 0,
        value: defaultPalette.base_color4
      })
    );

    // Get Font Data
    const fontResults = fontsResponse.data.results;
    const defaultFont = fontResults[0];
    dispatch(productBrandingSliceActions.setFontsData(fontResults));
    dispatch(productBrandingSliceActions.selectFont(defaultFont));

    // Get Mockup Data
    const mockupResults = mockupsResponse.data.results;
    const defaultMockup = mockupResults[0];
    dispatch(productBrandingSliceActions.setMockupsData(mockupResults));
    dispatch(productBrandingSliceActions.selectMockup(defaultMockup));

    // Get Title and Subtitle from Batch Pages
    const titles = selectedPages
      .filter((page) => page.name)
      .map((page) => {
        if (page.name.split(' ').length > 1) {
          return page.name.substring(0, page.name.lastIndexOf(' '));
        }
        return page.name;
      });
    const title = randomItem(titles);
    const subtitles = selectedPages
      .map((subTitle) => subTitle.wording.promise)
      .filter((subTitle) => subTitle);
    const subtitle = randomItem(subtitles);
    const type = randomItem(typeList[selectedProductType?.name || 0]);
    dispatch(productBrandingSliceActions.setTitleGenerator(title));
    dispatch(productBrandingSliceActions.setProductName(`${title} ${type}`));
    dispatch(productBrandingSliceActions.setProductSubTitle(subtitle));
    dispatch(productBrandingSliceActions.setTypeValue(type));

    // Get Cover Data
    const coverResults = coversResponse.data.results?.filter((item) => item.is_active === true);
    const defaultCover = coverResults[0];
    const imagesResponse = await Promise.all(
      coverResults.map((item) =>
        renderImage(item.id, [], true, {
          title,
          subtitle,
          color_palette: defaultPalette,
          font: defaultFont.id,
          base_color: defaultPalette.base_color4
        })
      )
    );
    const updatedCoversData = coverResults.map((item, index) => ({
      ...item,
      image_preview: `data:image/png;base64,${imagesResponse[index].data.image}`
    }));
    dispatch(productBrandingSliceActions.setCoversData(updatedCoversData));
    dispatch(productBrandingSliceActions.selectCover(defaultCover));

    // Get Default Pages from Batches
    const defaultPages = selectedPages.map((page, index) => {
      const ingredients = page.ingredients.map((ingredient) => ({
        page_ingredient: ingredient.id,
        ingredient_data: ingredient.ingredient_data
      }));
      return {
        page: page.id,
        system_id: page.system_id,
        order: index,
        ingredients
      };
    });

    return {
      defaultCover,
      defaultMockup,
      defaultPalette,
      defaultFont,
      defaultPages,
      defaultTitle: title,
      defaultSubTitle: subtitle,
      defaultType: type
    };
  };

  const createBook = async () => {
    const {
      defaultPalette,
      defaultCover,
      defaultMockup,
      defaultFont,
      defaultPages,
      defaultTitle,
      defaultSubTitle,
      defaultType
    } = await defaultBookValues();

    const defaultPalettePayload = {
      ...defaultPalette,
      palette_id: defaultPalette.id
    };
    const selectedBatchIds = selectedBatches.map((item) => ({
      batch: item.id
    }));

    const data = {
      batches: selectedBatchIds,
      cover: defaultCover.id,
      mockup: defaultMockup.id,
      name: `${defaultTitle} ${defaultType}`,
      options: {
        color_palette: defaultPalettePayload,
        base_color: defaultPalettePayload.base_color4,
        headline_style: selectedStyle.name,
        font: defaultFont.id,
        subtitle: defaultSubTitle
      },
      owner_entity: entityId,
      pages: defaultPages,
      type: selectedProductType?.name.toLowerCase(),
      cover_image_preview: defaultCover.image_preview
    };

    const bookResponse = await ApiService.post('/book-generator/books/', data);
    const previewResponse = await ApiService.post(
      `/book-generator/books/${bookResponse.data.id}/update_book_previews/`
    );
    if (bookResponse.status !== 201 || previewResponse.status !== 201) {
      throw new Error('Something went wrong.. Please try again');
    }

    dispatch(createdBookSliceActions.setEditBookId(bookResponse?.data?.id));

    return bookResponse.data;
  };

  const updatePreviews = async (bookId) => {
    setIsLoading(true);
    await ApiService.post(`/book-generator/books/${bookId}/update_book_previews/`);
    setIsLoading(false);
  };

  const editBookMutation = useMutation({
    mutationFn: (params) => ApiService.patch(`/book-generator/books/${params.bookId}/`, params.data)
  });

  const pagesPayload = () => {
    const pages = selectedTotalPages.map((page, index) => {
      const ingredients = page.ingredients.map((ingredient) => ({
        page_ingredient: ingredient.id,
        ingredient_data: ingredient.ingredient_data
      }));
      return {
        id: page.id,
        page: page.page,
        order: index,
        ingredients
      };
    });
    return {
      pages
    };
  };

  const editAboutMePages = async () => {
    const data = pagesPayload();
    const customPagesResponse = await editBookMutation.mutateAsync({
      bookId: editBookId,
      data
    });
    if (customPagesResponse.status !== 200) {
      throw new Error('Something went wrong...');
    }
    const customPage = customPagesResponse.data.pages.at(-1);
    const updatedPages = selectedTotalPages.map((x) => {
      if (x.page === customPage.page) {
        return {
          ...x,
          id: customPage.id
        };
      }
      return x;
    });

    if (productCustomPages.media__photo) {
      const formData = new FormData();
      formData.append('name', 'media__photo');
      if (productCustomPages.media__photo instanceof File) {
        formData.append('file', productCustomPages.media__photo);
      } else {
        const file = await convertBase64ToFile(productCustomPages.media__photo, 'media_data.png');
        formData.append('file', file);
      }
      await ApiService.post(`/book-generator/books/${editBookId}/book_media/`, formData);
    }
    dispatch(productBatchesSliceActions.setSelectPages(updatedPages));
  };

  const editTitleAndCover = async () => {
    if (!productName) {
      addAlert('Please Fill Out Title Field');
      return;
    }
    if (!productSubTitle) {
      addAlert('Please Fill Out Sub Title Field');
      return;
    }
    const updateCover = async () => {
      const response = await renderImage(selectedCover.id, [], true, {
        title: productName,
        subtitle: productSubTitle,
        base_color: selectedBaseColor.value
      });

      dispatch(
        productBrandingSliceActions.selectCover({
          ...selectedCover,
          image_preview: `data:image/png;base64,${response.data.image}`
        })
      );
    };
    const data = {
      name: productName,
      options: {
        subtitle: productSubTitle
      },
      cover: selectedCover.id
    };
    await editBookMutation.mutateAsync(
      {
        bookId: editBookId,
        data
      },
      {
        onSuccess: () => {
          updateCover();
        }
      }
    );
  };

  const brandingPayload = async () => {
    setIsLoading(true);
    const isSystemPaletteSelected = systemPalettes.find(
      (palette) => palette.id === selectedPallete.id && palette.name === selectedPallete.name
    );
    if (!isSystemPaletteSelected) {
      await ApiService.put(`/bizzy/user-color-palettes/${selectedPallete.id}/update-last-used/`);
    }
    const options = {
      options: {
        color_palette: {
          palette_id: selectedPallete.id,
          name: selectedPallete.name,
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
      }
    };
    setIsLoading(false);
    return options;
  };

  const deletePagePayload = (selectedPage) => {
    const pages = selectedTotalPages
      .filter((page) => selectedPage.id !== page.id)
      .map((page, index) => {
        const ingredients = page.ingredients.map((ingredient) => ({
          page_ingredient: ingredient.id,
          ingredient_data: ingredient.ingredient_data
        }));
        return {
          id: page.id,
          page: page.page,
          order: index,
          ingredients
        };
      });
    return {
      pages
    };
  };

  const duplicatePagePayload = (selectedPage) => {
    const duplicatedPage = selectedTotalPages.find((page) => page.id === selectedPage.id);
    const copiedDuplicatedPage = { ...duplicatedPage };
    delete copiedDuplicatedPage.id;

    const duplicatedPageIndex =
      selectedTotalPages.findIndex((page) => page.id === selectedPage.id) + 1;

    const updatedPages = [
      ...selectedTotalPages.slice(0, duplicatedPageIndex),
      { ...copiedDuplicatedPage },
      ...selectedTotalPages.slice(duplicatedPageIndex)
    ];

    const pages = updatedPages.map((page, index) => {
      const ingredients = page.ingredients.map((ingredient) => ({
        page_ingredient: ingredient.id,
        ingredient_data: ingredient.ingredient_data
      }));
      return {
        id: page.id,
        page: page.page,
        order: index,
        ingredients
      };
    });

    return {
      pages
    };
  };

  const orderPreviewPagesPaylaod = (pages) => {
    const reorderedPages = pages.map((page, index) => {
      const ingredients = page.ingredients.map((ingredient) => ({
        page_ingredient: ingredient.id,
        ingredient_data: ingredient.ingredient_data
      }));
      return {
        id: page.id,
        page: page.page,
        order: index,
        ingredients
      };
    });
    return {
      pages: reorderedPages
    };
  };

  const loadBook = async (bookId) => {
    setIsLoading(true);
    const [
      bookResponse,
      palettesResponse,
      fontsResponse,
      coversResponse,
      mockupsResponse,
      bookMediaResponse,
      aboutMePagesResponse,
      userPalettesResponse
    ] = await Promise.all([
      ApiService.get(`/book-generator/books/${bookId}/`),
      ApiService.get('/bizzy/color-palettes/'),
      ApiService.get('/bizzy/fonts/'),
      ApiService.get('/book-generator/pages/?type=cover'),
      ApiService.get('/book-generator/book-mockups/'),
      ApiService.get(`/book-generator/books/${bookId}/book_media/`),
      ApiService.get('/book-generator/pages/?type=about_me'),
      ApiService.get('/bizzy/user-color-palettes/')
    ]);
    if (
      palettesResponse.status !== 200 ||
      fontsResponse.status !== 200 ||
      coversResponse.status !== 200 ||
      mockupsResponse.status !== 200 ||
      userPalettesResponse.status !== 200
    ) {
      throw new Error('Something went wrong.. Please try again');
    }
    const book = bookResponse.data;

    // Set Pallete Data
    const paletteResults = palettesResponse.data.results?.sort(
      (a, b) => b.is_default - a.is_default
    );
    const userPaletteResults = userPalettesResponse.data.results;
    const mergedPaletteResults = [
      ...(userPaletteResults?.[0] ? [userPaletteResults[0]] : []),
      ...paletteResults,
      ...userPaletteResults?.slice(1)
    ];

    const defaultPalette = mergedPaletteResults.find(
      (palette) =>
        palette.id === book.options.color_palette.palette_id &&
        palette.name === book.options.color_palette.name
    );
    const palette = convertColorsToPallete(defaultPalette);
    const palettes = mergedPaletteResults.map((item) => convertColorsToPallete(item));
    const baseColor = palette.baseColors.find((item) => item.value === book.options.base_color);
    dispatch(productBrandingSliceActions.setSystemPalettes(paletteResults));
    dispatch(productBrandingSliceActions.setSelectedPaletteArr(mergedPaletteResults));
    dispatch(productBrandingSliceActions.setDefaultPalette(defaultPalette));
    dispatch(productBrandingSliceActions.setBaseColorsData(palette.baseColors));
    dispatch(productBrandingSliceActions.selectColorPallete(palette));
    dispatch(productBrandingSliceActions.setPalleteData(palettes));
    dispatch(productBrandingSliceActions.selectBaseColor(baseColor));

    // Set Font Data
    const fontResults = fontsResponse.data.results;
    const defaultFont = fontResults.find((font) => font.id === book.options.font);
    dispatch(productBrandingSliceActions.setFontsData(fontResults));
    dispatch(productBrandingSliceActions.selectFont(defaultFont));

    // Set Style Data
    const defaultStyle = stylesData.find((style) => style.name === book.options.headline_style);
    dispatch(productBrandingSliceActions.selectStyle(defaultStyle));

    // Set Mockup Data
    const mockupResults = mockupsResponse.data.results;
    const defaultMockup = mockupResults.find((mockup) => mockup.id === book.mockup.id);
    dispatch(productBrandingSliceActions.setMockupsData(mockupResults));
    dispatch(productBrandingSliceActions.selectMockup(defaultMockup));

    // Set Cover Data
    const coverResults = coversResponse.data.results?.filter((item) => item.is_active === true);
    const defaultCover = coverResults.find((cover) => cover.id === book.cover);
    const imagesResponse = await Promise.all(
      coverResults.map((item) =>
        renderImage(item.id, [], true, {
          title: book.name,
          subtitle: book.options.subtitle,
          color_palette: defaultPalette,
          font: defaultFont.id,
          base_color: defaultPalette.base_color4
        })
      )
    );
    const updatedCoversData = coverResults.map((item, index) => ({
      ...item,
      image_preview: `data:image/png;base64,${imagesResponse[index].data.image}`
    }));
    dispatch(productBrandingSliceActions.setCoversData(updatedCoversData));
    dispatch(productBrandingSliceActions.selectCover(defaultCover));

    // Set Book Data
    const productType = productTypes.find(
      (type) => type.name.toLowerCase() === book.type.toLowerCase()
    );
    dispatch(createdBookSliceActions.setEditBookId(book.id));
    dispatch(createdBookSliceActions.setCreatedBook(book));
    dispatch(productTypeSliceActions.select(productType));

    // Set Title and Subtitle
    const type = typeList[productType.name].find((x) => book.name.includes(x)) || '';
    const title = book.name.replace(type, '').trim();
    dispatch(productBrandingSliceActions.setTitleGenerator(title));
    dispatch(productBrandingSliceActions.setProductName(book.name));
    dispatch(productBrandingSliceActions.setProductSubTitle(book.options.subtitle));
    dispatch(productBrandingSliceActions.setTypeValue(type));

    // Set Pages Data
    const defaultPages = book.pages.map((page) => {
      const defaultIngredients = page.page.ingredients;
      const ingredients = page.ingredients.map((ingredient, index) => ({
        // Spread metadata and variables from base page ingredient
        ...defaultIngredients[index],
        // Spread Actual Page Ingredient Data
        ...ingredient,
        id: ingredient.page_ingredient,
        page: ingredient.book_page,
        ingredient: ingredient.id
      }));
      return {
        ...page,
        page: page.page.id,
        system_id: page.page.system_id,
        src: page.image_preview,
        ingredients
      };
    });
    const sortedDefaultPages = defaultPages.sort((a, b) => a.order - b.order);
    dispatch(productBatchesSliceActions.setSelectPages(sortedDefaultPages));

    // Set Custom Pages Data

    const aboutMePagesResults = aboutMePagesResponse.data.results;
    const aboutMePageIds = aboutMePagesResults.map((x) => x.id);
    const aboutMePage = defaultPages.find((x) => aboutMePageIds.includes(x.page));

    if (aboutMePage) {
      const mediaPhoto = bookMediaResponse.data.find((x) => x.name === 'media__photo');
      const media__photo = mediaPhoto && `${baseMediaEndpoint}${mediaPhoto.file}`;

      const activeIngredientData = aboutMePage.ingredients[0].ingredient_data;
      const aboutMeImages = aboutMePagesResults.map((x) => ({
        id: x.id,
        ingredients: x.ingredients.map((ingredient) => ({
          ...ingredient,
          ...(media__photo && {
            ingredient_data: {
              ...ingredient.ingredient_data,
              media__photo,
              text__blurp_nolimit_a2: activeIngredientData.text__blurp_nolimit_a2,
              text__headline_a1: activeIngredientData.text__headline_a1,
              text__headline_a3: activeIngredientData.text__headline_a3,
              color__headline_a1: activeIngredientData.color__headline_a1 || '#000000',
              color__headline_a3: activeIngredientData.color__headline_a3 || '#000000'
            }
          }),
          page_ingredient: ingredient.id
        }))
      }));
      const pageImagesResponse = await Promise.all(
        aboutMeImages.map((item) => renderImage(item.id, item.ingredients))
      );
      const pageImages = pageImagesResponse.map((x) => `data:image/png;base64,${x.data.image}`);
      const pagesData = aboutMePagesResults.map((x, index) => ({
        page: x.id,
        image_preview: pageImages[index],
        ingredients: x.ingredients
      }));
      const activeImage = pagesData.find((x) => x.page === aboutMePage.page)?.image_preview;

      const schema = {
        page: aboutMePage.page,
        ingredients: aboutMePage.ingredients,
        variables: aboutMePage.ingredients[0].variables,
        image_preview: activeImage,
        text__blurp_nolimit_a2: activeIngredientData.text__blurp_nolimit_a2,
        text__headline_a1: activeIngredientData.text__headline_a1,
        text__headline_a3: activeIngredientData.text__headline_a3,
        active: true,
        color__headline_a1: activeIngredientData.color__headline_a1 || '#000000',
        color__headline_a3: activeIngredientData.color__headline_a3 || '#000000',
        addPhoto: !!media__photo,
        addLogo: false,
        media__photo,
        media__logo: null,
        pages: pagesData,
        initialLoad: true,
        aboutMeCheckbox: true
      };
      dispatch(productCustomPagesSliceActions.setCustomPagesData(schema));
    }

    setIsLoading(false);
    return bookResponse;
  };

  const resetBookCreationData = () => {
    dispatch(createdBookSliceActions.setInitialState());
    dispatch(productTypeSliceActions.setInitialState());
    dispatch(productCustomPagesSliceActions.setInitialState());
    dispatch(productBrandingSliceActions.setInitialState());
    dispatch(productBatchesSliceActions.setInitialState());
    dispatch(saleNichesTopicsSliceActions.setInitialState());
  };

  return {
    // Actions
    createBook,
    editAboutMePages,
    editTitleAndCover,
    editBookMutation,
    loadBook,
    resetBookCreationData,

    // Payloads
    brandingPayload,
    pagesPayload,
    deletePagePayload,
    duplicatePagePayload,
    orderPreviewPagesPaylaod,

    // Functions
    updatePreviews,
    isLoading,
    setIsLoading
  };
};
