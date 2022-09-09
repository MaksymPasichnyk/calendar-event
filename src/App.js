import { useContext } from "react";
import { AppContext } from "./context/AppContext";

import Header from "./components/header/Header";
import Calendar from "./components/calendar/Calendar";
import EventModal from "./components/eventModal/EventModal";


function App() {
	const {displayEventModal} = useContext(AppContext);

  return (
    <div className="wrapper">
			<Header />
			<Calendar />
		</div>
  );
}

export default App;
