<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p class="center" v-else>Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue";
import CategoryEdit from "@/components/CategoryEdit.vue";

export default {
  name: "categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  components: { CategoryCreate, CategoryEdit },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category, remove) {
      const idx = this.categories.findIndex((c) => c.id === category.current);

      if (remove) {
        this.categories.splice(idx, 1);
        
      } else {
        this.categories[idx].title = category.title;
        this.categories[idx].limit = category.limit;
        this.updateCount++;
      }
    },
  },
};
</script>
