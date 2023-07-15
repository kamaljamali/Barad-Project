<template lang="pug">
.container-parent.search-autocomplete
  b-autocomplete(
    extended,
    v-model="title",
    placeholder="جستجو...",
    icon="search",
    :keep-first="keepFirst",
    :open-on-focus="openOnFocus",
    :data="filteredDataObj",
    field="name",
    @input="changeSearchText",
    @select="(option) => (selected = option)",
    :clearable="clearable"
  )
    template(slot="empty") نماد یافت نشد
</template>

<script>
import buefy from 'buefy'
Vue.use(buefy,{
    defaultIconPack:'fas'
})
"use strict";
export default {
  name: "SearchCompany",

  data: () => ({
    companies: [],
    title: "",
    keepFirst: false,
    openOnFocus: false,
    selected: null,
    clearable: true,
  }),

  props: {
    listCompanyy: {
      type: String,
      default: null,
    },
  },
  /**
   * Mounted
   */
  mounted() {
    this.loadCompany();
  },
  /**
   * computed
   */
  computed: {
    filteredDataObj() {
      return this.companies.filter((option) => {
        return (
          option.fullname
            .toString()
            .toLowerCase()
            .indexOf(this.title.toLowerCase()) >= 0
        );
      });
    },
  },
  /**
   * watch
   */
  watch: {
    selected(newValue) {
      if (newValue) {
        this.selectedClicked(newValue);
      }
    },
  },

  methods: {
    /**
     * changeSearchText
     */
    changeSearchText() {
      if (!this.title) {
        this.$emit("on-selected-cleared", {
          sender: this,
          data: {
            data: null,
          },
        });
      }
    },
    /**
     * Load companies
     */
    loadCompany() {
      let url = this.listCompanyy.replace("#PAGE#", 1).replace("#SIZE#", 50000);
      AxiosHelper.send("get", url, "").then((res) => {
        const resData = res.data;
        Vue.set(this, "companies", resData);
      })
      .catch(()=>{
        const data = [
          {
            name:'طلا',
                id:'2',
                fullname:'طلا'
            },
              {
                  name:'فولاد',
                  id:'1',
                  fullname:'فولاد'
              },
            {
                name:'آهن',
                id:'3',
                fullname:'اهن'
            },
            {
                name:'دلار',
                id:'4',
                fullname:'دلار'
            },
            {
                name:'خودرو',
                id:'5',
                fullname:'خودرو'
            },           
        ]
        Vue.set(this, "companies", data);
      });
    },

    /**
     * On selected clicked event
     */
    selectedClicked(result) {
      this.$emit("on-selected-clicked", {
        sender: this,
        data: {
          data: result,
        },
      });
    },

    /**
     * Selected cleared
     */
    selectedCleared() {
      Vue.set(this, "selected", null);
      Vue.set(this, "title", "");
    },
  },
};
</script>

<style scoped></style>
