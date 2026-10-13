let contador = 0

async function getData() {
    const url = "https://dog.ceo/api/breeds/image/random";
    try {
        const inicio = performance.now()

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        const latencia = Math.round(performance.now() - inicio)
        contador++

        const partes = result.message.split('/')
        const raza = partes[4].split('-')
            .map(p => p.charAt(0).toUpperCase() + p.slice(1))
            .join(' ')

        const panelCentral = document.querySelector('.col-md-6 .hud-card')
        panelCentral.querySelector('img').src = result.message
        panelCentral.querySelector('h5').textContent = raza
        panelCentral.querySelector('a').textContent = result.message
        panelCentral.querySelector('a').href = result.message

        document.getElementById('latenciaVal').textContent = latencia + ' ms'
        document.getElementById('respuestaVal').textContent = result.status.toUpperCase()
        document.getElementById('usrId').textContent = '#' + String(contador).padStart(4, '0')

    } catch (error) {
        console.error(error.message);
    }
}

document.querySelector('.btn-hud').addEventListener('click', () => getData())

getData()