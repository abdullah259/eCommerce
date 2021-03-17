import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css'
import "./css/style.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min'
import '@fortawesome/fontawesome-free/js/all.min'


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
    
});