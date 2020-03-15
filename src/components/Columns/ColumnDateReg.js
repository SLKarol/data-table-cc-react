import React from 'react';
import moment from 'moment';
import attention from 'img/attention.svg';
import social from 'img/social.svg';

export default function ColumnDateReg({ date, status }) {
	const TEXT_VALUE = moment(date).format('DD.MM.YYYY HH:mm');
	let Icons = null;
	if (status === 1) {
		Icons = (
			<div>
				<img src={attention} alt="" />
				<img src={social} alt="" />
			</div>
		);
	}
	if (status === 2) {
		Icons = (
			<div>
				<img src={attention} alt="" />
			</div>
		);
	}

	return (
		<div className="table_cell__state-with-icon">
			<span className="table_cell__l20">{TEXT_VALUE}</span>
			{Icons}
		</div>
	);
}
