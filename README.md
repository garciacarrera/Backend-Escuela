"# git clone "URL"  
"# git clone -b URL nombreRAMa " 
"# git pull actualizar cambios en la rama actual "
"# git branch nombredelaramanueva  "
"# git checkout  " listado de ramas ya creadas 
"# git checkout nombrederamaapararse" Pararse en una rama diferente
"# git add . /# git commit -m " guardar cambios y explicar" / #git push "

LAS ENTIDADES DE escuela
CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    rol ENUM('profesor', 'alumno') NOT NULL
);

CREATE TABLE Materia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    profesorId INT,
    FOREIGN KEY (profesorId) REFERENCES Usuario(id)
);

CREATE TABLE Matricula (
    id INT PRIMARY KEY AUTO_INCREMENT,
    alumnoId INT,
    materiaId INT,
    FOREIGN KEY (alumnoId) REFERENCES Usuario(id),
    FOREIGN KEY (materiaId) REFERENCES Materia(id)
);

CREATE TABLE Tarea (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechaEntrega DATE,
    alumnoId INT,
    materiaId INT,
    FOREIGN KEY (alumnoId) REFERENCES Usuario(id),
    FOREIGN KEY (materiaId) REFERENCES Materia(id)
);