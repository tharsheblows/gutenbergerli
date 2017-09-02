// This contains the "WasItHelpful" component

/**
 * External dependencies
 */
import classnames from 'classnames';

const { __ } = wp.i18n;

// ha HA here's how you pick these up. I think that you can use anything you see in @wordpress/whatever by using wp.whatever
const {
	Component,
	createElement,
} = wp.element;

class WasItHelpful extends Component {
	constructor( props ) {
		super( props );
		this.state = { yes: 0, no: 0 }; // let's not make assumptions about people's preferences
	}

	componentDidMount () {
		this.getYesAndNo( this.props.id ); // once the component has mounted, figure out how many have found it helpful and how many haven't
	}

	getYesAndNo() {
		this.setState( { yes: 7, no: 1 } ); // currently it's 7 to 1 and there's nothing you can do about it
	}

	render() {

		return (

			<div className="helpfulness">
				 { __( 'Was this helpful?' ) }
				 <div className="wasit">
				 	<a className="yes" data-vote="helpful"><span className="screen-reader-text">Yes!</span><span aria-hidden="true">👍</span></a>
				 		<span className="number-yes">{ this.state.yes }</span> <span className="screen-reader-text">people think it is helpful.</span>
				 	<a className="no" data-vote="unhelpful"><span className="screen-reader-text">No!</span><span aria-hidden="true">👎</span></a>
				 		<span className="number-no">{ this.state.no }</span> <span className="screen-reader-text">people think it is not helpful.</span>
				 </div>
			</div>
		);
	}
}

export default WasItHelpful;
