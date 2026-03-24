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

    // Parental Access Logic
    const parentBtn = document.getElementById('parent-access-btn');
    const modal = document.getElementById('parent-modal');
    const closeBtn = document.querySelector('.close-modal');
    const codeInputs = document.querySelectorAll('.code-box');
    const verifyBtn = document.getElementById('verify-btn');

    if (parentBtn) {
        parentBtn.addEventListener('click', () => {
            modal.classList.add('active');
            codeInputs[0].focus();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Auto-focus move logic for code boxes
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });

    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            const code = Array.from(codeInputs).map(input => input.value).join('');
            if (code.length === 4) {
                // Accept any 4 digit code
                window.location.href = 'parents.html';
            } else {
                alert('Please enter a 4-digit code.');
            }
        });
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
