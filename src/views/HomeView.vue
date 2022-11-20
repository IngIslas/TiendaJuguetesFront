<template>
  <!-- <HelloWorld /> -->
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="(isActive = true), (accion = 'Nuevo')"
          >Agregar Nuevo</v-btn
        >
      </v-col>
    </v-row>
    <br />
    <v-row>
      <v-data-table :headers="headers" :items="listaJuguetes">
        <template v-slot:item.actions="{ item }">
          <div>
            <v-row>
              <v-col>
                <v-btn @click="AbrirModal(item)"> Editar </v-btn>
              </v-col>
              <v-col> <v-btn @click="Eliminar(item)"> Eliminar </v-btn> </v-col>
            </v-row>
          </div>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog :value="isActive" width="500" persistent>
      <v-card maxWidth="500" width="500">
        <v-toolbar color="primary" dark> Agregar nuevo Juguete </v-toolbar>
        <v-card-text>
          <v-form v-model="formIsValid" ref="form">
            <v-container fluid pa-10>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Nombre"
                    v-model="nombre"
                    :rules="rulesNombre_Compania"
                    :counter="50"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Precio"
                    type="number"
                    v-model="precio"
                    :rules="rulesPrecio"
                    prefix="$"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Compañia"
                    v-model="compania"
                    :rules="rulesNombre_Compania"
                    :counter="50"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Edad Maxima"
                    type="number"
                    v-model="edadMaxima"
                    :rules="rulesEdad"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-textarea
                  label="Descripcion"
                  v-model="descripcion"
                  :rules="rulesDescripcion"
                  :counter="100"
                >
                </v-textarea>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="Guardar" :disabled="!ValidarForm"
            >Guardar</v-btn
          >
          <v-btn color="error" @click="CerrarModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert type="success" v-model="showSuccessAlert">Exito</v-alert>
    <v-alert type="error" v-model="showErrorAlert"
      >Error al realizar la acción: {{ this.error }}</v-alert
    >
  </v-container>
</template>

<script>
import JuguetesAPI from "../api/JuguetesAPI";
export default {
  name: "HomeView",

  created() {
    this.ObtenerJuguetes();
  },
  data: () => ({
    isActive: false,
    id: null,
    nombre: "",
    precio: null,
    compania: "",
    edadMaxima: null,
    descripcion: "",
    accion: "",
    item: {},
    error: "",
    formIsValid: false,
    showSuccessAlert: false,
    showErrorAlert: false,
    rulesNombre_Compania: [
      (v) => !!v || "El capo es requerido",
      (v) => (v.length > 0 && v.length < 50) || "El limite de caracteres es 50",
    ],
    rulesPrecio: [
      (v) => !!v || "El capo es requerido",
      (v) => (v > 0 && v <= 1000) || "El valor no esta en el rango permitido",
    ],
    rulesEdad: [
      (v) => !!v || "El capo es requerido",
      (v) => (v > 0 && v <= 100) || "El valor no esta en el rango permitido",
    ],
    rulesDescripcion: [
      (v) => !!v || "El capo es requerido",
      (v) =>
        (v.length > 0 && v.length < 100) || "El limite de caracteres es 100",
    ],
    headers: [
      {
        value: "id",
        text: "Id",
      },
      {
        value: "nombre",
        text: "Nombre",
      },
      {
        value: "restriccionEdad",
        text: "Edad",
      },
      {
        value: "precio",
        text: "Precio",
      },
      {
        value: "compañia",
        text: "Compañia",
      },
      {
        value: "actions",
        text: "",
      },
    ],
    listaJuguetes: [],
  }),
  methods: {
    AbrirModal(juguete) {
      this.item = {
        nombre: juguete.nombre,
        edadMaxima: juguete.restriccionEdad,
        precio: juguete.precio,
        compania: juguete.compañia,
        descripcion: juguete.descripcion,
      };
      this.isActive = true;
      console.log(juguete);
      this.id = juguete.id;
      this.accion = "Editar";
      this.nombre = juguete.nombre;
      this.edadMaxima = juguete.restriccionEdad;
      this.precio = juguete.precio;
      this.compania = juguete.compañia;
      this.descripcion = juguete.descripcion;
    },
    Guardar() {
      var juguete = {
        Id: this.id,
        Nombre: this.nombre,
        Descripcion: this.descripcion,
        RestriccionEdad: parseInt(this.edadMaxima),
        Compañia: this.compania,
        Precio: parseInt(this.precio),
      };
      if (this.accion == "Nuevo") this.Insertar(juguete);
      else this.Actualizar(juguete);
    },
    Insertar(juguete) {
      JuguetesAPI.Insertar(juguete)
        .then((res) => {
          this.CerrarModal();
          this.ObtenerJuguetes();
          this.MostrarSuccesAlert();
        })
        .catch((err) => {
          this.error = error;
          this.CerrarModal();
          this.MostrarErrorAlert();
        });
    },
    Actualizar(juguete) {
      JuguetesAPI.Actualizar(juguete)
        .then((res) => {
          this.CerrarModal();
          this.MostrarSuccesAlert();
          this.ObtenerJuguetes();
        })
        .catch((err) => {
          this.errors = err;
          this.CerrarModal();
          this.MostrarErrorAlert();
        });
    },
    ObtenerJuguetes() {
      JuguetesAPI.Obtener().then((res) => {
        this.listaJuguetes = res.data;
      });
    },
    MostrarSuccesAlert() {
      this.showSuccessAlert = true;
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 2500);
    },
    MostrarErrorAlert() {
      this.showErrorAlert = true;
      setTimeout(() => {
        this.showErrorAlert = false;
      }, 2500);
    },
    CerrarModal() {
      this.nombre = "";
      this.edadMaxima = null;
      this.precio = null;
      this.compania = "";
      this.descripcion = "";
      this.item = {};
      this.$refs.form.resetValidation();
      this.isActive = false;
    },
  },
  computed: {
    ValidarForm() {
      if (this.formIsValid) {
        if (
          this.item.nombre == this.nombre &&
          this.item.precio == this.precio &&
          this.item.edadMaxima == this.edadMaxima &&
          this.item.compania == this.compania &&
          this.item.descripcion == this.descripcion
        ) {
          return false;
        }
        return true;
      }
    },
  },
};
</script>
