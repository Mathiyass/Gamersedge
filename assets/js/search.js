const Search = {
    fuse: null,
    products: [],
    inputEl: null,
    resultsEl: null,

    init(inputEl, resultsEl) {
        if (!inputEl || !resultsEl) return;
        this.inputEl = inputEl;
        this.resultsEl = resultsEl;
        this.products = Store.getProducts();
        
        const options = {
            includeScore: true,
            keys: ['name', 'brand', 'category', 'shortDescription'],
            threshold: 0.4,
        };
        
        this.fuse = new Fuse(this.products, options);
        
        this.inputEl.addEventListener('input', Utils.debounce(this.performSearch.bind(this), 300));
        
        this.inputEl.addEventListener('focus', this.showInitialState.bind(this));
    },

    performSearch(event) {
        const query = event.target.value.trim();
        if (query === '') {
            this.showInitialState();
            return;
        }

        const results = this.fuse.search(query);
        this.renderResults(results.map(result => result.item));
    },

    renderResults(products) {
        if (products.length === 0) {
            this.resultsEl.innerHTML = `<p class="text-center text-text-muted p-8">No results found.</p>`;
            return;
        }

        this.resultsEl.innerHTML = `
            <h4 class="text-xs font-bold text-text-muted uppercase px-3 pb-2">Products</h4>
            ${products.slice(0, 10).map(UI.createSearchResultItem).join('')}
        `;
    },

    showInitialState() {
        // For now, it shows a placeholder. Later, recent searches and quick categories can be added.
        const categories = Store.getCategories();

        this.resultsEl.innerHTML = `
            <div>
                <h4 class="text-xs font-bold text-text-muted uppercase px-3 pb-2">Quick Categories</h4>
                <div class="flex flex-wrap gap-2 px-3">
                    ${categories.map(cat => `
                        <a href="shop.html?category=${cat.slug}" class="bg-surface-light px-3 py-1 text-sm rounded-full text-text-secondary hover:bg-neon-cyan hover:text-void transition-colors">${cat.icon} ${cat.name}</a>
                    `).join('')}
                </div>
            </div>
        `;
    }
};
