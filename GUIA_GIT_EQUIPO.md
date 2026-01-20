# Guía Rápida de Git para Trabajar en Equipo

Este documento es una guía básica para que todos en el equipo sigamos las mismas reglas al usar Git. Esto nos ayudará a evitar conflictos y a mantener un historial de cambios limpio y ordenado.

---

### La Regla de Oro: No Subir Cambios Directamente a `main` 🚫

La rama `main` (o `master`) es nuestra fuente de verdad. Debe contener siempre una versión estable y funcional del proyecto. **NUNCA debes hacer `push` de tus cambios directamente a `main`**. Todo cambio debe pasar por un "Pull Request".

---

### El Flujo de Trabajo Básico (Para cada nueva tarea o arreglo)

Este es el ciclo que debes seguir cada vez que vayas a empezar a trabajar en algo nuevo.

**Paso 1: Sincroniza tu `main` local**

Antes de empezar a programar, asegúrate de tener la última versión del proyecto.

```bash
# Cambia a la rama main
git checkout main

# Descarga los últimos cambios de la nube
git pull origin main
```

**Paso 2: Crea una Nueva Rama**

Crea una rama propia para tu nueva tarea. Esto te aísla del resto del equipo y evita conflictos.

**¡Nombra tu rama de forma descriptiva!**
*   Para una nueva funcionalidad: `feature/nombre-de-la-funcionalidad` (ej: `feature/formulario-login`)
*   Para arreglar un bug: `fix/descripcion-del-bug` (ej: `fix/error-al-calcular-total`)

```bash
# Crea la rama y cámbiate a ella de una vez
git checkout -b feature/mi-nueva-funcionalidad
```

**Paso 3: Trabaja y Haz Commits en tu Rama**

Ahora puedes trabajar con libertad en tu rama. Haz tantos commits como necesites. Un buen commit es pequeño, atómico y tiene un mensaje claro.

```bash
# Añade los archivos que has modificado
git add .

# Guarda los cambios con un mensaje descriptivo
git commit -m "Agrega validación de email en el formulario de registro"
```

**Paso 4: Sube tu Rama a la Nube**

Cuando hayas terminado (o quieras que otros vean tu progreso), sube tu rama al repositorio remoto.

```bash
git push origin feature/mi-nueva-funcionalidad
```

**Paso 5: Crea un "Pull Request" (PR)**

Ve a la página de GitHub/GitLab de nuestro proyecto. Verás una notificación para crear un "Pull Request" desde tu rama recién subida.
*   Dale un título y una descripción clara a tu PR.
*   Asigna a uno o más compañeros para que revisen tu código.

**Paso 6: Fusión (Merge)**

Una vez que tu Pull Request sea aprobado por tus compañeros y pase cualquier prueba automática, el encargado del repositorio (o tú mismo, si tienes permiso) podrá fusionar ("merge") tus cambios en la rama `main`.

---

### ¿Cómo Evitar (y Resolver) Conflictos?

La mejor forma de evitar conflictos es **trabajar en ramas separadas**, como se describió arriba. Pero a veces, mientras tú trabajas en tu rama, la rama `main` se actualiza con cambios de otros compañeros, y tu rama se queda "desactualizada".

**El Secreto:** Antes de crear tu Pull Request (o si ya lo creaste y está desactualizado), sincroniza tu rama con los últimos cambios de `main`.

1.  **Asegúrate de tener lo último de `main`:**
    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Vuelve a tu rama y "rebase" sobre `main`:**
    ```bash
    git checkout feature/mi-nueva-funcionalidad
    git rebase main
    ```
    *   **¿Qué hace `git rebase main`?** Toma todos tus commits, los quita temporalmente, actualiza tu rama con lo último de `main` y luego vuelve a aplicar tus commits uno por uno al final. El resultado es un historial limpio y lineal.

3.  **Si hay un conflicto durante el `rebase`:**
    *   Git se detendrá y te dirá qué archivos tienen conflictos.
    *   Abre esos archivos en tu editor. Verás las secciones en conflicto marcadas con `<<<<<<<`, `=======`, `>>>>>>>`.
    *   Edita el archivo para dejar la versión correcta del código (borrando los marcadores de Git).
    *   Guarda el archivo y márcalo como resuelto:
        ```bash
        git add .
        ```
    *   Continúa con el rebase:
        ```bash
        git rebase --continue
        ```

4.  **Sube tus cambios actualizados:**
    Como el rebase reescribe el historial de tu rama, necesitarás hacer un "push forzado". **¡OJO! Solo haz esto en TU PROPIA rama, nunca en `main`**.
    ```bash
    git push --force origin feature/mi-nueva-funcionalidad
    ```

---
### Resumen del Día a Día

1.  `git checkout main`
2.  `git pull origin main`
3.  `git checkout -b feature/lo-que-sea`
4.  *(...trabajas y haces commits...)* `git commit -m "Hice algo genial"`
5.  `git push origin feature/lo-que-sea`
6.  Crear Pull Request en GitHub.

¡Feliz codificación en equipo!
