 $(function(){
   $('.xinForm input, .xinForm textarea').on('focusout', function(evt){
     var value = $(evt.target).val();
     if (value.trim()) {
       $(evt.target).parent().find('label').addClass('active');
     } else {
       $(evt.target).parent().find('label').removeClass('active');
     }
   });
 });