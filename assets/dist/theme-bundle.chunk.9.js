(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.join */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");






function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);

  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Cart.prototype;

  _proto.onReady = function onReady() {
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components

    this.bindEvents();
  };

  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1; // Does not quality for min/max quantity

    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;

    if (preVal === void 0) {
      preVal = null;
    }

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry; // Does not quality for min/max quantity

    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: invalidEntry + " is not a valid entry",
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartEditOptions = function cartEditOptions(itemId) {
    var _this4 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_9__["defaultModal"])();
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);

      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].hooks.on('product-option-change', function (event, option) {
      var $changedOption = $(option);
      var $form = $changedOption.parents('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      var item = $('[name="item_id"]', $form).attr('value');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.productAttributes.optionChange(item, $form.serialize(), function (err, result) {
        var data = result.data || {};

        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }

        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };

  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;

    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages'
      }
    };
    this.$overlay.show(); // Remove last item from cart? Reload

    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);

      _this5.$cartTotals.html(response.totals);

      _this5.$cartMessages.html(response.statusMessages);

      $cartPageTitle.replaceWith(response.pageTitle);

      _this5.bindEvents();

      _this5.$overlay.hide();

      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
    });
  };

  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;

    var debounceTimeout = 400;

    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_4___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(this.cartUpdate, debounceTimeout), this);

    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_4___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);

    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_4___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(this.cartRemoveItem, debounceTimeout), this);

    var preVal; // cart update

    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdate($target);
    }); // cart qty manually updates

    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      event.preventDefault(); // edit item in cart

      _this6.cartEditOptions(itemId);
    });
  };

  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;

    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault(); // Empty code

      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
            text: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;

    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();

      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_6__["default"])(code)) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: $certInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
            text: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_9__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);

        _this9.bindGiftWrappingForm();
      });
    });
  };

  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');

      if (!id) {
        return;
      }

      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();

      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');

    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');

      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }

    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };

  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents(); // initiate shipping estimator module

    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_8__["default"]($('[data-shipping-estimator]'));
  };

  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_5__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_number_is_nan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.number.is-nan */ "./node_modules/core-js/modules/es.number.is-nan.js");
/* harmony import */ var core_js_modules_es_number_is_nan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_nan__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_form_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/form-utils */ "./assets/js/theme/common/form-utils.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");









var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }

  var _proto = ShippingEstimator.prototype;

  _proto.initFormValidation = function initFormValidation() {
    var _this = this;

    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_4__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit"
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }

      if (_this.shippingValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };

  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: 'The \'Country\' field cannot be blank.'
    }]);
  };

  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;

    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");

        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }

        cb(result);
      },
      errorMessage: 'The \'State/Province\' field cannot be blank.'
    }]);
  }
  /**
   * Toggle between default shipping and ups shipping rates
   */
  ;

  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };

  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;

    var $last; // Requests the states for a country with AJAX

    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_3__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }

      var $field = $(field);

      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }

      if ($last) {
        _this3.shippingValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;

        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_form_utils__WEBPACK_IMPORTED_MODULE_6__["Validators"].cleanUpStateValidation(field);
      } // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us


      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };

  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content); // bind the select button

        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $estimatorContainer.removeClass('u-hiddenVisually');
      $('.shipping-estimate-hide').show();
    });
    $('.shipping-estimate-hide').on('click', function (event) {
      event.preventDefault();
      $estimatorContainer.addClass('u-hiddenVisually');
      $('.shipping-estimate-show').show();
      $('.shipping-estimate-hide').hide();
    });
  };

  return ShippingEstimator;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string') {
    return false;
  } // Add any custom gift certificate validation logic here


  return true;
});

/***/ }),

/***/ "./assets/js/theme/global/sweet-alert.js":
/*!***********************************************!*\
  !*** ./assets/js/theme/global/sweet-alert.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_weak_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.weak-map */ "./node_modules/core-js/modules/es.weak-map.js");
/* harmony import */ var core_js_modules_es_weak_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_weak_map__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var weakmap_polyfill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! weakmap-polyfill */ "./node_modules/weakmap-polyfill/weakmap-polyfill.js");
/* harmony import */ var weakmap_polyfill__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(weakmap_polyfill__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_6__);






 // WeakMap will defined in the global scope if native WeakMap is not supported.

var weakMap = new WeakMap(); // eslint-disable-line no-unused-vars
// Set defaults for sweetalert2 popup boxes

var Swal = sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.mixin({
  buttonsStyling: false,
  customClass: {
    confirmButton: 'button',
    cancelButton: 'button'
  }
}); // Re-export

/* harmony default export */ __webpack_exports__["default"] = (Swal);

/***/ }),

/***/ "./node_modules/lodash/_createCtor.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createCtor.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtor;


/***/ }),

/***/ "./node_modules/lodash/_createWrap.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createWrap.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js"),
    createCtor = __webpack_require__(/*! ./_createCtor */ "./node_modules/lodash/_createCtor.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartial;


/***/ }),

/***/ "./node_modules/lodash/_getHolder.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getHolder.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ "./node_modules/lodash/_replaceHolders.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_replaceHolders.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "./node_modules/lodash/bind.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/bind.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    createWrap = __webpack_require__(/*! ./_createWrap */ "./node_modules/lodash/_createWrap.js"),
    getHolder = __webpack_require__(/*! ./_getHolder */ "./node_modules/lodash/_getHolder.js"),
    replaceHolders = __webpack_require__(/*! ./_replaceHolders */ "./node_modules/lodash/_replaceHolders.js");

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and `partials` prepended to the arguments it receives.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // Bound with placeholders.
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
var bind = baseRest(function(func, thisArg, partials) {
  var bitmask = WRAP_BIND_FLAG;
  if (partials.length) {
    var holders = replaceHolders(partials, getHolder(bind));
    bitmask |= WRAP_PARTIAL_FLAG;
  }
  return createWrap(func, bitmask, thisArg, partials, holders);
});

// Assign default placeholders.
bind.placeholder = {};

module.exports = bind;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvZ2xvYmFsL3N3ZWV0LWFsZXJ0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NyZWF0ZUN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlV3JhcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRIb2xkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcmVwbGFjZUhvbGRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9iaW5kLmpzIl0sIm5hbWVzIjpbIkNhcnQiLCJvblJlYWR5IiwiJGNhcnRDb250ZW50IiwiJCIsIiRjYXJ0TWVzc2FnZXMiLCIkY2FydFRvdGFscyIsIiRvdmVybGF5IiwiaGlkZSIsImJpbmRFdmVudHMiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIml0ZW1JZCIsImRhdGEiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsInZhbCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzd2FsIiwiZmlyZSIsInRleHQiLCJpY29uIiwic2hvdyIsInV0aWxzIiwiYXBpIiwiY2FydCIsIml0ZW1VcGRhdGUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiY2FydFJlbW92ZUl0ZW0iLCJpdGVtUmVtb3ZlIiwiY2FydEVkaXRPcHRpb25zIiwibW9kYWwiLCJkZWZhdWx0TW9kYWwiLCJvcHRpb25zIiwidGVtcGxhdGUiLCJvcGVuIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJ1cGRhdGVDb250ZW50IiwiY29udGVudCIsImJpbmRHaWZ0V3JhcHBpbmdGb3JtIiwiaG9va3MiLCJvbiIsImV2ZW50Iiwib3B0aW9uIiwiJGNoYW5nZWRPcHRpb24iLCIkZm9ybSIsInBhcmVudHMiLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJpdGVtIiwiYXR0ciIsIm9wdGlvbkNoYW5nZSIsInNlcmlhbGl6ZSIsInJlc3VsdCIsInB1cmNoYXNpbmdfbWVzc2FnZSIsInByb3AiLCJwdXJjaGFzYWJsZSIsImluc3RvY2siLCIkY2FydEl0ZW1zUm93cyIsIiRjYXJ0UGFnZVRpdGxlIiwidG90YWxzIiwicGFnZVRpdGxlIiwic3RhdHVzTWVzc2FnZXMiLCJsZW5ndGgiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImdldENvbnRlbnQiLCJodG1sIiwicmVwbGFjZVdpdGgiLCJxdWFudGl0eSIsInRyaWdnZXIiLCJiaW5kQ2FydEV2ZW50cyIsImRlYm91bmNlVGltZW91dCIsImN1cnJlbnRUYXJnZXQiLCJwcmV2ZW50RGVmYXVsdCIsIm9uUXR5Rm9jdXMiLCJ2YWx1ZSIsImNoYW5nZSIsInN0cmluZyIsInNob3dDYW5jZWxCdXR0b24iLCJ0aGVuIiwiYmluZFByb21vQ29kZUV2ZW50cyIsIiRjb3Vwb25Db250YWluZXIiLCIkY291cG9uRm9ybSIsIiRjb2RlSW5wdXQiLCJjb2RlIiwiYXBwbHlDb2RlIiwiYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cyIsIiRjZXJ0Q29udGFpbmVyIiwiJGNlcnRGb3JtIiwiJGNlcnRJbnB1dCIsInRvZ2dsZSIsImdpZnRDZXJ0Q2hlY2siLCJhcHBseUdpZnRDZXJ0aWZpY2F0ZSIsInJlc3AiLCJiaW5kR2lmdFdyYXBwaW5nRXZlbnRzIiwiZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMiLCIkc2VsZWN0IiwiaWQiLCJpbmRleCIsImFsbG93TWVzc2FnZSIsImZpbmQiLCJ0b2dnbGVWaWV3cyIsIiRzaW5nbGVGb3JtIiwiJG11bHRpRm9ybSIsInNoaXBwaW5nRXN0aW1hdG9yIiwiU2hpcHBpbmdFc3RpbWF0b3IiLCJQYWdlTWFuYWdlciIsIiRlbGVtZW50IiwiJHN0YXRlIiwiaW5pdEZvcm1WYWxpZGF0aW9uIiwiYmluZFN0YXRlQ291bnRyeUNoYW5nZSIsImJpbmRFc3RpbWF0b3JFdmVudHMiLCJzaGlwcGluZ1ZhbGlkYXRvciIsIm5vZCIsInN1Ym1pdCIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImJpbmRWYWxpZGF0aW9uIiwiYmluZFN0YXRlVmFsaWRhdGlvbiIsImJpbmRVUFNSYXRlcyIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsImNvdW50cnlJZCIsImlzTmFOIiwiZXJyb3JNZXNzYWdlIiwiJGVsZSIsImVsZVZhbCIsIlVQU1JhdGVUb2dnbGUiLCIkZXN0aW1hdG9yRm9ybVVwcyIsIiRlc3RpbWF0b3JGb3JtRGVmYXVsdCIsInRvZ2dsZUNsYXNzIiwiJGxhc3QiLCJzdGF0ZUNvdW50cnkiLCJjb250ZXh0IiwidXNlSWRGb3JTdGF0ZXMiLCJmaWVsZCIsIkVycm9yIiwiJGZpZWxkIiwiZ2V0U3RhdHVzIiwiaXMiLCJWYWxpZGF0b3JzIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsInJlbW92ZUNsYXNzIiwiJGVzdGltYXRvckNvbnRhaW5lciIsIiRlc3RpbWF0b3JGb3JtIiwicGFyYW1zIiwiY291bnRyeV9pZCIsInN0YXRlX2lkIiwiY2l0eSIsInppcF9jb2RlIiwiZ2V0U2hpcHBpbmdRdW90ZXMiLCJjbGlja0V2ZW50IiwicXVvdGVJZCIsInN1Ym1pdFNoaXBwaW5nUXVvdGUiLCJhZGRDbGFzcyIsImNlcnQiLCJ3ZWFrTWFwIiwiV2Vha01hcCIsIlN3YWwiLCJzd2VldEFsZXJ0IiwibWl4aW4iLCJidXR0b25zU3R5bGluZyIsImN1c3RvbUNsYXNzIiwiY29uZmlybUJ1dHRvbiIsImNhbmNlbEJ1dHRvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQkEsSTs7Ozs7Ozs7O1NBQ2pCQyxPLEdBQUEsbUJBQVU7QUFDTixTQUFLQyxZQUFMLEdBQW9CQyxDQUFDLENBQUMscUJBQUQsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCRCxDQUFDLENBQUMsb0JBQUQsQ0FBdEI7QUFDQSxTQUFLRSxXQUFMLEdBQW1CRixDQUFDLENBQUMsb0JBQUQsQ0FBcEI7QUFDQSxTQUFLRyxRQUFMLEdBQWdCSCxDQUFDLENBQUMsNkJBQUQsQ0FBRCxDQUNYSSxJQURXLEVBQWhCLENBSk0sQ0FLTzs7QUFDYixTQUFLQyxVQUFMO0FBQ0gsRzs7U0FFREMsVSxHQUFBLG9CQUFXQyxPQUFYLEVBQW9CO0FBQUE7O0FBQ2hCLFFBQU1DLE1BQU0sR0FBR0QsT0FBTyxDQUFDRSxJQUFSLENBQWEsWUFBYixDQUFmO0FBQ0EsUUFBTUMsR0FBRyxHQUFHVixDQUFDLFdBQVNRLE1BQVQsQ0FBYjtBQUNBLFFBQU1HLE1BQU0sR0FBR0MsUUFBUSxDQUFDRixHQUFHLENBQUNHLEdBQUosRUFBRCxFQUFZLEVBQVosQ0FBdkI7QUFDQSxRQUFNQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0YsR0FBRyxDQUFDRCxJQUFKLENBQVMsYUFBVCxDQUFELEVBQTBCLEVBQTFCLENBQXZCO0FBQ0EsUUFBTU0sTUFBTSxHQUFHSCxRQUFRLENBQUNGLEdBQUcsQ0FBQ0QsSUFBSixDQUFTLGFBQVQsQ0FBRCxFQUEwQixFQUExQixDQUF2QjtBQUNBLFFBQU1PLFFBQVEsR0FBR04sR0FBRyxDQUFDRCxJQUFKLENBQVMsa0JBQVQsQ0FBakI7QUFDQSxRQUFNUSxRQUFRLEdBQUdQLEdBQUcsQ0FBQ0QsSUFBSixDQUFTLGtCQUFULENB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Q0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3RCQSxlQUFlLG1CQUFPLENBQUMsdURBQWE7QUFDcEMsaUJBQWlCLG1CQUFPLENBQUMsMkRBQWU7QUFDeEMsZ0JBQWdCLG1CQUFPLENBQUMseURBQWM7QUFDdEMscUJBQXFCLG1CQUFPLENBQUMsbUVBQW1COztBQUVoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLEVBQUU7QUFDYixXQUFXLEtBQUs7QUFDaEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay45LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZ2lmdENlcnRDaGVjayBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuJGNhcnRDb250ZW50ID0gJCgnW2RhdGEtY2FydC1jb250ZW50XScpO1xuICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMgPSAkKCdbZGF0YS1jYXJ0LXN0YXR1c10nKTtcbiAgICAgICAgdGhpcy4kY2FydFRvdGFscyA9ICQoJ1tkYXRhLWNhcnQtdG90YWxzXScpO1xuICAgICAgICB0aGlzLiRvdmVybGF5ID0gJCgnW2RhdGEtY2FydF0gLmxvYWRpbmdPdmVybGF5JylcbiAgICAgICAgICAgIC5oaWRlKCk7IC8vIFRPRE86IHRlbXBvcmFyeSB1bnRpbCByb3BlciBwdWxscyBpbiBoaXMgY2FydCBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIGNhcnRVcGRhdGUoJHRhcmdldCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcGFyc2VJbnQoJGVsLnZhbCgpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpID09PSAnaW5jJyA/IG9sZFF0eSArIDEgOiBvbGRRdHkgLSAxO1xuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1pbkVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWF4RXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsID0gbnVsbCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3QgbWF4UXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcHJlVmFsICE9PSBudWxsID8gcHJlVmFsIDogbWluUXR5O1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gcGFyc2VJbnQoTnVtYmVyKCRlbC52YWwoKSksIDEwKTtcbiAgICAgICAgbGV0IGludmFsaWRFbnRyeTtcblxuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmICghbmV3UXR5KSB7XG4gICAgICAgICAgICBpbnZhbGlkRW50cnkgPSAkZWwudmFsKCk7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBgJHtpbnZhbGlkRW50cnl9IGlzIG5vdCBhIHZhbGlkIGVudHJ5YCxcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1SZW1vdmUoaXRlbUlkLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydEVkaXRPcHRpb25zKGl0ZW1JZCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9jb25maWd1cmUtcHJvZHVjdCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgbW9kYWwub3BlbigpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5jb25maWd1cmVJbkNhcnQoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB1dGlscy5ob29rcy5vbigncHJvZHVjdC1vcHRpb24tY2hhbmdlJywgKGV2ZW50LCBvcHRpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRjaGFuZ2VkT3B0aW9uID0gJChvcHRpb24pO1xuICAgICAgICAgICAgY29uc3QgJGZvcm0gPSAkY2hhbmdlZE9wdGlvbi5wYXJlbnRzKCdmb3JtJyk7XG4gICAgICAgICAgICBjb25zdCAkc3VibWl0ID0gJCgnaW5wdXQuYnV0dG9uJywgJGZvcm0pO1xuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2VCb3ggPSAkKCcuYWxlcnRNZXNzYWdlQm94Jyk7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gJCgnW25hbWU9XCJpdGVtX2lkXCJdJywgJGZvcm0pLmF0dHIoJ3ZhbHVlJyk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UoaXRlbSwgJGZvcm0uc2VyaWFsaXplKCksIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YSB8fCB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ3AuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWZyZXNoQ29udGVudChyZW1vdmUpIHtcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XG4gICAgICAgIGNvbnN0ICRjYXJ0UGFnZVRpdGxlID0gJCgnW2RhdGEtY2FydC1wYWdlLXRpdGxlXScpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnY2FydC9jb250ZW50JyxcbiAgICAgICAgICAgICAgICB0b3RhbHM6ICdjYXJ0L3RvdGFscycsXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGxhc3QgaXRlbSBmcm9tIGNhcnQ/IFJlbG9hZFxuICAgICAgICBpZiAocmVtb3ZlICYmICRjYXJ0SXRlbXNSb3dzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRDb250ZW50Lmh0bWwocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0VG90YWxzLmh0bWwocmVzcG9uc2UudG90YWxzKTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcy5odG1sKHJlc3BvbnNlLnN0YXR1c01lc3NhZ2VzKTtcblxuICAgICAgICAgICAgJGNhcnRQYWdlVGl0bGUucmVwbGFjZVdpdGgocmVzcG9uc2UucGFnZVRpdGxlKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJCgnW2RhdGEtY2FydC1xdWFudGl0eV0nLCB0aGlzLiRjYXJ0Q29udGVudCkuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ2NhcnQtcXVhbnRpdHktdXBkYXRlJywgcXVhbnRpdHkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kQ2FydEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgZGVib3VuY2VUaW1lb3V0ID0gNDAwO1xuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlID0gXy5iaW5kKF8uZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBfLmJpbmQoXy5kZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFJlbW92ZUl0ZW0gPSBfLmJpbmQoXy5kZWJvdW5jZSh0aGlzLmNhcnRSZW1vdmVJdGVtLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgbGV0IHByZVZhbDtcblxuICAgICAgICAvLyBjYXJ0IHVwZGF0ZVxuICAgICAgICAkKCdbZGF0YS1jYXJ0LXVwZGF0ZV0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XG4gICAgICAgICAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYXJ0IHF0eSBtYW51YWxseSB1cGRhdGVzXG4gICAgICAgICQoJy5jYXJ0LWl0ZW0tcXR5LWlucHV0JywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdmb2N1cycsIGZ1bmN0aW9uIG9uUXR5Rm9jdXMoKSB7XG4gICAgICAgICAgICBwcmVWYWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICB9KS5jaGFuZ2UoZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmNhcnQtcmVtb3ZlJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb25maXJtRGVsZXRlJyk7XG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGl0ZW0gZnJvbSBjYXJ0XG4gICAgICAgICAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWVkaXRdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIGVkaXQgaXRlbSBpbiBjYXJ0XG4gICAgICAgICAgICB0aGlzLmNhcnRFZGl0T3B0aW9ucyhpdGVtSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kUHJvbW9Db2RlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY291cG9uQ29udGFpbmVyID0gJCgnLmNvdXBvbi1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjb2RlSW5wdXQgPSAkKCdbbmFtZT1cImNvdXBvbmNvZGVcIl0nLCAkY291cG9uRm9ybSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuc2hvdygpO1xuICAgICAgICAgICAgJGNvZGVJbnB1dC50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLnNob3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNvdXBvbkZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY29kZUlucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBFbXB0eSBjb2RlXG4gICAgICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJGNvZGVJbnB1dC5kYXRhKCdlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUNvZGUoY29kZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjZXJ0Q29udGFpbmVyID0gJCgnLmdpZnQtY2VydGlmaWNhdGUtY29kZScpO1xuICAgICAgICBjb25zdCAkY2VydEZvcm0gPSAkKCcuY2FydC1naWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNlcnRJbnB1dCA9ICQoJ1tuYW1lPVwiY2VydGNvZGVcIl0nLCAkY2VydEZvcm0pO1xuXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNlcnRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNlcnRJbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKCFnaWZ0Q2VydENoZWNrKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICRjZXJ0SW5wdXQuZGF0YSgnZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlHaWZ0Q2VydGlmaWNhdGUoY29kZSwgKGVyciwgcmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLmRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1naWZ0d3JhcF0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1HaWZ0d3JhcCcpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2dpZnQtd3JhcHBpbmctZm9ybScsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zKGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0V3JhcHBpbmdGb3JtKCkge1xuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJHNlbGVjdC52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gJHNlbGVjdC5kYXRhKCdpbmRleCcpO1xuXG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhbGxvd01lc3NhZ2UgPSAkc2VsZWN0LmZpbmQoYG9wdGlvblt2YWx1ZT0ke2lkfV1gKS5kYXRhKCdhbGxvd01lc3NhZ2UnKTtcblxuICAgICAgICAgICAgJChgLmdpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fWApLmhpZGUoKTtcbiAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctaW1hZ2UtJHtpbmRleH0tJHtpZH1gKS5zaG93KCk7XG5cbiAgICAgICAgICAgIGlmIChhbGxvd01lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLW1lc3NhZ2UtJHtpbmRleH1gKS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVWaWV3cygpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gJCgnaW5wdXQ6cmFkaW9bbmFtZSA9XCJnaWZ0d3JhcHR5cGVcIl06Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgJHNpbmdsZUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLXNpbmdsZScpO1xuICAgICAgICAgICAgY29uc3QgJG11bHRpRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctbXVsdGlwbGUnKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnc2FtZScpIHtcbiAgICAgICAgICAgICAgICAkc2luZ2xlRm9ybS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoJ1tuYW1lPVwiZ2lmdHdyYXB0eXBlXCJdJykub24oJ2NsaWNrJywgdG9nZ2xlVmlld3MpO1xuXG4gICAgICAgIHRvZ2dsZVZpZXdzKCk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5iaW5kQ2FydEV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRQcm9tb0NvZGVFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpO1xuXG4gICAgICAgIC8vIGluaXRpYXRlIHNoaXBwaW5nIGVzdGltYXRvciBtb2R1bGVcbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9IG5ldyBTaGlwcGluZ0VzdGltYXRvcigkKCdbZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJykpO1xuICAgIH1cbn1cbiIsImltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi4vY29tbW9uL3N0YXRlLWNvdW50cnknO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnLi4vY29tbW9uL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScsIHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmluaXRGb3JtVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gJ2Zvcm1bZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJztcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0JywgdGhpcy4kZWxlbWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIGEgY2hlY2sgZm9yIGFsbCBmaWVsZHMgd2hlbiBjb3VudHJ5IGhhcyBhIHZhbHVlXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgYXJlQWxsKCd2YWxpZCcpIHdpbGwgY2hlY2sgY291bnRyeSBmb3IgdmFsaWRpdHlcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRVUFNSYXRlcygpO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudHJ5SWQgIT09IDAgJiYgIU51bWJlci5pc05hTihjb3VudHJ5SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdUaGUgXFwnQ291bnRyeVxcJyBmaWVsZCBjYW5ub3QgYmUgYmxhbmsuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZVZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCksXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRlbGUgPSAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZVZhbCA9ICRlbGUudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVsZVZhbCAmJiBlbGVWYWwubGVuZ3RoICYmIGVsZVZhbCAhPT0gJ1N0YXRlL3Byb3ZpbmNlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdUaGUgXFwnU3RhdGUvUHJvdmluY2VcXCcgZmllbGQgY2Fubm90IGJlIGJsYW5rLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgYmV0d2VlbiBkZWZhdWx0IHNoaXBwaW5nIGFuZCB1cHMgc2hpcHBpbmcgcmF0ZXNcbiAgICAgKi9cbiAgICBiaW5kVVBTUmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IFVQU1JhdGVUb2dnbGUgPSAnLmVzdGltYXRvci1mb3JtLXRvZ2dsZVVQU1JhdGUnO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtVXBzID0gJCgnLmVzdGltYXRvci1mb3JtLS11cHMnKTtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtRGVmYXVsdCA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tZGVmYXVsdCcpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1EZWZhdWx0LnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKSB7XG4gICAgICAgIGxldCAkbGFzdDtcblxuICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRmaWVsZCA9ICQoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5nZXRTdGF0dXModGhpcy4kc3RhdGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRsYXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRmaWVsZC5hdHRyKCdwbGFjZWhvbGRlcicsICdTdGF0ZS9wcm92aW5jZScpO1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdoZW4geW91IGNoYW5nZSBhIGNvdW50cnksIHlvdSBzd2FwIHRoZSBzdGF0ZS9wcm92aW5jZSBiZXR3ZWVuIGFuIGlucHV0IGFuZCBhIHNlbGVjdCBkcm9wZG93blxuICAgICAgICAgICAgLy8gTm90IGFsbCBjb3VudHJpZXMgcmVxdWlyZSB0aGUgcHJvdmluY2UgdG8gYmUgZmlsbGVkXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlbW92ZSB0aGlzIGNsYXNzIHdoZW4gd2Ugc3dhcCBzaW5jZSBub2QgdmFsaWRhdGlvbiBkb2Vzbid0IGNsZWFudXAgZm9yIHVzXG4gICAgICAgICAgICAkKHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IpLmZpbmQoJy5mb3JtLWZpZWxkLS1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Zvcm0tZmllbGQtLXN1Y2Nlc3MnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEVzdGltYXRvckV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcblxuICAgICAgICAkZXN0aW1hdG9yRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGNvdW50cnlfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBzdGF0ZV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBjaXR5OiAkKCdbbmFtZT1cInNoaXBwaW5nLWNpdHlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgemlwX2NvZGU6ICQoJ1tuYW1lPVwic2hpcHBpbmctemlwXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0U2hpcHBpbmdRdW90ZXMocGFyYW1zLCAnY2FydC9zaGlwcGluZy1xdW90ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zaGlwcGluZy1xdW90ZXMnKS5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgc2VsZWN0IGJ1dHRvblxuICAgICAgICAgICAgICAgICQoJy5zZWxlY3Qtc2hpcHBpbmctcXVvdGUnKS5vbignY2xpY2snLCBjbGlja0V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVvdGVJZCA9ICQoJy5zaGlwcGluZy1xdW90ZTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LnN1Ym1pdFNoaXBwaW5nUXVvdGUocXVvdGVJZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xuICAgICAgICAgICAgJGVzdGltYXRvckNvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLWhpZGUnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLWhpZGUnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkZXN0aW1hdG9yQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLnNob3coKTtcbiAgICAgICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1oaWRlJykuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGdpZnQgY2VydGlmaWNhdGUgdmFsaWRhdGlvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgJ3dlYWttYXAtcG9seWZpbGwnO1xuaW1wb3J0IHN3ZWV0QWxlcnQgZnJvbSAnc3dlZXRhbGVydDInO1xuXG4vLyBXZWFrTWFwIHdpbGwgZGVmaW5lZCBpbiB0aGUgZ2xvYmFsIHNjb3BlIGlmIG5hdGl2ZSBXZWFrTWFwIGlzIG5vdCBzdXBwb3J0ZWQuXG5jb25zdCB3ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4vLyBTZXQgZGVmYXVsdHMgZm9yIHN3ZWV0YWxlcnQyIHBvcHVwIGJveGVzXG5jb25zdCBTd2FsID0gc3dlZXRBbGVydC5taXhpbih7XG4gICAgYnV0dG9uc1N0eWxpbmc6IGZhbHNlLFxuICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgIGNvbmZpcm1CdXR0b246ICdidXR0b24nLFxuICAgICAgICBjYW5jZWxCdXR0b246ICdidXR0b24nLFxuICAgIH0sXG59KTtcblxuLy8gUmUtZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBTd2FsO1xuIiwidmFyIGJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL19iYXNlQ3JlYXRlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgYW4gaW5zdGFuY2Ugb2YgYEN0b3JgIHJlZ2FyZGxlc3Mgb2ZcbiAqIHdoZXRoZXIgaXQgd2FzIGludm9rZWQgYXMgcGFydCBvZiBhIGBuZXdgIGV4cHJlc3Npb24gb3IgYnkgYGNhbGxgIG9yIGBhcHBseWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IEN0b3IgVGhlIGNvbnN0cnVjdG9yIHRvIHdyYXAuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB3cmFwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVDdG9yKEN0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIC8vIFVzZSBhIGBzd2l0Y2hgIHN0YXRlbWVudCB0byB3b3JrIHdpdGggY2xhc3MgY29uc3RydWN0b3JzLiBTZWVcbiAgICAvLyBodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWZ1bmN0aW9uLW9iamVjdHMtY2FsbC10aGlzYXJndW1lbnQtYXJndW1lbnRzbGlzdFxuICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEN0b3I7XG4gICAgICBjYXNlIDE6IHJldHVybiBuZXcgQ3RvcihhcmdzWzBdKTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDdG9yKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbmV3IEN0b3IoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICBjYXNlIDQ6IHJldHVybiBuZXcgQ3RvcihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIG5ldyBDdG9yKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0pO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbmV3IEN0b3IoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSwgYXJnc1s1XSk7XG4gICAgICBjYXNlIDc6IHJldHVybiBuZXcgQ3RvcihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdLCBhcmdzWzVdLCBhcmdzWzZdKTtcbiAgICB9XG4gICAgdmFyIHRoaXNCaW5kaW5nID0gYmFzZUNyZWF0ZShDdG9yLnByb3RvdHlwZSksXG4gICAgICAgIHJlc3VsdCA9IEN0b3IuYXBwbHkodGhpc0JpbmRpbmcsIGFyZ3MpO1xuXG4gICAgLy8gTWltaWMgdGhlIGNvbnN0cnVjdG9yJ3MgYHJldHVybmAgYmVoYXZpb3IuXG4gICAgLy8gU2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDEzLjIuMiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgIHJldHVybiBpc09iamVjdChyZXN1bHQpID8gcmVzdWx0IDogdGhpc0JpbmRpbmc7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQ3RvcjtcbiIsInZhciBhcHBseSA9IHJlcXVpcmUoJy4vX2FwcGx5JyksXG4gICAgY3JlYXRlQ3RvciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUN0b3InKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBmdW5jdGlvbiBtZXRhZGF0YS4gKi9cbnZhciBXUkFQX0JJTkRfRkxBRyA9IDE7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGludm9rZSBpdCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZ1xuICogb2YgYHRoaXNBcmdgIGFuZCBgcGFydGlhbHNgIHByZXBlbmRlZCB0byB0aGUgYXJndW1lbnRzIGl0IHJlY2VpdmVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgY3JlYXRlV3JhcGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gcGFydGlhbHMgVGhlIGFyZ3VtZW50cyB0byBwcmVwZW5kIHRvIHRob3NlIHByb3ZpZGVkIHRvXG4gKiAgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHdyYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBhcnRpYWwoZnVuYywgYml0bWFzaywgdGhpc0FyZywgcGFydGlhbHMpIHtcbiAgdmFyIGlzQmluZCA9IGJpdG1hc2sgJiBXUkFQX0JJTkRfRkxBRyxcbiAgICAgIEN0b3IgPSBjcmVhdGVDdG9yKGZ1bmMpO1xuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgdmFyIGFyZ3NJbmRleCA9IC0xLFxuICAgICAgICBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgbGVmdEluZGV4ID0gLTEsXG4gICAgICAgIGxlZnRMZW5ndGggPSBwYXJ0aWFscy5sZW5ndGgsXG4gICAgICAgIGFyZ3MgPSBBcnJheShsZWZ0TGVuZ3RoICsgYXJnc0xlbmd0aCksXG4gICAgICAgIGZuID0gKHRoaXMgJiYgdGhpcyAhPT0gcm9vdCAmJiB0aGlzIGluc3RhbmNlb2Ygd3JhcHBlcikgPyBDdG9yIDogZnVuYztcblxuICAgIHdoaWxlICgrK2xlZnRJbmRleCA8IGxlZnRMZW5ndGgpIHtcbiAgICAgIGFyZ3NbbGVmdEluZGV4XSA9IHBhcnRpYWxzW2xlZnRJbmRleF07XG4gICAgfVxuICAgIHdoaWxlIChhcmdzTGVuZ3RoLS0pIHtcbiAgICAgIGFyZ3NbbGVmdEluZGV4KytdID0gYXJndW1lbnRzWysrYXJnc0luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIGFwcGx5KGZuLCBpc0JpbmQgPyB0aGlzQXJnIDogdGhpcywgYXJncyk7XG4gIH1cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUGFydGlhbDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8ubm9vcCk7XG4gKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9vcDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R1YkFycmF5O1xuIiwidmFyIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBjcmVhdGVXcmFwID0gcmVxdWlyZSgnLi9fY3JlYXRlV3JhcCcpLFxuICAgIGdldEhvbGRlciA9IHJlcXVpcmUoJy4vX2dldEhvbGRlcicpLFxuICAgIHJlcGxhY2VIb2xkZXJzID0gcmVxdWlyZSgnLi9fcmVwbGFjZUhvbGRlcnMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgZnVuY3Rpb24gbWV0YWRhdGEuICovXG52YXIgV1JBUF9CSU5EX0ZMQUcgPSAxLFxuICAgIFdSQVBfUEFSVElBTF9GTEFHID0gMzI7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgXG4gKiBhbmQgYHBhcnRpYWxzYCBwcmVwZW5kZWQgdG8gdGhlIGFyZ3VtZW50cyBpdCByZWNlaXZlcy5cbiAqXG4gKiBUaGUgYF8uYmluZC5wbGFjZWhvbGRlcmAgdmFsdWUsIHdoaWNoIGRlZmF1bHRzIHRvIGBfYCBpbiBtb25vbGl0aGljIGJ1aWxkcyxcbiAqIG1heSBiZSB1c2VkIGFzIGEgcGxhY2Vob2xkZXIgZm9yIHBhcnRpYWxseSBhcHBsaWVkIGFyZ3VtZW50cy5cbiAqXG4gKiAqKk5vdGU6KiogVW5saWtlIG5hdGl2ZSBgRnVuY3Rpb24jYmluZGAsIHRoaXMgbWV0aG9kIGRvZXNuJ3Qgc2V0IHRoZSBcImxlbmd0aFwiXG4gKiBwcm9wZXJ0eSBvZiBib3VuZCBmdW5jdGlvbnMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0gey4uLip9IFtwYXJ0aWFsc10gVGhlIGFyZ3VtZW50cyB0byBiZSBwYXJ0aWFsbHkgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJvdW5kIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBncmVldChncmVldGluZywgcHVuY3R1YXRpb24pIHtcbiAqICAgcmV0dXJuIGdyZWV0aW5nICsgJyAnICsgdGhpcy51c2VyICsgcHVuY3R1YXRpb247XG4gKiB9XG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiB2YXIgYm91bmQgPSBfLmJpbmQoZ3JlZXQsIG9iamVjdCwgJ2hpJyk7XG4gKiBib3VuZCgnIScpO1xuICogLy8gPT4gJ2hpIGZyZWQhJ1xuICpcbiAqIC8vIEJvdW5kIHdpdGggcGxhY2Vob2xkZXJzLlxuICogdmFyIGJvdW5kID0gXy5iaW5kKGdyZWV0LCBvYmplY3QsIF8sICchJyk7XG4gKiBib3VuZCgnaGknKTtcbiAqIC8vID0+ICdoaSBmcmVkISdcbiAqL1xudmFyIGJpbmQgPSBiYXNlUmVzdChmdW5jdGlvbihmdW5jLCB0aGlzQXJnLCBwYXJ0aWFscykge1xuICB2YXIgYml0bWFzayA9IFdSQVBfQklORF9GTEFHO1xuICBpZiAocGFydGlhbHMubGVuZ3RoKSB7XG4gICAgdmFyIGhvbGRlcnMgPSByZXBsYWNlSG9sZGVycyhwYXJ0aWFscywgZ2V0SG9sZGVyKGJpbmQpKTtcbiAgICBiaXRtYXNrIHw9IFdSQVBfUEFSVElBTF9GTEFHO1xuICB9XG4gIHJldHVybiBjcmVhdGVXcmFwKGZ1bmMsIGJpdG1hc2ssIHRoaXNBcmcsIHBhcnRpYWxzLCBob2xkZXJzKTtcbn0pO1xuXG4vLyBBc3NpZ24gZGVmYXVsdCBwbGFjZWhvbGRlcnMuXG5iaW5kLnBsYWNlaG9sZGVyID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZDtcbiJdLCJzb3VyY2VSb290IjoiIn0=