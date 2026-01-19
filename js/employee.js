// employee.js - Employee profile functionality

// Career timeline data
const careerTimelines = {
    1: [
        {
            date: "2018 - Данас",
            title: "Извршни директор",
            company: "Марин Системс Д.О.О.",
            description: "Оснивач и извршни директор компаније. Води стратешки развој, иновације и укупно пословање."
        },
        {
            date: "2015 - 2018",
            title: "Технички директор",
            company: "ТехноСолушнс ИТ",
            description: "Руководио техничким тимом и развојем софтверских решења за велике корпоративне клијенте."
        },
        {
            date: "2012 - 2015",
            title: "Сениор софтверски инжењер",
            company: "ДигиталВоркс",
            description: "Развијао сложене веб апликације и мобилне платформе. Менторирао млађе инжењере."
        },
        {
            date: "2010 - 2012",
            title: "Софтверски инжењер",
            company: "КодеЛабс",
            description: "Учествовао у развоју различитих софтверских пројеката и стекнуо темељно знање у програмирању."
        }
    ],
    2: [
        {
            date: "2019 - Данас",
            title: "Технички директор",
            company: "Марин Системс Д.О.О.",
            description: "Руководи техничким тимом и осигурава квалитет софтверских решења."
        },
        {
            date: "2017 - 2019",
            title: "Шеф развоја софтвера",
            company: "ТехноСолушнс ИТ",
            description: "Водио тим развојника у изради enterprise решења."
        },
        {
            date: "2014 - 2017",
            title: "Сениор развојник",
            company: "СофтТех Корпорација",
            description: "Развијао backend системе и микросервис архитектуру."
        }
    ],
    // Add more timelines for other employees...
};

// Current projects data
const currentProjects = {
    1: [
        {
            title: "Платформа за управљање компанијом",
            description: "Развој централизоване платформе за управљање свим аспектима пословања.",
            status: "active",
            progress: 85,
            deadline: "2024-06-30"
        },
        {
            title: "Иновациони центар роботике",
            description: "Иницијатива за оснивање истраживачког центра за роботику и вештачку интелигенцију.",
            status: "planning",
            progress: 30,
            deadline: "2024-12-31"
        }
    ],
    2: [
        {
            title: "Обнављање инфраструктуре",
            description: "Модернизација серверске инфраструктуре и прелазак на cloud решења.",
            status: "active",
            progress: 65,
            deadline: "2024-05-15"
        }
    ],
    // Add more projects for other employees...
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Employee profile page initialized');
    
    // Get employee ID from localStorage
    const employeeId = localStorage.getItem('selectedEmployeeId') || 1;
    
    // Load employee data
    loadEmployeeProfile(parseInt(employeeId));
    
    // Setup event listeners
    setupEventListeners();
});

// Load employee profile
function loadEmployeeProfile(employeeId) {
    // Get employee data from employees.js (should be included before this file)
    const employee = window.employeesData ? 
        window.employeesData.find(emp => emp.id === employeeId) : 
        getDefaultEmployee(employeeId);
    
    if (!employee) {
        console.error('Employee not found:', employeeId);
        return;
    }
    
    // Update basic info
    document.getElementById('employeeAvatar').src = employee.avatar;
    document.getElementById('employeeAvatar').alt = employee.name;
    document.getElementById('employeeName').textContent = employee.name;
    document.getElementById('employeeRole').textContent = employee.role;
    document.getElementById('employeeLevel').textContent = employee.level;
    document.getElementById('employeeEmail').textContent = employee.email;
    document.getElementById('employeePhone').textContent = employee.phone;
    document.getElementById('employeeDepartment').querySelector('span').textContent = 
        getDepartmentName(employee.department);
    
    // Format hire date
    const hireDate = new Date(employee.hireDate);
    document.getElementById('employeeHireDate').textContent = 
        hireDate.toLocaleDateString('sr-RS');
    
    // Generate employee ID
    document.getElementById('employeeId').textContent = `ID: MS${employee.id.toString().padStart(3, '0')}`;
    
    // Update status
    const statusBadge = document.getElementById('employeeStatus');
    statusBadge.className = `status-badge ${employee.status}`;
    
    // Update level badge
    const levelBadge = document.getElementById('employeeLevelBadge');
    levelBadge.className = `level-badge ${getLevelClass(employee.level)}`;
    
    // Update skills
    updateSkills(employee.skills);
    
    // Update bio
    updateBio(employee.bio);
    
    // Update career timeline
    updateCareerTimeline(employeeId);
    
    // Update current projects
    updateCurrentProjects(employeeId);
    
    // Update statistics
    updateStatistics(employeeId);
    
    // Update access info
    updateAccessInfo(employee.level);
    
    // Update verification code
    updateVerificationCode(employeeId, employee.name);
}

// Get default employee data (fallback)
function getDefaultEmployee(id) {
    return {
        id: id,
        name: "АЛЕКСА МАРИНКОВИЋ",
        role: "ИЗВРШНИ ДИРЕКТОР",
        level: 255,
        department: "management",
        hireDate: "2018-03-15",
        email: "aleksa@marinsystems.rs",
        phone: "+381 64 123 4567",
        bio: "Алекса је оснивач и извршни директор Марин Системса. Са преко 10 година искуства у IT индустрији, води стратешки развој компаније и иновативне пројекте.",
        skills: ["Стратешко руковођење", "ИТ консалтинг", "Развој пословања", "Техничка архитектура"],
        avatar: "assets/portraits/alexa.png",
        status: "online"
    };
}

// Get department name
function getDepartmentName(department) {
    const departments = {
        "management": "Менаџмент",
        "development": "Развој софтвера",
        "design": "Дизајн",
        "technical": "Техничка подршка",
        "production": "Производња",
        "operations": "Операције"
    };
    return departments[department] || department;
}

// Get level class
function getLevelClass(level) {
    if (level >= 200) return "level-executive";
    if (level >= 150) return "level-director";
    if (level >= 100) return "level-senior";
    return "level-regular";
}

// Update skills
function updateSkills(skills) {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';
    
    skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsList.appendChild(skillTag);
    });
}

// Update bio
function updateBio(bio) {
    const bioContent = document.getElementById('employeeBio');
    bioContent.innerHTML = `<p>${bio}</p>`;
}

// Update career timeline
function updateCareerTimeline(employeeId) {
    const timeline = careerTimelines[employeeId] || careerTimelines[1];
    const timelineContainer = document.getElementById('careerTimeline');
    timelineContainer.innerHTML = '';
    
    timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${index * 0.1}s`;
        
        timelineItem.innerHTML = `
            <div class="timeline-date">
                <i class="far fa-calendar"></i>
                ${item.date}
            </div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-company">${item.company}</div>
            <div class="timeline-description">${item.description}</div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Update current projects
function updateCurrentProjects(employeeId) {
    const projects = currentProjects[employeeId] || currentProjects[1];
    const projectsContainer = document.getElementById('currentProjects');
    projectsContainer.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.style.animationDelay = `${index * 0.1}s`;
        
        const statusClass = project.status === 'active' ? 'status-active' : 'status-planning';
        const statusText = project.status === 'active' ? 'Активно' : 'Планирање';
        
        projectItem.innerHTML = `
            <div class="project-title">
                <span>${project.title}</span>
                <span class="project-status ${statusClass}">${statusText}</span>
            </div>
            <div class="project-description">${project.description}</div>
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                </div>
                <div class="progress-text">
                    <span>Напредак</span>
                    <span>${project.progress}%</span>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectItem);
    });
}

// Update statistics
function updateStatistics(employeeId) {
    // These would come from a real API
    const stats = {
        yearsExperience: Math.floor(Math.random() * 10) + 5,
        projectsCount: Math.floor(Math.random() * 50) + 20,
        teamSize: Math.floor(Math.random() * 30) + 10,
        awardsCount: Math.floor(Math.random() * 10) + 3
    };
    
    document.getElementById('yearsExperience').textContent = stats.yearsExperience + '+';
    document.getElementById('projectsCount').textContent = stats.projectsCount;
    document.getElementById('teamSize').textContent = stats.teamSize;
    document.getElementById('awardsCount').textContent = stats.awardsCount;
}

// Update access info
function updateAccessInfo(level) {
    const securityLevel = level >= 200 ? 'Највиши' : level >= 100 ? 'Висок' : 'Стандардан';
    const systemAccess = level >= 200 ? 'Пуни приступ' : level >= 100 ? 'Ограничени приступ' : 'Основни приступ';
    const privileges = level >= 200 ? 'Администратор' : level >= 100 ? 'Менаџер' : 'Корисник';
    
    document.getElementById('securityLevel').textContent = securityLevel;
    document.getElementById('systemAccess').textContent = systemAccess;
    document.getElementById('privileges').textContent = privileges;
}

// Update verification code
function updateVerificationCode(employeeId, employeeName) {
    const code = `MS-${employeeId.toString().padStart(3, '0')}-${new Date().getFullYear()}`;
    document.getElementById('verificationCode').textContent = code;
    
    // Update last access time
    const now = new Date();
    const timeString = now.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString('sr-RS', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('lastAccess').textContent = `Данас, ${timeString}`;
}

// Setup event listeners
function setupEventListeners() {
    // Print button
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Share button
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const employeeName = document.getElementById('employeeName').textContent;
            const employeeRole = document.getElementById('employeeRole').textContent;
            
            const shareText = `Профил запосленог: ${employeeName} - ${employeeRole}`;
            const shareUrl = window.location.href;
            
            if (navigator.share) {
                navigator.share({
                    title: 'МАРИН СИСТЕМС - Профил запосленог',
                    text: shareText,
                    url: shareUrl
                });
            } else {
                // Fallback for browsers without Web Share API
                navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
                    alert('Линк за профил је копиран у clipboard!');
                });
            }
        });
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
.timeline-item {
    opacity: 0;
    transform: translateX(20px);
    animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.project-item {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s ease forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.level-executive {
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #856404;
}

.level-director {
    background: linear-gradient(135deg, #c0c0c0, #e0e0e0);
    color: #495057;
}

.level-senior {
    background: linear-gradient(135deg, #4cc9f0, #3a9fbf);
    color: white;
}

.level-regular {
    background: linear-gradient(135deg, #6c757d, #adb5bd);
    color: white;
}
`;
document.head.appendChild(style);
