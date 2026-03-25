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

    if (parentBtn && modal) {
        parentBtn.addEventListener('click', () => {
            modal.classList.add('active');
            if (codeInputs.length > 0) {
                codeInputs[0].focus();
            }
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Auto-focus move logic for code boxes
    if (codeInputs.length > 0) {
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
    }

    if (verifyBtn && codeInputs.length > 0) {
        verifyBtn.addEventListener('click', () => {
            const code = Array.from(codeInputs).map(input => input.value).join('');
            if (code.length === 4) {
                // Accept any 4 digit code for demo purposes
                window.location.href = 'parent.html';
            } else {
                alert('Please enter a 4-digit code.');
            }
        });
    }

    // Subject Switching Logic
    const navMath = document.getElementById('nav-math');
    const navEla = document.getElementById('nav-ela');
    const programTitle = document.getElementById('program-title');
    const promoTitle = document.getElementById('promo-title');
    const promoDesc = document.getElementById('promo-desc');
    const promoBtn = document.getElementById('promo-btn');
    const promoImg = document.getElementById('promo-img');
    const promoBadge = document.getElementById('promo-badge');

    const content = {
        math: {
            title: 'Math program',
            promoTitle: 'Ms. Sarah Chen sent you new challenges!',
            promoDesc: "Complete these quests to earn 50 Star Coins and unlock cool rewards. You're very close to reaching Level 5 in your adventure!",
            promoBtn: 'Start Challenges',
            promoImg: 'assets/promo-illustration.png',
            promoBadge: '<i class="fas fa-rocket"></i> New Quest!'
        },
        ela: {
            title: 'ELA program',
            promoTitle: 'Ms. Sarah Chen sent you new English tasks!',
            promoDesc: "Collect golden keys by finishing your English challenges. You're very close to reaching Level 5 in your adventure!",
            promoBtn: 'Claim My Tasks',
            promoImg: 'assets/promo-ela.png',
            promoBadge: '<i class="fas fa-key"></i> Treasure Hunt!'
        }
    };

    function updateSubject(subject) {
        document.body.className = subject === 'ela' ? 'subject-ela' : '';
        
        // Update Nav
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        if (subject === 'math' && navMath) navMath.classList.add('active');
        if (subject === 'ela' && navEla) navEla.classList.add('active');

        // Update Content
        if (programTitle) programTitle.innerHTML = `${content[subject].title} <a href="#" class="read-more">Read more <i class="fas fa-arrow-right"></i></a>`;
        if (promoTitle) promoTitle.textContent = content[subject].promoTitle;
        if (promoDesc) promoDesc.textContent = content[subject].promoDesc;
        if (promoBtn) promoBtn.textContent = content[subject].promoBtn;
        if (promoImg) promoImg.src = content[subject].promoImg;
        if (promoBadge) promoBadge.innerHTML = content[subject].promoBadge;
    }

    if (navMath) {
        navMath.addEventListener('click', (e) => {
            e.preventDefault();
            updateSubject('math');
        });
    }

    if (navEla) {
        navEla.addEventListener('click', (e) => {
            e.preventDefault();
            updateSubject('ela');
        });
    }

    if (promoBtn) {
        promoBtn.addEventListener('click', () => {
            window.location.href = 'mission.html';
        });
    }
});
