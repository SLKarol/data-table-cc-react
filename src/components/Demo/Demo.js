import React from 'react';
import DataTable from 'components/DataTable';

import { ON_CONTROL_COLUMNS } from 'constants/columns';
import { ON_CONTROL_DATA } from 'constants/data';
const sorted = [{ id: 'date', desc: 'asc' }];

function Demo(props) {
	return (
		<DataTable
			data={ON_CONTROL_DATA}
			columns={ON_CONTROL_COLUMNS}
			sorted={sorted}
		>
			<DataTable.Header />
			<DataTable.Body />
			<DataTable.Footer className="th-test">Тестовая таблица</DataTable.Footer>
		</DataTable>
	);
}

export default Demo;
