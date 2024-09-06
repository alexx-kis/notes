"use strict";

let headings = document.querySelectorAll('.heading');
let inners = document.querySelectorAll('.section__inner');

for (let i = 0; i < headings.length; i++) {
	headings[i].addEventListener('click', function () {
		if (inners[i].clientHeight == 0) {
			inners[i].style.maxHeight = inners[i].scrollHeight + 'px';
		} else {
			inners[i].style.maxHeight = 0;
		}
	});
}