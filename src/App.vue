<template>
  <div id="app">
    <!-- Header -->
    <header>
      <h1>餐點碳排放計算機</h1>
      <p>計算您餐點的碳排放量，助力環保</p>
    </header>

    <!-- Main Content -->
    <main>
      <!-- 食材選擇區 -->
      <section class="ingredient-selection">
        <div class="ingredient-row" v-for="(ingredient, index) in ingredients" :key="index">
          <select class="ingredient-category" v-model="ingredient.category" @change="fetchItems(index)">
            <option value="">選擇種類</option>
            <option v-for="category in categories" :key="category.category_id" :value="category.category_id">
              {{ category.category_name }}
            </option>
          </select>
          <select class="ingredient-name" v-model="ingredient.name" @change="updateCarbonEmission(index)">
            <option value="">選擇名稱</option>
            <option v-for="item in ingredient.items" :key="item.item_id" :value="item.item_id">
              {{ item.item_name }}
            </option>
          </select>
          <input type="number" class="ingredient-weight" v-model.number="ingredient.weight" @input="updateCarbonEmission(index)" :placeholder="ingredient.unit || '請輸入數值'">
          <button class="add-row" @click="addRow">+</button>
        </div>
      </section>
      <!-- 計算按鈕 -->
      <div class="button-group">
        <button class="reset-button" @click="resetCalculator">重新計算</button>

        <button class="calculate-button" @click="calculateEmissions">計算碳排放</button>
        
      </div>
      <!-- 結果顯示區 -->
      <section class="results">
        <h2>總碳排放量</h2>
        <p id="total-emission">{{ totalEmission.toFixed(2) }} kg CO₂e</p>
        <div class="comparison">
          <p><span id="trees-saved">{{ treesSaved }}</span> 棵樹木一個月的吸收量</p>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer>
      <p>© 2024 餐點碳排放計算機 | 聯絡我們：(089)326141~326146</p>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const categories = ref([]);
    const ingredients = ref([
      { category: '', name: '', weight: '', items: [], carbon_emission: 0 }
    ]); 
    const totalEmission = ref(0.00);
    const carTravel = ref(0);
    const treesSaved = ref(0);

    const fetchCategories = () => {
      axios.get('http://localhost:3001/api/categories')
        .then(response => {
          categories.value = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching categories!', error);
        });
    };

    const fetchItems = (index) => {
      const category_id = ingredients.value[index].category;
      if (category_id) {
        axios.get(`http://localhost:3001/api/items/${category_id}`)
          .then(response => {
            ingredients.value[index].items = response.data;
            ingredients.value[index].name = ''; // 重置选择的食材名称
          })
          .catch(error => {
            console.error('There was an error fetching items!', error);
          });
      }
    };

    const updateCarbonEmission = (index) => {
      const ingredient = ingredients.value[index];
      if (ingredient.weight < 0) 
      {
      alert('重量不可为负值！');
      ingredient.weight = 0;
      }
      const selectedItem = ingredient.items.find(item => item.item_id === ingredient.name);
      if (selectedItem) {
        ingredient.carbon_emission = selectedItem.carbon_emission  * ingredient.weight;
        ingredient.unit = selectedItem.unit || '';
      } else {
        ingredient.carbon_emission = 0;
        ingredient.unit = '';
      }
    };

    const addRow = () => {
      ingredients.value.push({ category: '', name: '', weight: '', items: [], carbon_emission: 0 });
    };

    const calculateEmissions = () => {
      totalEmission.value = ingredients.value.reduce((total, ingredient) => total + ingredient.carbon_emission, 0);
      carTravel.value = totalEmission.value * 5; // 假设1kg CO2等于行驶5公里
      treesSaved.value = (totalEmission.value /0.625).toFixed(1); // 假设1kg CO2等于10棵树一个月的吸收量
    };

    const resetCalculator = () => {
      ingredients.value = [
        { category: '', name: '', weight: '', items: [], carbon_emission: 0 }
      ];
      totalEmission.value = 0.00;
      carTravel.value = 0;
      treesSaved.value = 0;
    };

    fetchCategories(); // 初始化时获取分类数据

    return {
      categories,
      ingredients,
      totalEmission,
      carTravel,
      treesSaved,
      fetchItems,
      updateCarbonEmission,
      addRow,
      calculateEmissions,
      resetCalculator
    };
  }
};
</script>

<style src="./assets/style.css"></style>