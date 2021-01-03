import React from "react";
import styles from "./Spinner.module.css";

const Loading = (props) => (
    props.show ?
    <div className={styles.spinner}/> :
    <div/>
);

export default Loading;