document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-item');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('disabled')) return;
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            console.log(`Switched to tab: ${tab.textContent}`);
        });
    });

    // Handle Join Lesson button (mock behavior)
    const joinBtn = document.querySelector('.btn-disabled');
    if (joinBtn && joinBtn.classList.contains('btn-disabled')) {
        joinBtn.title = "Lesson will be available in 1 day";
    }

    // Nav navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
});
