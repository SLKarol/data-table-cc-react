import React from 'react';

/**
 * Компoнент колонки данных таблицы
 * @param {Object} param0
 */
function TD({ children, Render, row, className = 'data-table__td' }) {
	const Content = !Render ? children : <Render row={row} />;

	return <div className={className}>{Content}</div>;
}

export default TD;
