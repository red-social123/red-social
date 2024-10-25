* --------------------------------------------- PASO A PASOS ---------------------------------- 

1: Activar el entorno virtual

# En Windows
env\Scripts\activate.bat

# En macOS/Linux
source env/bin/activate
_______________________________________________________________________________

2: instalar dependencias:
pip install -r requirements.txt
_______________________________________________________________________________
3:Crear migraciones
python manage.py makemigrations

ACLARACIÓN: en el caso de correr el comando del paso 3 y que de como resultado lo siguiente
No changes detected

tenemos que escribir el comando mas el nombre de la app ej = "python manage.py makemigrations users "  "python manage.py makemigrations publication" 
_______________________________________________________________________________

4:Aplicar las migraciones
python manage.py migrate
_______________________________________________________________________________

5:Crear Superuser 
python manage.py createsuperuser
_______________________________________________________________________________

6:Ejecutar el servidor
python manage.py runserver
