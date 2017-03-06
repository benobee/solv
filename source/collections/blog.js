import $ from 'jquery';
import { Collection, Component } from '../core/index.js';
import Util from '../util/util.js';

/* define new collection */
const blog = new Collection('blog');

/*mock array */
const items = [
	{ 
		title: 'DOG STORY', 
		tags: ["Monkey, Lion, Sheep"],
		assetUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRmpJaTWLE_yk1yX1afD3l0gj3uJDPNgMCJHNx5NO8KAS5LyZY3" 
	},
	{ 
		title: 'CAT STORY', 
		tags: ["Lion, Sheep"],
		assetUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQm-niOUg-1PU8LA_1A5WBXigoUpDzeTvOpyivzm5fbARZyPzatqw" 
	},
	{ 
		title: 'PARROT STORY', 
		tags: ["Zebra, Sheep"],
		assetUrl: "http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7pS2VP2wnKyN8wxywmXtY0-FwsgxoJBD4C1qJrqA8EfaP7jL8gZYg0MJlb9NNBxrHhmaSdwF/" 
	},
	{ 
		title: 'GHOST STORY', 
		tags: ["Bear, Sheep"],
		assetUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSv9pQHL64nevEUhhh1XC6v49HukH-DC-pqeeKA4whC6wZEMdBw" 
	},
	{ 
		title: 'BOAT STORY', 
		tags: ["Bear, Sheep, Murder"], 
		assetUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcShhqRwDd6onpr-rw0LrIwRYdkMMTKU5R7SP38N2FKhP3r42rHL" 
	}
];

/* create list of pets component*/
const pet_stories = Component `
	<div id="man-dingo" class="collection-list" data-name="animals" data-size="${44}">
		${items.map((item, i) => {

			return (
				Component `
					<div class="collection-item animal" data-id="${"id_" + (i + 1)}" data-tags="${item.tags}">
						<div class="content">
							<div class="media">
								<div class="image" style="background-image:url('${item.assetUrl}');"></div>
							</div>
							<div class="title">${item.title}</div>
						</div>
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