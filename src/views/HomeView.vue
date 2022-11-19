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
      <v-data-table :headers="headers"> </v-data-table>
    </v-row>
    <v-dialog :value="isActive" width="500" persistent>
      <v-card maxwidth="500" width="500">
        <v-toolbar color="primary" dark> Agregar nuevo Juguete </v-toolbar>
        <v-text>
          <v-form>
            <v-container fluid pa-10>
              <v-row>
                <v-col>
                  <v-text-field label="Nombre"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Precio" type="number"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-text-field label="Compañia"></v-text-field>
              </v-row>
              <v-row>
                <v-text-field label="Edad Maxima" type="number"></v-text-field>
              </v-row>
              <v-row>
                <v-textarea label="Descripcion"> </v-textarea>
              </v-row>
            </v-container>
          </v-form>
        </v-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="Guardar">Guardar</v-btn>
          <v-btn color="error" @click="isActive = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",

  data: () => ({
    isActive: true,
    headers: [
      {
        value: "Id",
        text: "Id",
      },
      {
        value: "Nombre",
        text: "Nombre",
      },
      {
        value: "Edad",
        text: "Edad",
      },
      {
        value: "Precio",
        text: "Precio",
      },
      {
        value: "Compañia",
        text: "Compañia",
      },
      {
        value: "actions",
        text: "",
      },
    ],
  }),
  methods: {
    Guardar() {
      this.isActive = false;
    },
  },
};
</script>
