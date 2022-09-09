import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import { AiOutlinePlus } from "react-icons/ai";
import styles from "./eventButton.module.scss";

const EventButton = () => {
  const { setDisplayEventModal} = useContext(AppContext);

  const handleClick = () => {
    setDisplayEventModal(true);
  };

  return (
    <button 
			onClick={handleClick}
			className={styles.root}
		>
      <AiOutlinePlus />
    </button>
  );
};

export default EventButton;
