import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * @param selectedDate - 選択された日付と時刻
 * @param onChange - 日付と時刻が変更されたときのコールバック関数
 */

interface IInputDateTime {
  selectedDate: Date
  onChange: (date: Date | null) => void
}

const InputDateTime = ({ selectedDate, onChange }: IInputDateTime) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      // showTimeSelect
      // timeFormat="HH:mm"
      // timeIntervals={15}
      // dateFormat="MMMM d, yyyy h:mm aa"
      // timeCaption="Time"
      dateFormat="yyyy/MM/dd"
    />
  );
};

export default InputDateTime;
