import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import TD from './TD';

/**
 * @memberof DataTable
 * @method TRow
 * @description Компонент строки данных даблицы
 * @param {Object} props
 * @param {object} props.row Строка в таблице
 * @param {Array} props.columns Массив колонок в строке
 * @param {string|Function} props.className CSS-класс блока строки данных. Может быть или строкой или функцией от row
 * @param {string} props.gridTemplateColumns Значение grid-template-columns для блока строки
 * @param {Function} props.onClickRow Обработчик нажатия на строке
 * @param {Function} props.onDblClickRow Обработчик двойного нажатия на строке
 * @param {number} props.timeOutBetweenClick Время ожидания между кликами, чтобы понять, что это двойной клик
 * @param {Array} props.isSelected Строка выбрана?
 * @param {string} props.selectRowClassName CSS-класс выбранной строки
 * @param {string} props.selectColInRowClassName CSS-класс ячейки выбранной строки
 */
export default class TRow extends Component {
	static propTypes = {
		row: PropTypes.oneOfType([
			PropTypes.instanceOf(Object),
			PropTypes.instanceOf(Map),
		]).isRequired,
		columns: PropTypes.array.isRequired,
		gridTemplateColumns: PropTypes.string.isRequired,
		className: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
			.isRequired,
		selectRowClassName: PropTypes.string,
		selectColInRowClassName: PropTypes.string,
		isSelected: PropTypes.bool.isRequired,
	};

	/**
	 * Генерация контента компоненты
	 */
	createContent = () => {
		const {
			columns,
			row,
			isSelected,
			selectColInRowClassName = '',
		} = this.props;
		const isImmutable = Map.isMap(row);
		return columns.map(({ id, Render, className = '' }, idx) => {
			let calcClassName = 'data-table__td';
			if (idx === 0) {
				calcClassName += ' data-table__td--first';
			}
			if (idx === columns.length - 1) {
				calcClassName += ' data-table__td--last';
			}
			calcClassName += ' ' + className;
			if (isSelected) {
				calcClassName += ' ' + selectColInRowClassName;
			}
			return (
				<TD key={id} Render={Render} row={row} className={calcClassName}>
					{isImmutable ? row.get(id) : row[id]}
				</TD>
			);
		});
	};

	/**
	 * Создаёт CSS-класс для табличной строки.
	 */
	createClassName = () => {
		const { className, isSelected, selectRowClassName = '', row } = this.props;
		//--- Если этот класс строка, то ничего необычного- делать обычную работу
		if (typeof className === 'string') {
			return `${className} ${isSelected ? selectRowClassName : ''}`;
		}
		//--- Если функция, то пусть она сама и решает, какой класс ставить на строку
		return className(row);
	};

	render() {
		const { row, gridTemplateColumns } = this.props;

		const isImmutable = Map.isMap(row);
		const id = isImmutable
			? row.get('id', 'unknowId')
			: row.hasOwnProperty('id')
			? row.id
			: 'unknowId';
		const className = this.createClassName();
		const Content = this.createContent();

		return (
			<div
				className={className}
				style={{ gridTemplateColumns }}
				data-id-row={id}
			>
				{Content}
			</div>
		);
	}
}
