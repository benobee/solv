import $ from 'jquery';
import { Collection, Component, Controller } from '../core/index.js';
import Util from '../util/util.js';

/* define new collection */
const blog = new Collection('blog');

const items = [{ title: 'DOG STORY' }, { title: 'CAT STORY' }, { title: 'PARROT STORY' }];

/* create item view */
class Blog_Item extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			`
				<div class="collection-item" data-id="${this.props.data.id}">
					<div class="container">
						<div class="content">
							<div class="title">
								${this.props.data.title}
							</div>
						</div>
					</div>
				</div>
			`
		);		
	}
}

class Blog_List extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const array = this.props.items.map( (item, i) => {
			
			const data = {
				id: 'id_' + i,
				title: item.title
			};

			const post = new Blog_Item({ data });

			return post.html;

		}).join("");

		return (
			`<div class="collection-list" data-tags="farm,dog">${array}</div>`
		);
	}
}

const List = new Blog_List({ items });

$('#page').append(List.html);

export default blog;