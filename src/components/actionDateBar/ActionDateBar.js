import styles from "./actionDateBar.module.scss";
import ActionButton from "../actionButton/ActionButton";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ActionDateBar = ({prevMonthHandler, nextMonthHandler, strDate}) => {
  return (
    <div className={styles.container}>
      <ActionButton handleClick={prevMonthHandler} icon={<BsChevronLeft />} />
      <h3 className={styles.date}>{strDate}</h3>
      <ActionButton handleClick={nextMonthHandler} icon={<BsChevronRight />} />
    </div>
  );
};

export default ActionDateBar;
