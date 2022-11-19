<template>
  <!-- <HelloWorld /> -->
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="green" @click="isActive = true">Agregar Nuevo</v-btn>
      </v-col>
    </v-row>
    <br />
    <v-row>
      <v-data-table :headers="headers" :items="listaJuguetes"> </v-data-table>
    </v-row>
    <v-dialog :value="isActive" width="500" persistent>
      <v-card maxwidth="500" width="500">
        <v-toolbar color="primary" dark> Agregar nuevo Juguete </v-toolbar>
        <v-card-text>
          <v-form v-model="formIsValid">
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
          <v-btn color="green" @click="Guardar" :disabled="!formIsValid"
            >Guardar</v-btn
          >
          <v-btn color="error" @click="isActive = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import JuguetesAPI from "../api/JuguetesAPI";
export default {
  name: "HomeView",

  created() {
    JuguetesAPI.Obtener().then((res) => {
      console.log(res);
      this.listaJuguetes = res.data;
    });
  },
  data: () => ({
    isActive: false,
    nombre: "",
    precio: "",
    compania: "",
    edadMaxima: "",
    descripcion: "",
    formIsValid: false,
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
    Guardar() {
      this.isActive = false;
    },
  },
};
</script>
