import React from 'react';

/**
 * Вывести данные с вертикальным скроллбаром.
 * height задаётся строкой. Задавать его не нужно- здравый смысл против, но стас оставил такую возможность
 * @param {Object} param0
 */
export default function ContainerWithScroll({
	children,
	className = '',
	height = '',
}) {
	const style = height ? { height } : {};

	return (
		<div className={`container-with-scroll ${className}`} style={style}>
			{children}
			<div className="container-with-scroll__scroll"></div>
		</div>
	);
}
