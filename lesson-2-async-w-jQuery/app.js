/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
	$.ajax({
		url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
		headers: {
			Authorization: 'Client-ID lQOJO5Jpn5zPIwURtogMiMp9dQwd8GF5fvgz6Dbpc-Y'
		}
	}).done(addImage);

	$.ajax({
		url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=FyhFXnLTxSJtRiOAvFlGjH7g67ahUSad`,
	}).done(addArticles);
    });
	
	function addImage(images){
		const firstImage = images.results[0];
		
		let htmlContent = `<figure>
			<img src="${firstImage.urls.regular}" alt="${searchedForText}">
			<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
		</figure>`;
		responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
	}

	function addArticles (data) {
		let htmlContent = '';
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
