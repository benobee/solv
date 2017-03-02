class Component {
	constructor(props) {
		this.props = props;
		this.html = this.formatHTML( this.render() );
	}
	formatHTML(str) {
		str = str.replace(/\r?\n|\r/g, "").replace(/\t/g, "");

		return str;
	}
	render(func) {
		return func;
	}
}

export default Component;

