# SENDAS - SISTEMA DE GESTION 
## **BACKEND**

### **Repositorio**
[https://github.com/dgcabanillas/sendas-sg-server](https://github.com/dgcabanillas/sendas-sg-server)

### **Ramas**
- **feature/[ task-id ~ task-name ]**
    - Se crearan ramas a partir de ``develop`` para resolver las tareas asignadas.
    - Estas ramas se mezclarán con ``develop`` a través de un ``pull request``.
    - Se borrará después de haber resuelto el ``task``.
- **bug/[ bug-id ~ bug-name ]**
    - Cuando ocurra un ``bug`` se creará una tarea de tipo bug para resolverlo.
    - Se crearan ramas a partir de ``develop`` para resolver los errores encontrados.
    - Estas ramas se mezclarán con ``develop`` a través de un ``pull request``.
    - Se borrará después de haber resuelto el ``bug``.
- **develop**
    - Esta rama es de desarrollo. 
    - Se usará para hacer las pruebas con el frontend antes de subirlas a producción.
    - github:
        ```
        # Se actualiza con pull request desde las ramas feature/* y bug/*
        ```
    - deploy:
        ```
        # agregamos el repositorio remoto
        heroku git:remote -a sg-server-dev

        # renombramos
        git remote rename heroku heroku-dev

        # pusheamos
        git push heroku-dev develop:master
        ```
    - url: 
        ```
        https://sg-server-dev.herokuapp.com/
        ```
- **main** (default)
    - Esta rama es de producción.
    - Esta rama sólo la actualiza el TPO.
    - github:
        ```
        # Se actualiza con pull request desde develop
        ```
    - deploy:
        ```
        # agregamos el repositorio remoto
        heroku git:remote -a sg-server-prod

        # renombramos
        git remote rename heroku heroku-prod
        
        # pusheamos
        git push heroku-prod main:master
        ```
    - url:
        ```
        https://sg-server-prod.herokuapp.com/
        ```

---
### **Arranque**
```
# version recomendada de node v15.12.0 
# si tienes otra versión puedes usar NVM para administrar las versiones de node
npm install
npm start
```

---
### **sequelize-cli**
```
# Instalamos el cliente de sequelize
npm install -g sequelize-cli

# Inicializamos 
# no siempre es necesario ya que sólo crea algunos archivos de configuración
npx sequelize-cli init  
```
- **development**
    ```
    npx sequelize-cli db:seed:all
    ```
- **test**
    ```
    # anteponer NODE_ENV=test antes de npx
    NODE_ENV=test npx sequelize-cli db:seed:all
    
    # ó poner --env test al final
    npx sequelize-cli db:seed:all --env test
    ```
- **production**
    ```
    # anteponer NODE_ENV=production antes de npx
    NODE_ENV=production npx sequelize-cli db:seed:all

    # ó poner --env production al final
    npx sequelize-cli db:seed:all --env production
    ```

### comandos
```
# Comandos
# crear seed en local, luego se hace un PR para producción
    npx sequelize-cli seed:generate --name creating-admin-user
# ejecutar seed 
    npx sequelize-cli db:seed:all
# deshacer el último seed
    npx sequelize-cli db:seed:undo
# deshacer un seed es específico
    npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
# deshacer todos los seed
    npx sequelize-cli db:seed:undo:all
```