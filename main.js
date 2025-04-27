// Переключение вкладок
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Расчет калорий
document.querySelector('#calories .calculate-btn').addEventListener('click', () => {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseInt(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    
    // Формула Миффлина-Сан Жеора
    let calories;
    if (gender === 'male') {
        calories = (10 * weight + 6.25 * height - 5 * age + 5) * activity;
    } else {
        calories = (10 * weight + 6.25 * height - 5 * age - 161) * activity;
    }
    
    const result = `
        <h3>Ваша суточная норма: ${Math.round(calories)} ккал</h3>
        <p><strong>Для похудения:</strong> ${Math.round(calories * 0.85)} ккал</p>
        <p><strong>Для набора массы:</strong> ${Math.round(calories * 1.15)} ккал</p>
    `;
    
    const resultEl = document.getElementById('calories-result');
    resultEl.innerHTML = result;
    resultEl.classList.add('active');
});

// Расчет ИМТ
document.querySelector('#bmi .calculate-btn').addEventListener('click', () => {
    const weight = parseInt(document.getElementById('bmi-weight').value);
    const height = parseInt(document.getElementById('bmi-height').value) / 100; // в метрах
    
    const bmi = (weight / (height * height)).toFixed(1);
    
    let status;
    if (bmi < 18.5) status = '<span style="color:#3498db">Недостаточный вес</span>';
    else if (bmi < 25) status = '<span style="color:#2ecc71">Нормальный вес</span>';
    else if (bmi < 30) status = '<span style="color:#f39c12">Избыточный вес</span>';
    else status = '<span style="color:#e74c3c">Ожирение</span>';
    
    const result = `
        <h3>Ваш ИМТ: ${bmi}</h3>
        <p>${status}</p>
        <div class="progress-bar">
            <div class="progress" style="width: ${Math.min(100, (bmi / 40) * 100)}%"></div>
        </div>
        <p><strong>Норма:</strong> 18.5 - 24.9</p>
    `;
    
    const resultEl = document.getElementById('bmi-result');
    resultEl.innerHTML = result;
    resultEl.classList.add('active');
});

// Расчет воды
document.querySelector('#water .calculate-btn').addEventListener('click', () => {
    const weight = parseInt(document.getElementById('water-weight').value);
    const activity = parseInt(document.getElementById('water-activity').value);
    
    const water = Math.round((weight * activity) / 1000 * 10) / 10; // в литрах
    
    const result = `
        <h3>Норма воды: ${water} л/день</h3>
        <p>При вашей активности рекомендуется выпивать <strong>${water}</strong> литров воды в день.</p>
        <p>В жаркую погоду или при интенсивных тренировках увеличьте норму на 0.5-1 литр.</p>
    `;
    
    const resultEl = document.getElementById('water-result');
    resultEl.innerHTML = result;
    resultEl.classList.add('active');
});

// Расчет БЖУ
document.querySelector('#bju .calculate-btn').addEventListener('click', () => {
    const calories = parseInt(document.getElementById('bju-calories').value);
    const goal = document.getElementById('bju-goal').value;
    
    let protein, fat, carbs;
    
    if (goal === 'weight-loss') {
        protein = 0.3 * calories / 4; // 30% белка (4 ккал/г)
        fat = 0.25 * calories / 9;    // 25% жиров (9 ккал/г)
        carbs = 0.45 * calories / 4;  // 45% углеводов
    } else if (goal === 'muscle-gain') {
        protein = 0.35 * calories / 4;
        fat = 0.25 * calories / 9;
        carbs = 0.4 * calories / 4;
    } else { // maintenance
        protein = 0.3 * calories / 4;
        fat = 0.3 * calories / 9;
        carbs = 0.4 * calories / 4;
    }
    
    const result = `
        <h3>Баланс БЖУ:</h3>
        <p><strong>Белки:</strong> ${Math.round(protein)} г</p>
        <p><strong>Жиры:</strong> ${Math.round(fat)} г</p>
        <p><strong>Углеводы:</strong> ${Math.round(carbs)} г</p>
        <p><small>*Рекомендации могут варьироваться в зависимости от индивидуальных особенностей.</small></p>
    `;
    
    const resultEl = document.getElementById('bju-result');
    resultEl.innerHTML = result;
    resultEl.classList.add('active');
});