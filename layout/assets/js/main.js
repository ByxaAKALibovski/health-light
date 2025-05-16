function preloadImage(input){
    if(input.files && input.files[0]){
        let label = input.parentNode;
        let reader = new FileReader();
        reader.onload = function (e){
            if(label.querySelector('p') != null) label.querySelector('p').remove();
            if(label.querySelector('img') != null) label.querySelector('img').remove();
            label.innerHTML += `<img src="${e.target.result}" style="width: auto; height: 70px;">`;
        }
        reader.readAsDataURL(input.files[0]);
    }else{
        let label = input.parentNode;
        if(label.querySelector('img') != null) label.querySelector('img').remove();
        label.innerHTML += `<p>Прикрепите изображение</p>`;
    }
}
function doctorSlider(slider){
    var sliderNav = slider.querySelector('.slider__nav');
    var sliderLine = slider.querySelector('.slider__line');

    sliderNav.addEventListener('click', function(e){
        if(e.target.nodeName == "LI" || e.target.parentNode.nodeName == "LI"){
            var navItem = e.target.parentNode.nodeName == "LI" ? e.target.parentNode : e.target;
            var idnexNavItem = Array.prototype.indexOf.call(sliderNav.children, navItem);
            sliderLine.style.left = `${-1320 * idnexNavItem}px`;
            
            sliderNav.querySelector('.active').classList.remove('active');
            navItem.classList.add('active');
        }
    });
}
function popupOpen(e){
    e.preventDefault();
    document.querySelector(`.popup[data-popup="${e.target.getAttribute("data-popup")}"]`).classList.add('active');
}
function personalSwitch(){
    document.addEventListener("click", function(e){
        if(e.target.getAttribute('data-personal-switch') != null){
            e.preventDefault();
            document.querySelector("a[data-personal-switch='true'].active").classList.remove('active');
            e.target.classList.add('active');
            
            var sectionTarget = e.target.getAttribute('href');
            document.querySelector('section.active').classList.add('no-active');
            document.querySelector('section.active').classList.remove('active');
            document.querySelector(`section#${sectionTarget}`).classList.remove('no-active');
            document.querySelector(`section#${sectionTarget}`).classList.add('active');
        }
    });
} personalSwitch();

if(document.querySelector('.doctor__slider') != null) doctorSlider(document.querySelector('.doctor__slider'));

document.addEventListener("change", function(e){
    if(e.target.nodeName == "INPUT" && e.target.getAttribute('type') == "file") preloadImage(e.target);
});
document.addEventListener("click", function(e){
    if(e.target.getAttribute('data-popup') != null) popupOpen(e);
    if(e.target.classList.contains('over')) e.target.parentNode.classList.remove('active');
});
