
import WasItHelpful from './wasthishelpful.js'; 

const queryString = require('query-string');

const { __ } = wp.i18n;
const {
	registerBlockType,
	Editable,
	InspectorControls, // we are going to use the InspectorControls
	BlockDescription, // and the BlockDescription
	source: {
		children,
		attr // the source of one of our attributes is an attribute http://gutenberg-devdoc.surge.sh/reference/attribute-sources/
	}
} = wp.blocks;

registerBlockType( 'gutenbergerli/faq', {
	title: __( 'Gutenbergerli faq' ),
	icon: 'index-card',
	category: 'layout',
	attributes: {
		// our faq, like many faqs, will have questions and answers
		// the question attribute is going to be an h4 element even though I am fairly sure this isn't good
		question: {
			type: 'array',
			source: children( 'h4' ),
		},
		// the answer attribute will be in a div with class="answer". 
		answer: {
			type: 'array',
			source: children( '.answer' ),
		},	
		// each block will get its own persistent id which is stored in the data-id attribute. To use attr(), declare it in the source bit above
		id: { 
			type: 'string',
			source: attr( 'div.wp-block-gutenbergerli-faq', 'data-id' ),
		}
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
			if ( attributes.id === undefined ) {
				props.setAttributes( { id: props.id } ); // the first time the question has focus, attributes.id is set
			}
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
		// In the Gutenberg plugin, they return an array but I'm going to do it like the Gutenberg examples plugin and wrap it all in a div to return one node
		// 
		// This returns the bit in the right hand sidebar under the Block tab (the <InspectorControls> component) as well as the block for the editor itself (the <Editable> components)
		// To use the new components, you need to declare them at the top in const { ... } = wp.blocks.
		// 
		// WasItHelpful adds the thumbs up / thumbs down functionality
		return (

			<div>
				{
					// if this is focused and editable, show this inspector control
					!! focusedEditable && (
						<InspectorControls key="inspector">
							<BlockDescription>
								<p>{ __( 'The id of this block is:' ) }</p>
								<p>{ attributes.id }</p>
								<hr />
							</BlockDescription>
						</InspectorControls>
					)
				}
	
				<div className={ props.className } data-id={ attributes.id } key="editor">
	
					<Editable
						tagName="h4"
						placeholder={ __( 'Question:' ) }
						value={ attributes.question }
						onChange={ onChangeQuestion }
						focus={ focusedEditable === 'question' }
						onFocus={ onFocusQuestion }
					/>
	
					
					<Editable
						tagName="div"
						multiline="p"
						className="answer"
						placeholder={ __( 'Answer:' ) }
						value={ attributes.answer }
						onChange={ onChangeAnswer }
						focus={ focusedEditable === 'answer' }
						onFocus={ onFocusAnswer }
					/>

					<WasItHelpful id = { attributes.id } />
				</div>
			</div>
		);
	},

	// Now this is what will save in your database and it's what will be displayed like normal except that this will be in between html comments like <!-- wp:gutenbergli/faq --> <!-- /wp:gutenbergerli/faq -->
	save: props => {
		const {
			className,
			attributes: {
				// the question
				question,
				// the answer
				answer,
				// the id
				id
			}
		} = props;
		// this is what gets saved, it's fairly straightforward here (looks familiar?) 
		return (
			<div className={ className } data-id={ id }>
				<div className="question">
					<div className="arrow">&#9656;</div>
					<h4>{ question }</h4>
				</div>
				<div className="answer">{ answer }</div>
			</div>
		);
	}
} );
