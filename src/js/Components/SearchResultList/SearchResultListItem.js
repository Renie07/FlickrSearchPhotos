export class SearchResultListItem {
    constructor (item) {
        this.item = item;
    }

    render () {
        const $block = $(`
            <div class="searchResult_listItem">
                <img src="https://farm${this.item.farm}.staticflickr.com/${this.item.server}/${this.item.id}_${this.item.secret}.jpg" class="searchResult_img" alt="${this.item.title}" title="${this.item.title}">
            </div>
        `);

        return $block;
    }
}
