import React from 'react';
import ColumnDateReg from 'components/Columns/ColumnDateReg';
import ColumnTwoDates from 'components/Columns/ColumnTwoDates';

export const ON_CONTROL_COLUMNS = [
	{
		id: 'mo',
		Header: 'MO',
		width: 152,
		className: 'data-table__td--gray',
	},
	{
		id: 'date',
		Header: 'Зарегистрировано',
		width: 150,
		Render: ({ row }) => <ColumnDateReg date={row.date} status={row.status} />,
		sortable: true,
	},
	{
		id: 'onControl',
		width: 147,
		Header: () => (
			<div>
				На контроле/
				<br />
				Снято
			</div>
		),
		Render: ({ row }) => (
			<ColumnTwoDates
				date1={row.onControl}
				date2={row.dateEnd}
				dateFormat="DD.MM.YYYY HH:mm"
			/>
		),
	},
	{
		id: 'comment',
		Header: 'Причина постановки на контроль',
	},
];
