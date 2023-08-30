import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brandings: [
    {
      id: 1,
      title: 'PALETTE - 1',
      name: 'SPRING',
      selected: false,
      bars: [
        {
          id: 0,
          value: '#9ACC39',
          name: 'Color 1'
        },
        {
          id: 1,
          value: '#5CE1E6',
          name: 'Color 2'
        },
        {
          id: 2,
          value: '#FFA924',
          name: 'Color 3'
        },
        {
          id: 3,
          value: '#FFC601',
          name: 'Color 4'
        },
        {
          id: 4,
          value: '#1DAEB3',
          name: 'Color 5'
        }
      ],
      backgrounds: [
        {
          id: 0,
          value: '#EAF5F7',
          name: 'Background 1'
        },
        {
          id: 1,
          value: '#FEEEEF',
          name: 'Background 2'
        },
        {
          id: 2,
          value: '#F4F4F4',
          name: 'Background 3'
        }
      ]
    },
    {
      id: 2,
      title: 'PALETTE - 2',
      name: 'HALLOWEEN',
      selected: false,
      bars: [
        {
          id: 0,
          value: '#4B1A75',
          name: 'Color 1'
        },
        {
          id: 1,
          value: '#FF6D00',
          name: 'Color 2'
        },
        {
          id: 2,
          value: '#7B2BBE',
          name: 'Color 3'
        },
        {
          id: 3,
          value: '#FF9E01',
          name: 'Color 4'
        },
        {
          id: 4,
          value: '#A10021',
          name: 'Color 5'
        }
      ],
      backgrounds: [
        {
          id: 0,
          value: '#F6F0FA',
          name: 'Background 1'
        },
        {
          id: 1,
          value: '#FAF0EF',
          name: 'Background 2'
        },
        {
          id: 2,
          value: '#F4F4F4',
          name: 'Background 3'
        }
      ]
    },
    {
      id: 3,
      title: 'PALETTE - 3',
      name: 'PRIMARY',
      selected: false,
      bars: [
        {
          id: 0,
          value: '#3396FE',
          name: 'Color 1'
        },
        {
          id: 1,
          value: '#3DDD97',
          name: 'Color 2'
        },
        {
          id: 2,
          value: '#FF4A5D',
          name: 'Color 3'
        },
        {
          id: 3,
          value: '#98ECC8',
          name: 'Color 4'
        },
        {
          id: 4,
          value: '#002C5B',
          name: 'Color 5'
        }
      ],
      backgrounds: [
        {
          id: 0,
          value: '#ECF4FF',
          name: 'Background 1'
        },
        {
          id: 1,
          value: '#EEFCF5',
          name: 'Background 2'
        },
        {
          id: 2,
          value: '#F8F4F1',
          name: 'Background 3'
        }
      ]
    },
    {
      id: 4,
      title: 'PALETTE - 4',
      name: 'BLUE SKIES',
      selected: false,
      bars: [
        {
          id: 0,
          value: '#0A6197',
          name: 'Color 1'
        },
        {
          id: 1,
          value: '#2491D6',
          name: 'Color 2'
        },
        {
          id: 2,
          value: '#33B1FE',
          name: 'Color 3'
        },
        {
          id: 3,
          value: '#90D5FF',
          name: 'Color 4'
        },
        {
          id: 4,
          value: '#88B7D5',
          name: 'Color 5'
        }
      ],
      backgrounds: [
        {
          id: 0,
          value: '#EAF7FF',
          name: 'Background 1'
        },
        {
          id: 1,
          value: '#E9EEF2',
          name: 'Background 2'
        },
        {
          id: 2,
          value: '#F8F4F1',
          name: 'Background 3'
        }
      ]
    },
    {
      id: 5,
      title: 'PALETTE - 5',
      name: 'IMPACT',
      selected: false,
      bars: [
        {
          id: 0,
          value: '#C51718',
          name: 'Color 1'
        },
        {
          id: 1,
          value: '#343434',
          name: 'Color 2'
        },
        {
          id: 2,
          value: '#7A7A7A',
          name: 'Color 3'
        },
        {
          id: 3,
          value: '#CEC59E',
          name: 'Color 4'
        },
        {
          id: 4,
          value: '#88B7D5',
          name: 'Color 5'
        }
      ],
      backgrounds: [
        {
          id: 0,
          value: '#EAF7FF',
          name: 'Background 1'
        },
        {
          id: 1,
          value: '#E9EEF2',
          name: 'Background 2'
        },
        {
          id: 2,
          value: '#F8F4F1',
          name: 'Background 3'
        }
      ]
    },
    {
      id: 6,
      title: 'PALETTE - 6',
      name: 'AUTUMN',
      selected: false,
      bars: [
        {
          id: 0,
          value: '#598B8C',
          name: 'Color 1'
        },
        {
          id: 1,
          value: '#C9553E',
          name: 'Color 2'
        },
        {
          id: 2,
          value: '#F28F3A',
          name: 'Color 3'
        },
        {
          id: 3,
          value: '#FFD4C1',
          name: 'Color 4'
        },
        {
          id: 4,
          value: '#614F43',
          name: 'Color 5'
        }
      ],
      backgrounds: [
        {
          id: 0,
          value: '#E8FBFF',
          name: 'Background 1'
        },
        {
          id: 1,
          value: '#FEEEEF',
          name: 'Background 2'
        },
        {
          id: 2,
          value: '#F4F4F4',
          name: 'Background 3'
        }
      ]
    },
    {
      id: 7,
      title: 'PALETTE - 7',
      name: 'HAPPY',
      selected: false,
      bars: [
        {
          id: 0,
          value: '#FF99C8',
          name: 'Color 1'
        },
        {
          id: 1,
          value: '#ADE9C5',
          name: 'Color 2'
        },
        {
          id: 2,
          value: '#9AD5F3',
          name: 'Color 3'
        },
        {
          id: 3,
          value: '#F6DF8F',
          name: 'Color 4'
        },
        {
          id: 4,
          value: '#E3BDF8',
          name: 'Color 5'
        }
      ],
      backgrounds: [
        {
          id: 0,
          value: '#FFEBF4',
          name: 'Background 1'
        },
        {
          id: 1,
          value: '#FBF5DB',
          name: 'Background 2'
        },
        {
          id: 2,
          value: '#D9F1FD',
          name: 'Background 3'
        }
      ]
    },
    {
      id: 8,
      title: 'PALETTE - 8',
      name: 'COLLEGIATE',
      selected: false,
      bars: [
        {
          id: 0,
          value: '#062D88',
          name: 'Color 1'
        },
        {
          id: 1,
          value: '#3E63BB',
          name: 'Color 2'
        },
        {
          id: 2,
          value: '#819DCD',
          name: 'Color 3'
        },
        {
          id: 3,
          value: '#C1D7FF',
          name: 'Color 4'
        },
        {
          id: 4,
          value: '#F93944',
          name: 'Color 5'
        }
      ],
      backgrounds: [
        {
          id: 0,
          value: '#E9EAEC',
          name: 'Background 1'
        },
        {
          id: 1,
          value: '#F0DCDD',
          name: 'Background 2'
        },
        {
          id: 2,
          value: '#E0F0FF',
          name: 'Background 3'
        }
      ]
    }
  ]
};

const brandingStateSlice = createSlice({
  name: 'brandingState',
  initialState,
  reducers: {
    select(state, action) {
      state.brandings.map((b) => {
        if (b.id === action.payload.id) {
          b.selected = !b.selected;
        } else {
          b.selected = false;
        }
        return null;
      });
    },
    add(state, action) {
      const number = state.brandings.length + 1;
      const tempBranding = {
        id: number,
        title: `PALETTE - ${number}`,
        name: `CUSTOM - ${number}`,
        bars: action.payload,
        backgrounds: [
          {
            id: 0,
            value: '#EAF7FF',
            name: 'Background 1'
          },
          {
            id: 1,
            value: '#E9EEF2',
            name: 'Background 2'
          },
          {
            id: 2,
            value: '#F8F4F1',
            name: 'Background 3'
          }
        ],
        selected: false
      };
      state.brandings = [...state.brandings, tempBranding];
    }
  }
});

export default brandingStateSlice;

export const brandingStateSliceActions = brandingStateSlice.actions;
