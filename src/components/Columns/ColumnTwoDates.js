import React from 'react';
import moment from 'moment';
import ColumnTwoRows from './ColumnTwoRows';

export default function ColumnTwoDates({ date1, date2, dateFormat }) {
	const DATE1 = date1 ? moment(date1).format(dateFormat) : '';
	const DATE2 = date2 ? moment(date2).format(dateFormat) : '';
	return <ColumnTwoRows row1={DATE1} row2={DATE2} />;
}
