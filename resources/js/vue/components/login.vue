<template lang="pug">
.is-overflow-auto.modal.is-active.full-modal.has-bg
  .modal-background
    .animation-content.modal-content
      .column.is-pulled-left.container.is-fullhd.is-fluid.full-height.is-relative.py-1
        .column.is-mobile.mb-0.is-12-desktop.is-12-mobile.py-0
          a.has-text-white.mx-2.mb-3.is-pulled-left.has-underline بازگشت
          .is-overflow-auto.card-box.column.is-70-height.is-12.backgrond2(
            ref="chatContainer"
          )
            .date {{ date }}
            section.py-6.full-height(
              v-for="(data, index) in tableData",
              :key="index"
            )
              .is-flex.is-justify-content-center.is-pulled-right.is-one-third-mobile
                .data-table-item.red.is-1
                  .data-table-item-value.is-size-6.backShadow
                    | {{ data.ques.name }}
                    .is-flex.is-justify-content-end.ww(
                      v-if="data.ques.seen == true"
                    )
                      img(
                        src="../../../images/landing/double-check.svg",
                        width="17px",
                        height="17px"
                      )
                      div
                        | {{ data.ques.time }}
                    .is-flex.is-justify-content-end.ww(v-else)
                      img(
                        src="../../../fonts/fontawesome/svgs/solid/check.svg",
                        width="17px",
                        height="17px"
                      )
                      div
                        | {{ data.ques.time }}
                .mt-3
                  span.is-title-bar-title.is-title-bar-white.back2.p-2.is-size-6.box-answer-question
                    | شما
                    img.small-icon.mr-1(
                      src="../../../images/pages/leagues/arrow-left-condition.webp"
                    ) 
              .is-light.mt-5.column.full-height(v-if="shouldRenderTable")
                .is-pulled-left(v-if="data.answer")
                  span.is-title-bar-title.is-title-bar-white.back2.p-2.is-size-6.is-pulled-left.mt-6.mr-1.box-answer-question
                    img.small-icon.ml-1(
                      src="../../../images/pages/leagues/arrow-right-condition.webp"
                    )
                    | AMAX AI
                  .mt-6.is-flex
                    .background1(v-if="data.typeAnswer == 'table'")
                      table.is-pulled-left.table-size-width-check-symbol
                        tbody
                          tr.back-tr
                            td نماد
                            td ضریب حجمی
                            td شاخص حجمی
                            td قدرت خریدار
                          tr(v-for="(tdata, i) in data.answer.data", :key="i")
                            td {{ tdata.symbol }}
                            td {{ tdata.Volume_coefficient }}
                            td {{ tdata.volumetric_index }}
                            td {{ tdata.buyer_power }}
                      .w {{ data.answer.time }}
                    .background1(v-if="data.typeAnswer == 'errorType'")
                      | {{ data.answer.data }}
                      .w {{ data.answer.time }}
                    .background1(v-if="data.typeAnswer == 'checksymbol'")
                      table.is-pulled-left.table-size-width-check-symbol
                        tr.has-border-bottom
                          td.py-2.rank-center رتبه
                          td.py-2.symbol-center-content(colspan='11') {{ data.answer.data.symbolName }}
                        tr
                          td.py-2.rank-center {{ data.answer.data.amaxScore_rank }}
                          td.py-2.td-width
                          td.py-2.td-right(colspan='9') امتیاز امکس
                          td.py-2.avg-center {{ data.answer.data.amaxScore }}
                        tr
                          td.py-2.rank-center {{ data.answer.data.tenDayAVG_rank }}
                          td.py-2.td-width
                          td.py-2.td-right(colspan='9') میانگین 7 روزه امتیاز امکس
                          td.py-2.avg-center {{ data.answer.data.tenDayAVG }}
                        tr
                          td.py-2.rank-center {{ data.answer.data.amaxScoreToAVG_rank }}
                          td.py-2.td-width
                          td.py-2.td-right(colspan='9') نسبت امتیاز امکس به میانگین
                          td.py-2.avg-center {{ data.answer.data.amaxScoreToAVG }}
                        tr.has-border-bottom
                          td.py-2.rank-center {{ data.answer.data.originalScore_rank }}
                          td.py-2.td-width
                          td.py-2.td-right(colspan='9') امتیاز بنیادی
                          td.py-2.avg-center {{ data.answer.data.originalScore }}
                        tr
                          td
                          td.py-2.td-box-width(colspan='4') قدرت خریدار: {{ data.answer.data.buyer_power }}
                          td.py-2.td-box-width(colspan='3') شاخص حجمی: {{ data.answer.data.volumetric_index }}
                          td.py-2.td-box-width(colspan='4') ضریب حجمی: {{ data.answer.data.Volume_coefficient }}
                        tr
                          td
                          td.py-2.td-box-width(colspan='4') روند ک.م: {{ data.answer.data.kmProcess }}
                          td.py-2.td-box-width(colspan='3') روند ب.م: {{ data.answer.data.bmProcess }}
                          td.py-2.td-box-width(colspan='4') روند م.م: {{ data.answer.data.mmProcess }}
                      .w {{ data.answer.time }}
          .ml-1.mr-2
            .columns.is-mobile.is-multiline.mb-0
              .filter-box-section.column.px-0.is-4-desktop.is-12-mobile
                .container.mr-1.ml-1
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0.py-0
                    a.card.column.ml-1.is-size-7-mobile.py-5.column.mt-2.is-flex.is-justify-content-center.is-size-6(
                      :class="{ hover: disabled }",
                      @click="HighVolume()"
                    )
                      | {{ quetions_title.HighVolume_title }}
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0
                    a.card.column.ml-1.is-size-7-mobile.py-2.column.is-flex.is-justify-content-center(
                      :class="{ hover: disabled }",
                      @click="checkSymbol()"
                    )
                      .py-4| رو برام بچک
                      SearchCompany(
                        v-model="inptext",
                        ref="SearchCompany",
                        :list-companyy="listCompanyy"
                      )
                      .py-4| نماد
              .filter-box-section.column.px-0.is-4-desktop.is-12-mobile.mt-2
                .container.mr-1.ml-1
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0.py-0
                    a.card.column.ml-1.is-size-7-mobile.py-5.column.is-flex.is-justify-content-center(
                      :class="{ hover: disabled }",
                      @click="fullSupply()"
                    )
                      | {{ quetions_title.fullSupply_title }}
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0
                    a.card.column.ml-1.is-size-7-mobile.py-5.column.is-flex.is-justify-content-center(
                      :class="{ hover: disabled }",
                      @click="amaxLeague()"
                    )
                      | {{ quetions_title.amaxLeague_title }}
              .filter-box-section.column.px-0.is-4-desktop.is-12-mobile.mt-2
                .container.mr-1.ml-1
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0.py-0
                    a.card.column.ml-1.is-size-7-mobile.py-5.column.is-flex.is-justify-content-center(
                      :class="{ hover: disabled }",
                      @click="greatSymbol()"
                    )
                      | {{ quetions_title.greatSymbol_title }}
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0
                    a.card.column.ml-1.is-size-7-mobile.py-5.column.is-flex.is-justify-content-center(
                      :class="{ hover: disabled }",
                      @click="HighPurchasingPower()"
                    )
                      | {{ quetions_title.HighPurchasing_title }}
</template>   

<script>
"use strict";
import SearchCompany from "./general/search-company.vue";
const DateHelper = require("JS-HELPERS/date-helper");
const AxiosHelper = require("JS-HELPERS/axios-helper");
export default {
  name: "Login",
  components: { SearchCompany },
  props: {
    listCompanyy: {
      type: String,
      default: "/list/inscode/:page/:size",
    },
    HighPurchasing_url: {
      type: String,
      default: "https://jsonplaceholder.typicode.com/todos/1",
    },
    amaxLeague_url: {
      type: String,
      default: "https://jsonplaceholder.typicode.com/todos/1",
    },
    greatSymbol_url: {
      type: String,
      default: "https://jsonplaceholder.typicode.com/todos/1",
    },
    checkSymbol_url: {
      type: String,
      default: "https://jsonplaceholder.typicode.com/todos/1",
    },
    fullSupply_url: {
      type: String,
      default: "https://jsonplaceholder.typicode.com/todos/1",
    },
    HighVolume_url: {
      type: String,
      default: "https://jsonplaceholder.typicode.com/todos/1",
    },
  },
  data: () => ({
    checkSymbolShow: false,
    disabled: false,
    inptext: "",
    showTable: true,
    tableData: [],
    shouldRenderTable: false,
    date: "",
    table: [],

    quetions_title: {
      HighPurchasing_title: "نماد با قدرت خریدار بالا چی داری؟",
      amaxLeague_title: "داستان لیگ های امکس چیه؟",
      greatSymbol_title: "چند تا نماد تپل مپل بگو حال کنیم..!",
      checkSymbol_title: "تماد ",
      fullSupply_title: "چندتا پر عرضه بده رصد کنیم...",
      HighVolume_title: "چندتا نماد حجم بالا لطفا.",
    },
    notAnswer: "جواب مورد نظر پیدا نشد ..!",
  }),
  updated() {
    this.scrollToBottom();
  },
  methods: {
    getdata() {
      return [
        {
          symbol: "انرژی2",
          Volume_coefficient: 123.53,
          volumetric_index: 4200.0,
          buyer_power: 32,
        },
        {
          symbol: "شگارمون",
          Volume_coefficient: 70.57,
          volumetric_index: 68.14,
          buyer_power: 96,
        },
        {
          symbol: "ولشرق",
          Volume_coefficient: 70.57,
          volumetric_index: 20.0,
          buyer_power: 36,
        },
        {
          symbol: "انرژی1",
          Volume_coefficient: 90.78,
          volumetric_index: 36.0,
          buyer_power: 17,
        },
        {
          symbol: "وپویاح",
          Volume_coefficient: 7.52,
          volumetric_index: 69.89,
          buyer_power: 56,
        },
      ];
    },
    getdatasymbol() {
      return {
        symbolName: "فولاد",
        amaxScore_rank: 28,
        amaxScore: 3,
        tenDayAVG_rank: 6,
        tenDayAVG: 4.26,
        amaxScoreToAVG_rank: 9,
        amaxScoreToAVG: 1,
        originalScore_rank: 28,
        originalScore: 3.2,
        buyer_power: 2.3,
        volumetric_index: 1.2,
        Volume_coefficient: 3.6,
        kmProcess: "نزولی",
        bmProcess: "صعودی",
        mmProcess: "صعودی",
      };
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
    HighPurchasingPower() {
      if (this.disabled == false) {
        this.disabled = true;
        let date = new Date();
        this.date = DateHelper.toPersianDate(date);
        let time_question = DateHelper.toPersianDateHM(date);
        this.tableData.push({
          ques: {
            name: this.quetions_title.HighPurchasing_title,
            seen: false,
            time: time_question,
          },
          typeAnswer: "table",
        });
        AxiosHelper.send("get", this.HighPurchasing_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;
            let time_question = DateHelper.toPersianDateHM(date);
            this.tableData[this.tableData.length - 1].answer = {
              data: temp,
              time: time_question,
            };
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.shouldRenderTable = false;
            this.$nextTick(() => {
              this.shouldRenderTable = true;
            });
            this.disabled = false;
          })
          .catch((err) => {
            this.tdataCatch = false;
            this.tableData[this.tableData.length - 1].answer = {
              data: this.notAnswer,
              time: time_question,
            };
            this.tableData[this.tableData.length - 1].typeAnswer = "errorType";
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.disabled = false;
          });
      }
    },
    amaxLeague() {
      if (this.disabled == false) {
        this.disabled = true;
        let date = new Date();
        this.date = DateHelper.toPersianDate(date);
        let time_question = DateHelper.toPersianDateHM(date);
        this.tableData.push({
          ques: {
            name: this.quetions_title.amaxLeague_title,
            seen: false,
            time: time_question,
          },
          typeAnswer: "errorType",
        });
        AxiosHelper.send("get", this.amaxLeague_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;

            let time_question = DateHelper.toPersianDateHM(date);
            this.tableData[this.tableData.length - 1].answer = {
              data: "بزودی در دسترس قرار می گیرد ...!",
              time: time_question,
            };
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.shouldRenderTable = false;
            this.$nextTick(() => {
              this.shouldRenderTable = true;
            });
            this.disabled = false;
          })
          .catch((err) => {
            this.tdataCatch = false;
            this.tableData[this.tableData.length - 1].answer = {
              data: this.notAnswer,
              time: time_question,
            };

            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.disabled = false;
          });
      }
    },
    greatSymbol() {
      if (this.disabled == false) {
        this.disabled = true;
        let date = new Date();
        this.date = DateHelper.toPersianDate(date);
        let time_question = DateHelper.toPersianDateHM(date);
        this.tableData.push({
          ques: {
            name: this.quetions_title.greatSymbol_title,
            seen: false,
            time: time_question,
          },
          typeAnswer: "table",
        });
        AxiosHelper.send("get", this.greatSymbol_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;

            let time_question = DateHelper.toPersianDateHM(date);
            this.tableData[this.tableData.length - 1].answer = {
              data: temp,
              time: time_question,
            };
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.shouldRenderTable = false;
            this.$nextTick(() => {
              this.shouldRenderTable = true;
            });
            this.disabled = false;
          })
          .catch((err) => {
            this.tdataCatch = false;
            this.tableData[this.tableData.length - 1].answer = {
              data: this.notAnswer,
              time: time_question,
            };

            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.disabled = false;
          });
      }
    },
    checkSymbol() {
      for (let i = 0;i < this.$refs.SearchCompany._data.companies.length;i++) {
        const el = this.$refs.SearchCompany._data.companies[i];
        if (el.fullname == this.$refs.SearchCompany._data.title) {
          this.inptext = this.$refs.SearchCompany._data.title;
          if (this.disabled == false) {
            if (this.inptext !== "") {
              this.disabled = true;
              let date = new Date();
              this.date = DateHelper.toPersianDate(date);
              let time_question = DateHelper.toPersianDateHM(date);
              this.tableData.push({
                ques: {
                  name: `نماد ${this.inptext} رو برام بچک`,
                  seen: false,
                  time: time_question,
                },
                typeAnswer: "checksymbol",
              });
              AxiosHelper.send("get", this.checkSymbol_url)
                .then((data) => {
                  this.tdataCatch = true;
                  let temp = this.getdatasymbol();
                  // this.table = temp;
                  let time_question = DateHelper.toPersianDateHM(date);
                  this.tableData[this.tableData.length - 1].answer = {
                    data: temp,
                    time: time_question,
                  };
                  this.tableData[this.tableData.length - 1].ques.seen = true;
                  this.shouldRenderTable = false;
                  this.$nextTick(() => {
                    this.shouldRenderTable = true;
                  });
                  this.disabled = false;
                })
                .catch((err) => {
                  this.tdataCatch = false;
                  this.tableData[this.tableData.length - 1].answer = {
                    data: this.notAnswer,
                    time: time_question,
                  };

                  this.tableData[this.tableData.length - 1].ques.seen = true;
                  this.disabled = false;
                });
              this.inptext = "";
              this.$refs.SearchCompany._data.title = "";
            }
          }
        }
      }
      // console.log(this.$refs.SearchCompany._data.companies);
    },
    HighVolume() {
      if (this.disabled == false) {
        this.disabled = true;
        let date = new Date();
        this.date = DateHelper.toPersianDate(date);
        let time_question = DateHelper.toPersianDateHM(date);
        this.tableData.push({
          ques: {
            name: this.quetions_title.HighVolume_title,
            seen: false,
            time: time_question,
          },
          typeAnswer: "table",
        });
        AxiosHelper.send("get", this.HighVolume_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;

            let time_question = DateHelper.toPersianDateHM(date);
            this.tableData[this.tableData.length - 1].answer = {
              data: temp,
              time: time_question,
            };
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.shouldRenderTable = false;
            this.$nextTick(() => {
              this.shouldRenderTable = true;
            });
            this.disabled = false;
          })
          .catch((err) => {
            this.tdataCatch = false;
            this.tableData[this.tableData.length - 1].answer = {
              data: this.notAnswer,
              time: time_question,
            };

            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.disabled = false;
          });
      }
    },
    fullSupply() {
      if (this.disabled == false) {
        this.disabled = true;
        let date = new Date();
        this.date = DateHelper.toPersianDate(date);
        let time_question = DateHelper.toPersianDateHM(date);
        this.tableData.push({
          ques: {
            name: this.quetions_title.fullSupply_title,
            seen: false,
            time: time_question,
          },
          typeAnswer: "table",
        });
        AxiosHelper.send("get", this.fullSupply_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;

            let time_question = DateHelper.toPersianDateHM(date);
            this.tableData[this.tableData.length - 1].answer = {
              data: temp,
              time: time_question,
            };
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.shouldRenderTable = false;
            this.$nextTick(() => {
              this.shouldRenderTable = true;
            });
            this.disabled = false;
          })
          .catch((err) => {
            this.tdataCatch = false;
            this.tableData[this.tableData.length - 1].answer = {
              data: this.notAnswer,
              time: time_question,
            };

            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.disabled = false;
          });
      }
    },
  },
};
</script>




<style scoped>
.box-answer-question img{
  margin: -2.7px;
}

.td-width {
  width: 2px;
}
.table-size-width-check-symbol{
  width: 35rem;
}
.td-box-width {
  width: 8rem;
  text-align: right;
}

.symbol-center-content {
  text-align: center;
}

.avg-center {
  text-align: center;
  width: 2rem;
}

.rank-center {
  text-align: center;
  width: 1.5rem;
}

.td-right {
  text-align: right;
}
.sizeIn {
  width: 35%;
  /* font-size: ; */
  /* height: 75%; */
}
.hover {
  cursor: no-drop;
}

.backShadow {
  box-shadow: -4px 4px 5px 1px rgba(25, 25, 25, 0.2);
}
.backgrond2 {
  /* background-image: url("../../../images/icons/logo-en.svg"); */
  background-image: url("../../../images/icons/BackgroundWatermark.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  background-size: 60%;
}
.background1 {
  box-shadow: 4px 4px 5px 1px rgba(25, 25, 25, 0.1);
  padding: 8px;
  background-color: #40434c;
  width: fit-content;
  border-radius: 10px;
}
.back-tr {
  /* width: 550px; */
  height: 55px;
  background-color: hwb(225 20% 76%);
  border-radius: 10px;
  color: aliceblue;
  font-size: 1.2rem;
  /* padding-left: 15px ; */
}
td {
  border-width: 0 0 1px;
  padding: 10px;
  /* vertical-align: top; */
  /* padding-top:10px  ; */
}
tr {
  text-align: center;
}
.w {
  /* padding-top: 255px; */
  color: aliceblue;
  font-size: 12px;
}
.ww {
  color: aliceblue;
  font-size: 12px;
  position: relative;
  top: 1.1rem;
}
.date {
  text-align: center;
  width: 100px;
  border-radius: 10px;
  margin-right: 45%;
  margin-top: 10px;
  position: fixed;
  background-color: #5a5f72;
  color: aliceblue;
}
</style>
