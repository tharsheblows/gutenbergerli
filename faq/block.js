const { __ } = wp.i18n;
const {
	registerBlockType,
	Editable,
	MediaUploadButton,
	source: {
		children
	}
} = wp.blocks;

registerBlockType( 'gutenbergerli/faq', {
	title: __( 'Gutenbergerli faq' ),
	icon: 'index-card',
	category: 'layout',
	attributes: {
		// our faq, like many faqs, will have questions and answers
		// the question attribute is going to be an h4 element even though I am fairly sure this isn't good
		question: children( 'h4' ),
		// the answer attribute will be in a div with class="answer". 
		answer: children( 'div.answer' ),
	},

	// this is responsible for the editor side of things in wp-admin when you're making a post
	edit: props => {
		// focus on the question bit as default
		const focusedEditable = props.focus ? props.focus.editable || 'question' : null;

		const attributes = props.attributes;

		// the function which handles what happens when the question is changed
		const onChangeQuestion = value => {
			props.setAttributes( { question: value } );
		};

		// the function which handles what happens when focus is on the question
		const onFocusQuestion = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'question' } ) );
		};

		// the function which handles what happens when the answer is changed
		const onChangeAnswer = value => {
			props.setAttributes( { answer: value } );
		};

		// the function which handles what happens when focus is on the answer
		const onFocusAnswer = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'answer' } ) );
		};


		// This is the bit that handles rendering in the editor
		return (
			// ok so className in React is just class="props.className" which is a user input on the side bit of the screen
			// one thing to note is that React returns one node only, so if you have multiple nodes, they need to be wrapped in a div or something.
			
			// Now we're cooking with gas, let's get into the sticky bits
			// this first one handles the question.
			// It's editable so use the Editable component: http://gutenberg-devdoc.surge.sh/blocks/introducing-attributes-and-editable-fields/
			// Hmmmm how can I add the arrow in here?
			<div className={ props.className }>

				<Editable
					// it's an h4
					tagName="h4"
					placeholder={ __( 'Question:' ) }
					// the value is whatever the question entered was
					value={ attributes.question }
					// when this component changes, run onChangeQuestion (it just sets it to the new question really)
					onChange={ onChangeQuestion }
					focus={ focusedEditable === 'question' }
					onFocus={ onFocusQuestion }
				/>

				
				<Editable
					// now for the answer. Again using the Editable component
					// it's in a div
					tagName="div"
					// if there are multiple lines, make them paragraphs
					multiline="p"
					// the class name is answer (so class="answer")
					className="answer"
					placeholder={ __( 'Answer:' ) }
					value={ attributes.answer }
					onChange={ onChangeAnswer }
					focus={ focusedEditable === 'answer' }
					onFocus={ onFocusAnswer }
				/>
			</div>
		);
	},

	// Now this is what will save in your database and it's what will be displayed like normal except that this will be in between html comments like <!-- wp:gutenbergli/faq --> <!-- /wp:gutenbergerli/faq -->
	save: props => {
		const {
			// the class name entered in the bit on the right. You can set this as a unique value for each block I think
			// Oh! It also includes the class generated for the block as detailed here: http://gutenberg-devdoc.surge.sh/blocks/applying-styles-with-stylesheets/ so this one will wp-block-gutenbergerli-faq
			className,
			attributes: {
				// the question
				question,
				// the answer
				answer
			}
		} = props;
		// this is what gets saved, it's fairly straightforward here (looks familiar?) 
		return (
			// wrap in a div with class="className"
			// the bit in h4 is the question 
			// and the bit in the div is the answer
			// I'm adding in the arrow so it's a little clearer? I am not good at design tbh
			<div className={ className }>
				<h4>
					<div className="arrow">&#9656;</div>
					{ question }
				</h4>
				<div className="answer">
					{ answer }
				</div>
			</div>
		);
	}
} );
