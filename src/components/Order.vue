<template>
  <div class="container">
    <table class="table-fix w-full">
      <thead class="w-full">
        <tr class="w-full mb-4">
          <th
            class="font-light border-b border-slate-300 w-2/12 text-xs md:text-sm"
          >
            ลำดับ
          </th>
          <th
            class="font-light border-b border-slate-300 w-4/12 text-xs md:text-sm"
          >
            รายการสินค้า
          </th>
          <th
            class="font-light border-b border-slate-300 w-1/12 text-xs md:text-sm"
          >
            น้ำหนักหน่วย +/-
          </th>
          <th
            class="font-light border-b border-slate-300 w-1/12 text-xs md:text-sm"
          >
            จำนวนหน่วย
          </th>
          <th
            class="font-light border-b border-slate-300 w-2/12 text-xs md:text-sm"
          >
            ราคาต่อหน่วยก่อน VAT 7%
          </th>
          <th
            class="font-light border-b border-slate-300 w-2/12 text-xs md:text-sm"
          >
            จำนวนเงิน
          </th>
          <th>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              @click="deleteAll"
            >
              <title>x</title>
              <path
                class="cls-1"
                d="M17.66229,21.88486,63.3847,30.82574l45.72241,8.94088a1.559,1.559,0,0,0,1.82788-1.22994A10.15176,10.15176,0,0,0,102.9192,26.6239l-15.172-2.96684.79656-4.07352A11.10952,11.10952,0,0,0,79.7827,6.56318L57.33412,2.17343A11.1096,11.1096,0,0,0,44.31375,10.9345L43.51718,15.008l-15.172-2.96685A10.15176,10.15176,0,0,0,16.43235,20.057a1.559,1.559,0,0,0,1.22994,1.82788ZM60.0674,9.82374,74.369,12.62036a8.2641,8.2641,0,0,1,6.5245,9.69647h0l-15.2613-2.9843L50.37093,16.34825h0A8.2641,8.2641,0,0,1,60.0674,9.82374Z"
              />
              <path
                class="cls-2"
                d="M110.58839,47.36161H17.41161a1.559,1.559,0,0,0-1.55785,1.55785v5.90918c0,.85949,16.14275,61.05238,16.14275,61.05238a11.08149,11.08149,0,0,0,11.03938,10.153H84.96412A11.08149,11.08149,0,0,0,96.0035,115.881s16.14275-60.19289,16.14275-61.05238V48.91946A1.559,1.559,0,0,0,110.58839,47.36161Zm-61.934,64.2194a2.60793,2.60793,0,0,1-3.19666-1.84821c-4.44239-16.61345-8.95983-33.53068-11.91535-44.72956a2.61069,2.61069,0,1,1,5.04851-1.33243c2.95407,11.19159,7.47077,28.10409,11.911,44.71353A2.61043,2.61043,0,0,1,48.65435,111.581Zm17.95316-2.52243a2.61095,2.61095,0,0,1-5.22189,0V64.337a2.61095,2.61095,0,0,1,5.22189,0ZM94.45735,65.00325C91.3685,76.70879,86.46715,95.05644,82.542,109.73317a2.61073,2.61073,0,1,1-5.04414-1.34918c3.9237-14.67272,8.8236-33.01491,11.911-44.71316a2.61069,2.61069,0,1,1,5.04851,1.33243Z"
              />
            </svg>
          </th>
        </tr>
      </thead>
      <!-- Remove the nasty inline CSS fixed height on production and replace it with a CSS class — this is just for demonstration purposes! -->
      <tbody v-if="this.table_showlist !== 'N'" class="bg-grey-light w-full">
        <tr v-for="(items, index) in List" :key="index" class="full mb-4">
          <td class="py-1 w-2/12 text-center">
            <input
              type="text"
              :value="items.mat"
              class="w-5/6 rounded-xl text-xs p-1 text-center ring-1 ring-green-200 bg-gray-200 border-2 border-green-400"
              disabled
            />
          </td>
          <td class="py-1 w-4/12 text-center">
            <input
              type="text"
              :value="items.size"
              class="w-5/6 rounded-xl text-xs p-1 text-center ring-1 ring-green-200 bg-gray-200 border-2 border-green-400"
              disabled
            />
          </td>
          <td class="py-1 w-1/12 text-center">
            <input
              type="text"
              :value="items.stdweight"
              class="w-5/6 rounded-xl text-xs p-1 text-center ring-1 ring-green-200 bg-gray-200 border-2 border-green-400"
              disabled
            />
          </td>
          <td class="py-1 w-1/12 text-center text-xs md:text-sm">
            <input
              type="text"
              :value="items.numunit"
              class="w-5/6 rounded-xl text-xs p-1 text-center ring-1 ring-green-200 bg-gray-200 border-2 border-green-400"
            />
          </td>
          <td class="py-1 w-2/12 text-center text-xs md:text-sm">
            <input
              type="text"
              :value="items.vatt"
              class="w-3/6 rounded-xl text-xs p-1 text-center ring-1 ring-green-200 bg-gray-200 border-2 border-green-400"
              disabled
            />
          </td>
          <td class="py-1 w-2/12 text-center text-xs md:text-sm">
            <input
              type="text"
              :value="items.price"
              class="w-3/6 rounded-xl text-xs p-1 text-center ring-1 ring-green-200 bg-gray-200 border-2 border-green-400"
              disabled
            />
          </td>
          <td>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="red"
              @click="deletes(index)"
            >
              <title>Remove</title>
              <path
                d="M472.22,164.65A235.29,235.29,0,0,0,347.35,39.78a235.37,235.37,0,0,0-182.7,0A235.29,235.29,0,0,0,39.78,164.65a235.37,235.37,0,0,0,0,182.7A235.29,235.29,0,0,0,164.65,472.22a235.37,235.37,0,0,0,182.7,0A235.29,235.29,0,0,0,472.22,347.35a235.37,235.37,0,0,0,0-182.7Zm-39.3,166.08A192.7,192.7,0,1,1,448,256,191.39,191.39,0,0,1,432.92,330.73Z"
              />
              <path
                d="M341.33,234.67H170.67a21.33,21.33,0,1,0,0,42.66H341.33a21.33,21.33,0,1,0,0-42.66Z"
              />
            </svg>
          </td>
        </tr>
      </tbody>
      <tbody class="bg-grey-light w-full">
        <tr class="full mb-4">
          <td class="py-1 w-2/12 text-center">
            <input
              type="text"
              v-model="rmd_mat"
              class="w-5/6 rounded-xl text-xs p-1 text-center"
              disabled
            />
          </td>
          <td class="py-1 w-4/12 text-center">
            <vue3-simple-typeahead
              id="typeahead_id"
              placeholder="Enter Size..."
              :items="manage_STEEL"
              :minInputLength="1"
              @selectItem="selectItemEventHandler"
            >
            </vue3-simple-typeahead>
          </td>
          <td class="py-1 w-1/12 text-center">
            <input
              type="text"
              v-model="rmd_stdweight"
              class="w-5/6 rounded-xl text-xs p-1 text-center"
              disabled
            />
          </td>
          <td class="py-1 w-1/12 text-center text-xs md:text-sm">
            <input
              type="text"
              v-model="rmd_numunit"
              class="w-5/6 rounded-xl text-xs p-1 text-center"
            />
          </td>
          <td class="py-1 w-2/12 text-center text-xs md:text-sm">
            <input
              type="text"
              v-model="vat"
              class="w-3/6 rounded-xl text-xs p-1 text-center"
            />
          </td>
          <td class="py-1 w-2/12 text-center text-xs md:text-sm">
            <input
              type="text"
              v-model="rmd_prices"
              class="w-3/6 rounded-xl text-xs p-1 text-center"
              disabled
            />
          </td>
          <td>
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              class="w-5 h-5"
              v-if="this.chkrepeat == 'N' || this.List.length == 0"
              @click="enter"
            >
              <circle fill="#4CAF50" cx="24" cy="24" r="21" />
              <g fill="#fff">
                <rect x="21" y="14" width="6" height="20" />
                <rect x="14" y="21" width="20" height="6" />
              </g>
            </svg>
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              class="w-5 h-5 cursor-default"
              v-else-if="this.chkrepeat == 'Y'"
            >
              <circle fill="#808080" cx="24" cy="24" r="21" />
              <g fill="#fff">
                <rect x="21" y="14" width="6" height="20" />
                <rect x="14" y="21" width="20" height="6" />
              </g>
            </svg>
          </td>
        </tr>
      </tbody>
      <tbody class="text-center" v-if="this.table_showlist !== 'N'">
        <td colspan="5"></td>
        <td>
          <button
            @click="save"
            class="text-center rounded-full p-1 px-2 text-sm border-2 border-green-400 text-black hover:text-green-500 font-semibold shadow-lg"
          >
            บันทึก 💾
          </button>
        </td>
      </tbody>
    </table>
    <div>{{ size }}</div>
    <!-- <table>
      <thead>
        <th>DATA</th>
      </thead>
      <tbody>
        <tr v-for="(i, index) in Lists" :key="index">
          <td>{{ i }}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <th>test</th>
      <th>testuu</th>
      <tbody>
        <tr v-for="(u, index) in this.TestSteel" :key="index">
          <td>{{ u }}</td>
          <td>{{ u.type }}</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>
<script>
import { fg } from "../state/fg";
import { order } from "../state/order";

export default {
  data() {
    return {
      fg,
      order,
      select_Order: "",
      rmd_mat: "",
      rmd_size: "",
      rmd_stdweight: "",
      rmd_numunit: "",
      rmd_price: "",
      vat: "",
      manage_STEEL: [],
      List: [],
      TestList: [],
      table_showlist: "N",
      chkrepeat: "N",
      TestSteel: [
        { steel: "เหล็กไอบีม", type: "A" },
        { steel: "เหล็กฉาก", type: "C" },
        { steel: "เหล็กแบนรีด", type: "D" },
      ],
      chk_mat: [],
      chk_size: [],
    };
  },
  computed: {
    Lists() {
      return this.List;
    },
    ch_data() {
      return this.fg;
    },
    size() {
      fg.steel.map((data) => {
        let dat = data.rmd_size + "-" + data.rmd_mat;
        this.manage_STEEL.push(dat);
      });
      // console.log("ALLSTEEL=>", this.manage_STEEL);
    },
    rmd_prices() {
      this.rmd_price = this.rmd_numunit * this.vat;
      return this.rmd_numunit * this.vat;
    },
  },
  created() {},
  methods: {
    enter() {
      if (this.rmd_mat !== "") {
        this.chk_mat.push(this.rmd_mat);
        this.chk_size.push(this.rmd_size);
        this.List.push({
          mat: this.rmd_mat,
          size: this.rmd_size,
          stdweight: this.rmd_stdweight,
          numunit: this.rmd_numunit,
          vatt: this.vat,
          price: this.rmd_price,
        });

        //this.TestList.push({ mat: this.rmd_mat, size: this.rmd_size });
        console.log(this.List);
        if (this.List.length !== 0) {
          this.table_showlist = "Y";
        }

        this.rmd_mat = "";
        document.getElementById("typeahead_id").value = "";
        this.rmd_stdweight = "";
        this.rmd_numunit = "";
        this.vat = "";
        this.rmd_price = "";
        // console.log("kk");
      } else {
        alert("กรอกข้อมูลก่อนบันทึกรายการ :)");
      }
    },
    deletes(no) {
      let num = parseInt(no) + 1;
      if (confirm("นำรายการที่ " + num + " ออกใช่หรือไม่?")) {
        this.List.splice(no, 1);
      }
    },
    deleteAll() {
      if (confirm("Clear ข้อมูลทั้งหมดใช่หรือไม่?")) {
        this.List = [];
      }
    },
    save() {
      if (
        confirm(
          "ต้องการบันทึกรายการทั้งหมด " +
            this.List.length +
            " รายการใช่หรือไม่?"
        )
      ) {
        alert("บันทึกรายการแล้ว");
        order.list = this.List;
      }
    },
    selectItemEventHandler(e) {
      let arr = e.split("-");
      if (this.List.length !== 0) {
        if (this.chk_mat.includes(arr[1]) && this.chk_size.includes(arr[0])) {
          this.chkrepeat = "Y";
          alert("มีอยู่ในรายการแล้ว");
        } else {
          this.chkrepeat = "N";
        }
      }

      let exam_numunit = Math.floor(Math.random() * 10) + 1;
      let exam_price = Math.floor(Math.random() * 100) + 1;

      fg.steel.map((data) => {
        if (data.rmd_size == arr[0] && data.rmd_mat == arr[1]) {
          this.rmd_size = arr[0];
          this.rmd_mat = arr[1];
          this.rmd_stdweight = data.rmd_stdweight;
          this.rmd_numunit = exam_numunit;
          this.vat = exam_price;
        }
      });

      //return e;
    },
  },
};
</script>
<style>
#typeahead_id {
  font-size: 11px;
  width: 80%;
  border-radius: 13px;
  padding-top: 2px;
  padding-bottom: 2px;
  word-wrap: break-word;
}
.cls-1 {
  fill: #2e79bd;
}
.cls-2 {
  fill: #2d3e50;
}
svg {
  cursor: pointer;
}
</style>
