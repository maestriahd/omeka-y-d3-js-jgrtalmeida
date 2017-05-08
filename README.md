# Herramientas para crear herramientas digitales

## semana tres

este repositorio contiene el código necesario para realizar con éxito el ejercicio propuesto para la tercera semana del módulo.

La actividad a realizar durante esta semana es la creación de una visualización de datos a partir de información entregada por una instancia de Omeka. En esta oportunidad la petición al servidor se realizará en el cliente a diferencia de la actividad anterior donde la petición se realizó en el servidor. La visualización de datos se realizará por medio de D3.js, una librería para la creación de gráficos SVG por medio de código en JS.

### CORS

En el vídeo de esta semana se habla rápidamente de [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) y se implementa un cambio a nivel de configuración del servidor apache que hospeda el Omeka a ser consultado. En servicios de hosting gratuito no se tiene acceso a la edición de este archivo de configuración, así que es necesario implementar una alternativa para poder realizar las peticiones. Un servidor proxy es una solución bastante común: en el medio entre el cliente y el servidor final se encuentra un servidor que recibe la petición del cliente y modifica los headers antes de enviarla al servidor final.

Para la actividad de esta semana hay dos formas de enfrentarse a este problema, cual usar depende principalmente de donde esta alojado el Omeka:

1. ***Omeka está en: oemka.net (no tengo acceso al archivo .htaccess)***

  Si este es el caso, debe usar el proxy para hacer las peticiones. En el archivo [d3.hbs](views/d3.hbs) ente las líneas 62 a 68  debe asegurarse que la variable ```use_cors``` esté igualada a ```true``` (por defecto en el código entregado). Esto habilita la creación de la URL final anteponiendo la dirección del proxy al de omeka (línea 70 a 82).

2. ***Omeka está en mi control (tengo acceso al archivo .htaccess)***

  Para ***NO*** hacer uso del proxy, en el archivo [d3.hbs](views/d3.hbs) ente las líneas 62 a 68  debe asegurarse que la variable ```use_cors``` esté igualada a ```false```. Esto habilita la creación de la URL final sin incluir la dirección del proxy enviando la petición directamente al omeka (línea 70 a 82).

## Entregables

### Nivel básico

* visualización de colecciones extraídas de Omeka con primitivos en D3

#### Nivel intermedio

* Visualización de colecciones extraídas de Omeka con primitivos en D3
* Visualización de elementos extraídos de Omeka con primitivos en D3

#### Nivel avanzado

* Visualización de colecciones extraídas de Omeka con primitivos en D3
* Visualización de elementos extraídos de Omeka con primitivos en D3
* Uso de elementos de interacción en D3


**fecha de entrega vía Github: marzo 18/2017**

## Rúbrica

|  Criterio  | %      |  Calificación |
|----------|:-------------:|------:|
| Redacción, ortografía, citación de fuentes |  40% | 4.0 |
| Suficiencia en la implementación técnica D3.js |    60%   | 4.0 |
| ** Nota Final** | | 4.0 |

El ejercicio cumple con lo esperado para la entrega en el nivel básico.


## Recursos

* [Página con implementaciones de algoritmos en JS puro para trabajos comunes en el cliente](http://youmightnotneedjquery.com/)
* [Librería para la creación de SVG desde JS](https://d3js.org/ )
* [Tutorial de d3 en Lynda](https://www.lynda.com/D3-js-tutorials/D3-js-Essential-Training-Data-Scientists/504428-2.html)
* [Librería para facilitar el trabajo en cliente con JS, opcional](https://jquery.com/)
