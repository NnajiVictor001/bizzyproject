export const convertColorsToPallete = (colors) => ({
  id: colors.palette_id || colors.id,
  name: colors.name,
  mainColors: [
    {
      id: 0,
      value: colors.color1,
      name: 'Color 1'
    },
    {
      id: 1,
      value: colors.color2,
      name: 'Color 2'
    },
    {
      id: 2,
      value: colors.color3,
      name: 'Color 3'
    },
    {
      id: 3,
      value: colors.color4,
      name: 'Color 4'
    },
    {
      id: 4,
      value: colors.color5,
      name: 'Color 5'
    }
  ],
  backgroundColors: [
    {
      id: 0,
      value: colors.background_color1,
      name: 'Background Color 1'
    },
    {
      id: 1,
      value: colors.background_color2,
      name: 'Background Color 2'
    },
    {
      id: 2,
      value: colors.background_color3,
      name: 'Background Color 3'
    },
    {
      id: 3,
      value: colors.background_color4,
      name: 'Background Color 4'
    }
  ],
  baseColors: [
    {
      id: 0,
      value: colors.base_color1,
      name: 'Base Color 1'
    },
    {
      id: 1,
      value: colors.base_color2,
      name: 'Base Color 2'
    },
    {
      id: 2,
      value: colors.base_color3,
      name: 'Base Color 3'
    },
    {
      id: 3,
      value: colors.base_color4,
      name: 'Base Color 4'
    }
  ]
});
