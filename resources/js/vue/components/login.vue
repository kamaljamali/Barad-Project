<template lang="pug">
.is-overflow-auto.modal.is-active.full-modal.has-bg
  .modal-background
    .animation-content.modal-content
      .column.is-pulled-left.container.is-fullhd.is-fluid.full-height.is-relative
        .column.is-mobile.mb-0.is-12-desktop.is-12-mobile.py-0
          a.has-text-white.mx-2.mb-3.is-pulled-left.has-underline(
            href="http://amax.io/"
          ) بازگشت
          .is-overflow-auto.card-box.column.is-70-height.is-12(
            ref="chatContainer"
          )
            .date {{ date }}
            section.py-5.full-height(
              v-for="(data, index) in tableData",
              :key="index"
            )
              .is-flex.is-justify-content-center.is-pulled-right.is-one-third-mobile
                .data-table-item.red.is-1
                  .data-table-item-value.is-size-6
                    | {{ data.ques.name }}
                    .is-flex.is-justify-content-end.ww(
                      v-if="data.ques.seen == true"
                    )
                      img(
                        src="../../../images/landing/double-check.svg",
                        width="15px",
                        height="15px"
                      )
                      div
                        | {{ data.ques.time }}
                    .is-flex.is-justify-content-end.ww(v-else="")
                      img(
                        src="../../../fonts/fontawesome/svgs/solid/check.svg",
                        width="15px",
                        height="15px"
                      )
                      div
                        | {{ data.ques.time }}
                .mt-5
                  span.is-title-bar-title.is-title-bar-white.back2.p-2.is-size-6
                    | شما
                    img.small-icon.mr-2(
                      src="../../../images/pages/leagues/arrow-left-condition.webp"
                    )
              .is-light.mt-5.column(v-if="shouldRenderTable")
                .is-pulled-left(v-if="data.answer")
                  span.is-title-bar-title.is-title-bar-white.back2.p-2.is-size-6.is-pulled-left.mt-6.mr-1
                    img.small-icon.ml-2(
                      src="../../../images/pages/leagues/arrow-right-condition.webp"
                    )
                    | AMAX AI
                  .mt-5.is-flex.column
                    .background1(v-if="Array.isArray(data.answer.data)")
                      table.is-pulled-left
                        tbody
                          tr.back-tr
                            td نماد
                            td ضریب حجمی
                            td شاخص حجمی
                            td قدرت خریدار
                          tr(
                            v-for="(tdata, i) in tableData[index].answer.data",
                            :key="i"
                          )
                            td {{ tdata.symbol }}
                            td {{ tdata.Volume_coefficient }}
                            td {{ tdata.volumetric_index }}
                            td {{ tdata.buyer_power }}
                      .w {{ data.answer.time }}
                    .background1(v-else)
                      | {{ data.answer.data }}
                      .w {{ data.answer.time }}
          .ml-4.mr-4
            .columns.is-mobile.is-multiline.mb-0
              .filter-box-section.column.px-0.is-4-desktop.is-12-mobile
                .container
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0.py-0
                    a.card.column.ml-1.is-size-7-mobile.py-4.column.mt-2.is-flex.is-justify-content-center.is-size-6(
                      :class="{ hover: disabled }",
                      @click="HighVolume()"
                    )
                      | {{ quetions_title.HighVolume_title }}
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0
                    a.card.column.ml-1.is-size-7-mobile.pt-4.pb-2.column.is-flex.is-justify-content-center.rtl(
                      :class="{ hover: disabled }",
                      @click="checkSymbol()"
                    )
                      | رو برام بچک
                      input.input.sizeIn.is-small(
                        type="text",
                        v-model="inptext"
                      )
                      |
                      | نماد
              .filter-box-section.column.px-0.is-4-desktop.is-12-mobile.mt-2
                .container
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0.py-0
                    a.card.column.ml-1.is-size-7-mobile.py-4.column.is-flex.is-justify-content-center(
                      :class="{ hover: disabled }",
                      @click="fullSupply()"
                    )
                      | {{ quetions_title.fullSupply_title }}
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0
                    a.card.column.ml-1.is-size-7-mobile.py-4.column.is-flex.is-justify-content-center(
                      :class="{ hover: disabled }",
                      @click="amaxLeague()"
                    )
                      | {{ quetions_title.amaxLeague_title }}
              .filter-box-section.column.px-0.is-4-desktop.is-12-mobile.mt-2
                .container
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0.py-0
                    a.card.column.ml-1.is-size-7-mobile.py-4.column.is-flex.is-justify-content-center(
                      :class="{ hover: disabled }",
                      @click="greatSymbol()"
                    )
                      | {{ quetions_title.greatSymbol_title }}
                  .column.item.item-icon.is-flex.is-justify-content-center.px-0
                    a.card.column.ml-1.is-size-7-mobile.py-4.column.is-flex.is-justify-content-center(
                      :class="{ hover: disabled }",
                      @click="HighPurchasingPower()"
                    )
                      | {{ quetions_title.HighPurchasing_title }}
</template>   

<script>
"use strict";
const AxiosHelper = require("JS-HELPERS/axios-helper");
export default {
  name: "Login",
  data: () => ({
    disabled: false,
    inptext: "",
    showTable: true,
    tableData: [],
    shouldRenderTable: false,
    date: "",
    table: [],
    urls: {
      HighPurchasing_url: "https://jsonplaceholder.typicode.com/todos/1",
      amaxLeague_url: "https://jsonplaceholder.typicode.com/todos/1",
      greatSymbol_url: "https://jsonplaceholder.typicode.com/todos/1",
      checkSymbol_url: "https://jsonplaceholder.typicode.com/todos/1",
      fullSupply_url: "https://jsonplaceholder.typicode.com/todos/1",
      HighVolume_url: "https://jsonplaceholder.typicode.com/todos/1",
    },
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
    gettime() {
      let tt = new Date();
      let time_question = tt.getHours() + ":" + tt.getMinutes();
      return time_question;
    },
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
        {
          symbol: "کرونا2",
          Volume_coefficient: 13.66,
          volumetric_index: 36.0,
          buyer_power: 23,
        },
      ];
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
    HighPurchasingPower() {
      if (this.disabled == false) {
        this.disabled = true;
        let date = new Date();
        this.date =
          date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
        let time_question = this.gettime();
        this.tableData.push({
          ques: {
            name: this.quetions_title.HighPurchasing_title,
            seen: false,
            time: time_question,
          },
        });
        AxiosHelper.send("get", this.urls.HighPurchasing_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;

            let time_question = this.gettime();
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
    amaxLeague() {
      if (this.disabled == false) {
        this.disabled = true;
        let date = new Date();
        this.date =
          date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
        let time_question = this.gettime();
        this.tableData.push({
          ques: {
            name: this.quetions_title.amaxLeague_title,
            seen: false,
            time: time_question,
          },
        });
        AxiosHelper.send("get", this.urls.amaxLeague_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;

            let time_question = this.gettime();
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
    greatSymbol() {
      if (this.disabled == false) {
        this.disabled = true;
        let date = new Date();
        this.date =
          date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
        let time_question = this.gettime();
        this.tableData.push({
          ques: {
            name: this.quetions_title.greatSymbol_title,
            seen: false,
            time: time_question,
          },
        });
        AxiosHelper.send("get", this.urls.greatSymbol_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;

            let time_question = this.gettime();
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
      if (this.disabled == false) {
        if (this.inptext !== "") {
          this.disabled = true;
          let date = new Date();
          this.date =
            date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
          let time_question = this.gettime();
          this.tableData.push({
            ques: {
              name: `نماد ${this.inptext} رو برام بچک`,
              seen: false,
              time: time_question,
            },
          });
          fetch(this.urls.checkSymbol_url)
            .then((response) => response.json())
            .then((data) => {
              let temp = this.getdata();
              // this.table = temp;
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
            .catch((error) => {
              this.tableData[this.tableData.length - 1].answer = {
                data: this.notAnswer,
                time: time_question,
              };
              this.tableData[this.tableData.length - 1].ques.seen = true;
              this.shouldRenderTable = false;
              this.$nextTick(() => {
                this.shouldRenderTable = true;
              });
              this.disabled = false;
            });
          this.inptext = "";
        }
      }
    },
    HighVolume() {
      if (this.disabled == false) {
        this.disabled = true;
        let date = new Date();
        this.date =
          date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
        let time_question = this.gettime();
        this.tableData.push({
          ques: {
            name: this.quetions_title.HighVolume_title,
            seen: false,
            time: time_question,
          },
        });
        AxiosHelper.send("get", this.urls.HighVolume_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;

            let time_question = this.gettime();
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
        this.date =
          date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
        let time_question = this.gettime();
        this.tableData.push({
          ques: {
            name: this.quetions_title.fullSupply_title,
            seen: false,
            time: time_question,
          },
        });
        AxiosHelper.send("get", this.urls.fullSupply_url)
          .then((data) => {
            this.tdataCatch = true;
            let temp = this.getdata();
            // this.table = temp;

            let time_question = this.gettime();
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




<style>
.sizeIn {
  width: 35%;
  /* font-size: ; */
  /* height: 75%; */
}
.hover {
  cursor: no-drop;
}

.background1 {
  padding: 10px;
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
