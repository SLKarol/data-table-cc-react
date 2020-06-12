import { useState, useEffect, useCallback } from 'react';

/**
 * Генерирует значение grid-template-columns
 * @param {Array} columns Настройки колонок
 */
const generateGridTemplateColumns = (columns) => {
	const cols = columns.reduce((str, col) => {
		const widthCol = 'width' in col ? `${col.width}px ` : '1fr ';
		return str + widthCol;
	}, '');
	return cols.trim();
};

/**
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
 * Хук для вызова функции сортировки.
 * Поскольку от клика на заголовке столбца и его сортировки должна пройти проверка,-
 * Можно ли сортировать по этой колонке И как сортировать,
 * Плюс ещё всякие обходные пути, чтобы в сортировку ушла не DOM-инфа, а инфа по сортировке,
 * То всё это вот и происходит здесь.
 * Этот хук будет функцию сортировки данных только с теми параметрами, которые нужны для работы.
 * (Это назвается инкапсуляция)
 * @param {Function} onSortedChange Функция, которую нужно вызвать для сортировки
 */
export function useHandleChangeSort(onSortedChange) {
	const handleChangeSort = useCallback(
		(e) => {
			if (onSortedChange) {
				//--- Получить data-атрибуты сортировки
				const { columnName, columnSortOrder, columnSortable } = Object.assign(
					{},
					e.currentTarget.dataset
				);
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
 *
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
