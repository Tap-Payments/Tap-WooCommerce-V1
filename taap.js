jQuery(document).ready(function(){
    var live_public_key = jQuery("#live_public_key").val();
    var testmode = jQuery("#testmode").val();
    if (testmode == true) {
        var active_pk = jQuery("#test_public_key").val();
    }else{
        var active_pk = jQuery("#publishable_key").val();
    }
    
    var tmode = jQuery("#payment_mode").val();
    var amount = jQuery("#amount").val();
    var save_card = jQuery("#save_card").val()
    var Ui_language = jQuery("#ui_language").val();
    if( Ui_language == 'english'){
        Ui_language_val = 'en';
    }else{
        Ui_language_val = 'ar';
    }
    
    if( save_card == 'no') {
        save_card_val = false;
    }else {
        save_card_val = true;
    }

    var currency = jQuery("#currency").val();
    var billing_first_name = jQuery("#billing_first_name").val();
    var customer_user_id = jQuery("#customer_user_id").val();
    var billing_last_name = jQuery("#billing_last_name").val();
    var billing_email = jQuery("#billing_email").val();
    var billing_phone = jQuery("#billing_phone").val();
    var country_code = jQuery("#countrycode").val();

    console.log(country_code);

    var items_values = [];

    jQuery('input[class$="items_bulk"]').each(function() {
        items_values.push({
            'id': jQuery(this).attr('data-item-product-id'),
            'name': jQuery(this).attr('data-name'),
            'description': '',
            'quantity': jQuery(this).attr('data-quantity'),
            'amount_per_unit': jQuery(this).attr('data-sale-price'),
            'discount': {
                'type': 'P',
                'value': '10%'
            },
            'total_amount': jQuery(this).attr('data-product-total-amount')
        });
    });

    if (tmode  == 'authorize') {
        var transaction_mode = {
            mode: 'authorize',
            authorize:{
                auto:{
                    type:'VOID', 
                time: 100
            },
            saveCard: save_card_val,
            threeDSecure: true,
            description: "description",
            statement_descriptor:"statement_descriptor",
            reference:{
              transaction: '',
              order: jQuery("#order_id").val()
            },
            hashstring:jQuery("#hashstring").val(),
            metadata:{},
            receipt:{
              email: false,
              sms: true
            },
            redirect: jQuery('#tap_end_url').val(),
            post: jQuery('#post_url').val()
            }
        }
    }

    if (tmode  == 'charge') {
        var transaction_mode  = {
            mode: 'charge',
                charge:{
                    saveCard: save_card_val,
                    threeDSecure: true,
                    description: "Test Description",
                    statement_descriptor: "Sample",
                reference:{
                    transaction: '',
                    order: jQuery("#order_id").val()
                },
                hashstring:jQuery("#hashstring").val(),
                metadata:{},
                receipt:{
                    email: false,
                    sms: true
                    },
                redirect: jQuery('#tap_end_url').val(),
                post: jQuery('#post_url').val()
            }
        }
    }

    var config = {
        gateway:{
            publicKey:active_pk,
            language:Ui_language_val,
            contactInfo:true,
            supportedCurrencies:"all",
            supportedPaymentMethods: "all",
            saveCardOption:false,
            customerCards: true,
            notifications:'standard',
            callback: (response) => {
                      console.log("response", response);
                            },
            labels:{
                cardNumber:"Card Number",
                expirationDate:"MM/YY",
                cvv:"CVV",
                cardHolder:"Name on Card",
                actionButton:"Pay"
            },
            style: {
                base: {
                    color: '#535353',
                    lineHeight: '18px',
                    fontFamily: 'sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                        '::placeholder': {
                        color: 'rgba(0, 0, 0, 0.26)',
                        fontSize:'15px'
                    }
                },
                invalid: {
                    color: 'red',
                    iconColor: '#fa755a '
                }
            }
        },
        customer:{
            id: '',
            first_name: billing_first_name,
            middle_name: "Middle Name",
            last_name: billing_last_name,
            email: billing_email,
                phone: {
                    country_code: country_code,
                    number: billing_phone
                }
        },
        order:{
            amount: amount,
            currency:currency,
            items:items_values,
            shipping:null,
            taxes: null
        },
        transaction:transaction_mode
    }

    console.log(config);
    if ( active_pk ) {
        goSell.config(config);
    }
});

var chg = jQuery("#chg").val();
jQuery(function($){
    var checkout_form = jQuery( 'form.woocommerce-checkout' );
    checkout_form.on( 'checkout_place_order', chg);
});