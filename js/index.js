
var $grid;
var currentSelectedFilter = 'sel-1';
var filterColors = {
    'sel-1': {
        't10': '#0e9bfa',
        't20': '#0270ba',
        't30': '#034069'
    },
    'sel-2': {
        't10': '#9966ff',
        't20': '#653eb3',
        't30': '#3c2270'
    },
    'sel-3': {
        't10': '#cc2f92',
        't20': '#85175c',
        't30': '#540637'
    },
    'sel-4': {
        't10': '#00b392',
        't20': '#056e5b',
        't30': '#043d33'
    }
}
$(document).ready( async function(){
    var data = await getData();
    initDropdowns(data['config']);
    loadAgencies(data);
    initModal(data);

    $('.select__item--category').change(() => {
        let year  = $('.select__years').val();
        let index = $('.select__index').val();
        let group = $('.select__groups').val();
      
        updateAgenciesLabel()
        sortAgencies();
    })

    $('.select__item--year').change(() => {
        
        loadAgencies(data);
        updateAgenciesLabel()
        // $('.agencies__wrapper').isotope('updateSortData').isotope();
        
        // $grid.isotope('updateSortData').isotope();
    });

    $('.agencies__wrapper').on('click', '.agencies__item', function(event) {
        $agencyAttr =  $(this).find('.agencies__item--attr');
        let agencyName =  $agencyAttr.find('.agency').text();
        let configAgencies = data['config']['labels']['agencies'];
        let agency = _.find(configAgencies,{'name':agencyName});
        $('.select__agency--1').val(agency.key);


        loadCompareAgency(1,data);
        loadCompareAgency(2,data);
        $('.agency__wrapper--2').collapse('hide');
        $('.sel--modal').removeClass('active');
       $('#comparisonModal').modal('show');
    });
    $('.select__agency--1').change(()=>{
        loadCompareAgency(1,data);
    });
    $('.select__agency--2').change(()=>{
        loadCompareAgency(2,data);
    });

    $( window ).resize(function() {
       // resizeModalDescription();
       resizeAgencyItem();

    })
    $(document).click(function(e){
        if( $(e.target).closest(".sel").length == 0 ) {
            $('.sel').removeClass('active');
        }
    
    });
    updateAgencyScoreBackground();
});

function resizeModalDescription(){
    let height =  $('.agency__logo').find('img').height();
    $('.agency__description--wrapper ').height(height);
}
function resizeAgencyItem(){
    let clientWidth = $(window).width();
    var itemWidth = 160;
    var numberOfItems = 10;
    if(clientWidth <=  576){
        numberOfItems = 2;
        itemWidth = ((clientWidth - (numberOfItems*32.2)) / numberOfItems);
    }
    // else if(clientWidth <=  768){
    //     numberOfItems = 4;
    // }else if(clientWidth <=  1200){
    //     numberOfItems = 6;
    // }else if(clientWidth <=  1366){
    //     numberOfItems = 8;
    // }
    $('.agencies__item').css('width',itemWidth+'px');
    $('.agencies__item').find('img').css('width',itemWidth+'px');
}
function initDropdowns(config){
    labels = config.labels;

    var $elemDropdownYear =  $('.select__years');
    var $elemDropdownIndex =  $('.select__index');
    var $elemDropdownGroups =  $('.select__groups');

   // Init year selection
   labels.years.forEach((item,index) => {
        $elemDropdownYear.append('<option class="years__option" value="'+item+'">'+item+'</option>');
    });
    _.forEach(labels.index,(item,index) =>{
        $elemDropdownIndex.append('<option class="index__option" value="'+item.dataKey+'">'+item.label+'</option>');
    })

    _.forEach(labels.groups,(item,index) =>{
        $elemDropdownGroups.append('<option class="index__option" value="'+item.dataKey+'">'+item.label+'</option>');
    });
    $elemDropdownYear.children('option:nth-child(2)').attr('selected',true);
    $elemDropdownIndex.children('option:nth-child(2)').attr('selected',true);
    $elemDropdownGroups.children('option:nth-child(2)').attr('selected',true);

    initCustomSelect();

}

function loadCompareAgency(compareNumber = 1,data){
    let year  = $('.select__years').val();
    let configAgencies = data['config']['labels']['agencies'];
    let dataAgencies = data['data'][year];
    var $parent = $('.agency__wrapper--'+compareNumber);
    let agencyKey = $parent.find('.select__agency').val();
    let configAgencyData = _.find(configAgencies,{'key':agencyKey});
    let agencyScores = _.find(dataAgencies,{'Agency':configAgencyData.name});
    let agency2020Scores = _.find(data['data']['2021'],{'Agency':configAgencyData.name});
    $parent.find('.aggregate__score--value').text(agencyScores['PSXI, All']);
    $parent.find('.agency__description--value').text(agency2020Scores['Blurb']);
    $parent.find('.agency__score--impression').find('.agency__score--number').text(agencyScores['Impressions, All']);
    $parent.find('.agency__score--sentiment').find('.agency__score--number').text(agencyScores['Sentiments, All']);
    $parent.find('.agency__score--interaction').find('.agency__score--number').text(agencyScores['Interactions, All']);
    
    $parent.find('.sel__placeholder').html('<div class="sel__placeholder--value">'+configAgencyData.name+'</div>').attr('data-placeholder',configAgencyData.name);

    $parent.find('.agency__logo').find('img').attr('src','files/images/'+configAgencyData.image).on('load',function() {
        setTimeout(() =>{resizeModalDescription();}, 150);
    });
}

function initModal(data){
    let configAgencies = data['config']['labels']['agencies'];

    var $elemDropdownAgency =  $('.select__agency');
    var counter = 0;
    configAgencies.forEach((item,index) => {
        if(counter == 0){
            $elemDropdownAgency.append('<option class="years__option" value="'+item.key+'" selected>'+item.name+'</option>');
        }else{
            $elemDropdownAgency.append('<option class="years__option" value="'+item.key+'">'+item.name+'</option>');
        }
        counter++;
        
    });

    $('.select__agency--2').val('agency-1');
    loadCompareAgency(1,data);
    loadCompareAgency(2,data); 
    initCustomSelectModal();
}
function getSortingClassName(){
    let index = $('.select__index').val();
    let group = $('.select__groups').val();
    return (index+'---'+group).toLowerCase();
}

function loadAgencies(data){

    let year  = $('.select__years').val();
    let index = $('.select__index').val();
    let group = $('.select__groups').val();
    let $elemPsei = $('.agencies__wrapper');
    let isUpdate = false;
    // $elemPsei.children().remove();
    // return false;
    var isotopeSortingNames = {}

    data['data'][year].forEach(agency =>{
        let configAgencies = data['config']['labels']['agencies'];
        let configAgency = _.find(configAgencies,{'name':agency['Agency']});

            
        var $elemAgency = $('[data-name="'+agency['Agency']+'"]');
        var $elemAgencyItemLabelWrapper = $elemAgency.find('.agencies__item--label');
    
  
        if( $elemAgency.length == 0 ){
            $elemAgency = $('<div></div>');
            $elemAgency.addClass('agencies__item');
            $elemAgency.attr('data-name',agency['Agency']);
            $elemAgencyItemLabelWrapper = $(`
                <div class="agencies__item--label">
                    <div class="item__container">
                        <div class="item__image"><img src="files/images/`+configAgency.image+`"/></div>
                        <div class="item__points"></div>
                    </div>
                    <div class="item__name">`+ agency['Agency'] +`</div>
                </div>
            `);
            $elemAgency.append($elemAgencyItemLabelWrapper);
        }else{
            isUpdate = true;
        }

        
        var $elemAgencyItemAttrWrapper = $(` <div class="hide agencies__item--attr"></div>`);
        _.forEach(agency,(item,index)=>{
            let sortingClassName =  index.toLowerCase().replace(", ", "---");
            if(isotopeSortingNames[sortingClassName] === undefined){
               
                if(sortingClassName !== 'agency'){
                    isotopeSortingNames[sortingClassName] = '.'+sortingClassName+' parseFloat';
                }else{
                    isotopeSortingNames[sortingClassName] = '.'+sortingClassName;
                }
                
            }
            // Testing purposes.show categories and points
            //$elemAgencyItemLabelWrapper.append('<div>'+index+' = '+item+'</div>');

            var $elemAgencyAttributes = $(` <div>`+item+`</div>`);
            $elemAgencyAttributes.addClass(sortingClassName);
            $elemAgencyItemAttrWrapper.append($elemAgencyAttributes);

        });
               
        // $elemAgency.append($elemAgencyItemLabelWrapper);
        if(isUpdate == true){
            $elemAgency.find('.agencies__item--attr').remove()
        }
        $elemAgency.append($elemAgencyItemAttrWrapper);
        $elemPsei.append($elemAgency);

    });
    updateAgenciesLabel();
    resizeAgencyItem();
    let sortingClassName =  getSortingClassName();
    var isotopeOption = {
        itemSelector: '.agencies__item',
        layoutMode: 'fitRows',
        sortAscending : false,
        getSortData: isotopeSortingNames
    };

    
    if(isUpdate == false){
        $grid = $elemPsei.isotope(isotopeOption);
        sortAgencies();
        $grid.on( 'arrangeComplete', updateAgencyScoreBackground );
    }else{
        $grid.isotope('updateSortData',$('.agencies__item'));
        sortAgencies();
    }
    

    
    // $grid.imagesLoaded().progress( function() {
    //     $grid.isotope('layout');
    //   });

    // grid.isotope('updateSortData').isotope();

}

function sortAgencies(){
    let sortingClassName =  getSortingClassName();
    let selectedSortBy = $('.select__sortby').val();

    var sortAscending = false;
    var sortScore = [sortingClassName,'agency'];
    if(selectedSortBy == 'l-h'){
        sortAscending = true;
    }
    if(selectedSortBy == 'a-z'){
        sortScore = ['agency'];
        sortAscending = true;
    }
    sortScore = [sortingClassName,'agency'];
    $('.agencies__wrapper').isotope({ sortBy: sortScore,sortAscending:sortAscending });
}
function updateAgencyScoreBackground(){

    var $filteredAgencyItems =$('.agencies__wrapper').data('isotope').filteredItems;
    var filterColor = filterColors[currentSelectedFilter];

    for(var xx=1;xx < ($filteredAgencyItems.length +1);xx++){
        var $filteredAgencyItem = $($filteredAgencyItems[xx-1].element);
        var color = filterColor.t10;
        if(xx > 10 && xx <=20){
            color = filterColor.t20;
        }else if(xx > 20){
            color = filterColor.t30;
        }
        $filteredAgencyItem.find('.item__points').css({'background-color':color, WebkitTransition : 'opacity 3s ease-in-out',
        MozTransition    : 'opacity 3s ease-in-out',
        MsTransition     : 'opacity 3s ease-in-out',
        OTransition      : 'opacity 3s ease-in-out',
        transition       : 'opacity 3s ease-in-out'});
    }   
}
function updateAgenciesLabel(){
    let sortingClassName =  getSortingClassName();
    
    $('.agencies__item').each((agencyKey,agencyElem) =>{
        let points = $(agencyElem).children('.agencies__item--attr').find('.'+sortingClassName).text();
        $(agencyElem).children('.agencies__item--label').find('.item__points').html(points);
  
      
       
    })
}

function initCustomSelect(){
    /* ===== Logic for creating fake Select Boxes ===== */
$('.sel--main').each(function() {
    $(this).children('select').css('display', 'none');
    
    var $current = $(this);
    
    $(this).find('option').each(function(i) {
      if (i == 0) {
        $current.prepend($('<div>', {
          class: $current.attr('class').replace(/sel/g, 'sel__box')
        }));
        
        // var placeholder = $(this).text();

        // $current.prepend($('<span>', {
        //   class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
        //   html: '<span class="sel__placeholder--value">'+placeholder+'</span>',
        //   'data-placeholder': placeholder
        // }));
        
        return;
      }
      if(i == 1){
        var placeholder = $(this).text();
        $current.find('.sel__placeholder--value').text(placeholder);
        $current.prepend($('<span>', {
            class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
            html: '<div class="sel__placeholder--value">'+placeholder+'</div>',
            'data-placeholder': placeholder
          }));
      }

      
      $current.children('div').append($('<span>', {
        class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
        text: $(this).text()
      }));
    });
  });
  
  // Toggling the `.active` state on the `.sel`.
  $('.sel--main').click(function() {
    $('.sel--main').not(this).removeClass('active');
    $(this).toggleClass('active');
  });
  
  // Toggling the `.selected` state on the options.
  $('.sel--main').find('.sel__box__options').click(function() {
    var txt = $(this).text();
    var index = $(this).index();
    
    // $(this).siblings('.sel__box__options').removeClass('selected');
    // $(this).addClass('selected');
    
    var $currentSel = $(this).closest('.sel');

    currentSelectedFilter = $currentSel.attr('id');
    //    console.log($currentSel.children('select options:nth-child('+index + 1+')'));

    let selectedValue = $currentSel.children('select').children('option:nth-child('+(index+2)+')').val();
    $currentSel.children('.sel__placeholder').html('<div class="sel__placeholder--value">'+txt+'</div>').attr('data-placeholder',txt);
    $currentSel.children('select').val(selectedValue);
    $currentSel.children('select').change();
  });
  
}

function initCustomSelectModal(){

    /* ===== Logic for creating fake Select Boxes ===== */
$('.sel--modal').each(function() {
    $(this).children('select').css('display', 'none');
    
    var $current = $(this);

    $(this).find('option').each(function(i) {
      if (i == 0) {
        $current.prepend($('<div>', {
          class: $current.attr('class').replace(/sel/g, 'sel__box')
        }));
        
        // var placeholder = $(this).text();

        // $current.prepend($('<span>', {
        //   class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
        //   html: '<span class="sel__placeholder--value">'+placeholder+'</span>',
        //   'data-placeholder': placeholder
        // }));
        
        return;
      }
      if(i == 1){
        var placeholder = $(this).text();
        $current.find('.sel__placeholder--value').text(placeholder);
        $current.prepend($('<span>', {
            class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
            html: '<div class="sel__placeholder--value">'+placeholder+'</div>',
            'data-placeholder': placeholder
          }));
      }

      
      $current.children('div').append($('<span>', {
        class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
        text: $(this).text()
      }));
    });
  });
  
  // Toggling the `.active` state on the `.sel`.
  $('.sel--modal').click(function() {
    $('.sel--modal').not(this).removeClass('active');
    $(this).toggleClass('active');
  });
  
  // Toggling the `.selected` state on the options.
  $('.sel--modal').find('.sel__box__options').click(function() {
    var txt = $(this).text();
    var index = $(this).index();
    
    // $(this).siblings('.sel__box__options').removeClass('selected');
    // $(this).addClass('selected');
    
    var $currentSel = $(this).closest('.sel');

    //    console.log($currentSel.children('select options:nth-child('+index + 1+')'));

    let selectedValue = $currentSel.children('select').children('option:nth-child('+(index+2)+')').val();
    $currentSel.children('.sel__placeholder').html('<div class="sel__placeholder--value">'+txt+'</div>').attr('data-placeholder',txt);
    $currentSel.children('select').val(selectedValue);
    $currentSel.children('select').change();
  });
  
}


async function getData(){
    var result = {};
    
    try {
        result['data'] = await $.getJSON("files/data.json");
        result['config'] = await $.getJSON("files/config.json");
        return result;
    } catch (error) {
        console.error(error);
    }
    return result;
}