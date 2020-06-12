import React, { createContext, useContext } from 'react';
import { List } from 'immutable';
import './data-table.css';
import './table-cell.css';
import TH from './TH';
import TRow from './TRow';
import ContainerWithScroll from 'components/ContainerWithScroll/ContainerWithScroll';
import {
	useGenerateTemplateColumns,
	useHandleChangeSort,
	useHandlerClickOnDataTable,
} from 'lib/DataTable';

const DataTableContext = createContext();

/**
 * @namespace DataTable
 * @description Компонент "Таблица с данными"
 * @see {@link README.md} в каталоге компонента для описания колонок
 * @param {Object} props
 * @param {Array} props.data Массив данных
 * @param {Array} props.columns Массив настроек для колонок таблицы,- заголовки и вывод. Описание свойств объекта см. README.md
 * @param {Array} props.sorted Массив отсортированных колонок. См. README.md
 */
export default function DataTable({
	data,
	columns,
	children,
	className = 'data-table',
	sorted = [],
}) {
	const gridTemplateColumns = useGenerateTemplateColumns(columns);
	return (
		<DataTableContext.Provider
			value={{
				data,
				columns,
				sorted,
				gridTemplateColumns,
				classNameDataTable: className,
			}}
		>
			{children}
		</DataTableContext.Provider>
	);
}

/**
 * @memberof DataTable
 * @method DataTable/Header
 * @description Компонент строки заголовков таблицы
 * @param {Object} props
 * @param {string} props.className CSS класс для колонки-заголовка. Аналогично понятию "Класс для тэга TH"
 * @param {Function} props.onSortedChange Обработчик изменения сортировки
 * @param {string} props.theadClass css-class для строки заголовка. По умолчанию data-table__thead
 */
DataTable.Header = function Header({
	className,
	onSortedChange,
	theadClass = 'data-table__thead',
}) {
	const {
		columns,
		sorted,
		gridTemplateColumns,
		classNameDataTable,
	} = useContext(DataTableContext);
	const handleSortChange = useHandleChangeSort(onSortedChange);
	const Content = columns.map(
		({ id, Header, sortable = false, classNameHeader, classNameSortable }) => (
			<TH
				key={id}
				className={className}
				sortable={sortable}
				columnName={id}
				handleSortChange={handleSortChange}
				sortedTable={sorted}
				classNameHeader={classNameHeader}
				classNameSortable={classNameSortable}
			>
				{Header}
			</TH>
		)
	);
	return (
		<div
			className={`${classNameDataTable} ${theadClass}`}
			style={{ gridTemplateColumns: gridTemplateColumns + ' 5px' }}
		>
			{Content}
		</div>
	);
};

/**
 * @memberof DataTable
 * @method DataTable/Body
 * @description Компонент строк с данными
 * @param {Object} props
 * @param {string} props.className CSS-класс для таблицы
 * @param {Function} props.onClickRow Обработчик нажатия на строке
 * @param {Function} props.onDoubleClickRow Обработчик двойного нажатия на строке
 * @param {number} props.timeOutBetweenClick Время ожидания между кликами, чтобы понять, что это двойной клик
 * @param {number} props.rowHeight Высота строки. _Пример: rowHeight='50px'_
 * @param {Array} props.selectedIds Список выбранных строк (значения Id).
 * @param {string} props.selectRowClassName CSS-класс выбранной строки
 * @param {string} props.selectColInRowClassName CSS-класс ячейки выбранной строки
 */
DataTable.Body = function Body({
	className = 'data-table__row',
	onClickRow,
	onDoubleClickRow,
	timeOutBetweenClick,
	rowHeight = '80px',
	classNameContainerData = 'container-with-scroll',
	selectedIds,
	selectRowClassName,
	selectColInRowClassName,
}) {
	const { columns, data, gridTemplateColumns, classNameDataTable } = useContext(
		DataTableContext
	);
	const isImmutable = List.isList(data);
	const Content = data.map((row) => {
		let isSelected = false;
		if (selectedIds) {
			if (isImmutable) {
				isSelected = selectedIds.indexOf(row.get('id')) > -1;
			} else {
				isSelected = selectedIds.indexOf(row['id']) > -1;
			}
		}
		return (
			<TRow
				key={isImmutable ? row.get('id') : row.id}
				row={row}
				columns={columns}
				className={className}
				gridTemplateColumns={gridTemplateColumns}
				timeOutBetweenClick={timeOutBetweenClick}
				selectRowClassName={selectRowClassName}
				isSelected={isSelected}
				selectColInRowClassName={selectColInRowClassName}
			/>
		);
	});
	const onClick = useHandlerClickOnDataTable({
		onClick: onClickRow,
		onDoubleClick: onDoubleClickRow,
		timeOutBetweenClick,
	});
	return (
		<ContainerWithScroll className={classNameContainerData}>
			<div
				className={classNameDataTable}
				onClick={onClick}
				style={{ gridAutoRows: `minmax(max-content, ${rowHeight})` }}
			>
				{Content}
			</div>
		</ContainerWithScroll>
	);
};

/**
 * @memberof DataTable
 * @method DataTable/Footer
 * @extends Component
 * @description Компонент подвала таблицы. Для отрисовки пейджинга, например.
 * @param {Object} props
 * @param {string} props.className CSS-класс для футера
 */
DataTable.Footer = function Footer({
	className = 'data-table__footer',
	children,
}) {
	return <div className={className}>{children}</div>;
};
