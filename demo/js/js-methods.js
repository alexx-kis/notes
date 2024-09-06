'use strict';


let headings = document.querySelectorAll('.block__heading');
// let lines = document.querySelectorAll('.line-vertical');

for (let i = 0; i < headings.length; i++) {
	headings[i].addEventListener('click', function () {
		// this.classList.toggle('active');
		// lines[i].classList.toggle('line-vertical--active');
		let list = this.nextElementSibling;
		if (list.style.maxHeight) {
			list.style.maxHeight = null;
		} else {
			list.style.maxHeight = list.scrollHeight + "px";
		}
	});
}

// let articleHeadings = document.querySelectorAll('.article__heading');
// // let articleContents = document.querySelectorAll('.article__content');

// for (let i = 0; i < articleHeadings.length; i++) {
// 	articleHeadings[i].addEventListener('click', function () {
// 		// this.classList.toggle('active');
// 		// lines[i].classList.toggle('line-vertical--active');
// 		let content = this.nextElementSibling;
// 		if (content.style.maxHeight) {
// 			content.style.maxHeight = null;
// 		} else {
// 			content.style.maxHeight = content.scrollHeight + "px";
// 		}
// 	});
// }