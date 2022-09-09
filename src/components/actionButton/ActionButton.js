import styles from "./actionButton.module.scss";

const ActionButton = ({icon, handleClick}) => {
	return (
		<button 
			className={styles.root}
			onClick={handleClick}
		>
			{icon}
		</button>
	)
}

export default ActionButton