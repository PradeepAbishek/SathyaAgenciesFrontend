<template>
  <v-container fluid tag="section" class="py-0">
    <v-row>
      <v-col sm="12" md="12" lg="6">
        <v-card  elevation="6" class="pa2" outlined>
          <v-sheet color="success" class="tc ttu fw9" dark>
            <h3 class="pa2">Today</h3>
            <v-progress-linear
              buffer-value="0"
              stream
              color="white"
            ></v-progress-linear>
          </v-sheet>
          <v-row>
            <!-- <v-col cols="12">
              <v-card-text>
                <v-timeline>
                  <v-timeline-item
                    v-for="(item, i) in items"
                    :key="i"
                    :color="item.color"
                    :icon="item.icon"
                    fill-dot
                    small
                  >
                    <template v-slot:opposite>
                      <span
                        :class="`headline font-weight-bold ${item.color}--text`"
                        v-text="item.title"
                      ></span>
                    </template>
                    <div class="py-4">
                      <h2
                        :class="
                          `headline font-weight-light mb-4 ${item.color}--text`
                        "
                      >
                        {{ item.value }}
                      </h2>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-col> -->
            <v-col cols="12">
              <v-card-text>
                <v-timeline>
                  <v-timeline-item
                    v-for="(item, i) in items"
                    :key="i"
                    :color="item.color"
                    :icon="item.icon"
                    fill-dot
                  >
                    <v-card :color="item.color" dark >
                      <v-card-title class="title ttu tw9">
                        <h4>{{ item.title }}</h4>
                      </v-card-title>
                      <v-card-subtitle>
                        {{ item.value }}
                      </v-card-subtitle>
                      <v-progress-linear
                        buffer-value="0"
                        stream
                        color="white"
                      ></v-progress-linear>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col sm="12" md="12" lg="6">
        <v-card  elevation="6" class="pa2" outlined>
          <v-sheet color="#21209c" class="tc ttu fw9" dark>
            <h3 class="pa2">Stocks</h3>
            <v-progress-linear
              buffer-value="0"
              stream
              color="white"
            ></v-progress-linear>
          </v-sheet>
          <v-card-text>
            <v-row>
              <v-col sm="12" md="12" lg="6">
                <v-text-field
                  v-model="search"
                  :color="color"
                  label="Search"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col sm="12" md="6" lg="6">
                <v-autocomplete
                  v-model="companyId"
                  :items="companyData"
                  :color="color"
                  item-text="companyName"
                  item-value="_id"
                  label="Company Name"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-data-table
              :headers="stockHeaders"
              :items="stockData"
              :search="search"
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Dashboard",
  data: () => ({
    search: "",
    companyId: "",
    companyData: [],
    stockHeaders: [
      {
        text: "Company Name",
        value: "companyDetails.companyName",
        sortable: false,
      },
      {
        text: "Product Name",
        value: "productName",
        sortable: false,
      },
      {
        text: "Product HSN Code",
        value: "productHSNCode",
        sortable: false,
      },
      {
        text: "Product GST",
        value: "productGST",
        sortable: false,
      },
      {
        text: "Available Quantity",
        value: "availableQuantity",
        sortable: false,
      },
      {
        text: "Product Price",
        value: "unitPrice",
        sortable: false,
      },
    ],
    stockData: [],
    items: [
      {
        color: "#7d0633",
        icon: "mdi-star",
        title: "Total Bills",
        value: "5",
      },
      {
        color: "#31112c",
        icon: "mdi-book-variant",
        title: "Bill Amount",
        value: "12000",
      },
      {
        color: "#f2a07b",
        icon: "mdi-airballoon",
        title: "Total Purchase",
        value: "5",
      },
      {
        color: "#00215f",
        icon: "mdi-buffer",
        title: "Purchase Amount",
        value: "65000",
      },
    ],
  }),
  methods: {
    getAllStocks() {
      this.$axios
        .get("/stocks/")
        .then((res) => {
          this.stockData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getAllCompanies() {
      this.$axios
        .get("/companies/")
        .then((res) => {
          this.companyData = res.data;
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
    getAllStocksByCompany() {
      if (this.companyId) {
        this.$axios
          .get("/stocks/" + this.companyId)
          .then((res) => {
            this.stockData = res.data;
          })
          .catch((err) => {
            this.$store.commit("errorSnackbar", err.response.data.detail);
          });
      } else {
        this.getAllStocks();
      }
    },
    getTodayBills() {
      var date = {};
      date.startDate = new Date().toISOString().substr(0, 10);
      date.endDate = new Date().toISOString().substr(0, 10);
      this.$axios
        .post("/bills/filter", date)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.$store.commit("errorSnackbar", err.response.data.detail);
        });
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  watch: {
    companyId: function(val) {
      this.getAllStocksByCompany();
    },
  },
  mounted() {
    this.getAllStocks();
    this.getAllCompanies();
    this.getTodayBills();
  },
};
</script>
