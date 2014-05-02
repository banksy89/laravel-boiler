define( [ '../modules/helpers' ], function( Helpers ) {

	var helpers;

	describe( 'Tests for the helpers modules', function() {

		beforeEach( function() {
			helpers = new Helpers();
		});

		describe( 'Check Null tests', function() {

			it( 'Exists - string', function() {
				expect( helpers.check_null( 'Hello World' ) ).toBe( false );
			});

			it( 'Exists - int', function() {
				expect( helpers.check_null( 1 ) ).toBe( false );
			});

			it( 'Exists - object', function() {
				expect( helpers.check_null( { foo: 'bar' } ) ).toBe( false );
			});

			it( 'Doesnt exist', function() {
				expect( helpers.check_null( '' ) ).toBe( true );
			});
		});

		describe( 'Rounder tests', function() {

			it( 'Float - 2 decimal places', function() {
				expect( helpers.rounder( 1.1212121212, 2 ) ).toBe( 1.12 );
			});

			it( 'Float - 10 decimal places', function() {
				expect( helpers.rounder( 1.12121212121212, 10 ) ).toBe( 1.1212121212 );
			});

			it( 'Int', function() {
				expect( helpers.rounder( 2, 1 ) ).toBe( 2 );
			});
		});

		describe( 'ucfirst tests', function() {

			it( 'String one word', function() {
				expect( helpers.ucfirst( 'hello' ) ).toBe( 'Hello' );
			});

			it( 'String two words', function() {
				expect( helpers.ucfirst( 'hello world' ) ).toBe( 'Hello world' );
			});
		});
	});
});