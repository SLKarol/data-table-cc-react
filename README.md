# ReactTableCC

![Скриншот](https://github.com/SLKarol/data-table-cc-react/raw/master/screenshots/screenshot.PNG)

Компонент написан для работы-показа табличных данных. Посмотрел несколько проектов и решил написать свою компоненту :-).\
Задумка такая: Выводить табличные данные не в таблице, а в css-grid, причём не стеснять программиста в возможностях, как отображать данные.
Поэтому обязательный параметр - **columns**. Это массив свойств колонки, где можно задать как выводить заголовк и данные.

## Пример использования

```javascript
import DataTable from 'components/DataTable';
///
const ON_CONTROL_DATA = [
	{
		id: 1,
		mo: 'РП',
		date: '2018-06-12T07:14:02.875432',
		onControl: '2018-06-12T07:21:02.875432',
		comment: 'Работы по восстановлению дорожного полотна',
	},
	{
		id: 2,
		mo: 'ГО Верхняя Пышма',
		date: '2018-06-12T15:12:02.875432',
		onControl: '2018-06-12T05:18:02.875432',
		comment: 'Работы по восстановлению дорожного полотна',
	},
	{
		id: 3,
		mo: 'г. Первоуральск',
		date: '2018-06-11T04:15:02.875432',
		onControl: '2018-06-11T05:34:02.875432',
		dateEnd: '2018-06-11T11:20:02.875432',
		comment: 'Выполнение дезинфекционной обработки',
	},
];
const ON_CONTROL_COLUMNS = [
	{
		id: 'mo',
		Header: 'MO',
		width: 152,
		className: 'data-table__td--gray',
	},
	{
		id: 'date',
		Header: 'Зарегистрировано',
		width: 150,
		Render: ({ row }) => <ColumnDateReg date={row.date} />,
		sortable: true,
	},
	{
		id: 'onControl',
		width: 147,
		Header: () => (
			<div>
				На контроле/
				<br />
				Снято
			</div>
		),
		Render: ({ row }) => (
			<ColumnTwoDates
				date1={row.onControl}
				date2={row.dateEnd}
				dateFormat="DD.MM.YYYY HH:mm"
			/>
		),
	},
	{
		id: 'comment',
		Header: 'Причина постановки на контроль',
	},
];
const sorted = [{ id: 'date', desc: 'asc' }];

<DataTable data={ON_CONTROL_DATA} columns={ON_CONTROL_COLUMNS} sorted={sorted}>
	<DataTable.Header />
	<DataTable.Body />
	<DataTable.Footer className="th-test">Тестовая таблица</DataTable.Footer>
</DataTable>;
```

## Как использовать компонент

После того, как импортировали, и задали **<DataTable ...>** , внутри этого компонента можно задать компоненты **DataTable.Header**, **DataTable.Body**, **DataTable.Footer** - именно они отвечают за отображение таблицы. Без них Вы ничего не увидите. Обычно я совсем не использую **DataTable.Footer** .

- **DataTable.Header** Выводит заголовки таблицы
- **DataTable.Body** Выводит Таблицу
- **DataTable.Header** Выводит "подвал" таблицы

## Описание свойств(props)

### Props для DataTable

- **data** массив данных или Immutable.List
- **columns** массив настроек для колонок таблицы,- заголовки и вывод. Описание свойств объекта см. ниже
- **className** CSS класс для таблицы, по умолчанию _data-table_
- **sorted** Список в виде массива `{ id: 'date', desc: 'asc' }` , где _id_ имя поля, по которому идёт сортировка, _desc_ одно из: 'asc'|| 'desc'.

## Описание объекта columns из массива columns

- **id** Обязательное поле. Название колонки в талице. Хотя, можно и не в таблице. главное, чтобы id был уникальным
- **Header** Заголовок. Может быть или строкой или компонентой. Как и ID - обязательное поле
- **width** Ширина колонки в пикселях. Если не задано, то будет занято свободное место (аналог 1fr в гридах)
- **className** Класс для ячейки данных _(не для ячейки заголовка(!))_
- **classNameHeader** Класс для заголовка колонки. Будет дописан к классу, отвечающему за TH
- **classNameSortable** Класс для заголовка колонки у которой есть сортировка. Будет дописан к классу, отвечающему за TH
- **sortable** Логическое значение. Говорит о том, что можно ли сортировать по этой колонке
- **Render** Компонент, который выводит данные по этой колонке. _Параметр у компонента:_ текущая строка таблицы **row**.
  Если его не указывать, то будет выведено значение row[id] - id это то самое "Название колонки в талице", о котором я говорил в начале. Если указать, то это компонент, который принимает параметр row - текущая строка.

### Props для DataTable.Header

- **className** CSS класс для колонки-заголовка. Аналогично понятию "Класс для тэга TH"
- **onSortedChange** Обработчик изменения сортировки
- **theadClass** css-class для строки заголовка. По умолчанию data-table\_\_thead

### Props для DataTable.Body

- **className** CSS класс для строки данных. Аналогично понятию "Класс для тэга TR". Может быть функцией, аргумент которой- row. По умолчанию data-table\_\_row.
- **onClickRow** Обработчик нажатия на строке
- **onDoubleClickRow** Обработчик двойного нажатия на строке
- **timeOutBetweenClick** Время ожидания между кликами, чтобы понять, что это двойной клик
- **rowHeight** Высота строки. _Пример: rowHeight='50px'_
- **classNameContainerData** CSS класс для контейнера, где показаны данные. По умолчанию _container-with-scroll_
- **selectedIds** Список выбранных строк (значения Id)
- **selectRowClassName** CSS-класс выбранной строки
- **selectColInRowClassName** CSS-класс ячейки выбранной строки

### Props для DataTable.Footer

- **className** CSS класс для итоговой строки
- **children** Информация
