from flask import Flask, jsonify, request # del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS  # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app = Flask(__name__)  # crear el objeto app de la clase Flask

CORS(app)  # modulo cors es para que me permita acceder desde el frontend al backend
# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/proyecto'
# URI de la BBDD driver de la BD user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # none
db = SQLAlchemy(app)  # crea el objeto db de la clase SQLAlquemy
ma = Marshmallow(app)  # crea el objeto ma de de la clase Marshmallow

#-----------------------------Modelos de las bases de datos----------------------
# defino la tabla
class Usuario(db.Model):  # la clase Usuario hereda de db.Model que es de sqlAlchemy


    id = db.Column(db.Integer, primary_key=True)  # define los campos de la tabla del db
    nombre=db.Column(db.String(100))
    correo=db.Column(db.String(100))
    telefono=db.Column(db.String(100))
    mensaje=db.Column(db.String(400))
    def __init__(self, nombre, correo, telefono, mensaje):  # crea el constructor de la clase
        self.nombre = nombre  # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.correo = correo    #acá se crea el constructor
        self.telefono = telefono
        self.mensaje = mensaje

# si hay que crear mas tablas , se hace aqui

with app.app_context():
    db.create_all()  # aqui crea todas las tablas si no se crearon
# ************************************************************
class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'correo', 'telefono', 'mensaje')

usuario_schema = UsuarioSchema()  # El objeto Usuario_schema es para traer un solo Usuario de la clase UsuarioSchema
usuarios_schema = UsuarioSchema(many=True) # El objeto Usuarios_schema es para traer multiples registros de Usuarios

# crea los endpoint o rutas (json)
@app.route('/usuarios', methods=['GET'])
def get_Usuarios():

    all_usuarios = Usuario.query.all()  # el metodo query.all() lo hereda de db.Model
    result = usuarios_schema.dump(all_usuarios)  # el metodo dump() lo hereda dema.schema y trae todos los registros de la tabla
    
    return jsonify(result)  # retorna un JSON de todos los registros de la tabla


@app.route('/usuarios/<id>', methods=['GET'])
def get_usuario(id):

    usuario = Usuario.query.get(id)
    return usuario_schema.jsonify(usuario)  # retorna el JSON de un Usuario recibido como parametro

#ruta o endpoint para borrar 
@app.route('/usuarios/<id>', methods=['DELETE'])
def delete_usuario(id):

    usuario = Usuario.query.get(id) #Traeme ese usuario 
    db.session.delete(usuario) # eleminame ese usuaruio
    db.session.commit() #traeme un json con el usuario borrado
    return usuario_schema.jsonify(usuario)  # me devuelve un json con el registro eliminado

 # crea ruta o endpoint para mostrar
@app.route('/usuarios', methods=['POST']) 
def create_usuario():

        # print(request.json) # request.json contiene el json que envio el cliente
    nombre = request.json['nombre']
    correo = request.json['correo']
    telefono = request.json['telefono']
    mensaje = request.json['mensaje']
    new_usuario = Usuario(nombre, correo, telefono, mensaje) # se crea el objeto new_usuario
    db.session.add(new_usuario) #llama al medoto ADD y se le agrega el objeto new_usuario
    db.session.commit()
    return usuario_schema.jsonify(new_usuario)

@app.route('/usuarios/<id>', methods=['PUT'])
def update_usuario(id):
        usuario = Usuario.query.get(id)
        nombre = request.json['nombre']
        correo = request.json['correo']
        telefono = request.json['telefono']
        mensaje = request.json['mensaje']

        #los objetos nuevos
        usuario.nombre=nombre
        usuario.correo=correo
        usuario.telefono=telefono
        usuario.mensaje=mensaje

        db.session.commit() #confirma el cambio
        return usuario_schema.jsonify(Usuario) # trae en un json lo que se dio de alta

# programa principal *******************************
if __name__ == '__main__':
    app.run(debug=True, port=5000)  # ejecuta el servidor Flask en el puerto 5000
