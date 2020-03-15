import React from 'react';
import SortableIcons from './SortableIcons';

/**
 * Компонент ячейки заголовка таблицы
 * @param {Object} params
 */
function TH({
	children, //--- Заголовок. Может быть текстом или компонентой
	className = 'data-table__th', //--- Класс для заголовка
	sortable = false, //--- Колонка сортируется?
	handleSortChange, //--- Обработчик сортировки колонки
	columnName, //--- Название колонки
	sortedTable, //--- Как отсортирована таблица
}) {
	const Content = typeof children === 'string' ? children : children();
	const thClassName = `${className} ${
		sortable ? 'data-table__th--sortable' : ''
	}`;

	return (
		<div
			className={thClassName}
			data-column-name={columnName}
			data-column-sortable={sortable}
			onClick={handleSortChange}
		>
			{Content}
			{sortable && (
				<SortableIcons
					onClick={handleSortChange}
					columnName={columnName}
					sortedTable={sortedTable}
				/>
			)}
		</div>
	);
}

export default TH;
