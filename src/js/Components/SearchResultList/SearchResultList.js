import { SearchResultListItem } from './SearchResultListItem';

export class SearchResultList {
    constructor (list, text) {
        this.list = list.photos;
        this.text = text;
    }

    render() {
        if (this.list.total > 0) {
            return [
                this.renderListQuantity(),
                this.renderList()
            ]
        } else {
            return this.renderNoResult();
        }
    }

    renderListQuantity() {
        const $searchResultListQuantityBlock = $(`
           <h6>
            Results: ${this.list.total}
           </h6>
        `);

        $('.js-searchResult-quantity').html($searchResultListQuantityBlock);
    }


    renderList () {
        const $searchResultListBlock =  $('.js-searchResult-list');

        this.list.photo.forEach((item) => {
            const $searchResultListItemBlock = new SearchResultListItem(item).render();

            $searchResultListBlock.append($searchResultListItemBlock);
        });
    }

    renderNoResult() {
        const $searchResultNotFoundTitle = $(`
            <h2 class="searchResult_notFoundTitle">
                Oops! There are no matches for “${this.text}”.
            </h2>
        `);

        $('.js-searchResult-list').html($searchResultNotFoundTitle);
    }
};
