import React from "react";
import LoginCom from "./login";
import styles from "./style.less";
import "~src/js/canvas-nest";

export default class LoginRegister extends React.PureComponent {
  render() {
    return (
      <div className={styles.loginWrapper}>
        <LoginCom />
      </div>
    );
  }
}
