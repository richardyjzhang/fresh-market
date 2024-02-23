import React, { useEffect, useRef } from "react";
import styles from "./index.css";

const DashboardPage: React.FC = () => {
  const countupRef = useRef(null);
  let countUpAnim;

  useEffect(() => {
    initCountUp();
  }, []);

  async function initCountUp() {
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(countupRef.current, 1000);
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }

  return (
    <div className={styles.root}>
      累计收入 <div ref={countupRef}></div> 万元
    </div>
  );
};

export default DashboardPage;
