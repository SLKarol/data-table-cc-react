import React, { useMemo } from 'react';
import TD from './TD';

/**
 * Компонент строки данных даблицы
 * @param {Object} param0
 */
function TRow({ row, columns }) {
	const Content = useMemo(
		() =>
			columns.map(({ id, Render, className = '' }, idx) => {
				let calcClassName = 'data-table__td';
				if (idx === 0) {
					calcClassName += ' data-table__td--first';
				}
				if (idx === columns.length - 1) {
					calcClassName += ' data-table__td--last';
				}
				calcClassName += ' ' + className;
				return (
					<TD key={id} Render={Render} row={row} className={calcClassName}>
						{row[id]}
					</TD>
				);
			}),
		[row, columns]
	);
	return <>{Content}</>;
}

export default TRow;
