/**
 * ============================================
 * CALCULADORA JEFFERSON PRO
 * Aplicación profesional para electricistas
 * 100% Offline - Cordova Android 11
 * ============================================
 */

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', initApp);
document.addEventListener('deviceready', onDeviceReady, false);

function initApp() {

    setTimeout(() => {

        const splash =
            document.getElementById('splash-screen');

        const app =
            document.getElementById('app');

        if (splash) {
            splash.classList.add('hide');

            setTimeout(() => {
                splash.style.display = 'none';
            }, 600);
        }

        if (app) {
            app.classList.remove('hidden');
        }

    }, 2800);

    updateFavoritesDisplay();
}

function onDeviceReady() {

    if (window.StatusBar) {

        StatusBar.styleLightContent();

        StatusBar.backgroundColorByHexString(
            '#1a1a2e'
        );
    }

    document.addEventListener(
        'backbutton',
        handleBackButton,
        false
    );
}

function handleBackButton(e) {

    const modal =
        document.getElementById('calculator-modal');

    const menu =
        document.getElementById('side-menu');

    if (
        modal &&
        modal.classList.contains('show')
    ) {

        closeCalculator();
        e.preventDefault();
        return;
    }

    if (
        menu &&
        menu.classList.contains('open')
    ) {

        toggleMenu();
        e.preventDefault();
        return;
    }

    if (confirm('¿Deseas salir de la aplicación?')) {

        if (navigator.app) {
            navigator.app.exitApp();
        }
    }
}

// ============================================
// NAVEGACIÓN
// ============================================

function toggleMenu() {

    const menu =
        document.getElementById('side-menu');

    const overlay =
        document.getElementById('menu-overlay');

    if (menu) {
        menu.classList.toggle('open');
    }

    if (overlay) {
        overlay.classList.toggle('show');
    }
}

function showSection(sectionId) {

    document
        .querySelectorAll('.section')
        .forEach(section => {
            section.classList.remove('active');
        });

    const section =
        document.getElementById(
            sectionId + '-section'
        );

    if (section) {

        section.classList.add('active');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ============================================
// TABLAS DE CONDUCTORES
// ============================================

const tablasConductores = {

    cobre60: [
        { awg: '14', mm2: '2.08', amp: 15 },
        { awg: '12', mm2: '3.31', amp: 20 },
        { awg: '10', mm2: '5.26', amp: 30 },
        { awg: '8', mm2: '8.37', amp: 40 },
        { awg: '6', mm2: '13.3', amp: 55 },
        { awg: '4', mm2: '21.2', amp: 70 },
        { awg: '2', mm2: '33.6', amp: 95 },
        { awg: '1/0', mm2: '53.5', amp: 125 },
        { awg: '2/0', mm2: '67.4', amp: 145 },
        { awg: '3/0', mm2: '85.0', amp: 165 },
        { awg: '4/0', mm2: '107', amp: 195 }
    ],

    cobre75: [
        { awg: '14', mm2: '2.08', amp: 20 },
        { awg: '12', mm2: '3.31', amp: 25 },
        { awg: '10', mm2: '5.26', amp: 35 },
        { awg: '8', mm2: '8.37', amp: 50 },
        { awg: '6', mm2: '13.3', amp: 65 },
        { awg: '4', mm2: '21.2', amp: 85 },
        { awg: '2', mm2: '33.6', amp: 115 },
        { awg: '1/0', mm2: '53.5', amp: 150 },
        { awg: '2/0', mm2: '67.4', amp: 175 },
        { awg: '3/0', mm2: '85.0', amp: 200 },
        { awg: '4/0', mm2: '107', amp: 230 }
    ],

    cobre90: [
        { awg: '14', mm2: '2.08', amp: 25 },
        { awg: '12', mm2: '3.31', amp: 30 },
        { awg: '10', mm2: '5.26', amp: 40 },
        { awg: '8', mm2: '8.37', amp: 55 },
        { awg: '6', mm2: '13.3', amp: 75 },
        { awg: '4', mm2: '21.2', amp: 95 },
        { awg: '2', mm2: '33.6', amp: 130 },
        { awg: '1/0', mm2: '53.5', amp: 170 },
        { awg: '2/0', mm2: '67.4', amp: 195 },
        { awg: '3/0', mm2: '85.0', amp: 225 },
        { awg: '4/0', mm2: '107', amp: 260 }
    ],

    alum75: [
        { awg: '12', mm2: '3.31', amp: 20 },
        { awg: '10', mm2: '5.26', amp: 30 },
        { awg: '8', mm2: '8.37', amp: 40 },
        { awg: '6', mm2: '13.3', amp: 50 },
        { awg: '4', mm2: '21.2', amp: 65 },
        { awg: '2', mm2: '33.6', amp: 90 },
        { awg: '1/0', mm2: '53.5', amp: 120 },
        { awg: '2/0', mm2: '67.4', amp: 135 },
        { awg: '3/0', mm2: '85.0', amp: 155 },
        { awg: '4/0', mm2: '107', amp: 180 }
    ]
};
// ============================================
// CALCULADORAS
// ============================================

const calculators = {

ohm: {
        title: 'Ley de Ohm',

        render: () => `

            <div class="formula-box">
                <code>V = I × R</code>
            </div>

            <div class="tabs">

                <button class="tab-btn active"
                onclick="switchTab('voltaje', this)">
                Calcular Voltaje
                </button>

                <button class="tab-btn"
                onclick="switchTab('corriente', this)">
                Calcular Corriente
                </button>

                <button class="tab-btn"
                onclick="switchTab('resistencia', this)">
                Calcular Resistencia
                </button>

            </div>

            <div id="tab-voltaje"
                 class="tab-content active">

                <div class="calc-form">

                    <div class="form-group">
                        <label>Corriente (A)</label>
                        <input type="number"
                               id="ohm-i-v"
                               step="0.01">
                    </div>

                    <div class="form-group">
                        <label>Resistencia (Ω)</label>
                        <input type="number"
                               id="ohm-r-v"
                               step="0.01">
                    </div>

                    <button class="btn-primary"
                    onclick="calcOhm('voltaje')">

                    Calcular

                    </button>

                    <div id="result-ohm-v"></div>

                </div>

            </div>

            <div id="tab-corriente"
                 class="tab-content">

                <div class="calc-form">

                    <div class="form-group">
                        <label>Voltaje (V)</label>
                        <input type="number"
                               id="ohm-v-i"
                               step="0.01">
                    </div>

                    <div class="form-group">
                        <label>Resistencia (Ω)</label>
                        <input type="number"
                               id="ohm-r-i"
                               step="0.01">
                    </div>

                    <button class="btn-primary"
                    onclick="calcOhm('corriente')">

                    Calcular

                    </button>

                    <div id="result-ohm-i"></div>

                </div>

            </div>

            <div id="tab-resistencia"
                 class="tab-content">

                <div class="calc-form">

                    <div class="form-group">
                        <label>Voltaje (V)</label>
                        <input type="number"
                               id="ohm-v-r"
                               step="0.01">
                    </div>

                    <div class="form-group">
                        <label>Corriente (A)</label>
                        <input type="number"
                               id="ohm-i-r"
                               step="0.01">
                    </div>

                    <button class="btn-primary"
                    onclick="calcOhm('resistencia')">

                    Calcular

                    </button>

                    <div id="result-ohm-r"></div>

                </div>

            </div>
        `
    },

voltaje: {
    title: 'Voltaje',

    render: () => `
        <div class="formula-box">
            <code>V = I × R</code>
        </div>

        <div class="calc-form">

            <div class="form-group">
                <label>Corriente (A)</label>
                <input type="number"
                       id="volt-i"
                       step="0.01">
            </div>

            <div class="form-group">
                <label>Resistencia (Ω)</label>
                <input type="number"
                       id="volt-r"
                       step="0.01">
            </div>

            <button class="btn-primary"
            onclick="calcVoltaje()">

                Calcular

            </button>

            <div id="result-volt"></div>

        </div>
    `
},

    potencia: {
        title: 'Potencia Eléctrica',

        render: () => `
            <div class="formula-box">
                <code>P = V × I × FP</code>
            </div>

            <div class="calc-form">

                <div class="form-group">
                    <label>Voltaje (V)</label>
                    <input type="number"
                           id="pot-v"
                           step="0.01">
                </div>

                <div class="form-group">
                    <label>Corriente (A)</label>
                    <input type="number"
                           id="pot-i"
                           step="0.01">
                </div>

                <div class="form-group">
                    <label>Factor de Potencia</label>
                    <input type="number"
                           id="pot-fp"
                           value="1"
                           step="0.01">
                </div>

                <div class="form-group">
                    <label>Fases</label>

                    <select id="pot-fases">
                        <option value="1">
                            Monofásico
                        </option>

                        <option value="3">
                            Trifásico
                        </option>
                    </select>
                </div>

                <button class="btn-primary"
                onclick="calcPotencia()">

                    Calcular

                </button>

                <div id="result-potencia"></div>

            </div>
        `
    },

    corriente: {
        title: 'Cálculo de Corriente',

        render: () => `
            <div class="formula-box">
                <code>I = P / (V × FP)</code>
            </div>

            <div class="calc-form">

                <div class="form-group">
                    <label>Potencia (W)</label>
                    <input type="number"
                           id="corr-p"
                           step="0.01">
                </div>

                <div class="form-group">
                    <label>Voltaje (V)</label>
                    <input type="number"
                           id="corr-v"
                           step="0.01">
                </div>

                <div class="form-group">
                    <label>Factor de Potencia</label>
                    <input type="number"
                           id="corr-fp"
                           value="1"
                           step="0.01">
                </div>

                <div class="form-group">
                    <label>Fases</label>

                    <select id="corr-fases">
                        <option value="1">
                            Monofásico
                        </option>

                        <option value="3">
                            Trifásico
                        </option>
                    </select>
                </div>

                <button class="btn-primary"
                onclick="calcCorriente()">

                    Calcular

                </button>

                <div id="result-corriente"></div>

            </div>
        `
    }
};

// ============================================
// MODAL
// ============================================

function openCalculator(id) {

    const calc = calculators[id];

    if (!calc) {

        alert(
            'Esta calculadora aún no está disponible'
        );

        return;
    }

    const title =
        document.getElementById('modal-title');

    const body =
        document.getElementById('modal-body');

    if (title) {
        title.innerText = calc.title;
    }

    if (body) {
        body.innerHTML = calc.render();
    }

    document
        .getElementById('calculator-modal')
        .classList.add('show');

    saveFavorite(id);
}

function closeCalculator() {

    const modal =
        document.getElementById(
            'calculator-modal'
        );

    if (modal) {
        modal.classList.remove('show');
    }
}

// ============================================
// TABS
// ============================================

function switchTab(tabId, el) {

    document
        .querySelectorAll('.tab-content')
        .forEach(tab => {
            tab.classList.remove('active');
        });

    document
        .querySelectorAll('.tab-btn')
        .forEach(btn => {
            btn.classList.remove('active');
        });

    const target =
        document.getElementById(
            'tab-' + tabId
        );

    if (target) {
        target.classList.add('active');
    }

    if (el) {
        el.classList.add('active');
    }
}

// ============================================
// TABLA HTML
// ============================================

function renderTablaConductores(data) {

    return `

        <table class="data-table">

            <thead>
                <tr>
                    <th>AWG</th>
                    <th>mm²</th>
                    <th>Ampacidad</th>
                </tr>
            </thead>

            <tbody>

                ${data.map(item => `

                    <tr>
                        <td>${item.awg}</td>
                        <td>${item.mm2}</td>
                        <td>${item.amp} A</td>
                    </tr>

                `).join('')}

            </tbody>

        </table>
    `;
}

// ============================================
// FAVORITOS
// ============================================

function saveFavorite(id) {

    let favorites = JSON.parse(
        localStorage.getItem('favorites') || '[]'
    );

    if (!favorites.includes(id)) {

        favorites.unshift(id);

        if (favorites.length > 6) {
            favorites.pop();
        }

        localStorage.setItem(
            'favorites',
            JSON.stringify(favorites)
        );
    }

    updateFavoritesDisplay();
}

function updateFavoritesDisplay() {

    const grid =
        document.getElementById(
            'favorites-grid'
        );

    if (!grid) return;

    const favorites = JSON.parse(
        localStorage.getItem('favorites') || '[]'
    );

    if (favorites.length === 0) {

        grid.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⭐
                </div>

                <p>No hay favoritos aún</p>

            </div>
        `;

        return;
    }

    grid.innerHTML = favorites.map(id => `

        <div class="calc-card"
             onclick="openCalculator('${id}')">

            <div class="calc-icon">
                ⚡
            </div>

            <h3>
                ${calculators[id].title}
            </h3>

            <div class="calc-arrow">
                →
            </div>

        </div>

    `).join('');
}

// ============================================
// UTILIDADES MEJORADAS
// ============================================

function isInvalid(...values) {

    return values.some(
        value =>
            value === '' ||
            value === null ||
            isNaN(value)
    );
}

function showError(msg) {

    alert(msg || 'Completa correctamente todos los campos');
}

function renderResult(
    titulo,
    valor,
    unidad,
    detalle = ''
) {

    return `

        <div class="result-box">

            <h4>${titulo}</h4>

            <div class="result-value">
                ${Number(valor).toLocaleString(
                    'es-EC',
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )}
            </div>

            <div class="result-unit">
                ${unidad}
            </div>

            ${detalle
                ? `<div class="result-detail">
                    ${detalle}
                   </div>`
                : ''
            }

        </div>
    `;
}

// ============================================
// LEY DE OHM
// ============================================

function calcOhm(tipo) {

    let resultado = 0;

    // VOLTAJE
    if (tipo === 'voltaje') {

        const i = parseFloat(
            document.getElementById(
                'ohm-i-v'
            ).value
        );

        const r = parseFloat(
            document.getElementById(
                'ohm-r-v'
            ).value
        );

        if (
            isInvalid(i, r) ||
            i < 0 ||
            r < 0
        ) {

            showError();
            return;
        }

        resultado = i * r;

        navigator.vibrate?.(40);

        document.getElementById(
            'result-ohm-v'
        ).innerHTML = renderResult(
            'Voltaje',
            resultado,
            'Voltios'
        );
    }

    // CORRIENTE
    if (tipo === 'corriente') {

        const v = parseFloat(
            document.getElementById(
                'ohm-v-i'
            ).value
        );

        const r = parseFloat(
            document.getElementById(
                'ohm-r-i'
            ).value
        );

        if (
            isInvalid(v, r) ||
            v < 0 ||
            r <= 0
        ) {

            showError(
                'La resistencia debe ser mayor a 0'
            );

            return;
        }

        resultado = v / r;

        navigator.vibrate?.(40);

        document.getElementById(
            'result-ohm-i'
        ).innerHTML = renderResult(
            'Corriente',
            resultado,
            'Amperios'
        );
    }

    // RESISTENCIA
    if (tipo === 'resistencia') {

        const v = parseFloat(
            document.getElementById(
                'ohm-v-r'
            ).value
        );

        const i = parseFloat(
            document.getElementById(
                'ohm-i-r'
            ).value
        );

        if (
            isInvalid(v, i) ||
            v < 0 ||
            i <= 0
        ) {

            showError(
                'La corriente debe ser mayor a 0'
            );

            return;
        }

        resultado = v / i;

        navigator.vibrate?.(40);

        document.getElementById(
            'result-ohm-r'
        ).innerHTML = renderResult(
            'Resistencia',
            resultado,
            'Ohmios'
        );
    }
}

// ============================================
// POTENCIA
// ============================================

function calcPotencia() {

    const v = parseFloat(
        document.getElementById(
            'pot-v'
        ).value
    );

    const i = parseFloat(
        document.getElementById(
            'pot-i'
        ).value
    );

    const fp = parseFloat(
        document.getElementById(
            'pot-fp'
        ).value || 1
    );

    const fases =
        document.getElementById(
            'pot-fases'
        ).value;

    if (
        isInvalid(v, i, fp) ||
        v < 0 ||
        i < 0 ||
        fp <= 0
    ) {

        showError(
            'Valores inválidos'
        );

        return;
    }

    let potencia = 0;

    if (fases == 3) {

        potencia =
            Math.sqrt(3) *
            v *
            i *
            fp;

    } else {

        potencia =
            v *
            i *
            fp;
    }

    navigator.vibrate?.(40);

    document.getElementById(
        'result-potencia'
    ).innerHTML = renderResult(
        'Potencia',
        potencia,
        'Watts',
        `${(potencia / 1000).toFixed(2)} kW`
    );
}

// ============================================
// CORRIENTE
// ============================================

function calcCorriente() {

    const p = parseFloat(
        document.getElementById(
            'corr-p'
        ).value
    );

    const v = parseFloat(
        document.getElementById(
            'corr-v'
        ).value
    );

    const fp = parseFloat(
        document.getElementById(
            'corr-fp'
        ).value || 1
    );

    const fases =
        document.getElementById(
            'corr-fases'
        ).value;

    if (
        isInvalid(p, v, fp) ||
        p < 0 ||
        v <= 0 ||
        fp <= 0
    ) {

        showError(
            'Valores inválidos'
        );

        return;
    }

    let corriente = 0;

    if (fases == 3) {

        corriente =
            p /
            (
                Math.sqrt(3) *
                v *
                fp
            );

    } else {

        corriente =
            p /
            (
                v *
                fp
            );
    }

    navigator.vibrate?.(40);

    document.getElementById(
        'result-corriente'
    ).innerHTML = renderResult(
        'Corriente',
        corriente,
        'Amperios'
    );
}

// ============================================
// VOLTAJE
// ============================================

function calcVoltaje() {

    const i = parseFloat(
        document.getElementById(
            'volt-i'
        ).value
    );

    const r = parseFloat(
        document.getElementById(
            'volt-r'
        ).value
    );

    if (
        isInvalid(i, r) ||
        i < 0 ||
        r < 0
    ) {

        showError();
        return;
    }

    const v = i * r;

    navigator.vibrate?.(40);

    document.getElementById(
        'result-volt'
    ).innerHTML = renderResult(
        'Voltaje',
        v,
        'Voltios'
    );
}

// ============================================
// ERROR GLOBAL
// ============================================

window.onerror = function(
    msg,
    url,
    line
) {

    alert(
        'Error en la aplicación:\n' +
        msg
    );

    return true;
};

// ============================================
// INICIO
// ============================================

console.log(
    '⚡ CALCULADORA JEFFERSON PRO INICIADA'
);
