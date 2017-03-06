const List = [];

class Template {
	constructor(strings, ...exp) {
		this.root = document.createElement(this.parseNodeType(strings[ 0 ]));
		this.renderHTML(strings, exp);
		this.attributes(strings[ 0 ]);
		this.renderInnerContent(strings, exp);
		List.push(this);
	}
	renderHTML(strings, exp) {

		/*
		 * parse and join the strings and data
		*/
	
		let joined = strings.map((item, i) => {
			if (exp[ i ]) {
				return item + exp[ i ];
			} 

			return item;
		}).join("");

		joined = this.formatString(joined);
		this.innerHTML = joined;
	}
	renderInnerContent(strings, exp) {

		/*
		 * test whether string or object to determine
		 * whether or not to compile all HTML in array
		*/
	
		const innerContent = exp[ exp.length - 1 ];
		const variableTYPE = (typeof innerContent);

		if (variableTYPE === "string") {
		    this.root.innerHTML = this.innerHTML;
		} else if (variableTYPE === "object") {
		    if (Array.isArray(innerContent)) {
		        const joined = innerContent.map((item) => {
		        	return item.innerHTML;
		        }).join("");

 				this.innerHTML = joined;
		        this.root.innerHTML = joined;
		    }
		} else {
		   	console.error("needs to be a string or object");
		}
	}
	formatString(str) {

		/*
		 * remove all whitespace, tabs and return lines from string
		*/ 

		return str.replace(/\r?\n|\r/g, "").replace(/\t/g, "");
	}
	parseNodeType(str) {
		/* return the node type of the first element */
		str = this.formatString(str).replace(/\</g, "").replace(/\>/g, " ").split(" ");

		return str[ 0 ];
	}
	attributes(str) {

		/* 
		 * set attributes for root element 
		 * if attributes are simply declared 
		 * via a string 
		*/

		str = this.formatString(str).replace(/\</g, "").replace(/\>/g, " ").split(" ");

		str.forEach((item) => {

			const attr = item.replace(/"/g, "").split("=");

			if (attr.length > 1) {
				this.root.setAttribute(attr[ 0 ], attr[ 1 ]);
			}
		});
	}
}

/* 
 * return component as DOM element with inner
 * HTML injected into the first element in the string 
*/

let Component = {};

Component = (strings, ...exp) => {
	const taggedLiteral = new Template(strings, ...exp);

	return taggedLiteral.root;
};

Component.list = List; //append all elements to root component in core

/*
 * method for appending nodes which is contained
 * within the parent 'Component'
*/
Component.render = (element, target) => {
	target.appendChild(element);
};


export default Component;

