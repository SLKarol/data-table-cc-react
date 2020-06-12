import React from 'react';
import { ReactComponent as Arrow } from 'img/down.svg';

/**
 * @memberof DataTable
 * @method SortableIcons
 * @description Изображает значки сортировки
 * @param {Object} props Параметры
 * @param {function} props.onClick Обработчик смены сортировки (смотрит на data-атрибут)
 * @param {string} props.columnName Название колонки
 * @param {Array} props.sortedTable Как отсортирована таблица?
 */
export default function SortableIcons({ onClick, columnName, sortedTable }) {
	//--- Эта колонка отсортирована (true||false)?
	const sortThisColumn = sortedTable.find((s) => s.id === columnName);
	//--- Как эта колонка отсортирована ('asc'||'desc') ?
	const orderSort = sortThisColumn ? sortThisColumn.desc : 'desc';
	/* Генерация класса для значка "Сортировать по возрастанию".
		Как работает: Если колонка не отсортирована ИЛИ сортировка по убыванию, то серым цветом рисовать, иначе- ярким
	*/
	const classNameArrowAsc = `data-table__header-svg icon--rotate180 ${
		!sortThisColumn || orderSort === 'desc' ? 'icon--gray' : 'icon--active'
	}`;
	/* Генерация класса для значка "Сортировать по убыванию".
		Как работает: Если колонка не отсортирована ИЛИ сортировка по возрастанию, то серым цветом рисовать, иначе- ярким
	*/
	const classNameArrowDesc = `data-table__header-svg ${
		!sortThisColumn || orderSort === 'asc' ? 'icon--gray' : 'icon--active'
	}`;
	return (
		<div className="data-table__sort-icons">
			<button
				className="data-table__button--order"
				data-column-sort-order="asc"
				onClick={onClick}
				data-column-name={columnName}
				data-column-sortable={true}
			>
				<Arrow className={classNameArrowAsc} />
			</button>
			<button
				className="data-table__button--order"
				data-column-sort-order="desc"
				onClick={onClick}
				data-column-name={columnName}
				data-column-sortable={true}
			>
				<Arrow className={classNameArrowDesc} />
			</button>
		</div>
	);
}
