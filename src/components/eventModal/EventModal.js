import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../context/AppContext";
import {
  AiOutlineClose,
  AiOutlineFileText,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import styles from "./eventModal.module.scss";
import * as calendar from "../../utils/calendarHelper";
import { nanoid } from "nanoid";

const EventModal = () => {
  const {
    setDisplayEventModal,
    dispatchEvent,
    selectedDay,
    selectedEvent,
    setSelectedEvent,
  } = useContext(AppContext);
  const [form, setForm] = useState({
    title: selectedEvent?.title ? selectedEvent.title : "",
    description: selectedEvent?.description ? selectedEvent.description : "",
  });

  const hideEventModal = () => {
    setDisplayEventModal(false);
    setSelectedEvent(null);
  };

  const hadnleFieldChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
		
    if (selectedEvent) {
			dispatchEvent({
				type: "update",
				payload: {
					...form,
					id: selectedEvent.id,
					date: selectedDay.date
				}
			})
    } else {
      dispatchEvent({
        type: "push",
        payload: {
          ...form,
          date: selectedDay.date,
          id: nanoid(),
        },
      });
    }

    setDisplayEventModal(false);
    setSelectedEvent(null);
  };

  const removeEvent = (calEvent) => {
    dispatchEvent({
      type: "delete",
      payload: calEvent,
    });
    setDisplayEventModal(false);
    setSelectedEvent(null);
  };

  const getDateString = () => {
		if (selectedEvent) {
			return `${new Date(selectedEvent.date).toLocaleDateString(undefined, {
				dateStyle: "short"
			})} ${new Date(selectedEvent.date).toLocaleTimeString(undefined, {
				timeStyle: "short"
			})}`
		}
    return `${calendar.date.toLocaleDateString(undefined, {
      dateStyle: "short",
    })} ${calendar.getCurrentTime()}`;
  };

  return createPortal(
    <div className={styles.layout}>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit}>
          <header className={styles.header}>
            <div>
              <h3>Add event</h3>
              <span>{`Created at: ${getDateString()}`}</span>
            </div>
            <button onClick={hideEventModal}>
              <AiOutlineClose />
            </button>
          </header>
          <div className={styles.body}>
            <label className={styles.label}>
              Title *
              <input
								maxLength={25}
                value={form.title}
                name="title"
                className={styles.input}
                onChange={hadnleFieldChange}
                type="text"
                placeholder="Title"
                required
              />
              <AiOutlineFileText className={styles.icon} />
            </label>
            <label className={styles.label}>
              Description
              <textarea
                value={form.description}
                name="description"
                className={styles.textarea}
                onChange={hadnleFieldChange}
                placeholder="Description here"
                rows={5}
              />
            </label>
          </div>
          <footer className={styles.footer}>
            <div className={styles.time}>
              <AiOutlineClockCircle />
              <p>
                {selectedDay.date.toLocaleDateString("en", {
                  dateStyle: "full",
                })}
              </p>
            </div>
            {selectedEvent && (
              <button
                className={styles.trash}
                type="button"
                onClick={() => {
                  removeEvent(selectedEvent);
                }}
              >
                <BiTrash />
              </button>
            )}

            <button type="submit" className={styles.save}>
              Save
            </button>
          </footer>
        </form>
      </div>
    </div>,
		document.getElementById("portal")
  );
};

export default EventModal;
