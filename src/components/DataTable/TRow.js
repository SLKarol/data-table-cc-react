import React, { useMemo } from 'react';
import TD from './TD';

/**
 * Компонент строки данных даблицы
 * @param {Object} props
 * @param {object} props.row Строка в таблице
 * @param {Array} props.columns Массив колонок в строке
 * @param {object} props.styleRow Стиль для строки
 */
function TRow({ row, columns, styleRow }) {
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
	return (
		<div className="data-table__row" style={{ styleRow }}>
			{Content}
		</div>
	);
}

export default TRow;
