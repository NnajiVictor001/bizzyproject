import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  switchToYear: false,
  selectedPlan: false,
  filledUserData: false,
  plan: {
    apiTitle: 'bizzy_free',
    title: 'Free',
    monthCost: 0,
    yearCost: 0,
    selectedCost: 0,
    content:
      'The perfect way to start your journey with Bizzy.  You can create and brand your first product.  Download and SELL!!',
    features: [
      'Design Your Project',
      'Access to over 25 PDF Batches',
      'Fully Editable Templates',
      'All Products Branded to YOU!!',
      'Commercial Resell Rights'
    ],
    appearance: null,
    productsCreated: 0,
    allowedProducts: 1
  },
  plans: [
    {
      apiTitle: 'bizzy_free',
      title: 'Free',
      monthCost: 0,
      yearCost: 0,
      selectedCost: 0,
      content:
        'The perfect way to start your journey with Bizzy.  You can create and brand your first product.  Download and SELL!!',
      features: [
        'Design Your Project',
        'Access to over 25 PDF Batches',
        'Fully Editable Templates',
        'All Products Branded to YOU!!',
        'Commercial Resell Rights'
      ],
      appearance: null,
      productsCreated: 0,
      allowedProducts: 1
    },
    {
      apiTitle: 'bizzy_starter',
      title: 'The Starter',
      monthCost: 27,
      yearCost: 127,
      selectedCost: 27,
      content:
        'All of the features in our free version - AND we will even build and host your sales assetsFOR YOU!!  ',
      features: [
        'Full Library with 100+ Pages',
        'Ability to Add Video Elements',
        'Unlimited Edits',
        'Unlimited Pages & Products',
        'Brand Kit for Social Promotion',
        '5 Sales Pages Written For You',
        'Hosting of Your Product Website'
      ],
      appearance: null,
      productsCreated: 0,
      allowedProducts: 5
    },
    {
      apiTitle: 'bizzy_business',
      title: 'Business',
      monthCost: 47,
      yearCost: 147,
      selectedCost: 47,
      content:
        'For the big businesses with enterprise-level needs. This is for companies who want access to support and trainings for growth.',
      features: [
        'Unlimited Products',
        'Unlimited Sales Pages',
        'Priority Support',
        'Ability to Publish  with POD',
        'Create Fillable PDF Products'
      ],
      appearance: 'black',
      productsCreated: 0,
      allowedProducts: 1000000
    }
  ]
};

const pricingPlanSlice = createSlice({
  name: 'pricingPlan',
  initialState,
  reducers: {
    select(state, action) {
      state.plan = state.plans.find((p) => p.title === action.payload);
    },
    changeSelectedPrice(state) {
      state.switchToYear = !state.switchToYear;
      state.plans.map((p) => {
        if (p.selectedCost === p.monthCost) {
          p.selectedCost = p.yearCost;
        } else {
          p.selectedCost = p.monthCost;
        }
        return null;
      });
    },
    selectPlan(state) {
      state.selectedPlan = true;
    },
    fillUserData(state) {
      state.filledUserData = true;
    },
    addProductsCreated(state) {
      state.plan.productsCreated += 1;
    }
  }
});

export default pricingPlanSlice;

export const pricingPlanActions = pricingPlanSlice.actions;
