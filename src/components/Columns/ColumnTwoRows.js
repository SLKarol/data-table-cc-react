import React from 'react';

/**
 * Колонка, содержащая две строки
 * @param {Object} param0
 */
export default function ColumnTwoRows({ row1, row2 }) {
	const ROW1 = typeof row1 === 'string' ? <span>{row1}</span> : row1;
	const ROW2 = typeof row2 === 'string' ? <span>{row2}</span> : row2;
	return (
		<div className="table_cell__two-vert-blocks table_cell__l20">
			{ROW1}
			{ROW2}
		</div>
	);
}
