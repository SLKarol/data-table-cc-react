import { useState, useEffect, useCallback } from 'react';
import { datasetFromBubbleEvent } from './helpers';

/**
 * @memberof DataTable
 * Генерирует значение grid-template-columns
 * @param {Array} columns Настройки колонок
 */
export const generateGridTemplateColumns = (columns) => {
	const cols = columns.reduce((str, col) => {
		//--- Если есть свойство width, значит работаем
		if ('width' in col) {
			const { width } = col;
			const colWidth = `${width}`;
			if (colWidth.includes('%') || colWidth.includes('fr')) {
				return `${str}${width} `;
			}
			return `${str}${width}px `;
		}
		//--- Иначе приравниваем ширину к 1fr
		return str + '1fr ';
	}, '');
	return cols.trim();
};

/**
 * @memberof DataTable
 * Хук для получения значения grid-template-columns
 * @param {Array} columns Настройки колонок
 */
export function useGenerateTemplateColumns(columns) {
	const [templateColumns, setTemplateColumns] = useState(
		generateGridTemplateColumns(columns)
	);
	useEffect(() => setTemplateColumns(generateGridTemplateColumns(columns)), [
		columns,
	]);

	return templateColumns;
}

/**
 * @memberof DataTable
 * Хук для вызова функции сортировки.
 * Поскольку от клика на заголовке столбца и его сортировки должна пройти проверка,-
 * Можно ли сортировать по этой колонке И как сортировать,
 * Плюс ещё всякие обходные пути, чтобы в сортировку ушла не DOM-инфа, а инфа по сортировке,
 * То всё это вот и происходит здесь.
 * Этот хук будет функ цию сортировки данных только с теми параметрами, которые нужны для работы.
 * (Это назвается инкапсуляция)
 * @param {Function} onSortedChange Функция, которую нужно вызвать для сортировки
 */
export function useHandleChangeSort(onSortedChange) {
	const handleChangeSort = useCallback(
		(e) => {
			if (onSortedChange) {
				//--- Получить data-атрибуты сортировки
				const {
					columnName,
					columnSortOrder,
					columnSortable,
				} = datasetFromBubbleEvent(e);
				if (columnSortable === 'true') {
					e.stopPropagation();
					onSortedChange({ columnName, columnSortOrder, columnSortable });
				}
			}
		},
		[onSortedChange]
	);
	return handleChangeSort;
}

const updaterSorting = (value) => (value === 'desc' ? 'asc' : 'desc');

/**
 * @memberof DataTable
 * @param {Map} sortSetting Настройка сортировки
 * @param {String} sortOrder Порядок сортировки (asc/desc)
 */
export function changeSort(sortSetting, sortOrder) {
	//--- Самый порстой случай: Нажали на кнопки, отвечающие за порядок
	if (sortOrder) return sortSetting.set('desc', sortOrder);
	/* 
	Если "Порядок сортировки" пустой, значит пришёл из порстого нажатия на столбец.
	А это значит, что нужно "перевернуть сортировку" или даже назначить по умолчанию
	*/
	return sortSetting.update('desc', 'desc', updaterSorting);
}

/**
 * @memberof DataTable
 * @description Умный обработчик нажатий на строку - один на всю таблицу
 * @param {Object} setting
 * @param {function} setting.onClick Обработчик клика на строке
 * @param {function} setting.onDoubleClick Обработчик двойного клика на строке
 * @param {number} setting.timeOutBetweenClick Время ожидания между двумя кликами _(по умолчанию 250)_
 */
export function useHandlerClickOnDataTable(setting) {
	const { onClick, onDoubleClick, timeOutBetweenClick = 250 } = setting;
	/*
	 Настройки кликов.
	 Сделано в объекте, чтобы все нужные переменные собрать в одном месте
	*/
	const timeOutSetting = { timerId: null, started: false, idRow: null };
	return useCallback(
		(e) => {
			//--- Если 250мс назад кликал на этой строке, то это понимать, как событие двойного клика
			if (timeOutSetting.started) {
				clearTimeout(timeOutSetting.timerId);
				onDoubleClick && onDoubleClick(timeOutSetting.idRow);
				timeOutSetting.started = false;
			} else {
				//--- Если раньше не кликал на этой строке, то ждать 250мс и выполнять процедуру клика
				timeOutSetting.started = true;
				const { idRow } = datasetFromBubbleEvent(e);
				timeOutSetting.idRow = idRow;
				timeOutSetting.timerId = setTimeout(() => {
					clearTimeout(timeOutSetting.timerId);
					onClick && onClick(timeOutSetting.idRow);
					timeOutSetting.started = false;
				}, timeOutBetweenClick);
			}
		},
		[
			onClick,
			onDoubleClick,
			timeOutBetweenClick,
			timeOutSetting.idRow,
			timeOutSetting.started,
			timeOutSetting.timerId,
		]
	);
}
