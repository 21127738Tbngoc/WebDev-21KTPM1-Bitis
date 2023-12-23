
class SearchbarFunc
{
    constructor()
    {
        this.isSearching = true;
    }

    toggleSearch()
    {
        const searchLabel = document.querySelector('.search-label')
        const searchDropdown = document.querySelector('.search-dropdown')

        if(this.isSearching === false)
        {
            searchLabel.classList.remove('disable-search-label');
            searchDropdown.classList.remove('open-search-dropdown');
            this.isSearching = true;
        }
        else {
            searchLabel.classList.add('disable-search-label');
            searchDropdown.classList.add('open-search-dropdown');
            this.isSearching = false
        }
    }
}

export default SearchbarFunc;