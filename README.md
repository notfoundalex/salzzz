# salzzz

Landing page estilo drop / desktop shortcuts, marcada como **salzzz**.

## Ver en local

Desde esta carpeta:

```bash
# Opción rápida (abre el archivo)
start index.html
```

O con un servidor local:

```bash
npx --yes serve .
```

Luego abre la URL que te muestre la terminal (normalmente `http://localhost:3000`).

## Animaciones

La landing usa profundidad 3D: parallax al mover el ratón, iconos flotantes, partículas, orbes, grid de suelo en perspectiva y botón magnético. Respeta `prefers-reduced-motion`.

## Guardar en GitHub (Mac + remoto)

El repo local ya tiene commits en `main`. Para subirlo a `notfoundalex`:

1. Autentica GitHub (en Cursor acepta Connect GitHub, o en terminal):
   ```bash
   gh auth login
   ```
2. Desde esta carpeta:
   ```bash
   gh repo create notfoundalex/salzzz --public --source=. --remote=origin --push
   ```
   Si el repo ya existe vacío:
   ```bash
   git remote add origin https://github.com/notfoundalex/salzzz.git
   git push -u origin main
   ```
3. En tu Mac:
   ```bash
   git clone https://github.com/notfoundalex/salzzz.git
   cd salzzz
   ```

## Estructura

- `index.html` — página principal
- `styles.css` — estilos
- `script.js` — newsletter, password modal, toasts
- `assets/` — logo e iconos propios
