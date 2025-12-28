// === НАЛАШТУВАННЯ ===
const MY_MAP_URL = "https://www.google.com/maps";
const PRICES = { dt: 56, gas: 59 };
const INCOME_PER_DRIVER = 120; 

const TACHO_LIMITS = {
    continuousDrive: 4.5 * 60,
    dailyDrive: 9 * 60,
    breakDuration: 45,
    dailyRest: 9 * 60
};

const SIMULATION_SPEED_MS = 100;

// === БАЗА ДАНИХ ТРАНСПОРТУ ===
const trucksDB = [
    { id: 1, name: 'ZIL 130', price: 350_000, capacity: 6000, speed: 60, maxFuel: 170, type: 'gas', consum: 28, img: '🚚' },
    { id: 2, name: 'GAZelle', price: 600_000, capacity: 1500, speed: 90, maxFuel: 80, type: 'gas', consum: 15, img: '🚐' },
    { id: 10, name: 'KAMAZ 5410', price: 1_200_000, capacity: 14000, speed: 70, maxFuel: 350, type: 'dt', consum: 35, img: '🚛' },
    { id: 11, name: 'DAF XF 95', price: 1_800_000, capacity: 20000, speed: 85, maxFuel: 600, type: 'dt', consum: 32, img: '🚛' },
    { id: 20, name: 'DAF XF 105', price: 3_200_000, capacity: 22000, speed: 90, maxFuel: 850, type: 'dt', consum: 30, img: '🚛' },
    { id: 21, name: 'Volvo FH16', price: 9_500_000, capacity: 24000, speed: 95, maxFuel: 900, type: 'dt', consum: 28, img: '🚚' },
    { id: 22, name: 'MAN TGX Euro6', price: 8_800_000, capacity: 23000, speed: 92, maxFuel: 1100, type: 'dt', consum: 25, img: '🚚' },
    { id: 23, name: 'Scania V8', price: 10_500_000, capacity: 25000, speed: 98, maxFuel: 1000, type: 'dt', consum: 29, img: '🚚' }
];


const trailersDB = [
    { id: 1, name: 'Krone Profi Liner (Тент)', price: 1_200_000, capacity: 24000, img: '📦' },
    { id: 2, name: 'Schmitz Cargobull S.CS', price: 1_500_000, capacity: 25000, img: '📦' },
    { id: 3, name: 'Kögel Cargo MAXX', price: 1_400_000, capacity: 26000, img: '📦' },

    { id: 4, name: 'Schmitz SKO Cool (Реф)', price: 2_200_000, capacity: 22000, img: '❄️' },
    { id: 5, name: 'Krone Cool Liner', price: 2_400_000, capacity: 23000, img: '❄️' },

    { id: 6, name: 'Krone Flatbed', price: 1_300_000, capacity: 30000, img: '🚜' },
    { id: 7, name: 'Kögel Platform', price: 1_350_000, capacity: 28000, img: '🚜' },

    { id: 8, name: 'Schmitz S.KI (Самоскид)', price: 2_000_000, capacity: 27000, img: '🏗️' },
    { id: 9, name: 'Feldbinder Цистерна', price: 2_600_000, capacity: 20000, img: '⛽' },
    { id: 10, name: 'LAG Milk Tanker', price: 2_800_000, capacity: 19000, img: '🥛' }
];


// ===== ДОДАТКОВІ НАЛАШТУВАННЯ: двигуни і шасі по брендах =====

// engines/chassis приклади для брендів (ціни, бонуси — налаштуй під себе)
const enginesByBrand = {
    'DAF': [
        { id: 'daf_mx11_430', name: 'MX-11 (430 к.с.)', price: 0, capacityBonus: 0, speedBonus: 0, fuelBonus: 0 },
        { id: 'daf_mx13_480', name: 'MX-13 (480 к.с.)', price: 7000, capacityBonus: 2000, speedBonus: 4, fuelBonus: 50 },
        { id: 'daf_mx13_530', name: 'MX-13 (530 к.с.)', price: 13000, capacityBonus: 4000, speedBonus: 7, fuelBonus: 90 }
    ],
    'Volvo': [
        { id: 'volvo_d11_480', name: 'D11 (480 к.с.)', price: 0, capacityBonus: 0, speedBonus: 0, fuelBonus: 0 },
        { id: 'volvo_d13_540', name: 'D13 (540 к.с.)', price: 12000, capacityBonus: 3500, speedBonus: 6, fuelBonus: 80 },
        { id: 'volvo_d13_600', name: 'D13 (600 к.с.)', price: 20000, capacityBonus: 6000, speedBonus: 10, fuelBonus: 140 }
    ],
    'MAN': [
        { id: 'man_d206_480', name: 'D20 (480 к.с.)', price: 0, capacityBonus: 0, speedBonus: 0, fuelBonus: 0 },
        { id: 'man_d267_540', name: 'D26 (540 к.с.)', price: 11000, capacityBonus: 3000, speedBonus: 5, fuelBonus: 70 },
        { id: 'man_d267_600', name: 'D26 (600 к.с.)', price: 19000, capacityBonus: 5500, speedBonus: 9, fuelBonus: 130 }
    ],
    'Scania': [
        { id: 'scania_v8_520', name: 'V8 (520 к.с.)', price: 0, capacityBonus: 0, speedBonus: 0, fuelBonus: 0 },
        { id: 'scania_v8_580', name: 'V8 (580 к.с.)', price: 16000, capacityBonus: 4500, speedBonus: 8, fuelBonus: 110 },
        { id: 'scania_v8_650', name: 'V8 (650 к.с.)', price: 30000, capacityBonus: 9000, speedBonus: 14, fuelBonus: 220 }
    ],
    'Mercedes': [
        { id: 'mb_om471_450', name: 'OM471 (450 к.с.)', price: 0, capacityBonus: 0, speedBonus: 0, fuelBonus: 0 },
        { id: 'mb_om471_520', name: 'OM471 (520 к.с.)', price: 12500, capacityBonus: 3200, speedBonus: 5, fuelBonus: 75 },
        { id: 'mb_om473_640', name: 'OM473 (640 к.с.)', price: 26000, capacityBonus: 7200, speedBonus: 12, fuelBonus: 180 }
    ],
    'KAMAZ': [
        { id: 'kamaz_eco_360', name: 'Eco (360 к.с.)', price: 0, capacityBonus: 0, speedBonus: 0, fuelBonus: 0 },
        { id: 'kamaz_power_420', name: 'Power (420 к.с.)', price: 6000, capacityBonus: 1600, speedBonus: 3, fuelBonus: 40 }
    ],
    'GAZ': [
        { id: 'gaz_140', name: 'Стандарт (140 к.с.)', price: 0, capacityBonus: 0, speedBonus: 0, fuelBonus: 0 },
        { id: 'gaz_180', name: 'Підсилений (180 к.с.)', price: 2500, capacityBonus: 800, speedBonus: 2, fuelBonus: 15 }
    ],
    'default': [
        { id: 'std_300', name: 'Стандарт (300 к.с.)', price: 0, capacityBonus: 0, speedBonus: 0, fuelBonus: 0 },
        { id: 'std_plus_400', name: 'Плюс (400 к.с.)', price: 6000, capacityBonus: 1500, speedBonus: 3, fuelBonus: 50 }
    ]
};

const chassisByBrand = {
    'default': [
        { id: '4x2', name: '4x2', price: 0, capacityBonus: 0, fuelBonus: 0 },
        { id: '6x2', name: '6x2', price: 7000, capacityBonus: 2200, fuelBonus: 60 },
        { id: '6x4', name: '6x4 (Heavy)', price: 14000, capacityBonus: 5500, fuelBonus: 120 }
    ],
    'KAMAZ': [
        { id: '4x2', name: '4x2', price: 0, capacityBonus: 0, fuelBonus: 0 },
        { id: '6x4', name: '6x4', price: 9000, capacityBonus: 3200, fuelBonus: 70 }
    ],
    'GAZ': [
        { id: '4x2', name: '4x2', price: 0, capacityBonus: 0, fuelBonus: 0 }
    ]
};

// тимчасовий обʼєкт конфігурації
let tmpConfig = null;

// Визначає бренд по назві (проста евристика)
function detectBrandFromName(name) {
    if(!name) return 'default';
    const n = name.toLowerCase();
    if(n.includes('daf')) return 'DAF';
    if(n.includes('volvo')) return 'Volvo';
    if(n.includes('man')) return 'MAN';
    if(n.includes('scania')) return 'Scania';
    if(n.includes('mercedes') || n.includes('actros') || n.includes('mb')) return 'Mercedes';
    if(n.includes('kamaz')) return 'KAMAZ';
    if(n.includes('gaz') || n.includes('gazelle')) return 'GAZ';
    return 'default';
}

// Повертає масиви engine/chassis для вказаної фури (за id)
function getOptionsForTruck(truckId) {
    const t = trucksDB.find(x => x.id === truckId);
    const brand = t ? detectBrandFromName(t.name) : 'default';
    const engines = enginesByBrand[brand] || enginesByBrand['default'];
    const chassis = chassisByBrand[brand] || chassisByBrand['default'];
    const base = t || { price:0, capacity:0, maxFuel:0, speed:0 };
    return { base, engines, chassis, brand };
}

// Форматування валюти
function fmtMoney(v){ return Math.floor(v).toLocaleString('uk-UA'); }

// Відкриття модалки конфігуратора (викликається при кліку на картку в автосалоні)
function openConfigModal(truckId) {
    const { base, engines, chassis } = getOptionsForTruck(truckId);

    tmpConfig = { truckId, engineId: engines[0].id, chassisId: chassis[0].id };

    document.getElementById('cfg-model-name').innerText = base.name || '—';

    // наповнюємо select з двигунами
    const engSel = document.getElementById('cfg-engine');
    engSel.innerHTML = engines.map(e => `<option value="${e.id}">${e.name} (+${fmtMoney(e.price)} ₴)</option>`).join('');
    // шасі
    const chSel = document.getElementById('cfg-chassis');
    chSel.innerHTML = chassis.map(c => `<option value="${c.id}">${c.name} (+${fmtMoney(c.price)} ₴)</option>`).join('');

    // подія на зміну -> оновлюємо превʼю
    engSel.onchange = () => { tmpConfig.engineId = engSel.value; updateConfigPreview(); };
    chSel.onchange = () => { tmpConfig.chassisId = chSel.value; updateConfigPreview(); };

    updateConfigPreview();
    document.getElementById('config-modal').style.display = 'flex';
}

// Закриття модалки
function closeConfigModal() {
    tmpConfig = null;
    document.getElementById('config-modal').style.display = 'none';
}

// Обчислення фінального профілю та показ у превʼю
function updateConfigPreview() {
    if(!tmpConfig) return;
    const { base, engines, chassis } = getOptionsForTruck(tmpConfig.truckId);
    const engine = engines.find(e => e.id === tmpConfig.engineId) || engines[0];
    const ch = chassis.find(c => c.id === tmpConfig.chassisId) || chassis[0];

    const finalPrice = base.price + (engine.price||0) + (ch.price||0);
    const finalCapacity = (base.capacity||0) + (engine.capacityBonus||0) + (ch.capacityBonus||0);
    const finalMaxFuel = (base.maxFuel||0) + (engine.fuelBonus||0) + (ch.fuelBonus||0);
    const finalSpeed = (base.speed||0) + (engine.speedBonus||0);

    document.getElementById('cfg-price').innerText = fmtMoney(finalPrice);
    document.getElementById('cfg-capacity').innerText = Math.floor(finalCapacity);
    document.getElementById('cfg-fuel').innerText = Math.floor(finalMaxFuel);

    // зберігаємо превʼю всередині tmpConfig
    tmpConfig.preview = {
        price: finalPrice,
        capacity: Math.floor(finalCapacity),
        maxFuel: Math.floor(finalMaxFuel),
        speed: Math.floor(finalSpeed),
        engineName: engine.name,
        chassisName: ch.name
    };
}

// Підтвердження покупки конфігурованої фури
function confirmBuyConfiguredTruck() {
    if(!tmpConfig || !currentUser) { alert("Помилка (немає конфігурації або неавторизовано)"); return; }
    const p = playerData[currentUser];
    const cost = tmpConfig.preview.price;
    if(p.money < cost) return alert("Немає грошей!");
    // знімаємо гроші та додаємо авто з конфігом
    p.money -= cost;

    // Додаємо до колекції гравця обʼєкт авто з записом конфігурації
    const newTruckInstance = {
        id: tmpConfig.truckId,
        fuel: tmpConfig.preview.maxFuel,
        config: {
            engine: tmpConfig.engineId,
            chassis: tmpConfig.chassisId,
            engineName: tmpConfig.preview.engineName,
            chassisName: tmpConfig.preview.chassisName
        },
        computed: {
            capacity: tmpConfig.preview.capacity,
            maxFuel: tmpConfig.preview.maxFuel,
            speed: tmpConfig.preview.speed
        }
    };

    p.trucks.push(newTruckInstance);
    saveData();
    updateUI();
    closeConfigModal();
    alert("Куплено: " + trucksDB.find(t => t.id === tmpConfig.truckId).name + "\nКомплектація: " + tmpConfig.preview.engineName + ", " + tmpConfig.preview.chassisName);
}

let pendingSwitchTruckIndex = null;

// Клік по фурі в гаражі
function askSwitchTruck(index) {
    const p = playerData[currentUser];

    // якщо вже активна — нічого не робимо
    if (index === p.activeTruckIndex) return;

    pendingSwitchTruckIndex = index;

    const tData = p.trucks[index];
    const tSpec = trucksDB.find(t => t.id === tData.id);

    document.getElementById('switch-truck-text').innerText =
        `Ви хочете пересісти на ${tSpec?.name || 'цей тягач'}?`;

    document.getElementById('switch-truck-modal').style.display = 'flex';
}

function closeSwitchTruck() {
    pendingSwitchTruckIndex = null;
    document.getElementById('switch-truck-modal').style.display = 'none';
}

function confirmSwitchTruck() {
    if (pendingSwitchTruckIndex === null) return;

    playerData[currentUser].activeTruckIndex = pendingSwitchTruckIndex;
    saveData();
    updateUI();

    closeSwitchTruck();
}


// ===== ОНВОВЛЕНИЙ renderGarage() - замість старої функції, вставити заміну =====
function renderGarage() {
    const p = playerData[currentUser];
    // Моі фури (показуємо з урахуванням конфігурації якщо є)
    document.getElementById('my-trucks').innerHTML = p.trucks.map((tData, idx) => {
    const t = trucksDB.find(x => x.id === tData.id) || {};
    const isActive = (idx === p.activeTruckIndex); // <-- ось тут зміна
    const fuelRound = Math.round(tData.fuel || 0);
    const cap = (tData.computed && tData.computed.capacity) ? tData.computed.capacity : (t.capacity || '—');
    const cfgText = tData.config ? `<div style="margin-top:8px;font-size:0.9em;color:var(--text-muted);">Компл.: ${tData.config.engineName}, ${tData.config.chassisName}</div>` : '';
   return `<div class="listing-card" onclick="askSwitchTruck(${idx})">
    <h3>${t.name || 'Невідомо'}</h3>
    <p>${t.img || '🚚'} ${fuelRound}л • <b>${cap} кг</b></p>
    ${cfgText}
    ${isActive ? '<b>АКТИВНА</b>' : ''}
</div>`;

}).join('');


    // Автосалон — при кліку відкривати конфігуратор (openConfigModal)
    document.getElementById('dealership').innerHTML = trucksDB.map(t => `
        <div class="listing-card" style="cursor:pointer" onclick="openConfigModal(${t.id})">
            <div class="listing-icon">${t.img}</div>
            <h3>${t.name}</h3>
            <p class="listing-meta">Базова вантажопідйомність: ${t.capacity} кг • Бак: ${t.maxFuel} л</p>
            <span class="listing-price">${t.price} ₴</span>
            <div style="margin-top:10px;display:flex;gap:8px;">
                <button class="btn-action" onclick="event.stopPropagation(); openConfigModal(${t.id});">Налаштувати / Купити</button>
                <button class="btn-outline" onclick="event.stopPropagation(); buyTruck(${t.id});">Купити стандарт</button>
            </div>
        </div>`).join('');
}



const locations = [
    { name: 'Моршин (Центр)', type: 'city' },
    { name: 'Стрий (Епіцентр)', type: 'shop' },
    { name: 'Дрогобич (Ринок)', type: 'city' },
    { name: 'Львів (Термінал)', type: 'hub' },
    { name: 'Київ (Окружна)', type: 'hub' },
    { name: 'Одеса (Порт)', type: 'remote' },
    { name: 'Ужгород (Кордон)', type: 'remote' }
];

// === СТАН ===
let currentUser = null;
let activeInterval = null;
let weatherBonus = 1.0;
let passiveIncomeInterval = null;

let playerData = {
    user1: generateNewProfile("Я (Власник)", 20),
    user2: generateNewProfile("Друг (Напарник)", 11)
};

function generateNewProfile(name, starterTruckId) {
    const truck = trucksDB.find(t => t.id === starterTruckId);
    return {
        name: name,
        money: 5000,
        trucks: [{ id: starterTruckId, fuel: truck.maxFuel * 0.5 }],
        activeTruckIndex: 0, // <- додаємо тут
        trailers: [],
        activeTrailer: null,
        currentJob: null,
        hiredDrivers: 0,
        lastSave: Date.now(),
        tacho: { driveLeft: TACHO_LIMITS.continuousDrive, dailyLeft: TACHO_LIMITS.dailyDrive }
    };
}


window.onload = function() {
    loadData();  // завантажуємо збереження

    // Встановлюємо активного користувача
    currentUser = 'user1'; // або як ти обираєш профіль

    // --- Ось тут додаємо гроші ---
    playerData[currentUser].money = 10000000; // потрібна сума
    updateUI();
    saveData();
    // --------------------------------

    if (MY_MAP_URL.includes("http")) document.getElementById('google-map-frame').src = MY_MAP_URL;
    checkWeather();
    calculateOfflineEarnings();

    passiveIncomeInterval = setInterval(() => {
        if(currentUser) {
            const p = playerData[currentUser];
            if(p.hiredDrivers > 0) {
                p.money += p.hiredDrivers * INCOME_PER_DRIVER;
                updateUI();
                saveData();
            }
        }
    }, 60000);
};




function login(userId) {
    currentUser = userId;
    document.getElementById('profile-modal').style.display = 'none';
    showTab('dashboard');
    updateUI();
    if (playerData[currentUser].currentJob) startJobSimulation();
}

function switchProfile() {
    clearInterval(activeInterval);
    saveData();
    location.reload();
}

function saveData() { 
    if(currentUser) playerData[currentUser].lastSave = Date.now();
    localStorage.setItem('morshyn_pro_v5', JSON.stringify(playerData)); 
}

function loadData() {
    const data = localStorage.getItem('morshyn_pro_v5');
    if (data) {
        const parsed = JSON.parse(data);
        // Додаємо поля, якщо їх немає в старих сейвах
        Object.keys(parsed).forEach(k => {
            if(!parsed[k].trailers) parsed[k].trailers = [];
            if(!parsed[k].activeTrailer) parsed[k].activeTrailer = null;
        });
        playerData = parsed;
    }
}

function calculateOfflineEarnings() {
    Object.keys(playerData).forEach(uid => {
        const p = playerData[uid];
        if(p.hiredDrivers > 0 && p.lastSave) {
            const now = Date.now();
            const diffMin = Math.floor((now - p.lastSave) / 60000);
            const payTime = Math.min(diffMin, 720);
            if(payTime > 5) {
                p.money += payTime * p.hiredDrivers * INCOME_PER_DRIVER;
            }
        }
    });
}

function updateUI() {
    if(!currentUser) return;
    const p = playerData[currentUser];
    
    document.getElementById('current-player-name').innerText = p.name;
    document.getElementById('player-balance').innerText = `${Math.floor(p.money)} ₴`;
    
    updateTachoUI(p.tacho);

    const activeTruck = p.trucks[p.trucks.length - 1]; 
    const truckSpec = trucksDB.find(t => t.id === activeTruck.id);
    const maxFuel = activeTruck.computed?.maxFuel || truckSpec.maxFuel;
    const fuelPct = (activeTruck.fuel / maxFuel) * 100;
    document.getElementById('fuel-bar-fill').style.width = `${fuelPct}%`;

    // Оновлення поточної зчіпки на головній
    const trailer = p.activeTrailer ? trailersDB.find(t => t.id === p.activeTrailer).name : "Відсутній";
    document.getElementById('current-truck-val').innerText = truckSpec.name;
    document.getElementById('current-trailer-val').innerText = trailer;

    const activePage = document.querySelector('.page.active').id;
    if(activePage === 'refuel') renderRefuelPage();
    if(activePage === 'business') renderBusinessPage();
    if(activePage === 'garage') renderGarage();
    if(activePage === 'trailers') renderTrailersPage();

    if (p.currentJob) {
        document.getElementById('active-job-panel').style.display = 'block';
        document.getElementById('job-route-title').innerText = `${p.currentJob.from} -> ${p.currentJob.to}`;
        document.getElementById('job-dist-info').innerText = p.currentJob.dist;
        const pct = ((p.currentJob.totalTime - p.currentJob.timeLeft) / p.currentJob.totalTime) * 100;
        document.getElementById('job-progress-bar').style.width = `${pct}%`;
    } else {
        document.getElementById('active-job-panel').style.display = 'none';
    }
}

function updateTachoUI(tacho) {
    const format = m => `${Math.floor(m/60).toString().padStart(2,'0')}:${Math.floor(m%60).toString().padStart(2,'0')}`;
    document.getElementById('time-to-break').innerText = format(tacho.driveLeft);
    document.getElementById('time-daily').innerText = format(tacho.dailyLeft);
    document.getElementById('drive-bar').style.width = `${(tacho.driveLeft / TACHO_LIMITS.continuousDrive) * 100}%`;
    document.getElementById('daily-bar').style.width = `${(tacho.dailyLeft / TACHO_LIMITS.dailyDrive) * 100}%`;
    
    const statusEl = document.getElementById('tacho-status');
    statusEl.innerText = playerData[currentUser].currentJob ? "ВОДІННЯ" : "ВІДПОЧИНОК";
}

function renderRefuelPage() {
    const p = playerData[currentUser];
    const myTruck = p.trucks[p.trucks.length-1];
    const spec = trucksDB.find(t => t.id === myTruck.id);
    document.getElementById('fuel-truck-name').innerText = spec.name;
    document.getElementById('fuel-current-val').innerText = Math.floor(myTruck.fuel);
    document.getElementById('fuel-max-val').innerText = spec.maxFuel;
    document.getElementById('visual-fuel-liquid').style.height = `${(myTruck.fuel / spec.maxFuel) * 100}%`;
}

function buyFuel(amount) {
    const p = playerData[currentUser];
    const myTruck = p.trucks[p.trucks.length-1];
    const spec = trucksDB.find(t => t.id === myTruck.id);
    let litres = amount === 'full' ? spec.maxFuel - myTruck.fuel : amount;
    if(myTruck.fuel + litres > spec.maxFuel) litres = spec.maxFuel - myTruck.fuel;
    const cost = Math.floor(litres * (spec.type === 'dt' ? PRICES.dt : PRICES.gas));
    if(p.money >= cost) { p.money -= cost; myTruck.fuel += litres; updateUI(); saveData(); }
    else alert("Немає грошей!");
}



 

function renderTrailersPage() {
    const p = playerData[currentUser];
    document.getElementById('my-trailers').innerHTML = p.trailers.length ? p.trailers.map(trId => {
        const tr = trailersDB.find(x => x.id === trId);
        const isActive = p.activeTrailer === trId;
        return `<div class="listing-card"><h3>${tr.name}</h3><p>${tr.img}</p>
        <button class="btn-action" onclick="selectTrailer(${trId})">${isActive ? 'ВИКОРИСТОВУЄТЬСЯ' : 'ВЧЕПИТИ'}</button></div>`;
    }).join('') : "<p>У вас немає причепів</p>";

    document.getElementById('trailers-shop').innerHTML = trailersDB.map(tr => `
        <div class="listing-card">
            <div class="listing-icon">${tr.img}</div>
            <h3>${tr.name}</h3>
            <p>Вант: ${tr.capacity} кг</p>
            <span class="listing-price">${tr.price} ₴</span>
            <button class="btn-action" onclick="buyTrailer(${tr.id})">Купити</button>
        </div>`).join('');
}

function buyTruck(id) {
    const p = playerData[currentUser];
    const t = trucksDB.find(x => x.id === id);
    if(p.money >= t.price) {
        p.money -= t.price;
        p.trucks.push({ id: id, fuel: t.maxFuel }); 
        saveData(); updateUI();
    } else alert("Немає грошей!");
}

function buyTrailer(id) {
    const p = playerData[currentUser];
    const tr = trailersDB.find(x => x.id === id);
    if(p.money >= tr.price) {
        p.money -= tr.price;
        p.trailers.push(id);
        if(!p.activeTrailer) p.activeTrailer = id;
        saveData(); updateUI();
    } else alert("Немає грошей!");
}

function selectTrailer(id) {
    playerData[currentUser].activeTrailer = id;
    saveData(); updateUI();
}

function generateJobs() {
    const list = document.getElementById('job-list');
    list.innerHTML = '';
    const ratePerTonKm = 12; // 12 ₴ за тонну на км
    for(let i=0; i<6; i++){
        const start = locations[Math.floor(Math.random()*locations.length)];
        let end = locations[Math.floor(Math.random()*locations.length)];
        while(start.name === end.name) end = locations[Math.floor(Math.random()*locations.length)];
        
        const dist = Math.floor(Math.random()*250)+50; // 50-300 км
        const weight = Math.floor(Math.random()*24000)+1000; // 1т-25т (в грамах)
        const weightTons = weight / 1000; // перетворюємо в тонни
        
        const price = Math.floor(dist * weightTons * ratePerTonKm * weatherBonus); // враховуємо погоду
        
        const div = document.createElement('div');
        div.className = 'listing-card';
        div.innerHTML = `<h3>${start.name} ➝ ${end.name}</h3><p>${dist} км | ${weightTons.toFixed(1)} т</p><span class="listing-price">${price.toLocaleString('uk-UA')} ₴</span>
            <button class="btn-action" onclick="startJob('${start.name}', '${end.name}', ${dist}, ${price}, ${weight})">Поїхали</button>`;
        list.appendChild(div);
    }
}


function startJob(from, to, dist, price, weight) {
    const p = playerData[currentUser];
    const myTruck = p.trucks[p.trucks.length-1];
    const spec = trucksDB.find(t => t.id === myTruck.id);

    if(p.currentJob) return alert("Ви вже в рейсі!");
    if(!p.activeTrailer) return alert("Спочатку вчепіть причіп!");
    const trailerSpec = trailersDB.find(tr => tr.id === p.activeTrailer);
    if(weight > trailerSpec.capacity) return alert("Ваш причіп не витримає таку вагу!");

    const timeNeeded = (dist / spec.speed) * 60; // хвилини
    const fuelNeeded = (dist/100) * spec.consum;

    p.currentJob = {
        from, to, dist, price, weight,
        totalTime: timeNeeded,
        fuelConsume: fuelNeeded,
        inProgress: true,
        timePassed: 0
    };

    // Запускаємо анімацію прогресу рейсу
    const progressBar = document.getElementById('job-progress-bar');
    progressBar.style.width = `0%`;

    activeInterval = setInterval(() => {
        if(!p.currentJob) { clearInterval(activeInterval); return; }

        // Прогрес лише візуальний
        p.currentJob.timePassed += 1;
        const pct = Math.min((p.currentJob.timePassed / p.currentJob.totalTime) * 100, 100);
        progressBar.style.width = `${pct}%`;

        // Перевіряємо пальне
        if(myTruck.fuel <= 0) {
            clearInterval(activeInterval);
            alert("У вас закінчилось пальне! Заправтеся, щоб продовжити рейс.");
        }
    }, SIMULATION_SPEED_MS);
    
    document.getElementById('active-job-panel').style.display = 'block';
    document.getElementById('job-route-title').innerText = `${from} -> ${to}`;
    document.getElementById('job-dist-info').innerText = `${dist} км`;

    alert("Рейс почато! Коли приїдете, натисніть 'Я прибув'.");
}

function finishJob() {
    const p = playerData[currentUser];
    if(!p.currentJob || !p.currentJob.inProgress) return alert("Немає активного рейсу!");

    const myTruck = p.trucks[p.trucks.length-1];
    if(myTruck.fuel < p.currentJob.fuelConsume) {
        return alert("У вас закінчилось пальне! Заправтеся, щоб завершити рейс.");
    }

    // Списуємо пальне та час на тахографі
    myTruck.fuel -= p.currentJob.fuelConsume;
    p.tacho.driveLeft -= p.currentJob.totalTime;
    p.tacho.dailyLeft -= p.currentJob.totalTime;

    // Видаємо гроші
    p.money += p.currentJob.price;

    // Завершуємо рейс
    p.currentJob = null;
    updateUI();
    saveData();
    alert("Ви прибули на місце! Гроші за рейс зараховані.");
}


function startJobSimulation() {
    const p = playerData[currentUser];
    if(activeInterval) clearInterval(activeInterval);
    activeInterval = setInterval(() => {
        if(!p.currentJob) { clearInterval(activeInterval); return; }
        p.currentJob.timeLeft--;
        p.tacho.driveLeft--;
        p.tacho.dailyLeft--;
        const myTruck = p.trucks[p.trucks.length-1];
        myTruck.fuel -= (p.currentJob.fuelConsume / p.currentJob.totalTime);
        updateUI();
        if(p.tacho.driveLeft <= 0) { clearInterval(activeInterval); p.money -= 500; p.currentJob = null; alert("ШТРАФ за тахограф!"); updateUI(); }
        if(p.currentJob.timeLeft <= 0) { clearInterval(activeInterval); p.money += p.currentJob.price; p.currentJob = null; alert("Готово!"); updateUI(); }
    }, SIMULATION_SPEED_MS);
}

function takeRest() { playerData[currentUser].tacho.driveLeft = TACHO_LIMITS.continuousDrive; updateUI(); }
function newDay() { playerData[currentUser].tacho.driveLeft = TACHO_LIMITS.continuousDrive; playerData[currentUser].tacho.dailyLeft = TACHO_LIMITS.dailyDrive; updateUI(); }
function checkWeather() {
    const isRain = Math.random() > 0.7;
    weatherBonus = isRain ? 1.1 : 1.0;
    document.getElementById('weather-text').innerText = isRain ? "🌧 Дощ (+10%)" : "☀ Сонячно";
}

function showTab(id) {
    document.querySelectorAll('.page').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(e => e.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('btn-'+id).classList.add('active');
    if(id === 'jobs') generateJobs();
    if(id === 'garage' || id === 'trailers') updateUI(); // Примусове оновлення гаража при відкритті
    updateUI();
}

function renderBusinessPage() {
    const p = playerData[currentUser];
    const freeTrucks = p.trucks.length - 1 - p.hiredDrivers;
    document.getElementById('biz-drivers-count').innerText = p.hiredDrivers;
    document.getElementById('biz-income').innerText = p.hiredDrivers * INCOME_PER_DRIVER;
    document.getElementById('biz-free-trucks').innerText = freeTrucks;
}

function hireDriver() {
    const p = playerData[currentUser];
    if(p.trucks.length - 1 - p.hiredDrivers <= 0) return alert("Немає вільної фури!");
    if(p.money < 5000) return alert("Треба 5000 ₴");
    p.money -= 5000; p.hiredDrivers++; updateUI(); saveData();
}

