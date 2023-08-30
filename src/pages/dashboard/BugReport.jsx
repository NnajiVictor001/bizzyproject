import React from 'react';
import styles from './BugReport.module.scss';

function BugReport() {
  const {
    dashboard_form_typeform,
    dashboard_form_typeform__title,
    dashboard_form_typeform__title_item
  } = styles;

  return (
    <div className="DashboardLayout_layout__childrenWrapper__Jvz3Q">
      <div className={dashboard_form_typeform}>
        <div className={dashboard_form_typeform__title}>
          <h4 className={dashboard_form_typeform__title_item}>Talk to us!</h4>
          {/* <NavButton
                        className={right__btn}
                        type="button"
                        txt="Instead Take Me to the Knowledge Base"
                        bgColor={COLOR_LIGHT_ORANGE}
                        onClick={console.log('click')}
                    /> */}
        </div>
        <iframe
          src="https://rachel568.typeform.com/to/g73ZLpDY"
          title="Bizzy Feature Request"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}

export default BugReport;
