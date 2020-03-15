# ReactTableCC

![Скриншот](https://github.com/SLKarol//raw/master/screenshots/screenshot.PNG)

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
</DataTable>
```

## Как использовать компонент

После того, как импотировали, и задали **<DataTable ...>** , внутри этого компонента можно задать компоненты **DataTable.Header**, **DataTable.Body**, **DataTable.Footer** - именно они отвечают за отображение таблицы. Без них Вы ничего не увидите. Обычно я совсем не использую **DataTable.Footer** .

* **DataTable.Header** Выводит заголовки таблицы
* **DataTable.Body** Выводит Таблицу
* **DataTable.Header** Выводит "подвал" таблицы

## Описание свойств(props)

### Props для DataTable

* **data** массив данных
* **columns** массив, настроек для колонок таблицы,- заголовки и вывод. Описание свойств объекта см. ниже
* **className** CSS класс для таблицы, по умолчанию *data-table*
* **sorted** Список в виде массива ``` { id: 'date', desc: 'asc' } ``` , где *id* имя поля, по которому идёт сортировка, *desc* одно из: 'asc'|| 'desc'.

## Описание объекта columns из массива columns

 * **id**  Обязательное поле. Название колонки в талице. Хотя, можно и не в таблице. главное, чтобы id был уникальным
 * **Header** Заголовок. Может быть или строкой или компонентой. Как и ID - обязательное поле
 * **width** Ширина колонки в пикселях. Если не задано, то будет занято свобоное место (аналог 1fr в гридах)
 * **className** Класс для ячейки данных *(не для ячейки заголовка(!))*
 * **Render** Компонент, который выводит данные по этой колонке. Если его не указывать, то будет выведено значение row[id] - id это то самое "Название колонки в талице", о котором я говорил в начале. Если указать, то это компонент, который принимает параметр row - текущая строка.

### Props для DataTable.Header

* **className** CSS класс для колонки-заголовка. Аналогично понятию "Класс для тэга TH"
* **onSortedChange** Обработчик, когда пользователь изменит сортировку

### Props для DataTable.Body

* **className** CSS класс для колонки данных. Аналогично понятию "Класс для тэга TD"

### Props для DataTable.Footer

* **className** CSS класс для итоговой строки
* **children** Информация