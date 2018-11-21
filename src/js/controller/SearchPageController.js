import { SearchPageConstants } from './../constants/SearchPageConstants';
import { Flickr } from './../Components/Flickr/Flickr';
import { SearchResultList } from './../Components/SearchResultList/SearchResultList';

export class SearchPageController {
    init () {
        this.initPlaceholder();
        this.submitSearchPhotosHandler();
    }

    initPlaceholder() {
        $(SearchPageConstants.inputSelector).focus(function(){
            $(this).data(SearchPageConstants.placeholderSelector, $(this).attr(SearchPageConstants.placeholderSelector));
            $(this).attr(SearchPageConstants.placeholderSelector,'');
        });
        $(SearchPageConstants.inputSelector).blur(function(){
            $(this).attr(SearchPageConstants.placeholderSelector, $(this).data(SearchPageConstants.placeholderSelector));
        });
    }


    loadPhoto(page = 1) {
        const text = $(SearchPageConstants.searchInputSelector).val();
        const flickr = new Flickr();

        flickr.getPhotos(text, page).then((list) => {
            let searchResultList = new SearchResultList(list, text);

            searchResultList.render();
            this.initLoadMoreButton(page, list.photos.pages);

        }).catch((error) => {
        });
    }

    initLoadMoreButton(page, pagesQuantity) {

        if( pagesQuantity == 0) {
            return;
        }

        const $loadMoreButton = $(`
            <button class="button searchResult__button">Show More</button>
        `);

        $loadMoreButton.remove();

        page == 1 && page != pagesQuantity ? $(SearchPageConstants.searchResultShowMoreBlock).append($loadMoreButton) : null;

        $loadMoreButton.on('click', () => {
            page++;

            this.loadNextPage(page);

            page == pagesQuantity ? $loadMoreButton.remove() : null;

        })
    }

    loadNextPage(page) {
        this.loadPhoto(page);
    }

    clearResults() {
        $(SearchPageConstants.searchResultBlockQuantity).empty();
        $(SearchPageConstants.searchResultListBlock).empty();
        $(SearchPageConstants.searchResultShowMoreBlock).empty();
    }

    placeErrorHandler() {
        $(SearchPageConstants.searchInputSelector).addClass(SearchPageConstants.fieldErrorClass);
        $(SearchPageConstants.searchInputSelector).attr(SearchPageConstants.placeholderSelector, SearchPageConstants.placeholderErrorText);
    }

    submitSearchPhotosHandler() {
        $(SearchPageConstants.searchPhotosFormSelector).submit((e) => {
            e.preventDefault();

            if(!$(SearchPageConstants.searchInputSelector).val()) {
                this.placeErrorHandler();
                return;
            }

            this.clearResults();
            this.loadPhoto();
        })
    }


}


