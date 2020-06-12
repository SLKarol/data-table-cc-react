import React from 'react';

/**
 * @memberof DataTable
 * @method TD
 * @description Компoнент колонки данных таблицы
 * @param {Object} props
 * @param {Function} props.Render Рендер содержимого ячейки
 * @param {object} props.row Строка данных
 */
function TD({ children, Render, row, className = 'data-table__td' }) {
	const Content = !Render ? children : <Render row={row} />;

	return <div className={className}>{Content}</div>;
}

export default TD;
