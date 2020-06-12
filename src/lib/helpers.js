/**
 * Допустим имеется такая структура DOM:
 * <div class="main"><div class="a" data-id="5"><div class="b"><div>Кликни сюда</div><div></div></div></div>
 * А обработчик клика повесили на div.main, то он не сможет узнать data-id у div.a , если кликнуть на "Кликни сюда".
 * В этой функции событие e собирает все dataset'ы начиная от parent и заканчивая currentTarget
 * @param {Object} e Событие React Syntetic
 */
export const datasetFromBubbleEvent = (e) => {
	//--- Собрать изначальный dataset из события
	let re = Object.assign({}, e.target.dataset, e.currentTarget.dataset);
	//--- Кто родитель этого события?
	const parentElement = e.currentTarget.innerHTML;
	//--- Кто вызвал это событие?
	let { parentNode } = e.target;
	//--- Пройтись по родителям элемента, пока не достигнем родителя события
	while (!!parentNode && parentNode.innerHTML !== parentElement) {
		//--- Прибавить dataset
		Object.assign(re, parentNode.dataset);
		//---	Подняться вверх по дереву DOM
		parentNode = parentNode.parentNode;
	}
	return re;
};
