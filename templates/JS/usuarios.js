const { createApp } = Vue;

createApp({
  data() {
    return {
      usuario: [],
      url: "https://lucho23006.pythonanywhere.com/usuarios", // colcoar dir de base de datos
      error: false,
      cargando: true,
      id: 0,
      nombre: "",
      correo: "",
      telefono: 0,
      mensaje: 0,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.usuario = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(usuario) {
      const url = this.url + "/" + usuario;
      const options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((res) => res.text())
        .then((res) => {
          location.reload();
        });
    },
    grabar() {
      const producto = {
        nombre: this.nombre,
        correo: this.correo,
        telefono: this.telefono,
        mensaje: this.mensaje,
      };
      const options = {
        body: JSON.stringify(usuario),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(() => {
          alert("Registro grabado");
          window.location.href = "./usuarios.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
