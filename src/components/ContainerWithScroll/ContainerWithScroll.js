import React from 'react';

/**
 * Вывести данные с вертикальным скроллбаром
 * @module ContainerWithScroll
 * @param {Object} props
 * @param {object|string} props.children
 * @param {string} [props.className='container-with-scroll'] props.className CSS-класс контейнера
 * @param {string} props.height Задавать его не нужно- здравый смысл против, но Стас оставил такую возможность
 */
export default function ContainerWithScroll({
	children,
	className = 'container-with-scroll',
	height = '',
}) {
	const style = height ? { height } : {};

	return (
		<div className={`${className}`} style={style} data-testid="with-scroll">
			{children}
			<div className="container-with-scroll__scroll"></div>
		</div>
	);
}
