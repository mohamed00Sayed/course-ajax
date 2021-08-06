(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
	
	searchedForText = 'hippos';
	const unsplashRequest = new XMLHttpRequest();

	unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
	unsplashRequest.onload = addImage;
	unsplashRequest.setRequestHeader('Authorization', 'Client-ID lQOJO5Jpn5zPIwURtogMiMp9dQwd8GF5fvgz6Dbpc-Y');
	unsplashRequest.send();

	function addImage(){
		
	}
	
})();
