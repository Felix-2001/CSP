const info = document.querySelector('#customer-info');

async function loadCustomer() {
    try {
        const customer = await fetchJson(`${API_BASE}/customer?customer=${CUSTOMER}`);
        const parts = [];
        if (customer.address) parts.push(customer.address);
        if (customer.evening) parts.push(`Open in the evening, ${customer.evening}.`);
        if (customer.contact) parts.push(`Contact person: ${customer.contact}.`);
        info.textContent = parts.length > 0
            ? parts.join(' ')
            : 'We have no address to show right now. Please use the contact page.';
    } catch (error) {
        info.textContent = 'Our address could not be loaded. Please use the contact page.';
    }
}

loadCustomer();