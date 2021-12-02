(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    let allArray = '';
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID biPfOU7T0oqylU-3TLTxbSETF8u2vmovl1D0owwh0ag');
        unsplashRequest.send();

        function addImage() {
            let htmlContent = ''
            const data = JSON.parse(this.responseText)
            for (i = 0; i < data.results.length; i++) {
                if (data.results[i]) {
                    htmlContent = `<figure>
                    <img src="${data.results[i].urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${data.results[i].user.name}</figcaption>
                </figure>`
                    allArray += htmlContent
                }
            }
            if (!data.results[0]) {
                allArray =
                    "<div>No images avalibale</div>"
            }
            responseContainer.insertAdjacentHTML('afterbegin', allArray)
            allArray = ""
        }
    });

})();