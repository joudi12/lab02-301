'use strict';


let keyword = [];
let keyword2 = [];
let arr = [];
let arr2 = [];
let horns = [];

// function Image(item) {
//     this.image_url = item.image_url;
//     this.title = item.title;
//     this.description = item.description;
//     this.keyword = item.keyword;
//     this.horns = item.horns;
//     keyword.push(item.keyword);

//     horns.push(this);

// }
function Image(item) {

    for (let key in item) {
        this[key] = item[key];

    }
    horns.push(this);
    keyword.push(this.keyword);
}

Image.prototype.tohtml = function () {

    let source = $('#mustache-template').html();
    let template = Mustache.render(source, this);

    // template.addClass(this.keyword);
    //  template.addClass('default');
    $('section').append(template);

    // return template;

    // let templet = $('.photo-template').clone();

    //  $('section').append(templet);

    // templet.find('h2').text(this.title);
    // templet.find('h3').text(this.horns);
    // templet.find('img').attr('src', this.image_url);
    // templet.find('p').text(this.description);
    // templet.removeClass('photo-template');

};



Image.prototype.drowbdon = function () {
    var count = 0;
    var start = false;


    for (let j = 0; j < keyword.length; j++) {

        for (let k = 0; k < arr.length; k++) {

            if (keyword[j] == arr[k]) {
                start = true;
            }
        }
        count++;
        if (count == 1 && start == false) {
            arr.push(keyword[j]);


            $('#selects').append(`<option value="${keyword[j]}">${keyword[j]}</option>`);

        }
        start = false;
        count = 0;
    }


    $('#selects').on('change', function () {

        $('div').hide();

        $('.' + $('select').val()).show();
        // $('.' +  $('select').val() ).show();
    })
};




Image.readJson = () => {

    const ajaxSetting = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/a11.json', ajaxSetting).then(data => {

        data.forEach(item => {
            let photo = new Image(item);

            photo.tohtml();
            photo.drowbdon();




            // photo.selectImage();
        });
    });

};

$(() => Image.readJson());



$("#pageTow").click(function () {
    $('div').hide();


    Image.readJson2 = () => {
        $('select').empty();

        const ajaxSetting = {
            method: 'get',
            dataType: 'json'
        };

        $.ajax('data/page-2.json', ajaxSetting).then(data => {
            data.forEach(item => {
                let photo = new Image(item);
                photo.tohtml();

                photo.drowbdon();


            });

        });
    };
    keyword = [];
    horns = [];
    arr = [];
    $(() => Image.readJson2());

});



$("#pageOne").click(function () {
    $('div').hide();
    Image.readJson2 = () => {
        $('select').empty();

        const ajaxSetting = {
            method: 'get',
            dataType: 'json'
        };

        $.ajax('data/a11.json', ajaxSetting).then(data => {
            data.forEach(item => {
                let photo = new Image(item);
                photo.tohtml();

                photo.drowbdon();


            });

        });
    };
    keyword = [];
    horns = [];
    arr = [];
    $(() => Image.readJson2());

});



let titleSort = () => {

    horns.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });
    console.log(horns);

    $('div').hide();
    // $('.photo-template').show();
    horns.forEach((valu) => {
valu.tohtml();
    })

};
$('#title').on('click', titleSort);



let hornSort = () => {
    
        horns.sort((a, b) => {
            return Number(a.horns) - Number(b.horns);
        });
        
    
    $('div').hide();
    horns.forEach((valu) => {
        valu.tohtml();
            })
};
$('#hornse').on('click', hornSort);


