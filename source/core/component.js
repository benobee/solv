/*
 * @description: turn a tagged template literal into a 
 * DOM element 
*/

class Template {
	constructor(strings, ...exp) {
		this.root = document.createElement(this.parseNodeType(strings[ 0 ]));
		this.renderHTML(strings, exp);
		this.renderInnerContent(strings, exp);
		this.parseAttributes(strings, exp);
		List.push(this);

		console.log(this);
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

		this.staticHTML = joined;

	}
	renderInnerContent(strings, exp) {

		/*
		 * test whether string or object to determine
		 * whether or not to compile all HTML in array
		*/
	
		const innerContent = exp[ exp.length - 1 ];
		const variableTYPE = (typeof innerContent);

		if (variableTYPE === "string") {
		    this.root.innerHTML = this.staticHTML;
		} else if (variableTYPE === "object") {
		    if (Array.isArray(innerContent)) {
		        const joined = innerContent.map((item) => {
		        	return item.innerHTML;
		        }).join("");

 				this.staticHTML = joined;
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
	parseAttributes(strings, exp) {

		/* 
		 * set attributes for root element 
		 * if attributes are simply declared 
		 * via a string 
		*/
	
		const joined = strings.map((item, i) => {
			if (exp[ i ]) {
				return item + exp[ i ];
			} 
			return item;
		}).join("");

		const dummyDOM = document.createElement("html");

		const chopper = document.createElement("div");

		chopper.setAttribute('id', 'chopper');
		dummyDOM.appendChild(chopper);
		chopper.innerHTML = joined;

		const attributes = chopper.childNodes[ 1 ].attributes;

		const output = {};

		for (let i = attributes.length - 1; i >= 0; i--) {
        	output[ attributes[ i ].name ] = attributes[ i ].value;
        }

        this.props = output;

		const keys = Object.keys(output);
		const values = Object.values(output);

		keys.forEach((item, i) => {
			this.root.setAttribute(item, values[ i ]);
		});
	}
}

/* 
 * return component as DOM element with inner
 * HTML injected into the first element in the string 
*/

const List = [];
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

