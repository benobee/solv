import $ from 'jquery';
import { Collection, Component } from '../core/index.js';
import Util from '../util/util.js';

/* define new collection */
const blog = new Collection('blog');

/*mock array */
const items = [
	{ title: 'DOG STORY', tags: ["Monkey, Lion, Sheep"] },
	{ title: 'CAT STORY', tags: ["Lion, Sheep"] },
	{ title: 'PARROT STORY', tags: ["Zebra, Sheep"] },
	{ title: 'GHOST STORY', tags: ["Bear, Sheep"]
}];

/* create list of pets component*/
const pet_stories = Component `
	<div class="collection-list" data-name="animals">
		${items.map((item, i) => {

			return (
				Component `
					<div class="collection-item animal" data-id="${"id_" + (i + 1)}" data-tags="${item.tags}">
						<div class="title">${(i + 1) + ' ' + item.title}</div>
					</div>
				`
			);

		})}
	</div>`;

/* if the blog list is active render the component */
if (blog.list) {
	const target = document.getElementById('page');

	Component.render(pet_stories, target);
}

export default blog;