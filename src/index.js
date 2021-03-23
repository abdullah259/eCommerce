//import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
//import '@laylazi/bootstrap-rtl-scss/scss/bootstrap-rtl.scss';
import './scss/style.scss';
import "./css/style.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min'
import '@fortawesome/fontawesome-free/js/all.min'
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';



$(function () {
    $('[data-toggle="tooltip"]').tooltip() 

    $('.add-to-cart-btn').click(function() {
        alert('تم اضافت المنتج الي عربة الشراء');
    });

    $('#copyright').text("جميع الحقوق محفوظة لسنه " + new Date().getFullYear());


    $('.product-option input[type="radio"]').change(function() {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active'); 
    });


    //عند تغيير المنتج المطلوب
    $('[data-product-quantity]').change(function() {
        //جلب الكمية الجديدة
        var newQuantity = $(this).val();

        //ابحث عن السطر الذي يحتوي معلومات المنتج
        var parent = $(this).parents('[data-product-info]');

        //اجلب سعر القطعة الواحدة من معلومات المنتج
        var priceProduct = parent.attr('data-product-price');
        
        //السعر الاجمالي للمنتج
        var totalPriceForProduct = newQuantity * priceProduct

        //عين السعر الجديد في السعر الاجمالي
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        //حدث السعر الاجمالي لكل المنتجات
        calculateTotalPrice();
    });
    
    $('[data-remove-from-cart]').click(function() {
        $(this).parents('[data-product-info]').remove();
        calculateTotalPrice();
    });


    function calculateTotalPrice() {
       //انشاء متغير لكي يقوم بحفظ السعر الاجمالي
        var totalPriceForAllProducts = 0;

        //لكل سطر يمثل معلومات  المنتج في الصفحة
        $('[data-product-info]').each(function () {
            //اجلب سعر القطعة الواحدة من الخاصيه المعنية
            var pricePerUnit = $(this).attr('data-product-price');

            //اجلب كمية المنتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();

            //ضرب الكمية مع السعر 
            var totalPriceForProduct = pricePerUnit * quantity;

            //اضافت السعر الاجمالي لهذا المنتج 
            totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
        });

        //حدث السعر الاجمالي لكل المنتجات في الصفحه
        $('#total-price-for-all-product').text(totalPriceForAllProducts + '$');
    }
    

    var citiesByCountry = {
        sa: ['جدة','الرياض'],
        eg: ['القاهرة','الاسكندرية'],
        jo: ['عمان' ,'الزرقاء'],
        sy: ['دمشق' , 'حلب' , 'حماه']
    }
    //when the country change it
    $('#form-checkout select[name="country"]').change(function() {
        //bring the value for the country 
        var country = $(this).val();
        //bring cities this country 
        var cities = citiesByCountry[country];

        //reomve any cities inside this 
        $('#form-checkout select[name="city"]').empty();
        // add the select اختر مدينه because we remove it when we did before this step 
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        //add the cities to country
        cities.forEach(function(city){
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    $('#form-checkout input[name="payment-method"]').change(function() {
        var paymentMethod = $(this).val();

        if(paymentMethod === 'on_delivary') {

            //اذا كانت عند الاستلام ، فعطل  حقول بطاقة الائتمان
            $('#credit-card-info input').prop('disabled', true);

        }else{
            //والا ففعلها
            $('#credit-card-info input').prop('disabled', false);
        }

        $('#credit-card-info input').toggle();
    });

    //range price 
    $('#price-range').slider({
        range:true,
        min:50,
        max:1000,
        step:50,
        values:[250,800],
        slide: function(event,ui) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
    });

});