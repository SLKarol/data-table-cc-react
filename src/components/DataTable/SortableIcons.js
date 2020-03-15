import React from 'react';
import { ReactComponent as Arrow } from 'img/arrow-up.svg';

/**
 * Изображает значки сортировки
 */
export default function SortableIcons({ onClick, columnName, sortedTable }) {
	const sortThisColumn = sortedTable.find(s => s.id === columnName);
	const orderSort = sortThisColumn ? sortThisColumn.desc : 'desc';
	return (
		<div className="data-table__sort-icons">
			<button
				className={`data-table__button--order ${
					orderSort === 'asc' ? 'icon--active' : 'icon--gray'
				}`}
				data-column-sort-order="asc"
				onClick={onClick}
				data-column-name={columnName}
				data-column-sortable={true}
			>
				<Arrow className="data-table__header-svg" />
			</button>
			<button
				className={`data-table__button--order ${
					orderSort === 'desc' ? 'icon--active' : 'icon--gray'
				}`}
				data-column-sort-order="desc"
				onClick={onClick}
				data-column-name={columnName}
				data-column-sortable={true}
			>
				<Arrow
					className={`data-table__header-svg icon--rotate180 ${
						orderSort === 'desc' ? 'icon--active' : 'icon--gray'
					}`}
				/>
			</button>
		</div>
	);
}
