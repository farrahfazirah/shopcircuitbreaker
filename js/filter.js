// external js: isotope.pkgd.js
Isotope.Item.prototype._create = function() {
  // assign id, used for original-order sorting
  this.id = this.layout.itemGUID++;
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };
  this.sortData = {};
};

Isotope.Item.prototype.layoutPosition = function() {
  this.emitEvent( 'layout', [ this ] );
};

Isotope.prototype.arrange = function( opts ) {
  // set any options pass
  this.option( opts );
  this._getIsInstant();
  // just filter
  this.filteredItems = this._filter( this.items );
  // flag for initalized
  this._isLayoutInited = true;
};

// layout mode that does not position items
Isotope.LayoutMode.create('none');

function initIsotope () {
  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.card-custom',
    layoutMode: 'none'
  });
  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };
  // bind filter button click
  $('.filters-button-group').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $grid.isotope({ filter: filterValue });
  });
  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
}