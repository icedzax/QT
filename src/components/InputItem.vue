<template>
  <tbody class="bg-grey-light w-full" v-if="approveStat">
    <tr class="full">
      <td
        class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
      >
        <input
          type="text"
          class="tdi w-5/6 text-xs p-1 text-center border-none"
          :value="this.order.list.length + 1"
          disabled
        />
      </td>
      <td
        class="py-1 w-2/12 text-center text-xs md:text-sm border border-slate-200"
        colspan="2"
      >
        <vue3-simple-typeahead
          ref="typeahead"
          id="typeahead_id"
          class="tdi"
          :placeholder="options.placeholder"
          :items="fg.items"
          @selectItem="selectItem"
          @onInput="onInput"
          @onBlur="onBlur"
          @input="lookupFG"
          :minInputLength="1"
          :itemProjection="
            (fg) => {
              return fg.search;
            }
          "
        >
        </vue3-simple-typeahead>
      </td>
      <td
        class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
      >
        <input
          type="text"
          class="tdi w-5/6 text-xs p-1 text-center border-none"
          v-model="inputField.amount"
          @keyup="
            edit(
              index,
              inputField.amount,
              inputField.price_unit,
              false,
              inputField.selectedUnittype
            )
          "
        />
      </td>
      <td class="py-1 text-xs md:text-sm border border-slate-200">
        <select
          v-model="selectedType"
          @change="PriceType(selectedUnittype, selectedType, this.x, true)"
          class="border-none text-xs"
        >
          <option v-for="i in type.Wholesale" :key="i.t" :value="i.t">
            {{ i.text }}
          </option>
        </select>
      </td>
      <td
        class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
      >
        <div class="flex justify-inline border-b border-gray-300">
          <input
            class="w-1/2 text-center text-xs p-1 focus:outline-none cursor-pointer text-red-500"
            v-model="inputField.min"
            readonly="readonly"
          />
          <input
            class="w-1/2 text-center text-xs p-1 focus:outline-none cursor-pointer text-green-500"
            v-model="inputField.max"
            readonly="readonly"
          />
        </div>
        <input
          type="text"
          class="tdi w-5/6 text-xs p-1 text-center border-none focus:outline-none"
          v-model="inputField.rmd_weight"
          @input="
            changeNG(inputField.rmd_weight, false, inputField.selectedUnittype)
          "
        />
      </td>

      <td
        class="py-1 w-1/12 text-center text-xs md:text-sm border border-slate-200"
      >
        <select
          v-model="selectedUnittype"
          @change="PriceType(selectedUnittype, selectedType, this.x, true)"
          class="tdi text-xs p-1 text-center w-5/6 border-none"
        >
          <option v-for="(i, index) in this.type_unit" :key="index">
            {{ i }}
          </option>
        </select>
      </td>

      <td class="py-1 w-1/12 text-center border border-slate-200">
        <input
          type="text"
          class="tdi w-5/6 p-1 text-sm text-center border-none"
          v-model="inputField.price_unit"
          @keyup="
            edit(
              index,
              inputField.amount,
              inputField.price_unit,
              false,
              inputField.selectedUnittype
            )
          "
        />
      </td>
      <td class="py-1 w-1/12 text-center border border-slate-200">
        <v-num
          #="{ number }"
          :value="inputField.rmd_weight * inputField.amount"
          maximum-fraction-digits="2"
        >
          {{ number }}
        </v-num>
      </td>
      <td class="py-1 w-1/12 text-center border border-slate-200">
        <v-num
          #="{ number }"
          :value="
            inputField.selectedUnittype == 'KG'
              ? inputField.rmd_weight *
                inputField.price_unit *
                inputField.amount
              : inputField.cal_price
          "
          maximum-fraction-digits="2"
        >
          {{ number }}
        </v-num>
      </td>
      <td class="py-1 w-1/12">
        <svg
          version="1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          enable-background="new 0 0 48 48"
          class="mx-1 w-5 h-5"
          v-show="!sys.loading"
          v-if="(this.List.length == 0 || approveStat) && !chkrepeat"
          @click="enter"
        >
          <circle fill="#4CAF50" cx="24" cy="24" r="21" />
          <g fill="#fff">
            <rect x="21" y="14" width="6" height="20" />
            <rect x="14" y="21" width="20" height="6" />
          </g>
        </svg>
        <LoadingSpinner class="mx-1 w-5 h-5" v-show="sys.loading" />
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async enter() {
      if (this.data.input) {
        this.order.list.push({
          rmd_mat: this.inputField.rmd_mat,
          rmd_size: this.inputField.rmd_size,
          rmd_weight: this.inputField.rmd_weight,
          amount: this.inputField.amount,
          price_unit: this.inputField.price_unit || 1,
          cal_price: this.inputField.cal_price || 1,
          ptype: this.selectedType,
          unit: this.selectedUnittype,
        });
        console.log("min", this.inputField.min);
        const stock_payload = {
          rmd_mat: this.inputField.rmd_mat,
          rmd_size: this.inputField.rmd_size,
          rmd_weight: this.inputField.rmd_weight,
          ptype: this.selectedType,
          amount: this.inputField.amount,
          unit: this.selectedUnittype,
          price_unit: this.inputField.price_unit || 1,
          cal_price: this.inputField.cal_price || 1,
          qt: auth.temp_qt,
          min: this.inputField.min,
          max: this.inputField.max,
        };

        await FgService.insert(stock_payload);
        const new_order = await FgService.items(auth.temp_qt);

        order.list = new_order.data;
        // this.manage_type();
        if (this.order.list.length !== 0) {
          this.table_showlist = "Y";
        }

        this.data.input = {};
        this.inputField = {};
        this.inputField.cal_price = 0;

        this.$refs["typeahead"].$data.input = await "";
        delete this.data.input;
        delete this.data.selection;
      } else {
        alert("กรุณาเลือกสินค้า");
      }
    },
  },
};
</script>

<style></style>
