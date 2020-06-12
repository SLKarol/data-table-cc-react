import React from 'react';
import SortableIcons from './SortableIcons';

/**
 * @memberof DataTable
 * @method TH
 * @description Компонент ячейки заголовка таблицы
 * @param {Object} props
 * @param {any} props.children Заголовок. Может быть текстом или компонентой
 * @param {string} props.className Класс для заголовка
 * @param {boolean} props.sortable Колонка сортируется?
 * @param {Function} props.handleSortChange Обработчик сортировки колонки
 * @param {string} props.columnName Название колонки
 * @param {Array} props.sortedTable Как отсортирована таблица
 * @param {string} props.classNameHeader Добавочный css-класс к заголовку таблицы
 * @param {string} props.classNameSortable Класс для заголовка колонки у которой есть сортировка
 */
function TH({
	children,
	className = 'data-table__th',
	classNameSortable = 'data-table__th--sortable',
	sortable = false,
	handleSortChange,
	columnName,
	sortedTable,
	classNameHeader = '',
}) {
	const isString = typeof children === 'string';
	const Content = isString
		? children
		: children({ columnName, sortable, sorted: sortedTable, handleSortChange });
	const thClassName = `${className} ${classNameHeader} ${
		sortable ? classNameSortable : ''
	}`;
	//--- Показать дефолтные значки сортировки, если заголовок -строка И поле сортируется
	return (
		<div
			className={thClassName}
			data-column-name={columnName}
			data-column-sortable={sortable}
			onClick={handleSortChange}
		>
			{Content}
			{isString && sortable && (
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
