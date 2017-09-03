// This contains the "WasItHelpful" component

/**
 * External dependencies
 */
import classnames from 'classnames';

import { getPostId } from './data.js';

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
		var help;
		var _this = this;
		var postId = getPostId();
		var blockId = this.props.id;
	
		if ( postId === undefined ){
			this.setState( { yes: 0, no: 0 } );
		}
	
		// ha I don't know backbone or what I'm doing here
		wp.api.loadPromise.done( function() {
	
			var post = new wp.api.models.Post( { id: postId } );
			post.fetch().done( () => {
				var helpfulness = post.attributes.helpfulness;
				_this.setState({yes: helpfulness[blockId]["helpful"], no: helpfulness[blockId]["unhelpful"]});
				
			});
		});
	}

	render() {

		return (

			<div className="helpfulness">
				 <div className="wasitquestion">{ __( 'Was this helpful?' ) }</div>
				 <div className="wasit">
				 	<a className="yes" data-vote="helpful"><span className="screen-reader-text">Yes!</span><span aria-hidden="true">👍</span> <span className="number-yes">{ this.state.yes }</span> <span className="screen-reader-text">people think it is helpful.</span></a>	
				 	<a className="no" data-vote="unhelpful"><span className="screen-reader-text">No!</span><span aria-hidden="true">👎</span> <span className="number-no">{ this.state.no }</span> <span className="screen-reader-text">people think it is not helpful.</span></a>
				 </div>
			</div>
		);
	}
}

export default WasItHelpful;
