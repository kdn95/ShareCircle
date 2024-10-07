import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';


const Calendar = ({ onConfirmDates }) => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (item) => {
    setDates([item.selection]);
  };

  const handleConfirmDates = () => {
    // Call the onConfirmDates function passed from ItemsListing
    onConfirmDates(dates[0]);
  };

  return (
    <div className="calendar-container">
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        ranges={dates}
        className="calendar"
      />
      {/* Confirm Dates Button */}
      <button onClick={handleConfirmDates} className="confirm-dates-button">
        Confirm Dates
      </button>
    </div>
  );
};

export default Calendar;
