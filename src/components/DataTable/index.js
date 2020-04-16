import React, { createContext, useContext } from 'react';
import './data-table.css';
import './table-cell.css';
import TH from './TH';
import TRow from './TRow';
import ContainerWithScroll from 'components/ContainerWithScroll/ContainerWithScroll';
import { useGenerateTemplateColumns, useHandleChangeSort } from 'lib/DataTable';

const DataTableContext = createContext();

/**
 * Компонент "Таблица с данными"
 * @param {Object} params
 */
export default function DataTable({
	data,
	columns,
	children,
	className = 'data-table',
	sorted,
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
 * Компонент строки заголовков таблицы
 * @param {Object} param0
 */
DataTable.Header = function Header({ className, onSortedChange }) {
	const {
		columns,
		sorted,
		gridTemplateColumns,
		classNameDataTable,
	} = useContext(DataTableContext);
	const handleSortChange = useHandleChangeSort(onSortedChange);
	const Content = columns.map(({ id, Header, sortable = false }) => (
		<TH
			key={id}
			className={className}
			sortable={sortable}
			columnName={id}
			handleSortChange={handleSortChange}
			sortedTable={sorted}
		>
			{Header}
		</TH>
	));
	return (
		<div
			className={`${classNameDataTable} data-table__thead`}
			style={{ gridTemplateColumns: gridTemplateColumns + ' 5px' }}
		>
			{Content}
		</div>
	);
};

/**
 * Компонент строк с данными
 * @param {Object} props
 * @param {string} props.className CSS-класс для табилцы
 */
DataTable.Body = function Body({ className }) {
	const { columns, data, gridTemplateColumns, classNameDataTable } = useContext(
		DataTableContext
	);
	const Content = data.map(row => (
		<TRow
			key={row.id}
			row={row}
			columns={columns}
			className={className}
			styleRow={gridTemplateColumns}
		/>
	));
	return (
		<ContainerWithScroll>
			<div className={classNameDataTable}>{Content}</div>
		</ContainerWithScroll>
	);
};

/**
 * Компонент подвала таблицы. Для отрисовки пейджинга, например.
 * @param {Object} props
 */
DataTable.Footer = function Footer({
	className = 'data-table__footer',
	children,
}) {
	return <div className={className}>{children}</div>;
};
