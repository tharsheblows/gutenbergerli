// I am using jQuery because it's already here. I like velocityjs better and that's what I'd use if it were just for me but it's not.
jQuery( document ).ready( function( $ ) {

	$( '.wp-block-gutenbergerli-faq .question' ).on( 'click', function(){
		
		var entry = $( this ).parent();
		$( entry ).find( '.answer' ).slideToggle();
		$( entry ).find( '.arrow' ).toggleClass( 'rotated' );
	});
});