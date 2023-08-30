import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coreSubNiche: null,
  numberOfSelectedSubNiches: 0,
  maxNumberOfSubNiches: 3,
  selectedCoreNiche: null,
  selectedSubNiches: [],
  totalSubNiches: [
    { id: 17, name: 'All', slug: 'all' },
    { id: 12, name: 'Business', slug: 'business' },
    { id: 19, name: 'Family', slug: 'family' },
    { id: 13, name: 'Food', slug: 'food' },
    { id: 11, name: 'Health & Fitness', slug: 'health-fitness' },
    { id: 10, name: 'Life', slug: 'life' },
    { id: 14, name: 'Organization', slug: 'organization' },
    { id: 16, name: 'Other', slug: 'other' },
    { id: 15, name: 'Productivity', slug: 'productivity' }
  ],
  totalTopics: [
    { id: 88, name: '90 Day Planner', slug: 'TOPIC_90Days' },
    { id: 75, name: 'Budgeting & Personal Finance', slug: 'TOPIC_Budgeting' },
    { id: 90, name: 'Business', slug: 'TOPIC_Business' },
    { id: 69, name: 'Calendar & Planning', slug: 'TOPIC_Calendar' },
    { id: 79, name: 'Cleaning & Decluttering', slug: 'TOPIC_Cleaning' },
    {
      id: 59,
      name: 'Digital Products & Courses',
      slug: 'TOPIC_CourseCreation'
    },
    { id: 66, name: 'Faith & Devotions', slug: 'TOPIC_Faith' },
    { id: 68, name: 'Fitness', slug: 'TOPIC_Fitness' },
    { id: 72, name: 'Food & Meal Planning', slug: 'TOPIC_Food' },
    { id: 74, name: 'Goal Setting', slug: 'TOPIC_Goals' },
    { id: 62, name: 'Habit Builder', slug: 'TOPIC_Habits' },
    { id: 70, name: 'Healthy Living', slug: 'TOPIC_Health' },
    { id: 58, name: 'Home & Family', slug: 'TOPIC_Home' },
    { id: 80, name: 'Kids Activities', slug: 'TOPIC_Kids' },
    { id: 76, name: 'Marketing & Sales', slug: 'TOPIC_Marketing' },
    { id: 71, name: 'Mental Health & Wellness', slug: 'TOPIC_MentalHealth' },
    { id: 63, name: 'Mindset', slug: 'TOPIC_Mindset' },
    { id: 87, name: 'Monthly Planner', slug: 'TOPIC_Month' },
    { id: 60, name: 'Organization', slug: 'TOPIC_Organization' },
    { id: 91, name: 'Pets', slug: 'TOPIC_Pets' },
    { id: 77, name: 'Product & Inventory', slug: 'TOPIC_ProductInventory' },
    { id: 65, name: 'Project Management', slug: 'TOPIC_ProjectManagement' },
    { id: 81, name: 'School & Learning', slug: 'TOPIC_School' },
    { id: 61, name: 'Time Blocking Schedules', slug: 'TOPIC_TimeBlocking' },
    { id: 64, name: 'Travel', slug: 'TOPIC_Travel' },
    { id: 86, name: 'Weekly Planner', slug: 'TOPIC_Week' },
    { id: 67, name: 'Weight Loss', slug: 'TOPIC_WeightLoss' },
    { id: 89, name: 'Yearly Calendar', slug: 'TOPIC_Year' }
  ],
  totalSelectedSubNichesIds: [],
  totalSelectedTopicsIds: [],
  mainNiches: [
    {
      id: 0,
      active: false,
      title: 'Life Organization',
      subNiches: [
        {
          id: 0,
          title: 'Organization',
          topicTags: ['TOPIC_Organization'],
          nicheTags: ['NICHE_Organization', 'NICHE_Life'],
          selected: false
        },
        {
          id: 1,
          title: 'Goal Setting',
          topicTags: ['TOPIC_Goals', 'TOPIC_Mindset', 'TOPIC_MentalHealth'],
          nicheTags: ['NICHE_Productivity', 'NICHE_Life'],
          selected: false
        },
        {
          id: 2,
          title: 'Calendar & Productivity',
          topicTags: ['TOPIC_Calendar', 'TOPIC_TimeBlocking'],
          nicheTags: ['NICHE_Life', 'NICHE_Productivity'],
          selected: false
        },
        {
          id: 3,
          title: 'Managing Schedules',
          topicTags: ['TOPIC_Calendar', 'TOPIC_TimeBlocking'],
          nicheTags: ['NICHE_Organization'],
          selected: false
        },
        {
          id: 4,
          title: 'Meal Planning & Home',
          topicTags: ['TOPIC_Food'],
          nicheTags: ['NICHE_Family', 'NICHE_Food'],
          selected: false
        },
        {
          id: 5,
          title: 'Habit Tracking',
          topicTags: ['TOPIC_Goals', 'TOPIC_Habits', 'TOPIC_MentalHealth'],
          nicheTags: ['NICHE_Productivity', 'NICHE_All'],
          selected: false
        }
      ]
    },
    {
      id: 1,
      active: false,
      title: 'Health/Food',
      subNiches: [
        {
          id: 0,
          title: 'Fitness & Exercise',
          topicTags: ['TOPIC_Fitness', 'TOPIC_Health', 'TOPIC_Mindset'],
          nicheTags: ['NICHE_Health'],
          selected: false
        },
        {
          id: 1,
          title: 'Healthy Choices',
          topicTags: ['TOPIC_Health', 'TOPIC_Habits', 'TOPIC_WeightLoss'],
          nicheTags: ['NICHE_Health', 'NICHE_Food'],
          selected: false
        },
        {
          id: 2,
          title: 'Mental Wellness',
          topicTags: ['TOPIC_MentalHealth', 'TOPIC_Mindset'],
          nicheTags: ['NICHE_Health', 'NICHE_Life'],
          selected: false
        },
        {
          id: 3,
          title: 'Food & Meals',
          topicTags: ['TOPIC_Food', 'TOPIC_Health'],
          nicheTags: ['NICHE_Food', 'NICHE_Health'],
          selected: false
        },
        {
          id: 4,
          title: 'Weight Loss',
          topicTags: ['TOPIC_WeightLoss', 'TOPIC_Fitness', 'TOPIC_Food'],
          nicheTags: ['NICHE_Health'],
          selected: false
        }
      ]
    },
    {
      id: 2,
      active: false,
      title: 'Business or Finance',
      subNiches: [
        {
          id: 0,
          title: 'Business Goals',
          topicTags: ['TOPIC_Business', 'TOPIC_ProjectManagement', 'TOPIC_CourseCreation'],
          nicheTags: ['NICHE_Business', 'NICHE_Productivity'],
          selected: false
        },
        {
          id: 1,
          title: 'Marketing',
          topicTags: ['TOPIC_Marketing', 'TOPIC_Business'],
          nicheTags: ['NICHE_Business'],
          selected: false
        },
        {
          id: 2,
          title: 'Personal Finance',
          topicTags: ['TOPIC_Budget'],
          nicheTags: ['NICHE_Life', 'NICHE_Business'],
          selected: false
        },
        {
          id: 3,
          title: 'Budgeting',
          topicTags: ['TOPIC_Budget'],
          nicheTags: ['NICHE_Life', 'NICHE_Business'],
          selected: false
        },
        {
          id: 4,
          title: 'Making Money',
          topicTags: ['TOPIC_Business', 'TOPIC_Budget'],
          nicheTags: ['NICHE_Business', 'NICHE_Life'],
          selected: false
        }
      ]
    },
    {
      id: 3,
      active: false,
      title: 'Other',
      subNiches: [
        {
          id: 0,
          title: 'Homeschooling',
          topicTags: ['TOPIC_Kids', 'TOPIC_School'],
          nicheTags: ['NICHE_Family', 'NICHE_Other'],
          selected: false
        },
        {
          id: 1,
          title: 'Parenting',
          topicTags: ['TOPIC_Kids'],
          nicheTags: ['NICHE_Family', 'NICHE_Other'],
          selected: false
        },
        {
          id: 2,
          title: 'Travel',
          topicTags: ['TOPIC_Travel'],
          nicheTags: ['NICHE_Other'],
          selected: false
        },
        {
          id: 3,
          title: 'Pets',
          topicTags: ['TOPIC_Pets'],
          nicheTags: ['NICHE_Family', 'NICHE_Other'],
          selected: false
        },
        {
          id: 4,
          title: 'School & Teaching',
          topicTags: ['TOPIC_School', 'TOPIC_Kids'],
          nicheTags: ['NICHE_Family', 'NICHE_Other'],
          selected: false
        },
        {
          id: 5,
          title: 'Faith & Devotions',
          topicTags: ['TOPIC_Faith'],
          nicheTags: ['NICHE_Life', 'NICHE_Other'],
          selected: false
        },
        {
          id: 6,
          title: 'Cleaning & Chores',
          topicTags: ['TOPIC_Cleaning', 'TOPIC_Organization'],
          nicheTags: [],
          selected: false
        }
      ]
    }
  ]
};

const saleNichesTopicsSlice = createSlice({
  name: 'saleNichesTopics',
  initialState,
  reducers: {
    changeNiches(state, action) {
      state.selectedCoreNiche = action.payload.mainNiche;

      state.mainNiches = state.mainNiches.map((item) =>
        item.id === action.payload.id ? { ...item, active: !item.active } : item
      );
    },
    toggleSubNiches(state, action) {
      const { niche } = action.payload;
      const { id, selected } = action.payload.subNiche;

      state.mainNiches = state.mainNiches.map((item) =>
        item.id === niche.id
          ? {
              ...item,
              subNiches: item.subNiches.map((el) =>
                el.id === id
                  ? {
                      ...el,
                      selected: !el.selected
                    }
                  : el
              )
            }
          : item
      );

      if (!selected) {
        state.numberOfSelectedSubNiches++;
        state.selectedSubNiches.push(action.payload.subNiche);

        if (!state.coreSubNiche) {
          const res = niche.subNiches.filter((item) => item.id === id);
          state.coreSubNiche = { ...res[0], selected: true };
        }
      } else {
        state.numberOfSelectedSubNiches--;
        state.selectedSubNiches = state.selectedSubNiches.filter(
          (st) => st.title !== action.payload.subNiche.title
        );

        if (state.coreSubNiche && state.numberOfSelectedSubNiches === 0) {
          state.coreSubNiche = null;
        }
      }
    },
    setTotalTopics(state, action) {
      state.totalTopics = action.payload;
    },
    setTotalSubNiches(state, action) {
      state.totalSubNiches = action.payload;
    },
    setSelectedTopicsIds(state, action) {
      state.totalSelectedTopicsIds = action.payload;
    },
    setSelectedSubNichesIds(state, action) {
      state.totalSelectedSubNichesIds = action.payload;
    },
    setInitialState() {
      return {
        ...initialState
      };
    }
  }
});

export default saleNichesTopicsSlice;

export const saleNichesTopicsSliceActions = saleNichesTopicsSlice.actions;
