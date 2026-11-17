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

## Guardar en GitHub (Mac + remoto)

1. En Cursor / terminal, autentica GitHub:
   ```bash
   gh auth login
   ```
2. Crea el repo y súbelo:
   ```bash
   git init
   git add .
   git commit -m "Initial salzzz landing"
   gh repo create notfoundalex/salzzz --public --source=. --remote=origin --push
   ```
3. En tu Mac:
   ```bash
   git clone https://github.com/notfoundalex/salzzz.git
   cd salzzz
   ```

Así el mismo proyecto vive en local (Windows/Mac) y en GitHub, sin perder el trabajo.

## Estructura

- `index.html` — página principal
- `styles.css` — estilos
- `script.js` — newsletter, password modal, toasts
- `assets/` — logo e iconos propios
