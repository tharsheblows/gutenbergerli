// I am using jQuery because it's already here. I like velocityjs better and that's what I'd use if it were just for me but it's not.
jQuery( document ).ready( function( $ ) {

	$( '.wp-block-gutenbergerli-faq .question' ).on( 'click', function(){
		
		var entry = $( this ).parent();
		$( entry ).find( '.answer' ).slideToggle();
		$( entry ).find( '.helpfulness' ).slideToggle();
		$( entry ).find( '.arrow' ).toggleClass( 'rotated' );
	});


	$( '.wp-block-gutenbergerli-faq .wasit a' ).on( 'click', function(){

		var helpfulnessVote = $( this ).attr( 'data-vote' );
		var block = $( this ).closest( '.wp-block-gutenbergerli-faq' );
		var blockId = $( block ).attr( 'data-id' );
		var wasItDiv = $( this ).parent();

		var helpfulnessData = {
			action: 'gutenbergerli_faq_helpfulness',
			nonce: mjjGutenbergerli.helpfulnessNonce,
			helpfulness: helpfulnessVote,
			postId: mjjGutenbergerli.postId,
			blockId: blockId
		}

		$.ajax({
			url : ajaxurl,
			type: "POST",
			data: helpfulnessData,
			success: function( data, textStatus, jqXHR ) {
				var reply = JSON.parse( data );
				if ( reply.result == 'succeed' ) {
					$( '.wp-block-gutenbergerli-faq[data-id="' + blockId + '"] .wasit span.number-yes' ).html( reply["helpfulnessJson"][blockId]["helpful"] );
					$( '.wp-block-gutenbergerli-faq[data-id="' + blockId + '"] .wasit span.number-no' ).html( reply["helpfulnessJson"][blockId]["unhelpful"] );
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				alert("Sorry, that didn't work.");
			}
		});

	});

	// sigh empty paragraph tags. let's remove them
	$('p:empty').remove();

	// don't know what I'm doing here but it's working so hey ho
	wp.api.loadPromise.done( function() {
		var post = new wp.api.models.Post( { id: mjjGutenbergerli.postId } );
		post.fetch({ 
			success: function( post ){
				// Callback triggered only after receiving the data.
				
				var helpfulness = post.attributes.helpfulness;
				$.each( helpfulness, function( key, value ){
					$( '.wp-block-gutenbergerli-faq[data-id="' + key + '"] .wasit span.number-yes' ).html( value.helpful );
					$( '.wp-block-gutenbergerli-faq[data-id="' + key + '"] .wasit span.number-no' ).html( value.unhelpful );
				});

			}
		}); 
	});

});