<template>
  <div class="panes">
    <!--  Pane 0 -->
    <div class="pane">
      <div class="pane__content">
        <!-- Определяем, какой именно слот рендерить по массиву порядка панелей -->
        <slot :name="`pane-${panes[0]}`" />
      </div>
      <div class="pane__controls">
        <!-- Скрываем кнопку классом pane__disabled-button -->
        <UiButton class="pane__disabled-button" variant="secondary" block @click="up(0)"> Up </UiButton>
        <UiButton variant="danger" block @click="down(0)"> Down </UiButton>
      </div>
    </div>
    <!--  Pane 1 -->
    <div class="pane">
      <div class="pane__content">
        <slot :name="`pane-${panes[1]}`" />
      </div>
      <div class="pane__controls">
        <UiButton variant="secondary" block @click="up(1)"> Up </UiButton>
        <UiButton variant="danger" block @click="down(1)"> Down </UiButton>
      </div>
    </div>
    <!--  Pane 2 -->
    <div class="pane">
      <div class="pane__content">
        <slot :name="`pane-${panes[2]}`" />
      </div>
      <div class="pane__controls">
        <UiButton variant="secondary" block @click="up(2)"> Up </UiButton>
        <UiButton class="pane__disabled-button" variant="danger" block @click="down(2)"> Down </UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="jsx">
// Предлагается решать задачу с использованием JSX, но вы можете использовать и чистые рендер-функции

import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  components: {
    UiButton,
  },

  data() {
    return {
      /**
       * Массив с текущим порядком номеров моделей, например
       * [0, 1, 2]
       * @type {number[]|null}
       */
      panes: [0, 1, 2],
      // Сейчас здесь массив ровно из трёх элементов, но решение должно быть универсальным для любого количества узлов
    };
  },

  methods: {
    /**
     * Переместить i-ую панель вверх
     *
     * @param {number} i
     */
    up(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i - 1];
      this.panes[i - 1] = temp;
    },

    /**
     * Переместить i-ую панель вниз
     *
     * @param {number} i
     */
    down(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i + 1];
      this.panes[i + 1] = temp;
    },
  },
};
</script>

<style scoped>
.panes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pane {
  display: flex;
  flex-direction: row;
  border: 3px solid var(--blue-light);
}

.pane__content {
  border-right: 3px solid var(--blue-light);
  padding: 8px;
  flex: 1 0;
}

.pane__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: min-content;
}

.pane__disabled-button {
  visibility: hidden;
}
</style>
