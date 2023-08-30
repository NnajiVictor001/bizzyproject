import React, { useState } from 'react';
import styles from './MetadataGenerator.module.scss';
import Button from '../../components/Buttons/Button';
import InputParagraph from '../../components/InputFields/InputParagraph';

function MetadataGenerator() {
  const { container, container__left, container__right } = styles;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const multiFieldInputs = [
    '7lettersC',
    '5lettersC',
    '8lettersC',
    '7lettersB',
    '5lettersB',
    '8lettersB'
  ];
  const singleFieldInputs = ['headline', 'paragraph', 'subheadline', 'blurp'];
  const colorFields = ['backg', 'color'];
  const mediaFields = ['img', 'image'];

  const getNumberFromString = (stringIdentifier) => {
    const length = stringIdentifier.replace(/[^0-9]/g, '');
    return parseInt(length, 10);
  };

  const splitFigmaVariable = (figmaVariable) => figmaVariable.split('_');

  const splitVariableList = (variableList) => {
    variableList = variableList.replace(/\n/g, ' ');
    return variableList.split(' ');
  };

  const getInputLength = (figmaVariable) => {
    const variableData = splitFigmaVariable(figmaVariable);
    const name = variableData[0];

    if (figmaVariable.indexOf('nolimit') > -1) {
      return 0;
    }

    if (multiFieldInputs.includes(name)) {
      return 1;
    }

    if (singleFieldInputs.includes(name)) {
      const fieldIdentifier = variableData[1];
      return getNumberFromString(fieldIdentifier);
    }

    return null;
  };

  const getInputColumn = (figmaVariable) => {
    const variableData = splitFigmaVariable(figmaVariable);
    const tableCoordinate = variableData[variableData.length - 1];
    return tableCoordinate.charAt(0);
  };

  const getInputRow = (figmaVariable) => {
    const variableData = splitFigmaVariable(figmaVariable);
    const tableCoordinate = variableData[variableData.length - 1];
    return getNumberFromString(tableCoordinate);
  };

  const isTextInput = (figmaVariable) => {
    const variableData = splitFigmaVariable(figmaVariable);
    const name = variableData[0];
    return singleFieldInputs.includes(name) || multiFieldInputs.includes(name);
  };

  const isBoolInput = (figmaVariable) => figmaVariable.indexOf('letters_numbers') > -1;

  const isColorInput = (figmaVariable) => {
    const variableData = splitFigmaVariable(figmaVariable);
    const name = variableData[0];
    return colorFields.includes(name);
  };

  const isMediaInput = (figmaVariable) => {
    const variableData = splitFigmaVariable(figmaVariable);
    const name = variableData[0];
    return mediaFields.includes(name);
  };

  const getTextVariableName = (textVariable) => {
    const variableData = splitFigmaVariable(textVariable);
    const name = variableData[0];
    const tableCoordinate = variableData[variableData.length - 1];
    return `${name}_${tableCoordinate}`;
  };

  const convertFigmaVariableName = (figmaVariable) => {
    if (isTextInput(figmaVariable)) {
      return `text__${getTextVariableName(figmaVariable)}`;
    }

    if (isBoolInput(figmaVariable)) {
      return `bool__${figmaVariable}`;
    }

    if (isColorInput(figmaVariable)) {
      return `color__${figmaVariable}`;
    }

    if (isMediaInput(figmaVariable)) {
      return `media__${figmaVariable}`;
    }

    return figmaVariable;
  };

  const generateOutput = () => {
    const ingredientVariables = splitVariableList(input);
    const metadata = ingredientVariables.reduce((previous, current, _index) => {
      const inputLength = getInputLength(current);
      const inputColumn = getInputColumn(current);
      const inputRow = getInputRow(current);
      const djangoVariableName = convertFigmaVariableName(current);

      const record = {
        column: inputColumn,
        row: inputRow
      };

      if (Number.isFinite(inputLength)) {
        record.length = inputLength;
      }

      if (inputColumn && inputRow) {
        previous[djangoVariableName] = record;
      }

      return previous;
    }, {});
    setOutput(JSON.stringify(metadata, null, 2));
  };

  return (
    <div className={container}>
      {/* INPUT */}
      <div className={container__left}>
        <InputParagraph value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={generateOutput} disabled={!input}>
          Generate
        </Button>
      </div>

      {/* OUTPUT */}
      <div className={container__right}>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default MetadataGenerator;
