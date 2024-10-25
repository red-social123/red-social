#!/usr/bin/env bash
# Exit on error
set -o errexit

# Instala dependencias
pip install -r requirements.txt

# Convertir archivos estáticos
python manage.py collectstatic --no-input

# Aplica migraciones solo si es necesario
# python manage.py migrate  # Solo si hay cambios en el modelo que necesitan aplicarse
