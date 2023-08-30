import ApiService from 'helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import { webCreationSliceActions } from 'store/web-creation';
import { productBrandingSliceActions } from 'store/product-branding';
import { convertColorsToPallete } from 'helpers/pallete';
import { capitalizeFirstLetter, wordingArray } from 'helpers/custom-functions';
import { randomDifferentItem, randomItem, randomNichePhraseGenerator } from 'helpers/utils';
import { useMemo } from 'react';

export const useWebsiteCreation = () => {
  const dispatch = useDispatch();

  const bookPrice = useSelector((state) => state.productType.productPrice);
  const universalWordings = useSelector((state) => state.webCreation.universalWordings);
  const selectedProductType = useSelector((state) => state.productType.selectedProductType);
  const salesType = useSelector((state) => state.webCreation.salesType);
  const wording = useSelector((state) => state.webCreation.wording);
  const problemWordings = useSelector((state) => state.webCreation.problemWordings);
  const solutionWordings = useSelector((state) => state.webCreation.solutionWordings);
  const shortSolutionWordings = useSelector((state) => state.webCreation.shortSolutionWordings);

  const resetWebsiteCreationData = () => {
    dispatch(webCreationSliceActions.setInitialState());
  };

  // Helpers
  const isLead = useMemo(() => {
    if (salesType !== 'sales') {
      return true;
    }
    return false;
  }, [salesType]);

  // Refresh Actions
  const refresh_sp_stickybar_heading_b = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map((item) => `Your ${item} is Waiting`);

    const sp_stickybar_heading_b = randomDifferentItem(value, nicheResults);

    return sp_stickybar_heading_b;
  };

  const refresh_sp_button = (value, wordingPayload, universalWordingsPayload) => {
    const wordingData = wordingPayload || wording;
    const universalWordingsData = universalWordingsPayload || universalWordings;

    const generatedWordings = wordingArray(universalWordingsData, 'button_wording').map(
      (item) => `${item} ${wordingData.name} - ${bookPrice}`
    );

    const sp_button = randomDifferentItem(value, generatedWordings);

    return sp_button;
  };

  const updateSpButtonPrice = (value, price, type) => {
    const match = wordingArray(universalWordings, 'button_wording').find((item) =>
      value?.includes(item)
    );
    if (type === 'sales') {
      const sp_button = match ? `${match} ${wording.name} - ${price}` : value;
      return sp_button;
    }
    const sp_button = match ? `${match} ${wording.name}` : value;
    return sp_button;
  };

  const updateSpSidebarShortBlurp = (value, price) => {
    const niches = randomNichePhraseGenerator(wording.batches_wording);
    const nicheMatch = niches.find((item) => value?.includes(item));

    if (nicheMatch) {
      return `For a limited time, get access to our ${wording.name} ${isLead ? '' : 'for just $'} ${
        isLead ? '0' : price
      } and gain that ${nicheMatch} without all the stress!`;
    }

    return value;
  };

  const refresh_ws_cta_v2_heading_b = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;
    const generatedWordings = wordingData.batches_wording.flatMap((b) => b.dont_need);

    dispatch(
      webCreationSliceActions.setRefreshCounter({
        ws_objcrush_shortblurp_1: generatedWordings.length
      })
    );
    const ws_cta_v2_heading_b = randomDifferentItem(value, generatedWordings);
    return ws_cta_v2_heading_b ?? '';
  };

  const refresh_ws_cta_v2_heading_a = (value, bookTypePayload, wordingPayload) => {
    const bookType = bookTypePayload || selectedProductType;
    const wordingData = wordingPayload || wording;
    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map(
      (item) => `Our ${bookType} ${wordingData.name} is the shortcut to a ${item}`
    );

    const ws_cta_v2_heading_a = randomDifferentItem(value, nicheResults);
    return ws_cta_v2_heading_a;
  };

  const refresh_ws_sidebar_textbox_a = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;
    const longPromises = wordingData.batches_wording.flatMap((b) => b.long_promise);
    const promises = wordingData.batches_wording.flatMap((b) => b.promise);

    const allPromises = longPromises
      .flatMap((item) => promises.map((p) => `${item} ${p}`))
      .map((item) => capitalizeFirstLetter(item));

    dispatch(
      webCreationSliceActions.setRefreshCounter({
        ws_sidebar_textbox_a: allPromises.length
      })
    );
    const ws_sidebar_textbox_a = randomDifferentItem(value, allPromises);
    return ws_sidebar_textbox_a;
  };

  const refresh_ws_sidebar_textbox_b = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;
    const phrases = wordingData.batches_wording
      .flatMap((b) => b.bad_guy)
      .map((item) => `Even if you're ${item}.. we hear you!`);

    dispatch(
      webCreationSliceActions.setRefreshCounter({
        ws_sidebar_textbox_b: phrases.length
      })
    );
    const ws_sidebar_textbox_b = randomDifferentItem(value, phrases);
    return ws_sidebar_textbox_b;
  };

  const refresh_ws_sidebar_textbox_c = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;
    const phrases = wordingData.batches_wording
      .flatMap((b) => b.batch.name)
      .map((item) => `This ${wordingData.name} will help you create your ${item}`);

    dispatch(
      webCreationSliceActions.setRefreshCounter({
        ws_sidebar_textbox_c: phrases.length
      })
    );
    const ws_sidebar_textbox_c = randomDifferentItem(value, phrases);
    return ws_sidebar_textbox_c;
  };

  const refresh_sp_sidebar_shortblurp = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map(
      (item) =>
        `For a limited time, get access to our ${wordingData.name} ${isLead ? '' : 'for just $'} ${
          isLead ? '0' : bookPrice
        } and gain that ${item} without all the stress!`
    );

    const sp_sidebar_shortblurp = randomDifferentItem(value, nicheResults);
    return sp_sidebar_shortblurp;
  };

  const refresh_ws_objcrush_heading_a = (value, wordingPayload, universalWordingsPayload) => {
    const wordingData = wordingPayload || wording;
    const universalWordingsData = universalWordingsPayload || universalWordings;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const actionPhrases = wordingArray(universalWordingsData, 'action_words');

    const nicheResults = actionPhrases.flatMap((actionPhrase) =>
      niches.map((p) => `${actionPhrase.replace('{}', p)}`)
    );

    const ws_objcrush_heading_a = randomDifferentItem(value, nicheResults);
    return ws_objcrush_heading_a;
  };

  const refresh_ws_objcrush_shortblurp_1 = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const badGuyPhrases = wordingData.batches_wording.flatMap((b) => b.bad_guy);
    const excusePhrases = wordingData.batches_wording.flatMap((b) => b.excuse);

    const phraseResults = badGuyPhrases.flatMap((badGuyPhrase) =>
      excusePhrases.map(
        (excuse) => `You aren't ${badGuyPhrase}. ${excuse} You need the ${wordingData.name}!`
      )
    );

    dispatch(
      webCreationSliceActions.setRefreshCounter({
        ws_objcrush_shortblurp_1: phraseResults.length
      })
    );
    const ws_objcrush_shortblurp_1 = randomDifferentItem(value, phraseResults);
    return ws_objcrush_shortblurp_1;
  };

  const refresh_ws_objcrush_shortblurp_2 = (value, problemsPayload, solutionsPayload) => {
    const problems = problemsPayload || [...problemWordings];
    const solutions = solutionsPayload || [...solutionWordings];

    const results = problems.map((problem, index) => `${problem}{}${solutions[index]}`);

    const ws_objcrush_shortblurp_2 = randomDifferentItem(value, results);
    const randomProblem = ws_objcrush_shortblurp_2.split('{}')[0];
    const randomSolution = ws_objcrush_shortblurp_2.split('{}')[1];

    const newProblems = [...problems].filter((item) => item !== randomProblem);
    const newSolutions = [...solutions].filter((item) => item !== randomSolution);
    if (value) {
      newProblems.push(value.split('{}')[0]);
      newSolutions.push(value.split('{}')[1]);
    }

    dispatch(webCreationSliceActions.setProblemWordings(newProblems));
    dispatch(webCreationSliceActions.setSolutionWordings(newSolutions));

    return ws_objcrush_shortblurp_2;
  };

  const refresh_ws_objcrush_shortblurp_3 = (value, problemsPayload, solutionsPayload) => {
    const problems = problemsPayload || [...problemWordings];
    const solutions = solutionsPayload || [...solutionWordings];

    const results = problems.map((problem, index) => `${problem}{}${solutions[index]}`);

    const ws_objcrush_shortblurp_3 = randomDifferentItem(value, results);
    const randomProblem = ws_objcrush_shortblurp_3.split('{}')[0];
    const randomSolution = ws_objcrush_shortblurp_3.split('{}')[1];

    const newProblems = [...problems].filter((item) => item !== randomProblem);
    const newSolutions = [...solutions].filter((item) => item !== randomSolution);
    if (value) {
      newProblems.push(value.split('{}')[0]);
      newSolutions.push(value.split('{}')[1]);
    }

    dispatch(webCreationSliceActions.setProblemWordings(newProblems));
    dispatch(webCreationSliceActions.setSolutionWordings(newSolutions));

    return ws_objcrush_shortblurp_3;
  };

  const refresh_ws_objcrush_shortblurp_4 = (value, problemsPayload, solutionsPayload) => {
    const problems = problemsPayload || [...problemWordings];
    const solutions = solutionsPayload || [...solutionWordings];

    const results = problems.map((problem, index) => `${problem}{}${solutions[index]}`);

    const ws_objcrush_shortblurp_4 = randomDifferentItem(value, results);
    const randomProblem = ws_objcrush_shortblurp_4.split('{}')[0];
    const randomSolution = ws_objcrush_shortblurp_4.split('{}')[1];

    const newProblems = [...problems].filter((item) => item !== randomProblem);
    const newSolutions = [...solutions].filter((item) => item !== randomSolution);
    if (value) {
      newProblems.push(value.split('{}')[0]);
      newSolutions.push(value.split('{}')[1]);
    }

    dispatch(webCreationSliceActions.setProblemWordings(newProblems));
    dispatch(webCreationSliceActions.setSolutionWordings(newSolutions));

    return ws_objcrush_shortblurp_4;
  };

  const refresh_sp_cta_v3_heading_b = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;
    const generatedWordings = wordingData.batches_wording
      .flatMap((b) => b.niche_1_wording)
      .map((item) => `${capitalizeFirstLetter(item)} is easier when you have a plan.  Promise!`);

    dispatch(
      webCreationSliceActions.setRefreshCounter({
        sp_cta_v3_heading_b: generatedWordings.length
      })
    );
    const sp_cta_v3_heading_b = randomDifferentItem(value, generatedWordings);
    return sp_cta_v3_heading_b;
  };

  const refresh_sp_cta_v3_heading_a = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;
    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const evenIfPhrases = wordingData.batches_wording.flatMap((b) => b.even_if);

    const phraseResults = niches.flatMap((niche) =>
      evenIfPhrases.map(
        (evenIfPhrase) => `A ${niche} can be your reality, even with ${evenIfPhrase}`
      )
    );

    const sp_cta_v3_heading_a = randomDifferentItem(value, phraseResults);
    return sp_cta_v3_heading_a;
  };

  const refresh_ws_this_shortBlurp1 = (value, problemsPayload, shortSolutionsPayload) => {
    const problems = problemsPayload || [...problemWordings];
    const solutions = shortSolutionsPayload || [...shortSolutionWordings];

    const results = problems.map((problem, index) => `${problem}{}${solutions[index]}`);

    const ws_this_shortBlurp1 = randomDifferentItem(value, results);
    const randomProblem = ws_this_shortBlurp1.split('{}')[0];
    const randomSolution = ws_this_shortBlurp1.split('{}')[1];

    const newProblems = [...problems].filter((item) => item !== randomProblem);
    const newSolutions = [...solutions].filter((item) => item !== randomSolution);
    if (value) {
      newProblems.push(value.split('{}')[0]);
      newSolutions.push(value.split('{}')[1]);
    }

    dispatch(webCreationSliceActions.setProblemWordings(newProblems));
    dispatch(webCreationSliceActions.setShortSolutionWordings(newSolutions));

    return ws_this_shortBlurp1;
  };

  const refresh_ws_this_shortBlurp2 = (value, problemsPayload, shortSolutionsPayload) => {
    const problems = problemsPayload || [...problemWordings];
    const solutions = shortSolutionsPayload || [...shortSolutionWordings];

    const results = problems.map((problem, index) => `${problem}{}${solutions[index]}`);

    const ws_this_shortBlurp2 = randomDifferentItem(value, results);
    const randomProblem = ws_this_shortBlurp2.split('{}')[0];
    const randomSolution = ws_this_shortBlurp2.split('{}')[1];

    const newProblems = [...problems].filter((item) => item !== randomProblem);
    const newSolutions = [...solutions].filter((item) => item !== randomSolution);
    if (value) {
      newProblems.push(value.split('{}')[0]);
      newSolutions.push(value.split('{}')[1]);
    }

    dispatch(webCreationSliceActions.setProblemWordings(newProblems));
    dispatch(webCreationSliceActions.setShortSolutionWordings(newSolutions));

    return ws_this_shortBlurp2;
  };

  const refresh_ws_this_shortBlurp3 = (value, problemsPayload, shortSolutionsPayload) => {
    const problems = problemsPayload || [...problemWordings];
    const solutions = shortSolutionsPayload || [...shortSolutionWordings];

    const results = problems.map((problem, index) => `${problem}{}${solutions[index]}`);

    const ws_this_shortBlurp3 = randomDifferentItem(value, results);
    const randomProblem = ws_this_shortBlurp3.split('{}')[0];
    const randomSolution = ws_this_shortBlurp3.split('{}')[1];

    const newProblems = [...problems].filter((item) => item !== randomProblem);
    const newSolutions = [...solutions].filter((item) => item !== randomSolution);
    if (value) {
      newProblems.push(value.split('{}')[0]);
      newSolutions.push(value.split('{}')[1]);
    }

    dispatch(webCreationSliceActions.setProblemWordings(newProblems));
    dispatch(webCreationSliceActions.setShortSolutionWordings(newSolutions));

    return ws_this_shortBlurp3;
  };

  const refresh_ws_about_heading_a = (value, wordingPayload, universalWordingsPayload) => {
    const wordingData = wordingPayload || wording;
    const universalWordingsData = universalWordingsPayload || universalWordings;

    const generatedWordings = wordingArray(universalWordingsData, 'about_phrase').map(
      (item) => `${item} ${wordingData.author_name}`
    );

    const ws_about_heading_a = randomDifferentItem(value, generatedWordings);
    return ws_about_heading_a;
  };

  const refresh_ws_about_textbox_2a = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;
    const pageNames = Array.from(
      new Set(wordingData.pages_wording.flatMap((d) => d.page_name).filter((d) => d !== ''))
    );

    const pageName1 = pageNames.length > 0 ? pageNames[0] : '';
    const pageName2 = pageNames.length > 1 ? pageNames[1] : '';
    const pageName3 = pageNames.length > 2 ? pageNames[2] : '';

    const phrases = wordingData.batches_wording.flatMap((b) => b.niche_1_wording);
    const nichePhrase = randomDifferentItem(value, phrases);

    const solutionPhrases = wordingData.pages_wording
      .flatMap((d) => d.solution)
      .filter((d) => d !== '');
    const pageSolutionPhrase = randomDifferentItem(value, solutionPhrases);

    const ws_about_textbox_2a = `For years I desperately craved a one-stop spot with ${pageName1}, ${pageName2}, ${pageName3} and other ${nichePhrase} cleaning tools to help me ${pageSolutionPhrase}`;
    return ws_about_textbox_2a;
  };

  const refresh_sp_cart_shortblurp_1 = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const resultNiches = niches.map(
      (item) =>
        `In just three steps and in three minutes or less...You will be on your way to a ${item}`
    );

    const sp_cart_shortblurp_1 = randomDifferentItem(value, resultNiches);
    return sp_cart_shortblurp_1;
  };

  const refresh_sp_cta_v4_heading_a = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);

    const sp_cta_v4_heading_a = randomDifferentItem(value, niches);
    return sp_cta_v4_heading_a;
  };

  // Thank You Page Refresh Actions
  const refresh_tx_cta_v2_heading_a = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map(
      (item) => `Your ${wordingData.type} ${wordingData.name} is the shortcut to a ${item} `
    );

    const tx_cta_v2_heading_a = randomDifferentItem(value, nicheResults);
    return tx_cta_v2_heading_a;
  };

  const refresh_tx_sidebar_textbox = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map(
      (item) => `Your ${wordingData.type} ${wordingData.name} is the shortcut to a ${item} `
    );

    const nichePhrase1 = randomDifferentItem(value, nicheResults);
    const nichePhrase2 = randomDifferentItem(nichePhrase1, nicheResults);

    const pageNames = Array.from(
      new Set(wordingData.pages_wording.flatMap((d) => d.page_name).filter((d) => d !== ''))
    );
    const pageName1 = pageNames.length > 0 ? pageNames[0] : '';
    const pageName2 = pageNames.length > 1 ? pageNames[1] : '';

    const batchNames = wordingData.batches_wording.flatMap((b) => b.batch.name);
    const batchName = randomItem(batchNames);

    const tx_sidebar_textbox = `You will be on your way to ${nichePhrase1} and ${nichePhrase2} ! Including your ${pageName1}, ${pageName2} & all the other ${batchName} resources!`;
    return tx_sidebar_textbox;
  };

  const refresh_tx_sidebar_shortblurp = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const batchNames = wordingData.batches_wording.flatMap((b) => b.batch.name);
    const resultBatches = batchNames.map(
      (item) => `This ${wordingData.name} will help you create your own ${item}`
    );

    dispatch(
      webCreationSliceActions.setRefreshCounter({
        tx_sidebar_shortblurp: resultBatches.length
      })
    );
    const tx_sidebar_shortblurp = randomDifferentItem(value, resultBatches);
    return tx_sidebar_shortblurp;
  };

  const refresh_tx_cta_v3_heading_a = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map(
      (item) => `1. Instantly download, & see your ${item} become a reality.`
    );

    const tx_cta_v3_heading_a = randomDifferentItem(value, nicheResults);
    return tx_cta_v3_heading_a;
  };

  const refresh_tx_cta_v3_heading_b = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;
    const phrases = wordingData.batches_wording.flatMap((b) => b.promise);

    const tx_cta_v3_heading_b = randomDifferentItem(value, phrases);
    return tx_cta_v3_heading_b;
  };

  const refresh_tx_blurp_textbox = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const phrases = wordingData.batches_wording.flatMap((b) => b.without);
    const nicheResults = phrases.map((item) => `Just imagine never ${item}`);

    dispatch(
      webCreationSliceActions.setRefreshCounter({
        tx_blurp_textbox: nicheResults.length
      })
    );
    const tx_blurp_textbox = randomDifferentItem(value, nicheResults);
    return tx_blurp_textbox;
  };

  const refresh_tx_blurp_longtextbox = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map(
      (item) => `You have the steps you need to create ${item} - but do you have the support? `
    );

    const tx_blurp_longtextbox = randomDifferentItem(value, nicheResults);
    return tx_blurp_longtextbox;
  };

  const refresh_tx_video_subheading_1 = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map((item) => `STEP 1: Ready for ${item}?`);

    const tx_video_subheading_1 = randomDifferentItem(value, nicheResults);
    return tx_video_subheading_1;
  };

  const refresh_tx_video_paragraph_1 = (value, wordingPayload, problemsPayload) => {
    const wordingData = wordingPayload || wording;
    const problems = problemsPayload || [...problemWordings];

    const problem = randomItem(problems);

    const pageNames = Array.from(
      new Set(wordingData.pages_wording.flatMap((d) => d.page_name).filter((d) => d !== ''))
    );
    const pageName1 = pageNames.length > 0 ? pageNames[0] : '';

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map(
      (item) =>
        `In this video we will walk through how to use the ${pageName1}.  Never again will ${problem}. Let's get ${item} in no time flat!`
    );

    const tx_video_paragraph_1 = randomDifferentItem(value, nicheResults);
    return tx_video_paragraph_1;
  };

  const refresh_tx_video_subheading_2 = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map((item) => `STEP 2: Ready for ${item}?`);

    const tx_video_subheading_2 = randomDifferentItem(value, nicheResults);
    return tx_video_subheading_2;
  };

  const refresh_tx_video_paragraph_2 = (value, wordingPayload, problemsPayload) => {
    const wordingData = wordingPayload || wording;
    const problems = problemsPayload || [...problemWordings];

    const problem = randomItem(problems);

    const pageNames = Array.from(
      new Set(wordingData.pages_wording.flatMap((d) => d.page_name).filter((d) => d !== ''))
    );
    const pageName1 = pageNames.length > 0 ? pageNames[0] : '';

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map(
      (item) =>
        `In this video we will walk through how to use the ${pageName1}.  Never again will ${problem}. Let's get ${item} in no time flat!`
    );

    const tx_video_paragraph_2 = randomDifferentItem(value, nicheResults);
    return tx_video_paragraph_2;
  };

  const refresh_tx_video_subheading_3 = (value, wordingPayload) => {
    const wordingData = wordingPayload || wording;

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map((item) => `STEP 3: Ready for ${item}?`);

    const tx_video_subheading_3 = randomDifferentItem(value, nicheResults);
    return tx_video_subheading_3;
  };

  const refresh_tx_video_paragraph_3 = (value, wordingPayload, problemsPayload) => {
    const wordingData = wordingPayload || wording;
    const problems = problemsPayload || [...problemWordings];

    const problem = randomItem(problems);

    const pageNames = Array.from(
      new Set(wordingData.pages_wording.flatMap((d) => d.page_name).filter((d) => d !== ''))
    );
    const pageName1 = pageNames.length > 0 ? pageNames[0] : '';

    const niches = randomNichePhraseGenerator(wordingData.batches_wording);
    const nicheResults = niches.map(
      (item) =>
        `In this video we will walk through how to use the ${pageName1}.  Never again will ${problem}. Let's get ${item} in no time flat!`
    );

    const tx_video_paragraph_3 = randomDifferentItem(value, nicheResults);
    return tx_video_paragraph_3;
  };

  const problemSolutionWordings = (pagesWording) => {
    const problemWording = pagesWording.flatMap((d) => d.problem).filter((d) => d !== '');
    const solutionWording = pagesWording.flatMap((d) => d.solution).filter((d) => d !== '');
    const shortSolutionWording = pagesWording
      .flatMap((d) => d.short_solution)
      .filter((d) => d !== '');
    return { problemWording, solutionWording, shortSolutionWording };
  };

  const defaultWebsiteValues = async (bookId, hasSalesPage) => {
    const [universalWordingsResponse, wordingResponse] = await Promise.all([
      ApiService.get('/bizzy/universal-wordings/'),
      ApiService.get(`/book-generator/books/${bookId}/wording/`)
    ]);
    const universalWordingResults = universalWordingsResponse.data.results;
    const wordingData = wordingResponse.data;

    // Get Book Name
    dispatch(productBrandingSliceActions.setProductName(wordingData.name));

    // Get Book Type
    const bookType = wordingData.type;
    dispatch(productBrandingSliceActions.setTypeValue(bookType));

    // Get Font
    const fontResponse = await ApiService.get(`/bizzy/fonts/${wordingResponse.data.options.font}/`);
    dispatch(productBrandingSliceActions.selectFont(fontResponse.data));

    // Get Palette Data
    const defaultPalette = wordingResponse.data.options.color_palette;
    const palette = convertColorsToPallete(defaultPalette);
    const defaultWebsiteColor = defaultPalette.color1;
    dispatch(productBrandingSliceActions.setDefaultPalette(defaultPalette));
    dispatch(productBrandingSliceActions.setSelectedWebsiteColor(defaultWebsiteColor));
    dispatch(productBrandingSliceActions.setSelectedBaseWebsiteColor('#000000'));
    dispatch(productBrandingSliceActions.selectColorPallete(palette));

    // Get Wordings
    const { problemWording, solutionWording, shortSolutionWording } = problemSolutionWordings(
      wordingData.pages_wording
    );

    dispatch(webCreationSliceActions.setProblemWordingsLength(problemWording.length));
    dispatch(webCreationSliceActions.setProblemWordings(problemWording));
    dispatch(webCreationSliceActions.setSolutionWordings(solutionWording));
    dispatch(webCreationSliceActions.setShortSolutionWordings(shortSolutionWording));
    dispatch(webCreationSliceActions.setUniversalWordings(universalWordingResults));
    dispatch(webCreationSliceActions.setWording(wordingData));
    dispatch(webCreationSliceActions.setBatchWordings(wordingData.batches_wording));
    dispatch(productBrandingSliceActions.setWordingData(wordingData));

    // Don't set default values if sales page exists on initial load
    if (hasSalesPage) {
      return {};
    }

    // Get Page Names
    const pageNames = Array.from(
      new Set(wordingData.pages_wording.flatMap((d) => d.page_name).filter((d) => d !== ''))
    );
    const pageName1 = pageNames.length > 0 ? pageNames[0] : '';
    const pageName2 = pageNames.length > 1 ? pageNames[1] : '';
    const pageName3 = pageNames.length > 2 ? pageNames[2] : '';

    // Get Input Values
    const sp_stickybar_heading_b_value = refresh_sp_stickybar_heading_b('', wordingData);
    const sp_button_value = refresh_sp_button('', wordingData, universalWordingResults);
    const ws_cta_v2_heading_b_value = refresh_ws_cta_v2_heading_b('', wordingData);
    const ws_cta_v2_heading_a_value = refresh_ws_cta_v2_heading_a('', bookType, wordingData);
    const ws_sidebar_textbox_a_value = refresh_ws_sidebar_textbox_a('', wordingData);
    const ws_sidebar_textbox_b_value = refresh_ws_sidebar_textbox_b('', wordingData);
    const ws_sidebar_textbox_c_value = refresh_ws_sidebar_textbox_c('', wordingData);
    const sp_sidebar_shortblurp_value = refresh_sp_sidebar_shortblurp('', wordingData);
    const ws_objcrush_heading_a_value = refresh_ws_objcrush_heading_a(
      '',
      wordingData,
      universalWordingResults
    );
    const ws_objcrush_shortblurp_1_value = refresh_ws_objcrush_shortblurp_1('', wordingData);
    const ws_objcrush_shortblurp_2_value = refresh_ws_objcrush_shortblurp_2(
      '',
      problemWording,
      solutionWording
    );
    const ws_objcrush_shortblurp_3_value = refresh_ws_objcrush_shortblurp_3(
      '',
      problemWording,
      solutionWording
    );
    const ws_objcrush_shortblurp_4_value = refresh_ws_objcrush_shortblurp_4(
      '',
      problemWording,
      solutionWording
    );
    const sp_cta_v3_heading_b_value = refresh_sp_cta_v3_heading_b('', wordingData);
    const sp_cta_v3_heading_a_value = refresh_sp_cta_v3_heading_a('', wordingData);
    const ws_this_shortBlurp1_value = refresh_ws_this_shortBlurp1(
      '',
      problemWording,
      shortSolutionWording
    );
    const ws_this_shortBlurp2_value = refresh_ws_this_shortBlurp2(
      '',
      problemWording,
      shortSolutionWording
    );
    const ws_this_shortBlurp3_value = refresh_ws_this_shortBlurp3(
      '',
      problemWording,
      shortSolutionWording
    );
    const ws_about_heading_a_value = refresh_ws_about_heading_a(
      '',
      wordingData,
      universalWordingResults
    );
    const ws_about_textbox_2a_value = refresh_ws_about_textbox_2a('', wordingData);
    const sp_cart_shortblurp_1_value = refresh_sp_cart_shortblurp_1('', wordingData);
    const sp_cta_v4_heading_a_value = refresh_sp_cta_v4_heading_a('', wordingData);

    const websiteData = {
      sp_stickybar_heading_b: {
        val: sp_stickybar_heading_b_value,
        color: '',
        hidden: false
      },
      sp_button: {
        val: sp_button_value,
        color: defaultPalette.color4,
        hidden: false
      },
      ws_cta_v2_heading_b: {
        val: ws_cta_v2_heading_b_value,
        color: '',
        hidden: false
      },
      ws_cta_v2_heading_a: {
        val: ws_cta_v2_heading_a_value,
        color: defaultWebsiteColor,
        hidden: false
      },
      ws_sidebar_textbox_a: {
        val: ws_sidebar_textbox_a_value,
        color: '',
        hidden: false
      },
      ws_sidebar_textbox_b: {
        val: ws_sidebar_textbox_b_value,
        color: '',
        hidden: false
      },
      ws_sidebar_textbox_c: {
        val: ws_sidebar_textbox_c_value,
        color: '',
        hidden: false
      },
      sp_sidebar_shortblurp: {
        val: sp_sidebar_shortblurp_value,
        color: '',
        hidden: false
      },
      ws_objcrush_heading_a: {
        val: ws_objcrush_heading_a_value,
        color: defaultWebsiteColor,
        hidden: false
      },
      ws_objcrush_shortblurp_1: {
        val: ws_objcrush_shortblurp_1_value,
        color: '',
        hidden: false
      },
      ws_objcrush_shortblurp_2: {
        val: ws_objcrush_shortblurp_2_value,
        color: '',
        hidden: false
      },
      ws_objcrush_shortblurp_3: {
        val: ws_objcrush_shortblurp_3_value,
        color: '',
        hidden: false
      },
      ws_objcrush_shortblurp_4: {
        val: ws_objcrush_shortblurp_4_value,
        color: '',
        hidden: false
      },
      sp_cta_v3_heading_b: {
        val: sp_cta_v3_heading_b_value,
        color: '',
        hidden: false
      },
      sp_cta_v3_heading_a: {
        val: sp_cta_v3_heading_a_value,
        color: defaultWebsiteColor,
        hidden: false
      },
      ws_this_shortBlurp1: {
        val: ws_this_shortBlurp1_value,
        color: '',
        hidden: false
      },
      ws_this_shortBlurp2: {
        val: ws_this_shortBlurp2_value,
        color: '',
        hidden: false
      },
      ws_this_shortBlurp3: {
        val: ws_this_shortBlurp3_value,
        color: '',
        hidden: false
      },
      ws_this_heading_a: {
        val: 'This Is For You IF...',
        color: '',
        hidden: false
      },
      ws_about_heading_a: {
        val: ws_about_heading_a_value,
        color: '',
        hidden: false
      },
      ws_about_textbox_1a: {
        val: `I run ${wordingData.business_name}.  I know what it's like to feel like I can't possibly do it all that is currently on my plate, let alone plan for more! Or find time in the week FOR ME!`,
        color: '',
        hidden: false
      },
      ws_about_textbox_1b: {
        val: `But also knowing - I CAN DO IT ALL!! - There has to be a way! And one that doesn't involve me ${wordingData.batches_wording[0].without}! `,
        color: '',
        hidden: false
      },
      ws_about_textbox_1c: {
        val: `I know I'm not the only person who looks at it all and says, Where do I even start? `,
        color: '',
        hidden: false
      },
      ws_about_textbox_2a: {
        val: ws_about_textbox_2a_value,
        color: '',
        hidden: false
      },
      ws_about_textbox_2b: {
        val: `At the time, it didn't exist, so I decided to create it!`,
        color: '',
        hidden: false
      },
      ws_about_textbox_2c: {
        val: `My ${wordingData.name} will ${wordingData.batches_wording[0].promise_paragraph}`,
        color: '',
        hidden: false
      },
      sp_cart_heading_a: {
        val: `How To Get Started`,
        color: '',
        hidden: false
      },
      sp_cart_shortblurp_1: {
        val: sp_cart_shortblurp_1_value,
        color: '',
        hidden: false
      },
      sp_cart_button: {
        val: `SEND THE ${wordingData.name} MY WAY!`,
        color: '',
        hidden: false
      },
      sp_cta_v4_heading_a: {
        val: sp_cta_v4_heading_a_value,
        color: '',
        hidden: false
      },
      sp_cta_v4_bullets_1: {
        val: pageName1,
        color: '',
        hidden: false
      },
      sp_cta_v4_bullets_2: {
        val: pageName2,
        color: '',
        hidden: false
      },
      sp_cta_v4_bullets_3: {
        val: pageName3,
        color: '',
        hidden: false
      }
    };

    // ThankYou Default Values
    const tx_cta_v2_heading_a_value = refresh_tx_cta_v2_heading_a('', wordingData);
    const tx_sidebar_textbox_value = refresh_tx_sidebar_textbox('', wordingData);
    const tx_sidebar_shortblurp_value = refresh_tx_sidebar_shortblurp('', wordingData);
    const tx_cta_v3_heading_a_value = refresh_tx_cta_v3_heading_a('', wordingData);
    const tx_cta_v3_heading_b_value = refresh_tx_cta_v3_heading_b('', wordingData);
    const tx_blurp_textbox_value = refresh_tx_blurp_textbox('', wordingData);
    const tx_blurp_longtextbox_value = refresh_tx_blurp_longtextbox('', wordingData);
    const tx_video_subheading_1_value = refresh_tx_video_subheading_1('', wordingData);
    const tx_video_paragraph_1_value = refresh_tx_video_paragraph_1(
      '',
      wordingData,
      problemWording
    );
    const tx_video_subheading_2_value = refresh_tx_video_subheading_2('', wordingData);
    const tx_video_paragraph_2_value = refresh_tx_video_paragraph_2(
      '',
      wordingData,
      problemWording
    );
    const tx_video_subheading_3_value = refresh_tx_video_subheading_3('', wordingData);
    const tx_video_paragraph_3_value = refresh_tx_video_paragraph_3(
      '',
      wordingData,
      problemWording
    );

    const deliveryData = {
      tx_cta_v2_heading_b: {
        val: `Download your ${wordingData.name}, watch the videos and GET RESULTS!!`,
        color: '',
        hidden: false
      },
      tx_cta_v2_heading_a: {
        val: tx_cta_v2_heading_a_value,
        color: defaultWebsiteColor,
        hidden: false
      },
      tx_sidebar_subheading: {
        val: "IT's YOURS!!",
        color: '',
        hidden: false
      },
      tx_sidebar_textbox: {
        val: tx_sidebar_textbox_value,
        color: '',
        hidden: false
      },
      tx_sidebar_shortblurp: {
        val: tx_sidebar_shortblurp_value,
        color: '',
        hidden: false
      },
      tx_cta_v3_heading_a: {
        val: tx_cta_v3_heading_a_value,
        color: defaultPalette.color3,
        hidden: false
      },
      tx_cta_v3_heading_b: {
        val: tx_cta_v3_heading_b_value,
        color: '',
        hidden: false
      },
      tx_blurp_textbox: {
        val: tx_blurp_textbox_value,
        color: '',
        hidden: false
      },
      tx_blurp_longtextbox: {
        val: tx_blurp_longtextbox_value,
        color: '',
        hidden: false
      },
      tx_cta_v3_heading_c: {
        val: 'We have a community to cheer you on, and help you get results that stick!',
        color: defaultPalette.color3,
        hidden: false
      },
      tx_cta_v3_heading_d: {
        val: 'We have a community to help you, cheer you on, and help you get results that stick',
        color: defaultPalette.color3,
        hidden: false
      },
      tx_button_2: {
        val: 'JOIN THE COMMUNITY!!',
        color: '',
        hidden: false
      },
      tx_button_2_link: {
        val: '',
        color: '',
        hidden: false
      },
      tx_cta_v3_heading_e: {
        val: 'Step 5: Take it further!',
        color: '',
        hidden: false
      },
      tx_button: {
        val: 'JOIN THE COMMUNITY!!',
        color: '',
        hidden: false
      },
      tx_video_subheading_1: {
        val: tx_video_subheading_1_value,
        color: '',
        hidden: true
      },
      tx_video_paragraph_1: {
        val: tx_video_paragraph_1_value,
        color: '',
        hidden: true
      },
      videoYoutubeUrl1: {
        val: 'https://www.youtube.com/watch?v=your-video',
        color: '',
        hidden: true
      },
      tx_video_subheading_2: {
        val: tx_video_subheading_2_value,
        color: '',
        hidden: true
      },
      tx_video_paragraph_2: {
        val: tx_video_paragraph_2_value,
        color: '',
        hidden: true
      },
      videoYoutubeUrl2: {
        val: 'https://www.youtube.com/watch?v=your-video',
        color: '',
        hidden: true
      },
      tx_video_subheading_3: {
        val: tx_video_subheading_3_value,
        color: '',
        hidden: true
      },
      tx_video_paragraph_3: {
        val: tx_video_paragraph_3_value,
        color: '',
        hidden: true
      },
      videoYoutubeUrl3: {
        val: 'https://www.youtube.com/watch?v=your-video',
        color: '',
        hidden: true
      }
    };

    return {
      website: websiteData,
      delivery: deliveryData
    };
  };

  return {
    resetWebsiteCreationData,
    defaultWebsiteValues,

    // Price Update Actions
    updateSpButtonPrice,
    updateSpSidebarShortBlurp,

    // Refresh Actions
    refreshActions: {
      refresh_sp_stickybar_heading_b,
      refresh_sp_button,
      refresh_ws_cta_v2_heading_b,
      refresh_ws_cta_v2_heading_a,
      refresh_ws_sidebar_textbox_a,
      refresh_ws_sidebar_textbox_b,
      refresh_ws_sidebar_textbox_c,
      refresh_sp_sidebar_shortblurp,
      refresh_ws_objcrush_heading_a,
      refresh_ws_objcrush_shortblurp_1,
      refresh_ws_objcrush_shortblurp_2,
      refresh_ws_objcrush_shortblurp_3,
      refresh_ws_objcrush_shortblurp_4,
      refresh_sp_cta_v3_heading_b,
      refresh_sp_cta_v3_heading_a,
      refresh_ws_this_shortBlurp1,
      refresh_ws_this_shortBlurp2,
      refresh_ws_this_shortBlurp3,
      refresh_ws_about_heading_a,
      refresh_sp_cart_shortblurp_1,
      refresh_sp_cta_v4_heading_a,

      // Thank You Page Refresh Actions
      refresh_tx_cta_v2_heading_a,
      refresh_tx_sidebar_textbox,
      refresh_tx_sidebar_shortblurp,
      refresh_tx_cta_v3_heading_a,
      refresh_tx_blurp_textbox,
      refresh_tx_blurp_longtextbox,
      refresh_tx_video_subheading_1,
      refresh_tx_video_paragraph_1,
      refresh_tx_video_subheading_2,
      refresh_tx_video_paragraph_2,
      refresh_tx_video_subheading_3,
      refresh_tx_video_paragraph_3
    }
  };
};
