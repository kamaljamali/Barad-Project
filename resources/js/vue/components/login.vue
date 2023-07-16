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
                    .background1.div-wrap(
                      v-if="data.typeAnswer == 'errorType'"
                    )
                      | {{ data.answer.data }}
                      .w {{ data.answer.time }}
                    .background1.div-wrap(
                      v-if="data.typeAnswer == 'catch'"
                    )
                      | {{ data.answer.data }}
                      .w {{ data.answer.time }}
                    .background1(v-if="data.typeAnswer == 'checksymbol'")
                      table.is-pulled-left.table-size-width-check-symbol
                        tr.has-border-bottom
                          td.py-2.rank-center رتبه
                          td.py-2.symbol-center-content(colspan="11") {{ data.answer.data.symbolName }}
                        tr
                          td.py-2.rank-center {{ data.answer.data.amaxScore_rank }}
                          td.py-2.td-width
                          td.py-2.td-right(colspan="9") امتیاز امکس
                          td.py-2.avg-center {{ data.answer.data.amaxScore }}
                        tr
                          td.py-2.rank-center {{ data.answer.data.tenDayAVG_rank }}
                          td.py-2.td-width
                          td.py-2.td-right(colspan="9") میانگین 7 روزه امتیاز امکس
                          td.py-2.avg-center {{ data.answer.data.tenDayAVG }}
                        tr
                          td.py-2.rank-center {{ data.answer.data.amaxScoreToAVG_rank }}
                          td.py-2.td-width
                          td.py-2.td-right(colspan="9") نسبت امتیاز امکس به میانگین
                          td.py-2.avg-center {{ data.answer.data.amaxScoreToAVG }}
                        tr.has-border-bottom
                          td.py-2.rank-center {{ data.answer.data.originalScore_rank }}
                          td.py-2.td-width
                          td.py-2.td-right(colspan="9") امتیاز بنیادی
                          td.py-2.avg-center {{ data.answer.data.originalScore }}
                        tr
                          td
                          td.py-2.td-box-width(colspan="4") قدرت خریدار: {{ data.answer.data.buyer_power }}
                          td.py-2.td-box-width(colspan="3") شاخص حجمی: {{ data.answer.data.volumetric_index }}
                          td.py-2.td-box-width(colspan="4") ضریب حجمی: {{ data.answer.data.Volume_coefficient }}
                        tr
                          td
                          td.py-2.td-box-width(colspan="4") روند ک.م: {{ data.answer.data.kmProcess }}
                          td.py-2.td-box-width(colspan="3") روند ب.م: {{ data.answer.data.bmProcess }}
                          td.py-2.td-box-width(colspan="4") روند م.م: {{ data.answer.data.mmProcess }}
                      .w {{ data.answer.time }}
                  .mt-4.div-wrap.is-pulled-left.link-page(v-if="data.typeAnswer !== 'catch'")
                    a(:href="data.answer.randomData.answerUrlPage",v-if="data.answer.randomData.answertype=='link'") {{ data.answer.randomData.answer2 }}                
                    a(href="#",@click.prevent="showAboutModal",v-if="data.answer.randomData.answertype=='aboutus'") {{ data.answer.randomData.answer2 }}
                    a(href="#",@click.prevent="showFaqModal",v-if="data.answer.randomData.answertype=='faq'") {{ data.answer.randomData.answer2 }}
                    a(href="#",@click.prevent="showTermsModal",v-if="data.answer.randomData.answertype=='terms'") {{ data.answer.randomData.answer2 }}
                    b-modal(
                      :active.sync="isAboutModalActive",
                      custom-class="full-modal has-bg"
                    )
                      about(@on-hide-modal="hideAboutModal")
                    b-modal(
                      :active.sync="isTermsModalActive",
                      custom-class="full-modal has-bg"
                    )
                      terms-conditions(@on-hide-modal="hideTermsModal", TermsConditions) 
                    b-modal(:active.sync="isFaqModalActive", custom-class="full-modal has-bg")
                      faq(@on-hide-modal="hideFaqModal") 
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
                    .py-4 رو برام بچک
                    SearchCompany(
                      v-model="inptext",
                      ref="SearchCompany",
                      :list-companyy="listCompanyy"
                    )
                    .py-4 نماد
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
const TermsConditions =
  require("VUE-COMPONENTS/user/terms-conditions.vue").default;
const About = require("VUE-COMPONENTS/user/about.vue").default;
const Faq = require("VUE-COMPONENTS/user/faq.vue").default;
import SearchCompany from "./general/search-company.vue";
const DateHelper = require("JS-HELPERS/date-helper");
const AxiosHelper = require("JS-HELPERS/axios-helper");
export default {
  name: "Login",
  components: {
    SearchCompany,
    TermsConditions,
    About,
    Faq
  },
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
    randomIndex: "",
    checkSymbolShow: false,
    disabled: false,
    inptext: "",
    showTable: true,
    tableData: [],
    shouldRenderTable: false,
    date: "",
    table: [],
    notAnswer: "جواب مورد نظر پیدا نشد ..!",
    isTermsModalActive: false,
    isAboutModalActive: false,
    isFaqModalActive: false,
    quetions_title: {
      HighPurchasing_title: "نماد با قدرت خریدار بالا چی داری؟",
      amaxLeague_title: "داستان لیگ های امکس چیه؟",
      greatSymbol_title: "چند تا نماد تپل مپل بگو حال کنیم..!",
      fullSupply_title: "چندتا پر عرضه بده رصد کنیم...",
      HighVolume_title: "چندتا نماد حجم بالا لطفا.",
    },
    randomTextWithAnswer: [
      {
        answer2:
          "اگه هنوز سوالات بیشتری داری حتما پیج سوالات متداول ما  رو ببین :)",
        answerUrlPage: "showContactModal",
        answertype: "faq"
      },
      {
        answer2: "بیشتر می خوای با ما آشنا شی؟ اینجا :)",
        answerUrlPage: "showContactModal",
        answertype: "aboutus"
      },
      {
        answer2: "بنظرم بد نباشه با ما بیشتر آشنا شی رفیق...اینجا رو بلمس...",
        answerUrlPage: "showContactModal",
        answertype: "aboutus"
      },
      {
        answer2: "سوالی چیزی...؟ برو اینجا در خدمتیم",
        answerUrlPage: "showContactModal",
        answertype: "faq"
      },
      {
        answer2: "امکس کاوشگر بورس ایرانه...با ما بیشتر آشنا شو!",
        answerUrlPage: "showContactModal",
        answertype: "aboutus"
      },
      {
        answer2: "امکس و دیگر هیچ! بیشتر ما رو بشناس...",
        answerUrlPage: "showContactModal",
        answertype: "aboutus"
      },
      {
        answer2:
          "بزرگترین سامانه ی هوش مصنوعی بازار سرمایه ایران و بیشتر بشناس...",
        answerUrlPage: "showContactModal",
        answertype: "aboutus"
      },
      {
        answer2: "برای دیتای بیشتر برو اینجا عزیزم :)",
        answerUrlPage: "showContactModal",
        answertype: "terms"
      },
      {
        answer2:
          "می دونستی سامانه ی امکس با هوش مصنوعی اداره میشه؟ بیشتر بشناسش!!",
        answerUrlPage: "showContactModal",
        answertype: "aboutus"
      },
      {
        answer2: "با امکس بیشتر آشنا شو...",
        answerUrlPage: "showContactModal",
        answertype: "aboutus"
      },
      {
        answer2: "بیا اینجا تا بیشتر ما رو بشناسی :)",
        answerUrlPage: "showContactModal",
        answertype: "aboutus"
      },

      {
        answer2: "واسه دیتای بیشتر برو اینجا عزیزم!",
        answerUrlPage: "/bigtable",
        answertype: "link"
      },
      {
        answer2: "ضمنا یکی از بزرگترین جداول بازار بورس ایران اینجا منتظرته",
        answerUrlPage: "/bigtable",
        answertype: "link"
      },
      {
        answer2: "مگه میشه بورسی باشی و غربال نماد و بررسی نکنی؟",
        answerUrlPage: "/bigtable",
        answertype: "link"
      },
      {
        answer2: "هر بورسی باید غربال نماد امکس و ببینه :))",
        answerUrlPage: "/bigtable",
        answertype: "link"
      },
      {
        answer2: "ته بازار بورس اینجاست...غربال نماد امکس...",
        answerUrlPage: "/bigtable",
        answertype: "link"
      },

      {
        answer2: "راستی...بنظرم یه نگاهی به بازارسنج امکس بنداز :))",
        answerUrlPage: "/market-gauge/queues",
        answertype: "link"
      },
      {
        answer2: "عزیزم بیا بازار سنج و ببین از بازار لذت ببر",
        answerUrlPage: "/market-gauge/queues",
        answertype: "link"
      },
      {
        answer2: "جدول حق بازار بورس ایران اینجاست...",
        answerUrlPage: "/market-gauge/queues",
        answertype: "link"
      },
      {
        answer2: "بازار سنج امکس و از دست ندی که بد میشه :)))",
        answerUrlPage: "/market-gauge/queues",
        answertype: "link"
      },
      {
        answer2: "می دونستی کلی دیتای خفن تو بازارسنج منتظرته؟",
        answerUrlPage: "/market-gauge/queues",
        answertype: "link"
      },

      {
        answer2:
          "یه موضوع دیگه اینکه روند دوست توعه رفیق...پیج روندهای ما رو از دست ندی...",
        answerUrlPage: "/market-gauge/trends",
        answertype: "link"
      },
      {
        answer2:
          "راستی، روند دوستته ولی گاهی بعضی دوستا از دشمنم بدترن :))) پیج روندهای ما رو ببین",
        answerUrlPage: "/market-gauge/trends",
        answertype: "link"
      },
      {
        answer2: "رفیق چرا ی نگاهی به سامانه ی روندهای امکس نمیندازی؟",
        answerUrlPage: "/market-gauge/trends",
        answertype: "link"
      },
      {
        answer2: "کلی نماد و کلی روند اینجا منتظرتن ...",
        answerUrlPage: "/market-gauge/trends",
        answertype: "link"
      },
      {
        answer2: "بنظرم یه نگاهکی بنداز اینجا رو...",
        answerUrlPage: "/market-gauge/trends",
        answertype: "link"
      },

      {
        answer2: "سطوح قیمتی نماد ها رو اینجا ببین",
        answerUrlPage: "/support-resistance",
        answertype: "link"
      },
      {
        answer2: "کف و سقف نماد ها روووو...:))",
        answerUrlPage: "/support-resistance",
        answertype: "link"
      },
      {
        answer2: "شاید بالا پایین نمادهای بازار و ببینی بد نباشه؟ :)))",
        answerUrlPage: "/support-resistance",
        answertype: "link"
      },
      {
        answer2: "حمایت و مقاومت و دیگر هیچ...",
        answerUrlPage: "/support-resistance",
        answertype: "link"
      },
      {
        answer2: "کلی دیتای خوب اینجا هست حتما ببینشون",
        answerUrlPage: "/support-resistance",
        answertype: "link"
      },

      {
        answer2:
          "می دونستی DYNAMIC SMART RANKING  یا رتبه بندی هوشمند پویا را ما به بازارهای مالی معرفی کردیم؟ اینجا ببینش",
        answerUrlPage: "/leagues",
        answertype: "link"
      },
      {
        answer2: "یکی از جالب ترین و هیولاترین جداول بازار اینجاسسس",
        answerUrlPage: "/leagues",
        answertype: "link"
      },
      {
        answer2: "برترین سیستم سورت و رتبه بندی نماد ها رو اینجا ببین",
        answerUrlPage: "/leagues",
        answertype: "link"
      },
      {
        answer2: "اگه یه جدول برای بررسی نمادهای بازار نیاز داشته باشی همینه",
        answerUrlPage: "/leagues",
        answertype: "link"
      },
      {
        answer2: "ما اینجا رتبه بندی بازار رو ترکوندیم! ",
        answerUrlPage: "/leagues",
        answertype: "link"
      },
      {
        answer2: "امکس هیولاترین هوش مصنوعی بازار در خدمت تو کاربر عزیززز",
        answerUrlPage: "/leagues",
        answertype: "link"
      },
      {
        answer2: "کاوشگر بورس و دیگر هیچ...",
        answerUrlPage: "/leagues",
        answertype: "link"
      },
      {
        answer2:
          "امکس یعنی یکی از پیشرفته ترین دست آوردهای بشری برای شمای بورسی :)))",
        answerUrlPage: "/leagues",
        answertype: "link"
      },
      {
        answer2:
          "باورت میشه رتبه بندی هوشند پویا برای اولین بار در بازارهای مالی مطرح شده؟ اینجا رو ببین...",
        answerUrlPage: "/leagues",
        answertype: "link"
      },
    ],
    cheKonim: [
      "شاد باش و بدنیا بخند :)))",
      "بیخیال!!",
      "به نکات مثبت فکر کن باشد که رستگار شوی",
      "سعی کن بورس درست یاد بگیری ",
      "مدیریت ریسک یادت نره",
      "تو به من بگو چه کنم؟! :|",
      "کلا و نمی دونم و فعلا از بودن در کنار من لذت ببر",
      "شد شد نشد برو آلمان ",
      "من اگه میدونستم که هوش مصنوعی نبودم عزیزم:)",
      "صدا کن مرا صدای تو خوب است صدای تو سبزینه آن گیاه عجیبی است که در انتهای صمیمیت حزن می روید :)",
      "دنیا همه هیچ و اهل دنیا همه هیچ ای هیچ برای هیچ بر هیچ مپیچ دانی که پس از عمر چه ماند باقی مهر است و محبت است و باقی همه هیچ ",
      "زندگی، دیتا و دیگر هیچچچچ",
    ],
    quetions_array: [
      {
        randomquestion: "داستان لیگ های امکس چیه؟",
        Randomanswer:
          "لیگ رتبه بندی نمادها یکی از عظیم ترین و خارق العاده ترین سامانه های بررسی هوشمند بازار بورس ایران هستش. در این سامانه نمادها براساس رتبه ی چند روزه ی خودشون و تغییرات رتبه بندی می شن. جداول این سامانه براساس کلی مولفه ی بدردبخور تابلوخوانی و عرضه و تقاضا قابل سورت و بررسی هستن. اینجا رو ببینید. ",
      },
      {
        randomquestion: "بازار سنج چیه؟ ",
        Randomanswer:
          "انواع اقسام آیتم های عرضه و تقاضا در این جداول بررسی می شن و بازار بر این اساس شخم زده میشه. صفوف، تغییرات قیمت و سفارشات و ... چندتا از مولفه های مورد بررسی در این سامانه اند. برای بررسی این سامانه اینجا رو ببینید.  ",
      },
      {
        randomquestion: "غربال نماد..؟",
        Randomanswer:
          "یک سامانه عظیم و کاملا انعطاف پذیر که میشه باهاش کلیت بازار و نمادهاش رو بررسی کرد.  فکر کنید کلی آیتم و فیلتر هست که میشه اینها را بطور ترکیبی یا به تنهایی استفاده کرد و بازار رو باهاشون رصد کرد. این جدول بدردبخور رو اینجا می تونید ببینید.  ",
      },
      {
        randomquestion: "وات ایز حمایت و مقاومت؟؟ ",
        Randomanswer:
          "یه جدول بزرگ داریم که سقف و کف تئوریک نمادها رو میشه توش بررسی کرد و در کنار کلی آیتم فوق العاده ی تابلوخوانی بکار گرفت. جداول همه هوشمند و قابل سورت هستند. پیشنهاد میکنیم اینجا رو ببینید ",
      },
      {
        randomquestion: "روندنمادها رو زود واسم بگو..",
        Randomanswer:
          " مگه میشه بورسی بود به روند بازار بی توجه؟ جدول روند نمادها از سه منظر کوتاه مدت، میان مدت و بلند مدت به بررسی و نمایش نمادها می پردازه. ضمنا کلی اطلاعات جالب دیگه هم تو این جدول هست که پیشنهاد می کنم از دست ندیشون. اینجا رو ببین. ",
      },
      {
        randomquestion: "پنجره نماد ها چیه :|",
        Randomanswer:
          "با کلیک برروی هر نماد یک پنجره باز میشه که حاوی کلی اطلاعات جالب در مورد اون نماده. در هرکدوم از جداول امکس با کلیک برروی هر نماد می تونید به این جداول دسترسی داشته باشید.   ",
      },
      {
        randomquestion: "منوی فیلتر نمادها چیه حاجی؟",
        Randomanswer:
          'با کلیک برروسی عنوان "نماد" در هریک از جداول امکس یک پنجره باز میشه که می شه باهاش نمادهای دلخواه رو بطوری که دلمون می خواد فیلتر کنیم. ',
      },
      {
        randomquestion: "میگم راستی امتیاز امکس چیه؟؟",
        Randomanswer:
          "کلی مولفه ی حق عرضه و تقاضا رو انداختیم توی یک پارامتر هیولا بنام امتیاز امکس. امتیاز امکس در واقع یک میانگینه که هوش مصنوعی ایجاد می کنه و نمایشگر کلی آیتمه که در قالب یک آیتم، یک آیتم قابل سورت و مقایسه. امتیاز امکس رو در سامانه های غربال (اینجا) و حمایت و مقاومت (اینجا) می تونید ببینید.  ",
      },
      {
        randomquestion: "قدرت خریدار...؟",
        Randomanswer:
          " یه مولفه ی باحال تابلوخوانیه که تقریبا همه ی جداول امکس حاوی اونن و میشه بازار رو براساسش رتبه بندی کرد. ما کلی آیتم دیگه ام داریم تو این استایل: میانگین قدرت خریدار بازار، میانگین قدرت خریدار 5 روزه، تغییرات قدرت خریدار از اول صبح و ....یه همچین چیزی هستیم ما!!",
      },
      {
        randomquestion: "شاخص حجمی چیه؟ ",
        Randomanswer:
          "نسبت حجم فعلی به میانگینه ولی در مقیاس ساعتی. وقتی یه نمادی A تا حجم در ساعت می خوره و یهو این حجم زیاد میشه این شاخص حجمی ما هم زیاد میشه. این شاخص در اکثر جداول امکس قابل رویت هستش. راستی این مولفه رو برای اولین بار بروبکس امکس به بازار معرفی کردن...:)))  ",
      },
      {
        randomquestion: "ضریب حجمی رو واسم بگو...",
        Randomanswer:
          " حجم فعلی به میانگین چند روزه. این مقیاسش روزانه اس. یه مولفه ی تابلوخوانیه که کلی بدردمیخوره. چارتا سرچ تو اینترنت بزن",
      },
      {
        randomquestion: "امتیاز بنیادی چیست؟ ",
        Randomanswer:
          "اینن یه آیتمیه که بازم ما به بازار معرفی کردیم (البته تعریف از خود نباشه :)))..اینجوریه که از نسبت PE به بازار استخراج میشه. البته این آیتم گذشته نگره  ینی مربوط به دیتای قبل هستش و ممکنه با آینده تفاوت کنه.  ",
      },
      {
        randomquestion: "تیم امکس کیان؟ ",
        Randomanswer:
          "یه عده آدم خوره ی بازارهای مالی. تریدر و برنامه نویس و .... باهاشون در ارتباط باش رفیق و نظراتتو منتقل کن بهشون : amaxx001@gmail.com اینم صفحه ی تماس با ما",
      },
      {
        randomquestion: "کلا چه کنیم؟",
      },
    ],
  }),
  updated() {
    this.scrollToBottom();
  },
  methods: {
    showFaqModal() {
      Vue.set(this, "isFaqModalActive", true);
    },
    hideFaqModal() {
      Vue.set(this, "isFaqModalActive", false);
    },
    showAboutModal() {
      Vue.set(this, "isAboutModalActive", true);
    },
    hideAboutModal() {
      Vue.set(this, "isAboutModalActive", false);
    },
    showTermsModal() {
      Vue.set(this, "isTermsModalActive", true);
    },
    hideTermsModal() {
      Vue.set(this, "isTermsModalActive", false);
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
            let rndData =
              this.randomTextWithAnswer[
              Math.floor(Math.random() * this.randomTextWithAnswer.length)
              ];
            this.tableData[this.tableData.length - 1].answer = {
              data: temp,
              randomData: rndData,
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
            this.tableData[this.tableData.length - 1].typeAnswer = "catch";
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.disabled = false;
            this.shouldRenderTable = false;
            this.$nextTick(() => {
              this.shouldRenderTable = true;
            });
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
        this.tdataCatch = true;
        let time_answer = DateHelper.toPersianDateHM(date);
        let rndData =
          this.randomTextWithAnswer[
          Math.floor(Math.random() * this.randomTextWithAnswer.length)
          ];
        if (
          this.quetions_array[this.randomIndex].randomquestion == "کلا چه کنیم؟"
        ) {
          this.tableData[this.tableData.length - 1].answer = {
            data: this.cheKonim[
              Math.floor(Math.random() * this.cheKonim.length)
            ],
            randomData: rndData,
            time: time_answer,
          };
        } else {
          this.tableData[this.tableData.length - 1].answer = {
            data: this.quetions_array[this.randomIndex].Randomanswer,
            randomData: rndData,
            time: time_answer,
          };
        }
        this.tableData[this.tableData.length - 1].ques.seen = true;
        this.shouldRenderTable = true;
        this.disabled = false;
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
            let rndData =
              this.randomTextWithAnswer[
              Math.floor(Math.random() * this.randomTextWithAnswer.length)
              ];
            this.tableData[this.tableData.length - 1].answer = {
              data: temp,
              randomData: rndData,
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
            this.tableData[this.tableData.length - 1].typeAnswer = "catch";
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.disabled = false;
            this.shouldRenderTable = false;
            this.$nextTick(() => {
              this.shouldRenderTable = true;
            });
          });
      }
    },
    checkSymbol() {
      for (
        let i = 0;
        i < this.$refs.SearchCompany._data.companies.length;
        i++
      ) {
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
                  let rndData =
                    this.randomTextWithAnswer[
                    Math.floor(
                      Math.random() * this.randomTextWithAnswer.length
                    )
                    ];
                  this.tableData[this.tableData.length - 1].answer = {
                    data: temp,
                    randomData: rndData,
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
                  this.tableData[this.tableData.length - 1].typeAnswer = "catch";
                  this.tableData[this.tableData.length - 1].ques.seen = true;
                  this.disabled = false;
                  this.shouldRenderTable = false;
                  this.$nextTick(() => {
                    this.shouldRenderTable = true;
                  });
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
            let rndData =
              this.randomTextWithAnswer[
              Math.floor(Math.random() * this.randomTextWithAnswer.length)
              ];
            this.tableData[this.tableData.length - 1].answer = {
              data: temp,
              randomData: rndData,
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
            this.tableData[this.tableData.length - 1].typeAnswer = "catch";
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.disabled = false;
            this.shouldRenderTable = false;
            this.$nextTick(() => {
              this.shouldRenderTable = true;
            });
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
            let rndData =
              this.randomTextWithAnswer[
              Math.floor(Math.random() * this.randomTextWithAnswer.length)
              ];
            this.tableData[this.tableData.length - 1].answer = {
              data: temp,
              randomData: rndData,
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
            this.tableData[this.tableData.length - 1].typeAnswer = "catch";
            this.tableData[this.tableData.length - 1].ques.seen = true;
            this.disabled = false;
            this.shouldRenderTable = false;
            this.$nextTick(() => {
              this.shouldRenderTable = true;
            });
          });
      }
    },
  },
  mounted() {
    this.randomIndex = Math.floor(Math.random() * this.quetions_array.length);
    this.quetions_title.amaxLeague_title =
      this.quetions_array[this.randomIndex].randomquestion;
  },
};
</script>

<style scoped>
.link-page {
  box-shadow: 4px 4px 5px 1px rgba(25, 25, 25, 0.2);
  background: #40434c;
  border-radius: 10px;
  padding: 12px;
  position: relative;
  /* left: 7.4rem; */
}

.div-wrap {
  left: 6.2rem;
  max-width: 35rem;
}

.box-answer-question img {
  margin: -2.7px;
}

.td-width {
  width: 2px;
}

.table-size-width-check-symbol {
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
  color: #fff;
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
