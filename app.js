const filterButtons = document.querySelectorAll('[data-filter]');
const saunaList = document.querySelector('#sauna-list');
const status = document.querySelector('#sauna-status');

function updateStatus() {
    const cards = saunaList.querySelectorAll('article');
    const shown = saunaList.querySelectorAll('article:not([hidden])');
    status.textContent = `Showing ${shown.length} of ${cards.length} saunas`;
}

for (const button of filterButtons) {
    button.addEventListener('click', () => {
        // Mark this button as the chosen one (screen readers hear it too).
        for (const other of filterButtons) {
            other.setAttribute('aria-pressed', String(other === button));
        }

        // Hide the saunas that are too small for the chosen group size.
        // dataset values are always strings, so Number() before comparing.
        const filter = button.dataset.filter;
        const cards = saunaList.querySelectorAll('article');
        for (const card of cards) {
            const capacity = Number(card.dataset.capacity);
            card.hidden = !(filter === 'all' || capacity >= Number(filter));
        }

        updateStatus();
    });
}

updateStatus();
