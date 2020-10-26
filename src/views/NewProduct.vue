<template>
  <div class="flex justify-center mt5">
    <v-card elevation="8" class="w-40-l w-80-m w-80" rounded="3">
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-autocomplete
                v-model="companyId"
                :items="states"
                :filter="customFilter"
                :color="color"
                item-text="name"
                item-value="id"
                label="Company Name"
                required
                :rules="mandatoryRule"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="productName"
                label="Product Name"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="gst"
                label="GST %"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="hsnCode"
                label="HSN Code"
                required
                :rules="mandatoryRule"
                :color="color"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="desc"
                label="Description"
                required
                :color="color"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="color" @click="addProduct" dark>
          Add <v-icon class="ml-2"> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "NewBank",
  data: () => ({
    mandatoryRule: [(v) => !!v || "Mandatory Field"],
    companyId: "",
    productName: "",
    gst: "",
    hsnCode: "",
    desc: "",
    states: [
      { name: "Florida", abbr: "FL", id: 1 },
      { name: "Georgia", abbr: "GA", id: 2 },
      { name: "Nebraska", abbr: "NE", id: 3 },
      { name: "California", abbr: "CA", id: 4 },
      { name: "New York", abbr: "NY", id: 5 },
    ],
  }),
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    addProduct() {
      var t = this.$refs.form.validate();
      console.log(
        this.companyId,
        this.bankName,
        this.accNumber,
        this.ifscCode,
        this.branchName
      );
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
