import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

const Calendar = ({ onDatesChange }) => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (item) => {
    setDates([item.selection]);
    onDatesChange(item.selection); // Pass selected dates back to parent
  };

  return (
    <div className="calendar-container">
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={dates}
        minDate={new Date()}
        className="calendar"
      />
      <p>
        Selected: {`${format(dates[0].startDate, 'MM/dd/yyyy')} - ${format(dates[0].endDate, 'MM/dd/yyyy')}`}
      </p>
    </div>
  );
};

export default Calendar;
