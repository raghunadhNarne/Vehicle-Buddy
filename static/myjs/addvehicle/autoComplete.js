async function autoCompleteLocation()
{

    
    
     // $('#autocompletestate').select2({'selectOnClose':true,theme:"bootstrap-5",    dropDownCssClass: "select2--large"});
     $('#autocompletestate').select2(
      {
        placeholder:"Select Location",width:"100%","theme":"bootstrap-5",
        allowClear:true,  minimumInputLength:3
        ,
        ajax:
        {
          url:'/autocomplete/locations/' ,
          delay:1000  
          ,
        
          
          dataType:'json',
          data: function (params) {
            var query = {
              location: params.term,
              
            }
      
            // Query parameters will be ?search=[term]&type=public
            return query;
          },
      
          processResults: function (data) {
            
            // Transforms the top-level key of the response object from 'items' to 'results'
            let result=[];
            for(let x of data.data)
            {
              result.push({id:x,text:x});
            }
            return {
              results: result
            };
          }

        }
      });
     //$("#autocompletestate").val(initial).trigger('change');

      
   
  
}


async function autoCompleteCar()
{




    
     // $('#autocompletestate').select2({'selectOnClose':true,theme:"bootstrap-5",    dropDownCssClass: "select2--large"});
     $('#autocompletemodel').select2(
      {
        placeholder:"Select Car Model",width:"100%","theme":"bootstrap-5",
        allowClear:true,  minimumInputLength:3
        ,
        ajax:
        {
          url:'/autocomplete/cars/' ,
          delay:1000  
          ,
        
          
          dataType:'json',
          data: function (params) {
            var query = {
              carname: params.term,
              
            }
      
            // Query parameters will be ?carname={params.term}
            return query;
          },
      
          processResults: function (data) {
            
            // Transforms the top-level key of the response object from 'items' to 'results'
            let result=[];
            for(let x of data.data)
            {
              result.push({id:x,text:x});
            }
            return {
              results: result
            };
          }

        }
      });
     //$("#autocompletestate").val(initial).trigger('change');

      
   
  
}
