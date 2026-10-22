# EcoFiltro Industrial
Simulador STEM del ODS 12, sin dependencias. Abre index.html en un navegador.

## Publicar con tu cuenta de GitHub
1. Inicia sesión en https://github.com y abre https://github.com/new.
2. Nombre: ecofiltro-industrial. Visibilidad: Public. Crea el repositorio.
3. Selecciona “uploading an existing file” (o Add file > Upload files).
4. Sube index.html, style.css, script.js y README.md directamente en la raíz.
5. Pulsa Commit changes y guarda en main.
6. Abre Settings > Pages > Build and deployment.
7. Source: Deploy from a branch. Branch: main. Folder: /(root). Pulsa Save.
8. Espera a que termine el despliegue. Pages mostrará la dirección publicada:
   https://TU-USUARIO.github.io/ecofiltro-industrial/

Para modificar: abre un archivo en GitHub, pulsa el lápiz, edita y guarda con Commit changes. GitHub Pages publicará los cambios.

## Comprobaciones manuales
- Inicio: 100 iniciales, 35 retenidas, 65 restantes y 35 %.
- 20 partículas y 0 %: 0 retenidas, 20 restantes y 0 %.
- 200 partículas y 95 %: 190 retenidas, 10 restantes y 95 %.
- 30 partículas y 35 %: 11 retenidas, 19 restantes y 36.67 %.
- Iniciar activa el movimiento; los controles actualizan el modelo activo.
- Reiniciar detiene el movimiento y restaura los valores iniciales.
- Con movimiento reducido, se muestra una distribución estática.

Retenidas = Math.round(iniciales * eficiencia / 100).
La reducción efectiva puede diferir de la eficiencia seleccionada por el redondeo.
Cada círculo representa una partícula de un ciclo repetido; no son emisiones acumuladas.

Modelo matemático educativo, sin mediciones reales ni certificación industrial.

## Guía para explicar el código
- index.html define el contenido y conecta los otros dos archivos. Sus comentarios se escriben entre <!-- y --> y no aparecen como texto en la página.
- style.css define colores, tamaños, distribución adaptable y animaciones. Los comentarios se escriben entre /* y */.
- script.js conecta los controles con el modelo matemático y actualiza el documento. Los comentarios comienzan con //.
- Los identificadores del HTML permiten que JavaScript encuentre cada control y cada resultado.
- calculate recibe la cantidad y la eficiencia; devuelve las partículas iniciales, retenidas, restantes y la reducción.
- renderDots crea los círculos y asigna la clase caught a la cantidad de partículas retenidas.
- update lee los deslizadores, calcula y muestra los resultados. Si el sistema está activo, también reconstruye la animación.
- El evento input responde al movimiento de cada deslizador. El evento click ejecuta el inicio o el reinicio.
- CSS interpreta las variables --y, --delay, --stop y --static asignadas desde JavaScript.
- Reiniciar restaura 100 partículas y 35 por ciento de eficiencia, elimina los círculos y habilita el inicio.
- La preferencia de movimiento reducido conserva una representación estática.
