import React from 'react';
import UpgradePopup from 'components/Popups/UpgradePopup';
import UpgradeFormPopup from 'components/Popups/UpgradeFormPopup';
import UpgradeFinalPopup from 'components/Popups/UpgradeFinalPopup';

function UpgradePopupHelper(props) {
  const { upgradePopupState, setUpgradePopupState, plan, isFree } = props;

  const onClose = () => {
    setUpgradePopupState('close');
  };

  return (
    <>
      {upgradePopupState === 'open' && (
        <UpgradePopup onClick={() => setUpgradePopupState('main')} onClose={onClose} />
      )}
      {upgradePopupState === 'main' && (
        <UpgradeFormPopup
          plan={plan}
          isFree={isFree}
          onClick={() => setUpgradePopupState('final')}
          onClose={onClose}
        />
      )}
      {upgradePopupState === 'final' && <UpgradeFinalPopup onClose={onClose} />}
    </>
  );
}

export default UpgradePopupHelper;
