import ApiService from 'helpers/api';
import { useSelector } from 'react-redux';

export const useRenderImage = () => {
  const baseColorsData = useSelector((state) => state.productBranding.baseColorsData);
  const selectedStyle = useSelector((state) => state.productBranding.selectedStyle);
  const selectedFont = useSelector((state) => state.productBranding.selectedFont);

  const selectedBaseColor = useSelector((state) => state.productBranding.selectedBaseColor);
  const selectedPallete = useSelector((state) => state.productBranding.selectedPallete);

  const renderImage = async (
    pageId,
    ingerdientData,
    includeGlobalVars = true,
    extendGlobalVars = {}
  ) => {
    const globalVars = {
      color_palette: {
        background_color1: selectedPallete.backgroundColors?.[0]?.value,
        background_color2: selectedPallete.backgroundColors?.[1]?.value,
        background_color3: selectedPallete.backgroundColors?.[2]?.value,
        background_color4: selectedPallete.backgroundColors?.[3]?.value,
        base_color1: baseColorsData?.[0]?.value,
        base_color2: baseColorsData?.[1]?.value,
        base_color3: baseColorsData?.[2]?.value,
        base_color4: baseColorsData?.[3]?.value,
        color1: selectedPallete.mainColors?.[0]?.value,
        color2: selectedPallete.mainColors?.[1]?.value,
        color3: selectedPallete.mainColors?.[2]?.value,
        color4: selectedPallete.mainColors?.[3]?.value,
        color5: selectedPallete.mainColors?.[4]?.value
      },
      base_color: selectedBaseColor.value,
      headline_style: selectedStyle.name,
      font: selectedFont.id
    };
    const data = {
      ...(includeGlobalVars && {
        global_vars: { ...globalVars, ...extendGlobalVars }
      }),
      page_ingredients: ingerdientData
    };
    return await ApiService.post(`/book-generator/pages/${pageId}/render-image/`, data, {
      'axios-retry': {
        retries: 3
      }
    });
  };

  return { renderImage };
};
