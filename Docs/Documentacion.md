# Registro de Desarrollo, Problemas Técnicos y Uso de IA

## Error al enviar mensajes al chat

Durante el desarrollo apareció el mensaje:

"Ocurrió un error al generar la respuesta."

Al revisar la consola del navegador se detectó un error 500 en la ruta `/api/chat`.

Para resolverlo se revisaron:
- la consola del navegador,
- la terminal de Vercel,
- la configuración de variables de entorno,
- el modelo usado por Gemini,
- la estructura de respuesta del backend.

El problema principal estaba relacionado con la configuración de Gemini y las variables de entorno. Se creó una ruta de prueba `/api/test` para confirmar que `GEMINI_API_KEY` estuviera cargando correctamente.

input:
![input](Docs/inputERROR500.png)
![input](Docs/ERROR-INTERNO.png)

output:
![output](Docs/outputERROR500.png)
![output](Docs/output2.png)







