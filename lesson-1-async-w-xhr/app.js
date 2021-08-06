(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
	const searchButton = document.querySelector('#submit-btn');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
	//send first request
	unsplashRequest.send();
	//send second requst
	articleRequest.send();
    });
	
	//first request to Unsplash
	const unsplashRequest = new XMLHttpRequest();
	unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
	unsplashRequest.onload = addImage;
	unsplashRequest.setRequestHeader('Authorization', 'Client-ID lQOJO5Jpn5zPIwURtogMiMp9dQwd8GF5fvgz6Dbpc-Y');
	//second request to NYTimes
	const articleRequest = new XMLHttpRequest();
	articleRequest.onload = addArticles;
	articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=FyhFXnLTxSJtRiOAvFlGjH7g67ahUSad`);
	
	function addImage(){
		const data = JSON.parse(this.responseText);
		const firstImage = data.results[0];
		let htmlContent = `<figure>
			<img src="${firstImage.urls.regular}" alt="${searchedForText}">
			<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
		</figure>`;
		responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
	}
	
	function addArticles () {
		let htmlContent = '';
		const data = JSON.parse(this.responseText);
		if(data.response && data.response.docs && data.response.docs.length > 1){
			htmlContent = '<ul>'+ data.response.docs.map(
				article => `<li class="article">
					<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
					<p>${article.snippet}</p>
				</li>`
			).join('')+'</ul>';			
		}else{
			htmlContent = '<div class="error-no-articles">No articles available</div>';
		}
		responseContainer.insertAdjacentHTML('beforeend', htmlContent);
	}
})();
