'use strict';
let keyword = [];
let arr = [];
function Image(item) {
    this.image_url = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horns = item.horns;
    keyword.push(item.keyword);
}




Image.prototype.render = function () {

    let templet = $('.photo-template').clone();

    $('section').append(templet);

    templet.find('h2').text(this.title);
    templet.find('h3').text(this.horns);
    templet.find('img').attr('src', this.image_url);
    templet.find('p').text(this.description);
    templet.removeClass('photo-template');
    templet.addClass(this.keyword);
    templet.addClass('default');

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
            $('#selects').append(`<option value="${keyword[j]}"> 
            ${keyword[j]} 
        </option>`);
        }
        start = false;
        count = 0;

    }


    console.log(arr);

    $('#selects').change(function(){
        $('div').hide();
        $('.' + this.value ).show();
    
    })
};


// $('#selects').change(function () {
//     let value = $(this).val();

//     if (value !== 'default') {
//         $('section').hide();
//         $(`section[keyword=${value}]`).fadeIn(750);
//     } else {
//         $('section').fadeIn(750);
//     }
// });





Image.readJson = () => {
        const ajaxSetting = {
            method: 'get',
            dataType: 'json'
        };

        $.ajax('page-1.json', ajaxSetting).then(data => {
            data.forEach(item => {
                let photo = new Image(item);
                photo.render();
                // photo.selectImage();

            });

        });
    };

$(() => Image.readJson());

