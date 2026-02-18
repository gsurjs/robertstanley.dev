const projects = {
    panther: {
        type: 'web',
        cmd: 'firebase deploy --only hosting',
        title: "PantherMarket",
        url: "https://www.panthermarket.app/",
        domain: "Full-Stack Web App",
        desc: "GSU-exclusive marketplace with AI moderation, Stripe payments, and identity verification.",
        tech: ["JavaScript", "Firebase", "Stripe", "Vercel", "GenAI"]
    },
    spot: {
        type: 'repo',
        cmd: './spot_ai_controller.py --init',
        title: "Spot: Cognitive Companion",
        url: "https://github.com/gsurjs/SpotAI",
        img: "https://raw.githubusercontent.com/gsurjs/SpotAI/main/images/spot_header.jpg",
        domain: "Robotics & AI",
        desc: "AI-powered assistant for Boston Dynamics Spot robot using OpenAI/Gemini/Groq and Computer Vision.",
        tech: ["Python", "Spot SDK", "GenAI", "Linux"]
    },
    gloveboxx: {
        type: 'repo',
        cmd: 'flutter run --release',
        title: "GloveBoxx",
        url: "https://github.com/gsurjs/GloveBoxx",
        img: "https://raw.githubusercontent.com/gsurjs/GloveBoxx/main/assets/screenrec.gif",
        domain: "Mobile Development",
        desc: "Cross platform vehicle maintenance tracker app built with Flutter. Features expense charting and local SQLite storage.",
        tech: ["Flutter", "Dart", "SQLite"]
    },
    cognito: {
        type: 'web',
        cmd: 'npm start',
        title: "Cognito Bytes",
        url: "https://www.cognitobytes.com/",
        domain: "Frontend Web Dev",
        desc: "A suite of interactive brain training games built with modern HTML5/CSS3 and vanilla JavaScript.",
        tech: ["HTML5", "CSS3", "JavaScript", "PWA"]
    },
    reddit: {
        type: 'repo',
        cmd: 'python3 OverlApp.py --batch-mode',
        title: "Reddit Overlap Analyzer",
        url: "https://github.com/gsurjs/OverlApp",
        img: "https://placehold.co/600x300/1e293b/38bdf8?text=Data+Analysis+Tool",
        domain: "Data Analysis / Python",
        desc: "CLI tool to analyze user overlap between subreddits for community insights and networking.",
        tech: ["Python", "Reddit API", "Data Analytics", "JSON"]
    }
};

let isTyping = false;
let hasAutoStarted = false; // Flag for scroll trigger
const modal = document.getElementById('project-modal');

// --- FADE IN OBSERVER (Restored from your original site) ---
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// --- TERMINAL LOGIC ---
function runCommand(key) {
    if(isTyping) return; 
    
    document.querySelectorAll('.project-item').forEach(el => el.classList.remove('active'));
    // Find item by key/click and active it. If triggered by scroll, we find manually
    const targetItem = document.querySelector(`.project-item[onclick*="'${key}'"]`);
    if(targetItem) targetItem.classList.add('active');

    const p = projects[key];
    const outputDiv = document.getElementById('terminal-output');
    
    outputDiv.innerHTML = `
        <div class="cmd-line">
            <span class="prompt">root@rs-dev:~$</span>
            <span id="typed-command"></span><span class="cursor"></span>
        </div>
        <div id="execution-result" class="output-area"></div>
    `;

    const cmdText = p.cmd;
    const typeSpan = document.getElementById('typed-command');
    let i = 0;
    isTyping = true;

    const typeLoop = setInterval(() => {
        if (i < cmdText.length) {
            typeSpan.textContent += cmdText.charAt(i);
            i++;
        } else {
            clearInterval(typeLoop);
            isTyping = false;
            showResult(p);
        }
    }, 30);
}

function showResult(p) {
    const resultDiv = document.getElementById('execution-result');
    const btnText = p.type === 'web' ? '[ LAUNCH LIVE DEMO ]' : '[ OPEN GITHUB REPO ]';
    
    resultDiv.innerHTML = `
        <div style="margin-bottom: 1rem; color: #94a3b8;">> Build success. Deploying module... Done.</div>
        <div style="font-family: 'Courier New'; line-height: 1.5; background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 6px;">
            <span class="text-secondary"># ProjectManifest.json</span><br>
            title: <span class="text-accent">"${p.title}"</span><br>
            domain: <span class="text-accent">"${p.domain}"</span><br>
            desc: <span class="text-secondary">"${p.desc}"</span><br>
            stack: [ ${p.tech.map(t => `<span class="json-bool">"${t}"</span>`).join(', ')} ]
            <br><br>
            <button class="launch-btn" onclick="openModal('${p.title}')">${btnText}</button>
        </div>
    `;
    setTimeout(() => resultDiv.classList.add('visible'), 100);
}

function openModal(title) {
    const pKey = Object.keys(projects).find(k => projects[k].title === title);
    const p = projects[pKey];
    const modalBody = document.getElementById('modal-body');
    const urlBar = document.getElementById('modal-url');
    
    urlBar.textContent = p.url;

    if (p.type === 'web') {
        modalBody.innerHTML = `<iframe src="${p.url}" class="preview-frame" sandbox="allow-scripts allow-same-origin"></iframe>`;
    } else {
        modalBody.innerHTML = `
            <div class="repo-card">
                <img src="${p.img}" alt="${p.title}" class="repo-img">
                <h2 style="margin-bottom: 1rem;">${p.title}</h2>
                <p style="color: #94a3b8; margin-bottom: 2rem; max-width: 500px;">${p.desc}</p>
                <a href="${p.url}" target="_blank" class="launch-btn">View Source on GitHub</a>
            </div>
        `;
    }
    
    modal.classList.add('open');
}

function closeModal() { modal.classList.remove('open'); }
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// INTERSECTION OBSERVER for Auto-Start on Scroll (Terminal)
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAutoStarted) {
            hasAutoStarted = true;
            // Trigger the first project automatically
            runCommand('panther'); 
        }
    });
}, { threshold: 0.3 }); // Trigger when 30% of the section is visible

const targetSection = document.querySelector('.projects-container');
if(targetSection) terminalObserver.observe(targetSection);