import React, { Fragment } from 'react';
import WithStylesHoc from '../WithStylesHoc';
import styles from './styles.scss';
import { useHistory } from 'react-router-dom';

const Header = props => {
  const history = useHistory();
  const { goPath, right, title } = props;

  function _handleBackBtn() {
    if (props.location.pathname === '/index.html') {
      // exitWebView();
    } else if (goPath) {
      goPath && goPath();
    } else {
      history.goBack();
    }
  }

  return (
    <Fragment>
      <div className={styles.headerNav}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.img} onClick={_handleBackBtn}></div>
          </div>
          <div className={styles.title}>{title}</div>
          {right && Object.entries(right).length && (
            <div onClick={right.action} className={styles.right}>
              {right.title}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default WithStylesHoc(Header, styles);
